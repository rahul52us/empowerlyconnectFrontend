import {
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { dashboard } from "../../../../config/constant/routes";

export const cardArrayData = {
  NoOfUsers: {
    title: "Total No Of Users",
    value: 0,
    icon: FaExclamationCircle,
    link: dashboard.Users.details,
    colorScheme : 'blue'
  },
  NoOfData: {
    title: "Total Number of Resign Users",
    value: 0,
    icon: FaCheckCircle,
    link: "",
    colorScheme : 'teal'

  },
  NoOfGamers: {
    title: "Total Number of Users",
    value: 0,
    icon: FaTimesCircle,
    colorScheme : 'red',
    link: `${dashboard.Users.details}/new/?tab=profile-details`,
  },
};
