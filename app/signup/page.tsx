"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
   const [clicked, setClicked] = useState<boolean>(false);
   const [fullName, setFullName] = useState<string>("");
   const [email, setEmail] = useState<string>("");
   const [phoneNumber, setPhoneNumber] = useState<string>("");
   const [confirmPass, setConfirmPass] = useState<string>("");
   const [password, setPassword] = useState<string | number>("");
   const [passwordNotMatch, setPasswordNotMatch] = useState<boolean>(false);
   const [userIsAvailable, setUserIsAvailable] = useState<boolean>(false);

   const signup = async (data: any) => {
      const full_name = data.get("fullName");
      const email_address = data.get("email");
      const phone_number = data.get("phoneNumber");
      const passw = data.get("password");
      const confirmPassw = data.get("confirmPassword");

      try {
         const res = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               full_name,
               email_address,
               passw,
               confirmPassw,
               phone_number,
            }),
         });
         if (res?.status === 405) {
            const data = await res.json();

            if (data === "passwordNotMatch") {
               setPasswordNotMatch(true);
            }

            if (data === "userIsAvailable") {
               setUserIsAvailable(true);
            }
         }

         if (res?.status === 200) {
            toast.success("👌 Success, click Signin!");
            // redirect("/auth/login");
         } else {
            toast.error("😔 Something went wrong!!");
         }
      } catch (err) {
         setClicked(false);
         console.log("Something went wrong!", err);
      }
      setClicked(false);
   };

   return (
      <main className="min-h-screen gradient-bg-services flex flex-col justify-center items-center">
         <div className="container flex items-center flex-col mb-3">
            <div className="flex max-sm:mt-4 w-full items-center">
               <div className="flex w-full items-center justify-center text-lg lg:text-xl font-semibold italic">
                  <Link href="/">
                     <h1 className="bg-no-repeat uppercase font-bold text-2xl italic text-blue-500">
                        LOGO
                     </h1>
                  </Link>
               </div>
               {/* <Image src="/vercel.svg" width={200} height={200} alt="logo" /> */}
            </div>
            <form
               action={signup}
               className="flex items-center mt-8 w-5/6 md:w-[28%] flex-col gap-4 sm:gap-3"
            >
               <div className="flex flex-col items-center gap-2 w-full">
                  <div className="gap-1 w-full mb-2">
                     <label
                        className="text-gray-500 mb-[2px] text-sm"
                        htmlFor=""
                     >
                        Full Name
                     </label>
                     <input
                        className={`text-sm w-full mb-[2px] rounded border bg-transparent px-2 py-3 focus:outline-none ${
                           fullName ? "border-primary" : "border-gray-600"
                        } active:outline-none text-gray-400`}
                        name="fullName"
                        type="text"
                        onChange={(e) => setFullName(e.target.value)}
                     />
                  </div>

                  <div className="gap-1 w-full mb-2">
                     <label
                        className="text-gray-500 mb-[2px] text-sm"
                        htmlFor=""
                     >
                        Email
                     </label>
                     <input
                        className={`text-sm w-full mb-[2px] rounded border bg-transparent px-2 py-3 focus:outline-none ${
                           email && !userIsAvailable
                              ? "border-primary"
                              : userIsAvailable
                              ? "border-red-500"
                              : "border-gray-600"
                        } active:outline-none text-gray-400`}
                        name="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                     />
                     {userIsAvailable && (
                        <p className="text-xs text-red-500 mt-1">
                           Email is used by another user!
                        </p>
                     )}
                  </div>
                  <div className="gap-1 w-full mb-2">
                     <label
                        className="text-gray-500 mb-[2px] text-sm"
                        htmlFor=""
                     >
                        Phone Number
                     </label>
                     <input
                        className={`text-sm w-full mb-[2px] rounded border bg-transparent px-2 py-3 focus:outline-none ${
                           phoneNumber ? "border-primary" : "border-gray-600"
                        } active:outline-none text-gray-400`}
                        name="phoneNumber"
                        type="text"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                     />
                  </div>

                  <div className="gap-1 w-full mb-2">
                     <label
                        className="text-gray-500 mb-[2px] text-sm"
                        htmlFor=""
                     >
                        Password
                     </label>
                     <input
                        className={`text-sm w-full mb-[2px] rounded border bg-transparent px-2 py-3 focus:outline-none ${
                           password && !passwordNotMatch
                              ? "border-primary"
                              : passwordNotMatch
                              ? "border-red-500"
                              : "border-gray-600"
                        } active:outline-none text-gray-400`}
                        name="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </div>

                  <div className="gap-1 w-full mb-2">
                     <label
                        className="text-gray-500 mb-[2px] text-sm"
                        htmlFor=""
                     >
                        Confirm Password
                     </label>
                     <input
                        className={`text-sm w-full mb-[2px] rounded border bg-transparent px-2 py-3 focus:outline-none ${
                           confirmPass && !passwordNotMatch
                              ? "border-primary"
                              : passwordNotMatch
                              ? "border-red-500"
                              : "border-gray-600"
                        } active:outline-none text-gray-400`}
                        name="confirmPassword"
                        type="password"
                        onChange={(e) => setConfirmPass(e.target.value)}
                     />
                     {passwordNotMatch && (
                        <p className="text-xs text-red-500">
                           Password not match!
                        </p>
                     )}
                  </div>
               </div>

               <div className="flex flex-col items-center w-full gap-4">
                  <div className="flex items-center justify-start w-full gap-2">
                     <span className="flex items-center text-xs text-gray-500 gap-2">
                        <p>By click on Sign Up, you agree to the</p>
                        <Link href="">
                           <p className="text-blue-500 text-xs">
                              Terms of Service
                           </p>
                        </Link>
                     </span>
                  </div>

                  <button
                     type="submit"
                     className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:border-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
                     onClick={() => setClicked(true)}
                  >
                     {clicked ? (
                        <span className="loading loading-spinner"></span>
                     ) : (
                        "Sign Up"
                     )}
                  </button>
               </div>
            </form>
            <div className="flex items-center justify-center w-full gap-2 mt-5">
               <span className="text-sm text-gray-500">
                  Already have an account?
               </span>
               <Link href="/auth/signin">
                  <p className="text-blue-500 text-sm font-semibold">Sign In</p>
               </Link>
            </div>
         </div>
      </main>
   );
}
