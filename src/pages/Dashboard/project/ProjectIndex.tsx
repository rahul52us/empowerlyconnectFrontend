import {
  Box,
  Button,
  Flex,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { FaPlus } from "react-icons/fa";
import DashPageHeader from "../../../config/component/common/DashPageHeader/DashPageHeader";
import { projectBreadCrumb } from "../utils/breadcrumb.constant";
import ProjectWidget from "./config/component/ProjectWidget";
import store from "../../../store/store";
import CustomDrawer from "../../../config/component/Drawer/CustomDrawer";
import CreateProject from "./component/Form/CreateProject";
import EditProject from "./component/Form/EditProject";
import React from "react";

const ProjectIndex = observer(() => {
  const {
    Project: { setOpenProjectDrawer, openProjectDrawer },
  } = store;
  const showIcon = useBreakpointValue({ base: true, md: false });

  return (
    <React.Fragment>
      <Box>
        <Flex justifyContent="space-between" alignItems="center" mb={5}>
          <DashPageHeader
            title="Project"
            breadcrumb={projectBreadCrumb.index}
          />
          {showIcon ? (
            <IconButton
              title="Create Project"
              onClick={() => setOpenProjectDrawer("create")}
              aria-label="Create Project"
              icon={<FaPlus />}
              colorScheme="teal"
            />
          ) : (
            <Button
              leftIcon={<FaPlus />}
              colorScheme="teal"
              variant="solid"
              size="lg"
              _hover={{ bg: "teal.600" }}
              _active={{ bg: "teal.700" }}
              _focus={{ boxShadow: "outline" }}
              onClick={() => setOpenProjectDrawer("create")}
            >
              CREATE PROJECT
            </Button>
          )}
        </Flex>
        {/* Projects in Widgets */}
        <ProjectWidget />
        {/* OPEN THE PROJECT CREATION DRAWER */}
        <CustomDrawer
          width="90vw"
          title={`${
            openProjectDrawer.type === "edit"
              ? "UPDATE PROJECT"
              : "CREATE NEW PROJECT"
          }`}
          open={openProjectDrawer.open}
          close={() => setOpenProjectDrawer("create")}
        >
          {openProjectDrawer.type === "edit" ? (
            <EditProject />
          ) : (
            <CreateProject />
          )}
        </CustomDrawer>
      </Box>
    </React.Fragment>
  );
});

export default ProjectIndex;
