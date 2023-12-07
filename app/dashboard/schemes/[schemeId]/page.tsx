import { NormalHeader, SchemeInfo } from "@/app/components";
import { authOptions } from "@/lib/auth";
import { MemberProps, Scheme } from "@/declarations";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { BsArrowLeftShort } from "react-icons/bs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Page({
   params,
}: {
   params: { schemeId: string };
}) {
   const session: MemberProps | null = await getServerSession(authOptions);
   // @ts-ignore
   const member = session?.user;

   const scheme = await prisma.scheme.findUnique({
      where: { id: params.schemeId },
   });

   // console.log(scheme);

   // console.log(params.schemeId);

   return (
      <div className="flex min-h-screen flex-col items-start w-full px-2">
         <NormalHeader
            user_fullName={member?.fullName}
            headerTitle="Details"
            backUrl="schemes"
         />
         <div className="flex flex-col items-start w-full gap-4">
            <div className="lg:hidden flex items-start justify-between mx-3 mt-3 w-[55%]">
               <Link href="/dashboard/schemes">
                  <div className="py-1 px-3 rounded-md border border-gray-500">
                     <BsArrowLeftShort className="text-gray-500" size={22} />
                  </div>
               </Link>

               <h3 className="text-lg font-semibold text-white">Details</h3>
            </div>
            <SchemeInfo scheme={scheme} currBalance={member?.currentBalance} />
         </div>
      </div>
   );
}
