import { NormalHeader } from "@/app/components";
import { authOptions } from "@/lib/auth";
import { MemberProps } from "@/declarations";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { BsArrowLeftShort } from "react-icons/bs";
import { PrismaClient } from "@prisma/client";
import { truncateText } from "@/utils/utilityFunc";

const prisma = new PrismaClient();

export default async function Page() {
   const session: MemberProps | null = await getServerSession(authOptions);
   // @ts-ignore
   const member = session?.user;
   const schemes = await prisma.scheme.findMany();

   return (
      <div className="flex h-screen flex-col items-start w-full overflow-hidden">
         <NormalHeader user_fullName={member?.fullName} headerTitle="Schemes" />
         <div className="flex flex-1 flex-col items-start w-full gap-4">
            <div className="lg:hidden flex items-start justify-between mx-3 mt-3 w-[58%] h-full">
               <Link href="/dashboard">
                  <div className="py-1 px-3 rounded-md border border-gray-500">
                     <BsArrowLeftShort className="text-gray-500" size={22} />
                  </div>
               </Link>

               <h3 className="text-lg font-semibold text-white">Schemes</h3>
            </div>

            <div className="flex flex-col items-start gap-6 w-full py-2 lg:py-6 px-3 lg:px-6">
               <div className="flex bg-black p-2 lg:p-1 w-full justify-center overflow-scroll hide-scrollbar lg:overflow-y-auto h-[82vh]">
                  <div className="flex flex-col sm:flex-row items-start lg:w-4/5 w-full gap-4">
                     <div className="grid grid-col-1 sm:grid-cols-2 items-center w-full gap-3">
                        {schemes?.map((scheme) => (
                           <Link
                              key={scheme?.id}
                              href={`/dashboard/schemes/${scheme.id}`}
                           >
                              <div className="flex flex-col col-span-1 h-full items-start gap-3 border border-gray-800 hover:border-gray-500 rounded-xl p-3 w-full cursor-pointer">
                                 <h2 className="text-gray-300 font-bold">
                                    {scheme.name}
                                 </h2>
                                 <div className="w-full flex flex-col sm:flex-row items-start gap-4">
                                    <div className="flex items-center gap-1">
                                       <p className="text-sm text-gray-400">
                                          &bull; Maturity Month:
                                       </p>
                                       <p className="text-sm text-gray-400 font-semibold">
                                          {scheme.maturityMonths}
                                       </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                       <p className="text-sm text-gray-400">
                                          &bull; Interest Rate:
                                       </p>
                                       <p className="text-sm text-gray-400 font-semibold">
                                          {scheme.interestRate}%
                                       </p>
                                    </div>
                                 </div>
                                 <p className="text-sm text-gray-400">
                                    {truncateText(scheme.description, 200)}
                                 </p>
                              </div>
                           </Link>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
