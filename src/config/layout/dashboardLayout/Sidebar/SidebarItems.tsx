import { CalendarIcon, ChatIcon, EmailIcon } from "@chakra-ui/icons";
import {
  FaBuilding,
  FaChartPie,
  FaCog,
  FaHandHoldingUsd,
  FaUsers,
} from "react-icons/fa";
import { SidebarItem } from "./Sidebar1";

export const sidebarData: SidebarItem[] = [
  {
    id: 1,
    name: "Dashboards",
    icon: <FaChartPie />,
    url: "#",
  },
  {
    id: 2,
    name: "Apps",
    icon: <FaUsers />,
    // url: "#",
    children: [
      { id: 3, name: "Calendar", icon: <CalendarIcon />, url: "#" },
      {
        id: 4,
        name: "Chat",
        icon: <ChatIcon />,
        // url: "#",
        children: [
          { id: 5, name: "Inbox", icon: <CalendarIcon />, url: "#" },
          {
            id: 6,
            name: "Sent",
            icon: <ChatIcon />,
            // url: "#",
            children: [
              {
                id: 7,
                name: "Chat",
                icon: <ChatIcon />,
                url: "#",
              },
              { id: 12, name: "Inbox", icon: <CalendarIcon />, url: "#" },
              { id: 13, name: "Sent", icon: <ChatIcon />, url: "#" },
            ],
          },
        ],
      },
      {
        id: 14,
        name: "Email",
        icon: <EmailIcon />,
        // url: "#",
        children: [
          { id: 15, name: "Inbox", icon: <CalendarIcon />, url: "#" },
          {
            id: 16,
            name: "Sent",
            icon: <ChatIcon />,
            // url: "#",
            children: [
              { id: 17, name: "Inbox", icon: <CalendarIcon />, url: "#" },
              { id: 18, name: "Sent", icon: <ChatIcon />, url: "#" },
            ],
          },
        ],
      },
      { id: 19, name: "Ecommerce", icon: <FaHandHoldingUsd />, url: "#" },
    ],
  },
  {
    id: 20,
    name: "CRM",
    icon: <FaBuilding />,
    // url: "#",
    children: [
      { id: 21, name: "Contacts", icon: <FaUsers />, url: "#" },
      { id: 22, name: "Companies", icon: <FaBuilding />, url: "#" },
      { id: 23, name: "Deals", icon: <FaHandHoldingUsd />, url: "#" },
    ],
  },
];

export const sidebarFooterData: SidebarItem[] = [
  {
    id: 24,
    name: "Settings",
    icon: <FaCog />,
    url: "#",
  },
  // {
  //   id: 25,
  //   name: "Logout",
  //   icon: <FaSignOutAlt />,
  //   url: "#",
  // },
  // {
  //   id: 26,
  //   name: "Logout",
  //   icon: <FaSignOutAlt />,
  //   url: "#",
  // },
];
