"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

async function signin(data: any) {
   const email_address = data.get("email");
   const password = data.get("password");

   try {
      const res = await signIn("credentials", {
         email_address,
         password,
         redirect: true,
         callbackUrl: "/dashboard",
      });
      if (res?.ok) {
         toast.success("👌 Login successful");
      }
   } catch (err) {
      console.log("Something went wrong!", err);
   }
}

const Login = () => {
   const [clicked, setClicked] = useState<boolean>(false);
   const [email, setEmail] = useState<string | null>("");
   const [password, setPassword] = useState<string | number>("");

   return (
      <main className="h-screen flex flex-col justify-center items-center">
         <div className="border border-gray-600 rounded-lg w-80 py-8 flex items-center flex-col mb-3 shadow-lg">
            <Link href="/">
               <h1 className="bg-no-repeat uppercase font-bold text-2xl italic text-blue-500">
                  LOGO
               </h1>
            </Link>
            <form action={signin} className="mt-8 w-64 flex flex-col">
               <label className="text-sm text-gray-400 py-2" htmlFor="email">
                  Email
               </label>
               <input
                  className={`text-sm w-full mb-2 rounded border bg-transparent px-2 py-3 focus:outline-none ${
                     email ? "border-primary" : "border-gray-600"
                  } active:outline-none text-gray-400`}
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
               />

               <label className="text-sm text-gray-400 py-2" htmlFor="password">
                  Password
               </label>
               <input
                  className={`text-sm w-full mb-2 rounded border bg-transparent px-2 py-3 focus:outline-none ${
                     password ? "border-primary" : "border-gray-600"
                  } active:outline-none text-gray-400`}
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
               />
               <button
                  type="submit"
                  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:border-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
                  onClick={() => setClicked(true)}
               >
                  {clicked ? (
                     <span className="loading loading-spinner"></span>
                  ) : (
                     "Login"
                  )}
               </button>
            </form>
            <div className="flex justify-evenly space-x-2 w-64 mt-4">
               <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
               <span className="flex-none uppercase text-xs text-gray-400 font-semibold">
                  or
               </span>
               <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
            </div>

            <p className="text-xs text-blue-900 mt-4 cursor-pointer -mb-4">
               Forgot password?
            </p>
         </div>

         <div className="border border-gray-600 rounded-lg text-center w-80 py-4 shadow-md">
            <div className="flex items-center justify-center w-full gap-2">
               <span className="text-sm text-gray-400">
                  Don&apos;t have an account?
               </span>
               <Link href="/signup">
                  <p className="text-blue-500 text-sm font-semibold">Sign Up</p>
               </Link>
            </div>
         </div>
      </main>
   );
};

export default Login;
