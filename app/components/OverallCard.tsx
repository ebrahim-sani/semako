import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { OverallHead } from ".";
import { transformMoney } from "@/utils/utilityFunc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const OverallCard = async () => {
   const session: any = await getServerSession(authOptions);
   // @ts-ignore
   const memberId = session?.user.id;
   const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: { enrollments: true },
   });

   function expectedProfit(enrollments: any[] | undefined) {
      const profits = enrollments?.reduce(
         (total_profit, enrollment: any) =>
            total_profit + enrollment.interestToEarn,
         0,
      );
      return profits.toFixed(0);
   }

   return (
      <div className="relative flex flex-col w-full items-center justify-center max-sm:mt-4">
         <div className="flex flex-col items-start p-3 rounded-lg px-6 lg:px-20 py-6 w-[94%] md:w-4/5 gap-8 blue-glassmorphism">
            <OverallHead />
            <div className="flex items-center justify-between w-full lg:gap-[6em]">
               <div className="flex flex-col lg:w-full lg:flex-row gap-4 lg:justify-between">
                  <div className="flex flex-col items-start gap-1">
                     <p className="text-gray-400 text-xs">Total Earned</p>

                     <h2 className="text-2xl lg:text-3xl text-gray-200 text-bold">
                        ₦{transformMoney(member?.totalEarned)}
                     </h2>
                  </div>
                  <div className="flex flex-col items-start gap-1">
                     <p className="text-gray-400 text-xs">Affiliate</p>
                     <h2 className="text-2xl lg:text-3xl text-gray-200 text-bold">
                        ₦0
                     </h2>
                  </div>
               </div>
               <div className="flex flex-col lg:flex-row gap-4 lg:justify-between lg:w-full">
                  <div className="flex flex-col items-start gap-1">
                     <p className="text-gray-400 text-xs">Accrued Earnings</p>
                     <h2 className="text-2xl lg:text-3xl text-gray-200 text-bold">
                        ₦{transformMoney(expectedProfit(member?.enrollments))}
                     </h2>
                  </div>
                  <div className="flex flex-col items-start gap-1">
                     <p className="text-gray-400 text-xs">Current Balance</p>
                     <h2 className="text-2xl lg:text-3xl text-gray-200 text-bold">
                        ₦{transformMoney(member?.currentBalance)}
                     </h2>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default OverallCard;
