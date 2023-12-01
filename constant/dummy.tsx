import { BiSolidDashboard } from "react-icons/bi";
import { MdSupportAgent } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { TbKeyframesFilled } from "react-icons/tb";
import { GiPayMoney } from "react-icons/gi";
import { GrHistory } from "react-icons/gr";

export const sidebarMenu = [
   {
      title: "Overview",
      icon: <BiSolidDashboard size={24} />,
      path: "overview",
   },
   {
      title: "Schemes",
      icon: <TbKeyframesFilled size={24} />,
      path: "schemes",
   },
   {
      title: "Transactions",
      icon: <GiPayMoney size={22} />,
      path: "transactions",
   },
   {
      title: "History",
      icon: <GrHistory size={24} />,
      path: "history",
   },
   {
      title: "Settings",
      icon: <FiSettings size={24} />,
      path: "settings",
   },
   {
      title: "Support",
      icon: <MdSupportAgent size={24} />,
      path: "support",
   },
];
