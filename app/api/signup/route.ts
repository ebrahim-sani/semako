import * as bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
   if (req.method !== "POST") {
      return new Response("", { status: 405 });
   }

   const { full_name, email_address, passw, confirmPassw, phone_number } =
      await req.json();

   const member = await prisma.member.findUnique({
      where: { email: email_address },
   });

   if (passw !== confirmPassw) {
      return new Response(JSON.stringify("passwordNotMatch"), { status: 405 });
   }

   if (member) {
      return new Response(JSON.stringify("userIsAvailable"), { status: 405 });
   }

   const hashedPassw = await bcrypt.hash(passw, 7);
   let res;

   if (!member && passw === confirmPassw) {
      try {
         res = await prisma.member.create({
            data: {
               fullName: full_name,
               email: email_address,
               phoneNumber: phone_number,
               password: hashedPassw,
            },
         });
         // console.log(res);
         return new Response(JSON.stringify("member created successful"), {
            status: 200,
         });
      } catch (err) {
         console.log(err);
      } finally {
         prisma.$disconnect();
      }
   }

   return new Response(JSON.stringify(res));
}
