import { useState } from "react";
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

const SidebarLayout = () => {
  const [menuItems] = useState<any>([
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
    },
    {
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
    }
  ]);

  return (
    <Flex direction="column" h="100%" bg="#042954">
      <SidebarLogo />
      <VStack spacing={4} align="stretch" flex="1">
        {menuItems.map((menuItem: any, index: any) => (
          <SidebarElement items={menuItem} key={index} />
        ))}
      </VStack>
      <VStack spacing={4} align="stretch" mb={2}>
      <SidebarElement items={{
      label: "Settings",
      path: "/dashboard",
    }}/>
      </VStack>
    </Flex>
  );
};

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