import { authOptions } from "@/lib/auth";
import { modifiedDate, transformMoney } from "@/utils/utilityFunc";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

const Schemecard = async () => {
   const session = await getServerSession(authOptions);
   // @ts-ignore
   const userId = session.user.id;
   const member = await prisma.member.findUnique({
      where: { id: userId },
      include: { enrollments: true },
   });

   return (
      <div className="flex bg-black p-2 lg:p-1 w-full lg:h-full">
         <div className="flex flex-col items-start w-full gap-4 h-full">
            <strong className="text-gray-100 text-base w-full">
               Enrolled Schemes
            </strong>
            {member ? (
               member?.enrollments.length > 0 ? (
                  <div
                     className={`flex ${
                        member?.enrollments.length > 0 &&
                        "grid grid-col-1 sm:grid-cols-2"
                     }  items-center w-full gap-3`}
                  >
                     {member?.enrollments
                        .splice(0, 6)
                        .map((enrollment: any) => (
                           <div
                              key={enrollment?.id}
                              className=" relative flex flex-col col-span-1 h-full items-start gap-3 border border-gray-800 hover:border-gray-500 rounded-xl p-3 w-full cursor-pointer"
                           >
                              <h2 className="text-gray-300 font-bold">
                                 {enrollment?.schemeTitle}
                              </h2>
                              <div className="flex items-start gap-2 flex-col">
                                 <div className="w-full flex flex-col items-start gap-2">
                                    <div className="flex items-center gap-1">
                                       <p className="text-sm text-gray-400">
                                          &bull; Start Date:
                                       </p>
                                       <p className="text-sm text-gray-400 font-semibold">
                                          {modifiedDate(enrollment?.startDate)}
                                       </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                       <p className="text-sm text-gray-400">
                                          &bull; End Date:
                                       </p>
                                       <p className="text-sm text-gray-400 font-semibold">
                                          {modifiedDate(enrollment?.endDate)}
                                       </p>
                                    </div>
                                 </div>
                                 <div className="w-full flex items-start gap-4">
                                    <div className="flex items-center gap-1">
                                       <p className="text-sm text-gray-400">
                                          &bull; Principal:
                                       </p>
                                       <p className="text-sm text-gray-400 font-semibold">
                                          ₦
                                          {transformMoney(
                                             enrollment?.principal,
                                          )}
                                       </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                       <p className="text-sm text-gray-400">
                                          &bull; Expected Profit:
                                       </p>
                                       <p className="text-sm text-gray-400 font-semibold">
                                          ₦
                                          {transformMoney(
                                             enrollment?.interestToEarn,
                                          )}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                              <p className="text-green-600 text-xs font-medium absolute right-4 top-4">
                                 {enrollment?.status}
                              </p>
                           </div>
                        ))}
                  </div>
               ) : member?.enrollments.length === 0 ? (
                  <div className="flex items-center justify-center w-full h-full">
                     <p className="text-gray-300 text-xs">
                        No Enrolled Scheme!
                     </p>
                  </div>
               ) : (
                  <div className="flex items-center justify-center w-full h-full">
                     <p className="text-gray-300 text-xs">Loading...</p>
                  </div>
               )
            ) : null}
         </div>
      </div>
   );
};

export default Schemecard;
