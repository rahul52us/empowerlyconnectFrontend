import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import SidebarLogo from "./component/SidebarLogo";
import SidebarElement from "./element/SidebarElement";
import { observer } from "mobx-react-lite";
import store from "../../../../store/store";
import { dashboard } from "../../../constant/routes";

const generateMenuItems = (userRole : string) => {
  const commonMenuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "My Profile",
      path: "/dashboard/class",
      submenus: [
        {
          label: "Personal Info",
          path: "/dashboard/class",
        },
        {
          label: "Company",
          path: "/dashboard/videos",
        },
        {
          label: "Family",
          path: "/dashboard/videos",
        },
        {
          label: "Work Experience",
          path: "/dashboard/videos",
        },
        {
          label: "Skill & Additional Info",
          path: "/dashboard/videos",
        },
        {
          label: "Qualification",
          path: "/dashboard/videos",
        },
        {
          label: "Documents",
          path: "/dashboard/videos",
        },
        {
          label: "Bank Account Details",
          path: "/dashboard/videos",
        },
      ],
    },
    {
      label: "Request",
      path: dashboard.request.index,
      submenus: [
        {
          label: "Request",
          path: dashboard.request.index,
        },
        {
          label: "Leave/OD/WFH",
          path: dashboard.request.leaveAdd,
        },
        {
          label: "Attendence Regularise",
          path: "/dashboard/videos",
        },
        {
          label: "Appreciation",
          path: "/dashboard/videos",
        },
        {
          label: "Help Desk",
          path: "/dashboard/videos",
        },
      ],
    },
    {
      label: "My Attendence",
      path: "/dashboard/class",
      submenus: [
        {
          label: "Daily",
          path: "/dashboard/videos",
        },
        {
          label: "Monthly",
          path: "/dashboard/videos",
        },
        {
          label: "Yearly",
          path: "/dashboard/class",
        },
        {
          label: "Leave Encashment",
          path: "/dashboard/videos",
        },
      ],
    }
  ];

  if (userRole === 'manager') {
    const managerMenuItems = [
      {
        label: "Team Attendence",
        path: "/dashboard/class",
        submenus: [
          {
            label: "Daily",
            path: "/dashboard/videos",
          },
          {
            label: "Monthly",
            path: "/dashboard/videos",
          },
          {
            label: "Yearly",
            path: "/dashboard/class",
          },
          {
            label: "Leave Encashment",
            path: "/dashboard/videos",
          },
        ],
      },
      {
        label: "Team Request",
        path: dashboard.request.index
      }
    ];

    // Insert manager-specific menu items at desired positions
    commonMenuItems.splice(3, 0, managerMenuItems[0]);
    commonMenuItems.splice(4, 0, managerMenuItems[1]);
  }

  if (userRole === "admin" || userRole === "superadmin") {
    commonMenuItems.push({
      label: "Corp. Info.",
      path: "/dashboard/class",
      submenus: [
        {
          label: "Employees Directory",
          path: "/dashboard/employes",
        },
        {
          label: "Holidays",
          path: "/dashboard/company/policy/holidays",
        },
        {
          label: "View Policies",
          path: "/dashboard/company",
        },
        {
          label: "Work Timing",
          path: "/dashboard/company",
        },
      ],
    })
  }

  return commonMenuItems;
};

const SidebarLayout = observer(() => {
  const { auth: { user } } = store;
  const menuItems = generateMenuItems(user.role);

  return (
    <Flex direction="column" h="100%" bg="#042954">
      <SidebarLogo />
      <VStack spacing={4} align="stretch" flex="1">
        {menuItems.map((menuItem, index) => (
          <SidebarElement items={menuItem} key={index} />
        ))}
      </VStack>
      <VStack spacing={4} align="stretch" mb={2}>
        <SidebarElement items={{
          label: "Settings",
          path: "/dashboard",
        }} />
      </VStack>
    </Flex>
  );
});

const SidebarMainLayout = observer(() => {
  const {
    layout: { MobileSidebar, MobileSidebarFun },
  } = store;
  const [isLargerThan1020] = useMediaQuery("(min-width: 1020px)");

  return isLargerThan1020 ? (
    <SidebarLayout />
  ) : (
    <Drawer
      isOpen={MobileSidebar}
      onClose={() => {
        MobileSidebarFun(false);
      }}
    >
      <DrawerContent p={0} m={0}>
        <DrawerBody p={0} m={0}>
          <SidebarLayout />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
});

export default SidebarMainLayout;
