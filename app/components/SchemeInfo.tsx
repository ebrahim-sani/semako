"use client";

import { useState } from "react";
import { toast } from "sonner";

const SchemeInfo = ({
   scheme,
   currBalance,
}: {
   scheme: any;
   currBalance: number;
}) => {
   const [expectedProfit, setExpectedProfit] = useState<number | null>();
   const [amount, setAmount] = useState<string>("");
   const [clicked, setClicked] = useState<boolean>(false);
   const [insufficient, setInsufficient] = useState<boolean>(false);

   const calculateExpectedProfit = () => {
      const parsedAmount = parseInt(amount);
      if (!isNaN(parsedAmount)) {
         const calculatedProfit = parsedAmount * (scheme?.interestRate / 100);
         setExpectedProfit(Number(calculatedProfit.toFixed(2)));
      } else {
         setExpectedProfit(null);
      }
   };

   const enroll = async () => {
      const newDate = new Date();
      if (currBalance < parseInt(amount)) {
         setInsufficient(true);
         setClicked(false);
      }
      if (scheme && currBalance >= parseInt(amount)) {
         try {
            const res = await fetch("/api/enroll-scheme", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                  schemeId: scheme.id,
                  schemeTitle: scheme.name,
                  schemeInterest: scheme.interestRate,
                  amount: parseInt(amount),
                  end_date: new Date(
                     newDate.setMonth(
                        newDate.getMonth() + scheme?.maturityMonths,
                     ),
                  ).toISOString(),
               }),
            });
            if (res?.ok) {
               toast.success("👌 Enrolled successful!");
               setClicked(false);
            }
            if (!res?.ok) {
               toast.error("😔 Something went wrong!!");
               setClicked(false);
            }
         } catch (err) {
            setClicked(false);
            console.log(err);
         } finally {
            setClicked(false);
         }
      }
   };
   return (
      <div className="flex flex-col items-start w-full py-4 lg:py-6 px-3 lg:px-6">
         <div className="flex items-start justify-center w-full">
            <div className="flex flex-col items-start w-full sm:w-1/2 lg:w-1/3 gap-5">
               <div className="flex flex-col items-start gap-1">
                  <strong className="text-xs text-gray-300">Title:</strong>
                  <h2 className="text-2xl text-gray-300">{scheme?.name}</h2>
               </div>
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1">
                     <p className="text-sm text-gray-300">
                        &bull; Maturity Month:
                     </p>
                     <strong className="text-sm text-gray-300">
                        {scheme?.maturityMonths}
                     </strong>
                  </div>
                  <div className="flex items-center gap-1">
                     <p className="text-sm text-gray-300">
                        &bull; Interest Rate:
                     </p>
                     <strong className="text-sm text-gray-300">
                        {scheme?.interestRate}%
                     </strong>
                  </div>
               </div>
               <div className="flex flex-col items-start gap-2">
                  <strong className="text-xs text-gray-300">
                     Description:
                  </strong>
                  <p className="text-gray-400 text-sm">{scheme?.description}</p>
               </div>

               <div className="relative w-full">
                  <div
                     className={`absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ${
                        insufficient && "mb-4"
                     }`}
                  >
                     <strong className="text-gray-400">₦</strong>
                  </div>
                  <input
                     name="amount"
                     type="number"
                     value={amount}
                     onChange={(e) => {
                        setAmount(e.target.value);
                        calculateExpectedProfit();
                     }}
                     className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ps-8"
                     placeholder="Amount"
                  />
                  {insufficient && (
                     <p className="text-xs text-red-500">Insufficient funds!</p>
                  )}
               </div>

               <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                     <strong className="text-gray-400">₦</strong>
                  </div>
                  <input
                     name="ex_profit"
                     type="text"
                     value={expectedProfit?.toString() || ""}
                     readOnly
                     className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ps-8"
                     placeholder="Expected profit"
                  />
               </div>

               <button
                  onClick={() => {
                     enroll();
                     setClicked(true);
                  }}
                  type="button"
                  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:border-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
               >
                  {clicked && currBalance > parseInt(amount) ? (
                     <span className="loading loading-spinner"></span>
                  ) : (
                     "Enroll"
                  )}
               </button>
            </div>
         </div>
      </div>
   );
};

export default SchemeInfo;
