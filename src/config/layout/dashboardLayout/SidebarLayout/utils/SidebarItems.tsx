import {
  FaChartPie,
  FaUsers,
  FaHandHoldingUsd,
  FaBuilding,
  FaCog,
} from "react-icons/fa";
import { CalendarIcon } from "@chakra-ui/icons";
import { dashboard } from "../../../../constant/routes";

interface SidebarItem {
  id: number;
  name: string;
  icon: JSX.Element;
  url: string;
  role?: string[];
  children?: SidebarItem[];
}

const sidebarDatas: SidebarItem[] = [
  {
    id: 1,
    name: "Dashboard",
    icon: <FaChartPie />,
    url: "/dashboard",
    role: ["user"],
  },
  {
    id: 2,
    name: "My Profile",
    icon: <FaUsers />,
    url: "/dashboard/class",
    role: ["user"],
    children: [
      {
        id: 3,
        name: "Personal Info",
        icon: <CalendarIcon />,
        url: `${dashboard.profile}?tab=personal-details`,
        role: ["user"],
      },
      {
        id: 4,
        name: "Company",
        icon: <FaBuilding />,
        url: `${dashboard.profile}?tab=company-details`,
        role: ["user"],
      },
      {
        id: 5,
        name: "Family",
        icon: <FaUsers />,
        url: `${dashboard.profile}?tab=family-details`,
        role: ["user"],
      },
      {
        id: 6,
        name: "Work Experience",
        icon: <FaUsers />,
        url: `${dashboard.profile}?tab=work-experience`,
        role: ["user"],
      },
      {
        id: 7,
        name: "Skill & Additional Info",
        icon: <FaUsers />,
        url: `${dashboard.profile}?tab=skill-and-additional-info`,
        role: ["user"],
      },
      {
        id: 8,
        name: "Qualifications",
        icon: <FaUsers />,
        url: `${dashboard.profile}?tab=qualifications`,
        role: ["user"],
      },
      {
        id: 9,
        name: "Documents",
        icon: <FaUsers />,
        url: `${dashboard.profile}?tab=documents`,
        role: ["user"],
      },
      {
        id: 10,
        name: "Bank Account Details",
        icon: <FaUsers />,
        url: `${dashboard.profile}?tab=bank-details`,
        role: ["user"],
      },
    ],
  },
  {
    id: 11,
    name: "Request",
    icon: <FaHandHoldingUsd />,
    url: dashboard.request.index,
    role: ["user"],
    children: [
      {
        id: 12,
        name: "Request",
        icon: <FaHandHoldingUsd />,
        url: dashboard.request.index,
        role: ["user"],
      },
      {
        id: 13,
        name: "Leave/OD/WFH",
        icon: <FaHandHoldingUsd />,
        url: dashboard.request.leaveAdd,
        role: ["user"],
      },
      {
        id: 14,
        name: "Attendance Regularize",
        icon: <FaHandHoldingUsd />,
        url: "/dashboard/videos",
        role: ["user"],
      },
      {
        id: 15,
        name: "Appreciation",
        icon: <FaHandHoldingUsd />,
        url: "/dashboard/videos",
        role: ["user"],
      },
      {
        id: 16,
        name: "Help Desk",
        icon: <FaHandHoldingUsd />,
        url: "/dashboard/videos",
        role: ["user"],
      },
    ],
  },
  {
    id: 17,
    name: "My Attendance",
    icon: <FaUsers />,
    url: `${dashboard.attendence.index}?tab=daily`,
    role: ["user"],
    children: [
      {
        id: 18,
        name: "Daily",
        icon: <CalendarIcon />,
        url: `${dashboard.attendence.index}?tab=daily`,
        role: ["user"],
      },
      {
        id: 19,
        name: "Monthly",
        icon: <CalendarIcon />,
        url: `${dashboard.attendence.index}?tab=monthly`,
        role: ["user"],
      },
      {
        id: 20,
        name: "Yearly",
        icon: <CalendarIcon />,
        url: `${dashboard.attendence.index}?tab=yearly`,
        role: ["user"],
      },
      {
        id: 21,
        name: "Leave Encashment",
        icon: <CalendarIcon />,
        url: `${dashboard.attendence.index}?tab=leave-ledger`,
        role: ["user"],
      },
    ],
  },
  {
    id: 22,
    name: "Team Request",
    icon: <FaUsers />,
    url: `${dashboard.request.userList}`,
    role: ["manager"],
    children: [
      {
        id: 99,
        name: "Team Request",
        icon: <FaUsers />,
        url: `${dashboard.request.userList}`,
        role: ["manager"],
      },
    ],
  },
  {
    id: 27,
    name: "Team Attendance",
    icon: <FaUsers />,
    url: dashboard.attendence.userList,
    role: ["manager"],
    children: [
      {
        id: 98,
        name: "Team Attendance",
        icon: <FaUsers />,
        url: dashboard.attendence.userList,
        role: ["manager"],
      },
    ],
  },
  {
    id: 28,
    name: "Corp. Info.",
    icon: <FaBuilding />,
    url: "/dashboard/class",
    role: ["admin", "superadmin"],
    children: [
      {
        id: 29,
        name: "Users Directory",
        icon: <FaUsers />,
        url: "/dashboard/Users",
        role: ["admin", "superadmin"],
      },
      {
        id: 30,
        name: "Holidays",
        icon: <CalendarIcon />,
        url: "/dashboard/company/policy/holidays",
        role: ["admin", "superadmin"],
      },
      {
        id: 31,
        name: "View Policies",
        icon: <CalendarIcon />,
        url: "/dashboard/company",
        role: ["admin", "superadmin"],
      },
    ],
  },
  {
    id: 32,
    name: "Corp. Users Directory",
    icon: <FaBuilding />,
    url: dashboard.Users.personalDetails,
    role: ["user", "manager", "admin", "superadmin"],
    children: [
      {
        id: 33,
        name: "User Directory",
        icon: <FaUsers />,
        url: dashboard.Users.personalDetails,
        role: ["user"],
      },
    ],
  },
  {
    id: 50,
    name: "Project",
    icon: <FaBuilding />,
    url: dashboard.application.project,
    role: ["manager", "admin", "superadmin",'user'],
    children: [
      {
        id: 51,
        name: "Project",
        icon: <FaUsers />,
        url: dashboard.application.project,
        role: ["user"],
      },
    ],
  },
  // liberay
  {
    id: 80,
    name: "Liberary",
    icon: <FaBuilding />,
    url: dashboard.liberary.books.index,
    role: ["admin", "superadmin","user","manager"],
    children: [
      {
        id: 81,
        name: "Book Management",
        icon: <FaUsers />,
        url: dashboard.liberary.books.index,
        role: ["admin", "superadmin","user","manager"],
        children: [
          {
            id: 82,
            name: "Books",
            icon: <FaUsers />,
            url: dashboard.liberary.books.index,
            role: ["admin", "superadmin","user","manager"],
          },
          {
            id: 83,
            name: "Category",
            icon: <FaUsers />,
            url: dashboard.liberary.books.category.index,
            role: ["admin", "superadmin","user","manager"],
          },
          {
            id: 84,
            name: "Users",
            icon: <FaUsers />,
            url: dashboard.liberary.books.users,
            role: ["admin", "superadmin"],
          },
        ],
      },
      {
        id: 85,
        name: "Seat Management",
        icon: <FaUsers />,
        url: dashboard.liberary.room.index,
        role: ["admin", "superadmin"],
        children: [
          {
            id: 86,
            name: "Room",
            icon: <FaUsers />,
            url: dashboard.liberary.room.index,
            role: ["admin", "superadmin"],
          },
          {
            id: 87,
            name: "Users",
            icon: <FaUsers />,
            url: dashboard.liberary.room.users,
            role: ["admin", "superadmin"],
          },
        ],
      },
    ],
  },
  // Trip
  {
    id: 90,
    name: "Trips",
    icon: <FaBuilding />,
    url: dashboard.tripManagement.index,
    role: ["admin", "superadmin","user","manager"],
    children: [
      {
        id: 91,
        name: "Trip",
        icon: <FaUsers />,
        url: dashboard.tripManagement.index,
        role: ["admin", "superadmin","user","manager"],
      },
      {
        id: 92,
        name: "Users",
        icon: <FaUsers />,
        url: dashboard.tripManagement.users,
        role: ["admin", "superadmin"],
      },
    ],
  },
];

export const sidebarFooterData: SidebarItem[] = [
  {
    id: 34,
    name: "Settings",
    icon: <FaCog />,
    url: "/profile",
    role: ["user", "admin", "superadmin", "manager"],
  },
];

const getSidebarDataByRole = (role: string[] = ["user"]): SidebarItem[] => {
  const filterByRole = (items: SidebarItem[]): SidebarItem[] => {
    return items
      .filter((item) => !item.role || item.role.some((r) => role.includes(r)))
      .map((item) => ({
        ...item,
        children: item.children ? filterByRole(item.children) : undefined,
      }));
  };
  return filterByRole(sidebarDatas);
};

// Example usage
const userRole = ["user"]; // Example role
const sidebarData = getSidebarDataByRole(userRole);

export { sidebarData, getSidebarDataByRole };