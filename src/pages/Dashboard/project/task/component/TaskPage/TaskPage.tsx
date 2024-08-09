import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TaskCard from "../../../component/TaskCard/TaskCard";

const TaskPage = ({ taskData }: any) => {
  const statuses = ["backlog", "inProgress", "toDo", "done", "complete"];

  const gradient = [
    useColorModeValue(
      "linear(to-t, orange.300, orange.400)",
      "linear(to-t, orange.400, orange.600)"
    ),
    useColorModeValue(
      "linear(to-t, red.300, red.400)",
      "linear(to-t, red.400, red.600)"
    ),
    useColorModeValue(
      "linear(to-t, green.300, green.400)",
      "linear(to-t, green.400, green.600)"
    ),
    useColorModeValue(
      "linear(to-t, blue.300, blue.400)",
      "linear(to-t, blue.400, blue.600)"
    ),
    useColorModeValue(
      "linear(to-t, purple.300, purple.400)",
      "linear(to-t, purple.400, purple.600)"
    ),
  ];

  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Organize tasks by status
  const tasksByStatus = statuses.reduce((acc: any, status) => {
    acc[status] = taskData?.filter((task: any) => task.status === status);
    return acc;
  }, {});

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;

    if (sourceColumn !== destinationColumn) {
      console.log(
        `Task ${draggableId} moved from ${sourceColumn} to ${destinationColumn}`
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex gap={4} overflow={'auto'}>
        {statuses?.map((status, index) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <Box
                w="100%"
                border={"2px solid"}
                borderColor={borderColor}
                borderStyle={"dashed"}
                py={4}
                px={2}
                borderRadius="lg"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Box mb={4} p={2} bgGradient={gradient[index]} rounded={"lg"}>
                  <Text fontWeight={500} color={"white"}>
                    {status?.charAt(0).toUpperCase() + status?.slice(1)}
                  </Text>
                </Box>
                {tasksByStatus[status]?.map((task: any, index: number) => (
                  <Draggable
                    draggableId={task._id}
                    index={index}
                    key={task._id}
                  >
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided?.draggableProps}
                        {...provided?.dragHandleProps}
                        mb={4}
                      >
                        <TaskCard task={task} />
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided?.placeholder}
              </Box>
            )}
          </Droppable>
        ))}
      </Flex>
    </DragDropContext>
  );
};

export default TaskPage;
