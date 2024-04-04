import {
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { dashboard } from "../../../../config/constant/routes";

export const cardArrayData = {
  NoOfEmployes: {
    title: "Total No Of Employes",
    value: 0,
    icon: FaExclamationCircle,
    link: dashboard.employes.details,
  },
  NoOfData: {
    title: "Total Number of Resign Employes",
    value: 0,
    icon: FaCheckCircle,
    link: "",
  },
  NoOfGamers: {
    title: "Total Number of Users",
    value: 0,
    icon: FaTimesCircle,
    link: `${dashboard.employes.details}/new/?tab=profile-details`,
  },
};
