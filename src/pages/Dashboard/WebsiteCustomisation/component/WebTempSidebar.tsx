import { Box } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const WebTempSidebar = ({
  sections,
  currentSection,
  setCurrentSection,
  handleKeyPress,
  setSections,
}: any) => {
  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // If there's no destination (dropped outside the list) or no movement
    if (!destination || (source.index === destination.index)) {
      return;
    }

    const reorderedSections = Array.from(sections);
    const [removed] = reorderedSections.splice(source.index, 1);
    reorderedSections.splice(destination.index, 0, removed);

    setSections(reorderedSections);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            overflowY="auto"
            flex="1"
            overflowX="hidden"
          >
            {sections.map((section: any, index: number) => (
              <Draggable
                key={section.page}
                draggableId={section.page}
                index={index}
              >
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    w="full"
                    p={3}
                    borderRadius="md"
                    bg={currentSection.page === section.page ? "teal.500" : "gray.200"}
                    color={currentSection.page === section.page ? "white" : "black"}
                    fontWeight="bold"
                    cursor="pointer"
                    mt={2}
                    transition="background-color 0.2s, color 0.2s"
                    onClick={() => setCurrentSection(section)}
                    onKeyPress={(e) => handleKeyPress(section.page, e)}
                    tabIndex={0}
                  >
                    {section.label}
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder} {/* This placeholder is needed for proper spacing */}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default WebTempSidebar;
