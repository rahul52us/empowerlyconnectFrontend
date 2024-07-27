import { Box, SimpleGrid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import ProjectCard from "./ProjectCard";
import store from "../../../../../store/store";
import { useEffect } from "react";
import { getStatusType } from "../../../../../config/constant/statusCode";
import MainPagePagination from "../../../../../config/component/pagination/MainPagePagination";

const ProjectWidget = observer(() => {
  const {
    Project: { getProjects, projects },
    auth: { openNotification },
  } = store;

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
      <SimpleGrid columns={{ base: 1, md: 2, xl : 3 }} spacing={2}>
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
    </Box>
  );
});

export default ProjectWidget;
