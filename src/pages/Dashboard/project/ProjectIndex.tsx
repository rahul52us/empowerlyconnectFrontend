import { Box } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import DashPageHeader from "../../../config/component/common/DashPageHeader/DashPageHeader";
import { projectBreadCrumb } from "../utils/breadcrumb.constant";
import ProjectWidget from "./config/component/ProjectWidget";

const ProjectIndex = observer(() => {
  return (
    <Box>
      <DashPageHeader title="Project" breadcrumb={projectBreadCrumb.index} />
      <ProjectWidget />
    </Box>
  );
});

export default ProjectIndex;