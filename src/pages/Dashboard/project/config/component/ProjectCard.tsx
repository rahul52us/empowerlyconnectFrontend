import React from "react";
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Badge,
  Stack,
  Divider,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import store from "../../../../../store/store";

interface CardProps {
  project_name: string;
  subtitle?: string;
  description?: string;
  logo?: {
    name?: string;
    url?: string;
    type?: string;
  };
  priority: "Low" | "Medium" | "High";
  status: "BackLog" | "Todo" | "InProgress" | "Done" | "Completed";
  startDate?: Date;
  endDate?: Date;
  dueDate?: Date;
  approval?: "Satisfactory" | "Unsatisfactory";
  onClick?: any;
  item?: any;
}

const ProjectCard: React.FC<CardProps> = ({
  item,
  project_name,
  subtitle,
  description,
  logo,
  priority,
  status,
  startDate,
  endDate,
  dueDate,
  approval,
}) => {
  const {
    Project: { setOpenProjectDrawer },
  } = store;
  const bgColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue("lg", "dark-lg");

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      boxShadow={boxShadow}
      bg={bgColor}
      _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
      transition="all 0.3s ease-in-out"
    >
      <Flex align="center" mb={4}>
        <Avatar
          size="xl"
          src={logo?.url || "https://via.placeholder.com/150"}
          name={logo?.name}
          mr={4}
        />
        <Box
          cursor="pointer"
          onClick={() => setOpenProjectDrawer("edit", { ...item, id: item.id })}
        >
          <Heading fontSize="2xl" fontWeight="bold">
            {project_name}
          </Heading>
          {subtitle && (
            <Text fontSize="md" color="gray.600">
              {subtitle}
            </Text>
          )}
        </Box>
      </Flex>
      <Divider mb={4} />
      <Box mb={4}>
        <Text fontSize="md" color="gray.800" minH={45}>
          {description?.substring(0, 110)}
        </Text>
      </Box>
      <Stack direction="row" spacing={4} mb={4}>
        <Badge
          colorScheme={
            priority === "High"
              ? "red"
              : priority === "Medium"
              ? "yellow"
              : "green"
          }
        >
          {priority}
        </Badge>
        <Badge
          colorScheme={
            status === "InProgress"
              ? "blue"
              : status === "Done" || status === "Completed"
              ? "green"
              : "gray"
          }
        >
          {status}
        </Badge>
        {approval && (
          <Badge colorScheme={approval === "Satisfactory" ? "green" : "red"}>
            {approval}
          </Badge>
        )}
      </Stack>
      <Divider mb={4} />
      <VStack align="start" spacing={2}>
        {startDate && (
          <Text fontSize="sm" color="gray.600">
            Start Date: {new Date(startDate).toLocaleDateString()}
          </Text>
        )}
        {endDate && (
          <Text fontSize="sm" color="gray.600">
            End Date: {new Date(endDate).toLocaleDateString()}
          </Text>
        )}
        {dueDate && (
          <Text fontSize="sm" color="gray.600">
            Due Date: {new Date(dueDate).toLocaleDateString()}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default ProjectCard;
