import { authOptions } from "@/lib/auth";
import {
   Header,
   OverallCard,
   PaymentModal,
   Schemecard,
   Transactions,
} from "../components";
import { getServerSession } from "next-auth";
import { MemberProps } from "@/declarations";

export default async function Page() {
   const session: MemberProps | null = await getServerSession(authOptions);
   // @ts-ignore
   const member = session?.user;

   return (
      <main className="min-h-screen flex w-full overflow-x-hidden">
         <div className="h-screen overflow-scroll hide-scrollbar lg:overflow-auto w-full">
            <div className="flex flex-col h-full w-full">
               <Header user_name={member?.fullName} />
               <div className="flex flex-col w-full 2xl:max-w-7xl justify-center items-center">
                  <OverallCard />
                  <PaymentModal />
                  <div className="flex flex-1 max-[600px]:flex-col items-start w-full mt-5 px-3 lg:px-6 gap-4 h-full">
                     <Schemecard />
                     <Transactions />
                  </div>
               </div>
            </div>
         </div>
      </main>
   );
}
