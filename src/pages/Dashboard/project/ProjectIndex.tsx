import {
  Box,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
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

  return (
    <React.Fragment>
      <Box p={2}>
          <DashPageHeader
            title="Project"
            breadcrumb={projectBreadCrumb.index}
          />
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
