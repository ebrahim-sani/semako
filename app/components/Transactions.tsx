import { authOptions } from "@/lib/auth";
import { modifiedDate, transformMoney } from "@/utils/utilityFunc";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

const Transactions = async () => {
   const session = await getServerSession(authOptions);
   // @ts-ignore
   const userId = session.user.id;
   const member = await prisma.member.findUnique({
      where: { id: userId },
      include: { transactions: true },
   });
   return (
      // <main className="flex max-sm:px-2 w-full">
      <div className="flex flex-col items-start border border-gray-800 rounded-2xl w-full lg:w-4/12 min-h-[340px] max-h-[468px] h-full">
         <div className="flex w-full rounded-2xl border border-gray-900">
            <h2 className="text-gray-200 font-semibold p-3">Transactions</h2>
         </div>

         {member ? (
            member?.transactions.length > 0 ? (
               member?.transactions.slice(0, 6).map((transaction) => (
                  <div
                     key={transaction.id}
                     className="flex items-center justify-between gap-1 w-full px-3 py-3"
                  >
                     <div className="flex flex-col items-start">
                        <h3 className="text-gray-300 text-sm">
                           {transaction.reference}
                        </h3>
                        <p className="text-gray-500 text-xs">
                           {modifiedDate(transaction.date)}
                        </p>
                     </div>
                     <div className="flex flex-col items-start">
                        <h3 className="text-gray-200 text-sm">
                           +₦{transformMoney(transaction.amount)}
                        </h3>
                        <p className="text-green-600 text-xs">Successful..</p>
                     </div>
                  </div>
               ))
            ) : member?.transactions.length === 0 ? (
               <div className="flex items-center justify-center w-full h-full">
                  <p className="text-gray-300 text-xs">No transactions!</p>
               </div>
            ) : (
               <div className="flex items-center justify-center w-full h-full">
                  <p className="text-gray-300 text-xs">Loading...</p>
               </div>
            )
         ) : null}
      </div>
      // </main>
   );
};

export default Transactions;
