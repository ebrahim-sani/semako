import { NormalHeader } from "@/app/components";
import { authOptions } from "@/lib/auth";
import { MemberProps } from "@/declarations";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { BsArrowLeftShort } from "react-icons/bs";
import { PrismaClient } from "@prisma/client";
import { modifiedDate } from "@/utils/utilityFunc";

const prisma = new PrismaClient();

export default async function Page() {
   const session: MemberProps | null = await getServerSession(authOptions);
   // @ts-ignore
   const memberId = session?.user.id;
   const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: { transactions: true },
   });
   return (
      <div className="flex h-screen flex-col items-start w-full overflow-hidden">
         <NormalHeader
            user_fullName={member && member?.fullName}
            headerTitle="Tranactions"
         />
         <div className="flex flex-1 flex-col items-start w-full gap-4">
            <div className="lg:hidden flex items-start justify-between mx-3 mt-3 w-[60%] h-full">
               <Link href="/dashboard">
                  <div className="py-1 px-3 rounded-md border border-gray-500">
                     <BsArrowLeftShort className="text-gray-500" size={22} />
                  </div>
               </Link>

               <h3 className="text-lg font-semibold text-white">Tranactions</h3>
            </div>

            <div className="flex flex-col items-start gap-6 w-full py-2 lg:py-6 px-3 lg:px-6">
               <div className="flex bg-black p-2 lg:p-1 w-full justify-center">
                  <div className="flex items-start justify-center lg:w-4/5 w-full gap-4">
                     <div className="overflow-x-auto h-[80vh]">
                        <table className="table table-lg table-pin-rows table-pin-cols">
                           {/* head */}
                           <thead>
                              <tr className="text-gray-300 border-b border-gray-700 text-sm">
                                 <th>No.</th>
                                 <th>Reference</th>
                                 <th>Amount</th>
                                 <th>Date</th>
                              </tr>
                           </thead>
                           <tbody>
                              {member ? (
                                 member.transactions.length > 0 ? (
                                    member.transactions.map(
                                       (transaction, i) => (
                                          <tr
                                             className="border-t border-gray-700 text-gray-300 text-xs"
                                             key={transaction.id}
                                          >
                                             <th>{i + 1}</th>
                                             <td>{transaction.reference}</td>
                                             <td>{transaction.amount}</td>
                                             <td>
                                                {modifiedDate(transaction.date)}
                                             </td>
                                          </tr>
                                       ),
                                    )
                                 ) : member.transactions.length === 0 ? (
                                    <div className="flex h-full w-full items-center justify-center">
                                       <p className="flex w-full text-xs text-gray-300">
                                          No transactions yet!
                                       </p>
                                    </div>
                                 ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                       <p className="text-xs text-gray-300">
                                          Loading...
                                       </p>
                                    </div>
                                 )
                              ) : null}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
