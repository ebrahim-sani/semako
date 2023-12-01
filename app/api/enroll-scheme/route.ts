import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
   if (req.method !== "POST") {
      return new Response("", { status: 405 });
   }

   const session = await getServerSession(authOptions);
   // @ts-ignore
   const userId = session?.user.id;
   const { schemeId, schemeInterest, schemeTitle, amount, end_date } =
      await req.json();

   if (schemeId) {
      try {
         const scheme = await prisma.enrollment.create({
            data: {
               memberId: userId,
               schemeId,
               schemeTitle,
               interestToEarn: amount * (schemeInterest / 100),
               endDate: end_date,
               principal: amount,
               status: "Active",
            },
         });
         const upd = await prisma.member.update({
            where: { id: userId },
            data: {
               currentBalance: {
                  decrement: parseFloat(amount),
               },
            },
         });
         const history = await prisma.history.create({
            data: {
               title: `Enrolled to -> ${schemeTitle}`,
               description: `Enrolled to scheme with a with ${amount}`,
               memberId: userId,
            },
         });
         return new Response(JSON.stringify(scheme), { status: 200 });
      } catch (err) {
         console.log(err);
         return new Response(JSON.stringify("something went wrong!"), {
            status: 405,
         });
      } finally {
         await prisma.$disconnect();
      }
   }
}
