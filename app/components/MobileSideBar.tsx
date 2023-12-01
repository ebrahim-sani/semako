"use client";

import { sidebarMenu } from "@/constant/dummy";
import { useStore } from "@/lib/states";
import { truncateText } from "@/utils/utilityFunc";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { SiWebmoney } from "react-icons/si";

const MobileSideBar = () => {
   const { mobileSidebar, setMobileSideBar } = useStore();
   const [activePath, setActivePath] = useState<string>("overview");

   return (
      <div className="relative z-50">
         {mobileSidebar && (
            <div className="fixed h-screen w-full bg-black bg-opacity-80 left-0 top-0">
               <div className="relative h-full w-4/5 sm:w-3/5 bg-black rounded-r-lg gap-8 transition-transform duration-500 ease-in-out transform border-r border-gray-800 rounded-tr-lg rounded-br-lg">
                  <div className="w-full flex flex-col py-5">
                     <div className="flex flex-col w-full items-start justify-center gap-3 mx-3">
                        <div className="h-20 w-20">
                           <SiWebmoney className="h-full w-full text-cyan-500" />
                        </div>

                        <div className="flex flex-col items-start">
                           <h3 className="text-white text-2xl font-medium">
                              Semako
                           </h3>
                        </div>
                     </div>

                     <div className="absolute top-2 right-2">
                        <button
                           onClick={() => setMobileSideBar(false)}
                           className="btn btn-sm btn-circle white-glassmorpism"
                        >
                           <FaTimes size={20} className="text-slate-200" />
                        </button>
                     </div>
                  </div>
                  <div className="flex h-96 flex-col justify-center overflow-hidden">
                     <div className="flex flex-col items-center flex-1 mx-3 w-full">
                        <div className="flex flex-col items-start gap-6 w-full">
                           {sidebarMenu.map((menu, i) => (
                              <Link
                                 className="w-full"
                                 key={i}
                                 href={`${
                                    menu?.path === "overview"
                                       ? "/dashboard"
                                       : `/dashboard/${menu?.path}`
                                 }`}
                                 onClick={() => {
                                    setActivePath(menu?.path);
                                    setMobileSideBar(false);
                                 }}
                              >
                                 <div
                                    className={`flex items-center gap-[8px] rounded-md w-11/12 pl-8 cursor-pointer ${
                                       menu?.path === activePath &&
                                       "border-[2px] border-gray-600 p-3"
                                    } `}
                                 >
                                    <div
                                       className={`${
                                          menu?.path === activePath
                                             ? "text-gray-200"
                                             : "text-gray-500"
                                       }`}
                                    >
                                       {menu.icon}
                                    </div>
                                    <p
                                       className={`${
                                          menu?.path === activePath
                                             ? "text-gray-200"
                                             : "text-gray-500"
                                       }`}
                                    >
                                       {menu.title}
                                    </p>
                                 </div>
                              </Link>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default MobileSideBar;
