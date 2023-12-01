import { NormalHeader } from "@/app/components";
import { authOptions } from "@/lib/auth";
import { MemberProps } from "@/declarations";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { BsArrowLeftShort } from "react-icons/bs";

export default async function Page() {
   const session: MemberProps | null = await getServerSession(authOptions);
   // @ts-ignore
   const full_name = session?.user.fullName;

   return (
      <div className="flex h-screen flex-col items-start w-full overflow-hidden">
         <NormalHeader
            user_fullName={session && full_name}
            headerTitle="Settings"
         />
         <div className="flex flex-1 flex-col items-start w-full gap-4">
            <div className="lg:hidden flex items-start justify-between mx-3 mt-3 w-[60%]">
               <Link href="/dashboard">
                  <div className="py-1 px-3 rounded-md border border-gray-500">
                     <BsArrowLeftShort className="text-gray-500" size={22} />
                  </div>
               </Link>

               <h3 className="text-lg font-semibold text-white">Settings</h3>
            </div>

            <div className="flex flex-col items-start gap-6 w-full py-2 lg:py-6 px-3 lg:px-6 h-full">
               <div className="flex bg-black p-2 lg:p-1 w-full justify-center">
                  <div className="flex items-start justify-center lg:w-4/5 w-full gap-4">
                     <p className="flex w-full text-xs text-gray-300">
                        Not implemented!
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
