"use client";

import { useStore } from "@/lib/states";
import Image from "next/image";
import { IoMdNotifications } from "react-icons/io";
import { RiMenu4Fill } from "react-icons/ri";
import { BsArrowLeftShort } from "react-icons/bs";
import { truncateText } from "@/utils/utilityFunc";
import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";
import { useState } from "react";
import { MdKeyboardArrowDown, MdManageAccounts } from "react-icons/md";
import { signOut } from "next-auth/react";

type headerProps = {
   headerTitle: string | null;
   backUrl?: string | null;
   user_fullName: string | null;
};

const NormalHeader = ({ headerTitle, backUrl, user_fullName }: headerProps) => {
   const { setMobileSideBar } = useStore();
   const [clicked, setClicked] = useState(false);

   const handleClick = () => {
      setClicked(true);
      setTimeout(() => {
         setClicked(false);
      }, 5000);
   };

   return (
      <div className="flex w-full py-4 px-3 md:px-6">
         <div className="flex items-start w-full">
            <div className="flex items-center justify-between w-full">
               <Link
                  href={`${!backUrl ? "/dashboard" : `/dashboard/${backUrl}`}`}
                  className="hidden lg:inline-flex"
               >
                  <div className="py-1 px-3 rounded-md border border-white">
                     <BsArrowLeftShort className="text-white" size={22} />
                  </div>
               </Link>

               <RiMenu4Fill
                  onClick={() => setMobileSideBar(true)}
                  className="lg:hidden text-white cursor-pointer"
                  size={32}
               />
               <h3 className="hidden lg:inline-flex text-lg font-semibold text-white">
                  {headerTitle || null}
               </h3>
               <div className="flex items-center gap-3 lg:gap-5 dropdown dropdown-bottom dropdown-end">
                  <IoMdNotifications size={24} className="text-white" />
                  <div
                     tabIndex={0}
                     role="button"
                     className="flex items-center gap-2 py-2 px-3 rounded-full border border-gray-700"
                  >
                     <div className="h-6 w-6">
                        <Image
                           src="/person.jpg"
                           alt="logo"
                           width={200}
                           height={200}
                           className="rounded-full"
                        />
                     </div>

                     <div className="hidden lg:flex flex-col items-start">
                        {user_fullName && (
                           <p className="text-white text-xs font-semibold">
                              {truncateText(user_fullName, 20) || ""}
                           </p>
                        )}

                        <p className="text-white text-xs italic">Member</p>
                     </div>
                     <MdKeyboardArrowDown className=" text-white" size={24} />

                     <ul className="dropdown-content z-[1] menu p-2 shadow rounded-box w-40 bg-slate-950 border border-gray-700 gap-2">
                        <li>
                           <div className="flex items-center gap-2 w-full hover:bg-slate-800">
                              <MdManageAccounts className="text-gray-300" />
                              <p className="text-gray-300">Profile</p>
                           </div>
                        </li>
                        <li>
                           <div
                              onClick={() => {
                                 handleClick();
                                 signOut({ callbackUrl: "/" });
                              }}
                              className="flex items-center gap-2 w-full hover:bg-slate-800"
                           >
                              <IoLogOutOutline className="text-gray-300" />
                              {clicked ? (
                                 <span className="loading loading-spinner loading-xs ml-3"></span>
                              ) : (
                                 <p className="text-gray-300">Sign Out</p>
                              )}
                           </div>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default NormalHeader;
