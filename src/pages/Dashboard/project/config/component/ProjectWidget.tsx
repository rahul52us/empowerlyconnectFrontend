import { Box, SimpleGrid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import ProjectCard from "./ProjectCard";

const ProjectWidget = observer(() => {
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={2}>
        <ProjectCard
          project_name="Project Alpha"
          subtitle="An important project"
          description="This is a description of Project Alpha."
          logo={{ name: "Alpha", url: "https://via.placeholder.com/150" }}
          priority="High"
          status="In Progress"
          startDate={new Date("2024-07-01")}
          endDate={new Date("2024-07-31")}
          dueDate={new Date("2024-07-15")}
          approval="Satisfactory"
        />
        <ProjectCard
          project_name="Project Alpha"
          subtitle="An important project"
          description="This is a description of Project Alpha."
          logo={{ name: "Alpha", url: "https://via.placeholder.com/150" }}
          priority="High"
          status="In Progress"
          startDate={new Date("2024-07-01")}
          endDate={new Date("2024-07-31")}
          dueDate={new Date("2024-07-15")}
          approval="Satisfactory"
        />
        <ProjectCard
          project_name="Project Beta"
          logo={{ name: "Alpha", url: "https://via.placeholder.com/300" }}
          subtitle="Another important project"
          description="This is a description of Project Beta."
          priority="Medium"
          status="Todo"
          startDate={new Date("2024-08-01")}
          endDate={new Date("2024-08-31")}
          dueDate={new Date("2024-08-15")}
        />
      </SimpleGrid>
    </Box>
  );
});

export default ProjectWidget;
