import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
// import { PrismaClient } from "@prisma/client";
// import { schemesData } from "@/constant/dummy";

// const prisma = new PrismaClient();

export default async function Page() {
   // const session = await getServerSession(authOptions);
   // console.log(session);
   // async function addSchemes() {
   //    for (const scheme of schemesData) {
   //       await prisma.scheme.create({
   //          data: scheme,
   //       });
   //    }
   //    await prisma.$disconnect();
   // }
   // addSchemes();

   return (
      <main className="flex h-screen flex-col items-start p-3 sm:p10 lg:p-24">
         <div className="h-2/3 w-full flex flex-col items-center justify-between">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
               <Link href="/signup">
                  <button className="btn max-sm:btn-sm btn-outline">
                     Sign Up
                  </button>
               </Link>
               <Link href="/auth/signin">
                  <button className="btn max-sm:btn-sm btn-outline">
                     Sign In
                  </button>
               </Link>
            </div>

            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
               <Image
                  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                  src="/next.svg"
                  alt="Next.js Logo"
                  width={180}
                  height={37}
                  priority
               />
            </div>
         </div>
      </main>
   );
}
