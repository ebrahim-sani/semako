"use client";

import { useStore } from "@/lib/states";

const OverallHead = () => {
   const { depositeDialog, setDepositeDialog } = useStore();

   return (
      <div className="flex items-center justify-between w-full">
         <h3 className="text-gray-200 text-lg lg:text-xl">Overall Portfolio</h3>

         <button
            onClick={() => setDepositeDialog(!depositeDialog)}
            type="button"
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:border-none font-medium rounded-lg text-sm px-3 sm:px-5 py-[5px] sm:py-2.5 text-center me-2 mb-2"
         >
            Deposite
         </button>
      </div>
   );
};

export default OverallHead;
