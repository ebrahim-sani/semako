"use client";

import { sidebarMenu } from "@/constant/dummy";
import { truncateText } from "@/utils/utilityFunc";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SiWebmoney } from "react-icons/si";

const Sidebar = () => {
   const [activePath, setActivePath] = useState<string>("overview");

   return (
      <div className="hidden lg:flex flex-col w-[22%] h-screen gap-6 border-r border-gray-800 rounded-r-xl">
         <div className="w-full flex flex-col py-5">
            <div className="flex flex-col w-full items-center justify-center gap-3">
               <div className="h-20 w-20">
                  <SiWebmoney className="h-full w-full text-cyan-500" />
               </div>
               <div className="flex flex-col items-center">
                  <h3 className="text-white text-2xl font-medium">Semako</h3>
               </div>
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
   );
};

export default Sidebar;
