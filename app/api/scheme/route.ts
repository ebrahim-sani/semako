import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
   if (req.method !== "POST") {
      return new Response("", { status: 405 });
   }

   const { schemeId } = await req.json();

   if (schemeId) {
      try {
         const scheme = await prisma.scheme.findUnique({
            where: {
               id: schemeId,
            },
         });
         if (scheme) {
            return new Response(JSON.stringify(scheme), { status: 200 });
         }
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
