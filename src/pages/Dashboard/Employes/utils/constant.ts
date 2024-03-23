import { FaCheckCircle, FaExclamationCircle , FaTimesCircle} from "react-icons/fa";
import { dashboard } from "../../../../config/constant/routes";

export const cardDataArray = [
    {
      key: "Total Number of Employes",
      value: "6",
      icon:FaExclamationCircle,
      link : dashboard.employes.details
    },
    {
      key: "Total Number of Resign Employes",
      value: "4",
      icon:FaCheckCircle

    },
    {
      key: "Total Number of Users",
      value: "4",
      icon:FaTimesCircle
    },
  ];
