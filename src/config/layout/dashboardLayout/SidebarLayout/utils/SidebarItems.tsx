import {
  FaChartPie,
  FaUsers,
  FaHandHoldingUsd,
  FaBuilding,
  FaCog,
} from "react-icons/fa";
import { CalendarIcon } from "@chakra-ui/icons";
import { dashboard } from "../../../../constant/routes";

export const sidebarData: any = [
  {
    id: 1,
    name: "Dashboard",
    icon: <FaChartPie />,
    url: "/dashboard",
  },
  {
    id: 2,
    name: "My Profile",
    icon: <FaUsers />,
    url: "/dashboard/class",
    children: [
      {
        id: 3,
        name: "Personal Info",
        icon: <CalendarIcon />,
        url: "/dashboard/class",
      },
      {
        id: 4,
        name: "Company",
        icon: <FaBuilding />,
        url: "/dashboard/videos",
      },
      { id: 5, name: "Family", icon: <FaUsers />, url: "/dashboard/videos" },
      {
        id: 6,
        name: "Work Experience",
        icon: <FaUsers />,
        url: "/dashboard/videos",
      },
      {
        id: 7,
        name: "Skill & Additional Info",
        icon: <FaUsers />,
        url: "/dashboard/videos",
      },
      {
        id: 8,
        name: "Qualification",
        icon: <FaUsers />,
        url: "/dashboard/videos",
      },
      { id: 9, name: "Documents", icon: <FaUsers />, url: "/dashboard/videos" },
      {
        id: 10,
        name: "Bank Account Details",
        icon: <FaUsers />,
        url: "/dashboard/videos",
      },
    ],
  },
  {
    id: 11,
    name: "Request",
    icon: <FaHandHoldingUsd />,
    url: dashboard.request.index,
    children: [
      {
        id: 12,
        name: "Request",
        icon: <FaHandHoldingUsd />,
        url: dashboard.request.index,
      },
      {
        id: 13,
        name: "Leave/OD/WFH",
        icon: <FaHandHoldingUsd />,
        url: dashboard.request.leaveAdd,
      },
      {
        id: 14,
        name: "Attendence Regularise",
        icon: <FaHandHoldingUsd />,
        url: "/dashboard/videos",
      },
      {
        id: 15,
        name: "Appreciation",
        icon: <FaHandHoldingUsd />,
        url: "/dashboard/videos",
      },
      {
        id: 16,
        name: "Help Desk",
        icon: <FaHandHoldingUsd />,
        url: "/dashboard/videos",
      },
    ],
  },
  {
    id: 17,
    name: "My Attendence",
    icon: <FaUsers />,
    url: `${dashboard.attendence.index}?tab=daily`,
    children: [
      {
        id: 18,
        name: "Daily",
        icon: <CalendarIcon />,
        url: `${dashboard.attendence.index}?tab=daily`,
      },
      {
        id: 19,
        name: "Monthly",
        icon: <CalendarIcon />,
        url: `${dashboard.attendence.index}?tab=monthly`,
      },
      {
        id: 20,
        name: "Yearly",
        icon: <CalendarIcon />,
        url: `${dashboard.attendence.index}?tab=yearly`,
      },
      {
        id: 21,
        name: "Leave Encashment",
        icon: <CalendarIcon />,
        url: `${dashboard.attendence.index}?tab=leave-ledger`,
      },
    ],
  },
  {
    id: 22,
    name: "Team Request",
    icon: <FaUsers />,
    url: `${dashboard.request.userList}`,
    role: "manager",
  },
  {
    id: 27,
    name: "Team Attendence",
    icon: <FaUsers />,
    url: dashboard.attendence.userList,
    role: "manager",
  },
  {
    id: 28,
    name: "Corp. Info.",
    icon: <FaBuilding />,
    url: "/dashboard/class",
    children: [
      {
        id: 29,
        name: "Employees Directory",
        icon: <FaUsers />,
        url: "/dashboard/employes",
      },
      {
        id: 30,
        name: "Holidays",
        icon: <CalendarIcon />,
        url: "/dashboard/company/policy/holidays",
      },
      {
        id: 31,
        name: "View Policies",
        icon: <CalendarIcon />,
        url: "/dashboard/company",
      },
    ],
    role: ["admin", "superadmin"],
  },
  {
    id: 32,
    name: "Corp. Info.",
    icon: <FaBuilding />,
    url: "/dashboard/class",
    children: [
      {
        id: 33,
        name: "Employees Directory",
        icon: <FaUsers />,
        url: dashboard.employes.personalDetails,
      },
    ],
    role: ["user"],
  },
];

export const sidebarFooterData: any = [
  {
    id: 34,
    name: "Settings",
    icon: <FaCog />,
    url: "/profile",
  },
];
