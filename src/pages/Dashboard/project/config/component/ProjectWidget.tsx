import { Box, Heading, SimpleGrid, Flex, Icon } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect, useState, useCallback } from "react";
import {
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaFolderOpen,
} from "react-icons/fa";
import MainPagePagination from "../../../../../config/component/pagination/MainPagePagination";
import { getStatusType } from "../../../../../config/constant/statusCode";
import store from "../../../../../store/store";
import SummaryWidget from "../../component/SummaryWidget/SummaryWidget";
import ProjectCard from "./ProjectCard";
import CustomDrawer from "../../../../../config/component/Drawer/CustomDrawer";
import ProjectDetails from "../../component/ProjectDetails/ProjectDetails";
import NotFoundData from "../../../../../config/component/NotFound/NotFoundData";

const ProjectWidget = observer(() => {
  const {
    Project: { getProjects, projects, projectCount },
    auth: { openNotification },
  } = store;
  const [selectedProject, setSelectedProject] = useState({
    open: false,
    data: null,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProjectDetails = useCallback(
    (page: number) => {
      getProjects({ page, limit: 10 })
        .then(() => {})
        .catch((err) => {
          openNotification({
            title: "Failed to Retrieve Project",
            message: err?.data?.message,
            type: getStatusType(err.status),
          });
        });
    },
    [getProjects, openNotification]
  );

  useEffect(() => {
    fetchProjectDetails(currentPage);
  }, [currentPage, fetchProjectDetails]);

  return (
    <Box px={{ base: 4, md: 6 }} py={6}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={6}>
        <SummaryWidget
          label="Total Projects"
          value={projectCount.data}
          icon={FaProjectDiagram}
          colorScheme="teal"
          description="Total number of projects."
        />
        <SummaryWidget
          label="Total Tasks"
          value={128}
          icon={FaTasks}
          colorScheme="blue"
          description="Total number of tasks across all projects."
        />
        <SummaryWidget
          label="Team Members"
          value={10}
          icon={FaUsers}
          colorScheme="purple"
          description="The number of active team members."
        />
      </SimpleGrid>

      <Heading
        display="flex"
        alignItems="center"
        mb={6}
        fontSize={{ base: "xl", md: "2xl" }}
        color="teal.600"
      >
        <Icon as={FaFolderOpen} boxSize={6} mr={2} />
        Projects
      </Heading>

      {projects.data.length === 0 && projects.loading === false ? (
        <NotFoundData
          onClick={() => {}}
          btnText="CREATE PROJECT"
          title="No projects found"
          subTitle="Start by creating a new project to get started."
        />
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
          {projects.data.map((item: any, index: number) => (
            <ProjectCard
              item={item}
              key={index}
              project_name={item.project_name}
              subtitle={item.subtitle}
              description={item.description}
              logo={item.logo}
              priority={item.priority}
              status={item.status}
              startDate={item.startDate}
              endDate={item.endDate}
              dueDate={item.dueDate}
              approval={item.approval}
              onClick={() => {
                setSelectedProject({ open: true, data: item });
              }}
            />
          ))}
        </SimpleGrid>
      )}

      <Flex justifyContent="center" mt={8}>
        <MainPagePagination
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page.selected)}
          totalPages={projects.totalPages}
        />
      </Flex>

      <CustomDrawer
        open={selectedProject.open}
        close={() => setSelectedProject({ open: false, data: null })}
        title="Project Details"
        width="70vw"
      >
        <Box p={4}>
          <ProjectDetails selectedProject={selectedProject.data} />
        </Box>
      </CustomDrawer>
    </Box>
  );
});

export default ProjectWidget;
