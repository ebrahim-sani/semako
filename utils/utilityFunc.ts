import { DateFormatOptions } from "@/declarations";
// @ts-ignore
import numeral from "numeral";

export const modifiedEmail = (email: string | null | undefined) => {
   let email_address;
   if (email !== null && email !== undefined) {
      email_address = email.replace(/^(\w{3})\w*(\w{3})@/, "$1xxx$2@");
   }

   return email_address;
};

export const truncateText = (text: string, maxLength: number) => {
   if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
   }
   return text;
};

export const modifiedDate = (dateTime: any) => {
   const date = new Date(dateTime);
   const options: DateFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
   };
   const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
   return formattedDate;
};

export const transformMoney = (value: any, opt?: boolean) => {
   let formattedNumber;
   if (value > 9999 && value < 99999) {
      formattedNumber = numeral(value).format("0.[0]a");
   }
   if (value > 99999 && value < 999999) {
      formattedNumber = numeral(value).format("0.[00]a");
   }
   if (value < 10000) {
      formattedNumber = value.toLocaleString("en-US");
   }
   if (value && opt === true) {
      formattedNumber = numeral(value).format("0.[0]a");
   }
   return formattedNumber;
};
