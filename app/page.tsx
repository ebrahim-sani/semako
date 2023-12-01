import Image from "next/image";
import Link from "next/link";
import { SiWebmoney } from "react-icons/si";

export default async function Page() {
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

            <div className="flex flex-col w-full items-start justify-center gap-3 mx-3">
               <div className="h-20 w-20">
                  <SiWebmoney className="h-full w-full text-cyan-500" />
               </div>

               <div className="flex flex-col items-start">
                  <h3 className="text-white text-2xl font-medium">Semako</h3>
               </div>
            </div>
            <div></div>
         </div>
      </main>
   );
}
