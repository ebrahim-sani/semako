"use client";

// @ts-ignore
import PaystackPop from "@paystack/inline-js";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useStore } from "@/lib/states";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaTimes } from "react-icons/fa";
import { transformMoney } from "@/utils/utilityFunc";

export default function PaymentModal() {
   const { depositeDialog, setDepositeDialog } = useStore();
   const [amount, setAmount] = useState("");

   const router = useRouter();
   const { data: session } = useSession();
   const cancelButtonRef = useRef(null);
   // @ts-ignore
   let full_name: string = session?.user?.fullName;
   let email = session?.user?.email;

   const addTrx = async (reference: string) => {
      try {
         const res = await fetch("/api/add-trx", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               reference,
               amount,
            }),
         });
         if (res?.ok) {
            router.refresh();
            toast.success("Success!");
         }
      } catch (err) {
         console.log(err);
      }
   };

   const deposite = async () => {
      const paystack = new PaystackPop();
      paystack.newTransaction({
         // other params
         key: process.env.NEXT_PUBLIC_PAYSTACK_PK,
         amount: parseInt(amount) * 100,
         full_name,
         email,

         onSuccess: (transaction: any) => {
            // Payment complete! Reference: transaction.reference
            console.log(transaction);
            addTrx(transaction.reference);
            setDepositeDialog(false);
            setAmount("");
         },
         onCancel: () => {
            // user closed popup
            toast.warning("Transaction cancelled!");
         },
      });
   };

   return (
      <Transition.Root show={depositeDialog} as={Fragment}>
         <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setDepositeDialog}
         >
            <Transition.Child
               as={Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0"
               enterTo="opacity-100"
               leave="ease-in duration-200"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <div className="fixed inset-0 bg-black bg-opacity-90 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
               <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                  <Transition.Child
                     as={Fragment}
                     enter="ease-out duration-300"
                     enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                     enterTo="opacity-100 translate-y-0 sm:scale-100"
                     leave="ease-in duration-200"
                     leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                     leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                     <Dialog.Panel className="relative transform overflow-hidden rounded-lg border border-gray-700 bg-black text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                        <div className="bg-black px-4 flex w-full py-5">
                           <div className="flex flex-col items-start w-full md:mr-6 lg:mr-8">
                              <div className="mt-2 flex flex-col w-full text-center sm:mx-4 sm:mt-0 sm:text-left">
                                 <div className="flex items-center justify-between w-full">
                                    <Dialog.Title
                                       as="h3"
                                       className="text-xl text-white font-semibold leading-6"
                                    >
                                       Add funds
                                    </Dialog.Title>

                                    <button
                                       type="button"
                                       onClick={() => setDepositeDialog(false)}
                                       ref={cancelButtonRef}
                                       className="btn btn-xs btn-circle"
                                    >
                                       <FaTimes />
                                    </button>
                                 </div>
                                 <div className="flex w-full mt-3">
                                    <div className="flex flex-col items-center gap-2 w-full">
                                       <div className="gap-1 flex flex-col items-start w-full mb-2">
                                          <label
                                             className="text-gray-500 mb-[2px] text-sm"
                                             htmlFor=""
                                          >
                                             Full Name
                                          </label>
                                          <input
                                             className={`text-sm flex w-full mb-[2px] rounded border bg-transparent px-2 py-3 focus:outline-none ${
                                                full_name
                                                   ? "border-primary"
                                                   : "border-gray-800"
                                             } active:outline-none text-gray-400`}
                                             name="fullName"
                                             type="text"
                                             value={full_name}
                                             readOnly
                                          />
                                       </div>

                                       <div className="gap-1 flex flex-col items-start w-full mb-2">
                                          <label
                                             className="text-gray-500 mb-[2px] text-sm"
                                             htmlFor=""
                                          >
                                             Email
                                          </label>
                                          <input
                                             className={`text-sm w-full mb-[2px] flex rounded border bg-transparent px-2 py-3 focus:outline-none ${
                                                email
                                                   ? "border-primary"
                                                   : "border-gray-800"
                                             } active:outline-none text-gray-400`}
                                             name="email"
                                             type="email"
                                             value={email || ""}
                                             readOnly
                                          />
                                       </div>

                                       <div className="relative flex flex-col items-start w-full">
                                          <label
                                             className="text-gray-500 mb-[2px] text-sm"
                                             htmlFor=""
                                          >
                                             Amount
                                          </label>
                                          <div className="relative w-full">
                                             <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <strong className="text-gray-400">
                                                   ₦
                                                </strong>
                                             </div>
                                             <input
                                                name="amount"
                                                type="number"
                                                value={amount}
                                                onChange={(e) =>
                                                   setAmount(e.target.value)
                                                }
                                                className={`text-sm w-full mb-[2px] flex rounded border bg-transparent px-2 py-3 focus:outline-none ps-8 ${
                                                   amount
                                                      ? "border-primary"
                                                      : "border-gray-800"
                                                } active:outline-none text-gray-400`}
                                             />
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="bg-black py-3 px-3 sm:px-6 flex sm:flex-row-reverse w-full gap-3">
                           <button
                              type="button"
                              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:border-none font-medium rounded-lg text-sm px-3 sm:px-5 py-[5px] sm:py-2.5 text-center mb-2 w-full"
                              onClick={() => deposite()}
                           >
                              Deposite
                           </button>
                        </div>
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Dialog>
      </Transition.Root>
   );
}
