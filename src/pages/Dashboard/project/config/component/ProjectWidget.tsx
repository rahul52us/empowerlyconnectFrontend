import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { FaProjectDiagram, FaTasks, FaUsers } from "react-icons/fa";
import MainPagePagination from "../../../../../config/component/pagination/MainPagePagination";
import { getStatusType } from "../../../../../config/constant/statusCode";
import store from "../../../../../store/store";
import SummaryWidget from "../../component/SummaryWidget/SummaryWidget";
import ProjectCard from "./ProjectCard";
import CustomDrawer from "../../../../../config/component/Drawer/CustomDrawer";
import ProjectDetails from "../../component/ProjectDetails/ProjectDetails";
import ProjectCard2 from "../../component/ProjectCard/ProjectCard2";

const dummyProjects = [
  {
    title: 'Project Alpha',
    // description: 'A project to develop a new feature for our application.',
    manager: 'John Doe',
    deadline: '2024-08-15',
    status: 'In Progress',
    team: ['Alice', 'Bob', 'Charlie'],
    progress: 50,
  },
  {
    title: 'Project Beta',
    // description: 'A project to improve the performance of our system.',
    manager: 'Jane Smith',
    deadline: '2024-09-01',
    status: 'Completed',
    team: ['David', 'Eve', 'Frank'],
    progress: 100,
  },
  // Add more dummy projects as needed
];

const ProjectWidget = observer(() => {
  const {
    Project: { getProjects, projects, projectCount },
    auth: { openNotification },
  } = store;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getProjects({ page: 1, limit: 10 })
      .then(() => {})
      .catch((err) => {
        openNotification({
          title: "Failed to Retrived Project",
          message: err?.data?.message,
          type: getStatusType(err.status),
        });
      });
  }, [openNotification, getProjects]);

  return (
    <Box>
      <SimpleGrid columns={[1, null, 3]} spacing={6}>
        <SummaryWidget
          label="Total Projects"
          value={projectCount.data}
          icon={FaProjectDiagram}
          colorScheme="teal"
          description="Total number of projects."
          change={5}
        />
        <SummaryWidget
          label="Total Tasks"
          value={128}
          icon={FaTasks}
          colorScheme="blue"
          description="Total number of tasks across all projects."
          change={-3}
        />
        <SummaryWidget
          label="Team Members"
          value={10}
          icon={FaUsers}
          colorScheme="purple"
          description="The number of active team members."
        />
      </SimpleGrid>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
          {dummyProjects.map((project, index) => (
            <ProjectCard2
              key={index}
              title={project.title}
              // description={project.description}
              manager={project.manager}
              deadline={project.deadline}
              status={project.status}
              team={project.team}
              progress={project.progress}
            />
          ))}
        </SimpleGrid>

      <Button onClick={() => setIsOpen(true)}>open drawer</Button>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={2}>
        {projects.data.map((item: any, index: number) => {
          return (
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
              onClick={() => {}}
            />
          );
        })}
      </SimpleGrid>
      <Box mt={20}>
        <MainPagePagination
          currentPage={1}
          onPageChange={() => {}}
          totalPages={projects.totalPages}
        />
      </Box>
      <CustomDrawer
        open={isOpen}
        close={() => setIsOpen(false)}
        title="Project Details"
        // headerTextColor="black"
        width="70vw"
        // headerBgColor="white"
      >
        <Box>
          <ProjectDetails />
        </Box>
      </CustomDrawer>
    </Box>
  );
});

export default ProjectWidget;
