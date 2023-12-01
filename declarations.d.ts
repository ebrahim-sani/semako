export interface Enrollment {
   id: string;
   memberId: string;
   schemeId: string;
   startDate: string;
   endDate: string;
   principal: number;
   status: string;
   interestEarned: number;
   createdAt: string;
   updatedAt: string;
   member: any;
   scheme: any;
}

export interface MemberProps {
   id: string;
   fullName: string;
   email: string;
   address: string;
   phoneNumber: string;
   contactDetails: string;
   currentBalance: number;
   totalEarned: number;
   createdAt: string;
   password: string;
   enrollments: Enrollment[];
   history: History[];
   transactions: Transactions[];
}

export interface Scheme {
   id: string;
   name: string;
   description: string;
   interestRate: number;
   maturityMonths: number;
   isActive: boolean;
   createdAt: string;
   updatedAt: string;

   enrollments: Enrollment[];
}

export interface History {
   id: string;
   title: string;
   description: string;
   date: string;
}

export interface Transactions {
   id: string;
   amount: string;
   reference: string;
   date: string;
   memberId: string;
}

export interface DateFormatOptions {
   month?: "short" | "long";
   day?: "numeric";
   year?: "numeric";
}
