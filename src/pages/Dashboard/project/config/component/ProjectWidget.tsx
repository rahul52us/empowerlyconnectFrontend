import { Box, SimpleGrid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import ProjectCard from "./ProjectCard";
import store from "../../../../../store/store";
import { useEffect } from "react";
import { getStatusType } from "../../../../../config/constant/statusCode";
import { toJS } from "mobx";
import Pagination from "../../../../../config/component/pagination/Pagination";

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

  console.log("the projects are", toJS(projects));

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={2}>
        {projects.data.map((item: any, index: number) => {
          return (
            <ProjectCard
              key={index}
              project_name={item.project_name}
              subtitle={item.subtitle}
              description={item.description}
              logo={{ name: "Alpha", url: "https://via.placeholder.com/150" }}
              priority={item.priority}
              status={item.status}
              startDate={item.startDate}
              endDate={item.endDate}
              dueDate={item.dueDate}
              approval={item.approval}
            />
          );
        })}
      </SimpleGrid>
      <Box mt={20}>
      <Pagination
        currentPage={1}
        onPageChange={() => {}}
        totalPages={projects.totalPages}
      />
      </Box>
    </Box>
  );
});

export default ProjectWidget;
