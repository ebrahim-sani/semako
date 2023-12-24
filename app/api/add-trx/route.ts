import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
   if (req.method !== "POST") {
      return new Response("", { status: 405 });
   }

   const session = await getServerSession(authOptions);
   //@ts-ignore
   let memberId = session?.user?.id;

   const { reference, amount } = await req.json();

   // Promise all
   if (reference && amount) {
      try {
         const res = await Promise.all([
            await prisma.member.update({
               where: { id: memberId },
               data: {
                  currentBalance: {
                     increment: parseFloat(amount),
                  },
               },
            }),
            await prisma.transactions.create({
               data: {
                  amount,
                  reference,
                  memberId,
               },
            }),
            await prisma.history.create({
               data: {
                  title: `Funded ₦${amount}`,
                  description: `Deposited ₦${amount} with a reference number of ${reference}`,
                  memberId,
               },
            }),
         ]);
         return new Response("", { status: 200 });
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
