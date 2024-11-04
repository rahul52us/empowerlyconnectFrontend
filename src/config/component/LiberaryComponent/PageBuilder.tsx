import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable as DndDraggable, DropResult } from "react-beautiful-dnd";
import Draggable from "react-draggable";
import { Box, Button, VStack, Heading, Text, Flex, Image } from "@chakra-ui/react";

// Types for components in the builder
interface ComponentConfig {
  id: string;
  type: "text" | "heading" | "button" | "image";
  content: string;
  styles: any;
  position: { x: number; y: number };
}

// Component Library for the page builder
const ComponentLibrary: Record<string, React.FC<{ content: string; styles?: any }>> = {
  text: ({ content, styles }) => <Text {...styles}>{content}</Text>,
  heading: ({ content, styles }) => <Heading {...styles}>{content}</Heading>,
  button: ({ content, styles }) => <Button {...styles}>{content}</Button>,
  image: ({ content, styles }) => <Image src={content} {...styles} />,
};

// Function to reorder items in a list
const reorder = (list: ComponentConfig[], startIndex: number, endIndex: number): ComponentConfig[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const PageBuilder: React.FC = () => {
  const [components, setComponents] = useState<ComponentConfig[]>([
    { id: "1", type: "text", content: "Hello World!", styles: { fontSize: "md" }, position: { x: 50, y: 50 } },
    { id: "2", type: "heading", content: "My Heading", styles: { fontSize: "lg" }, position: { x: 100, y: 100 } },
  ]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedComponents = reorder(components, result.source.index, result.destination.index);
    setComponents(reorderedComponents);
  };

  const addComponent = (type: "text" | "heading" | "button" | "image") => {
    const newComponent: ComponentConfig = {
      id: `${Date.now()}`,
      type,
      content: type === "button" ? "Click Me" : type === "heading" ? "New Heading" : type === "image" ? "https://via.placeholder.com/150" : "Sample Text",
      styles: { fontSize: "md" },
      position: { x: 0, y: 0 },
    };
    setComponents((prev) => [...prev, newComponent]);
  };

  const handlePositionChange = (id: string, newPosition: { x: number; y: number }) => {
    setComponents((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, position: newPosition } : comp))
    );
  };

  return (
    <Flex>
      <ComponentLibraryPanel onAddComponent={addComponent} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="canvas" direction="vertical">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              position="relative"
              p={4}
              minHeight="500px"
              border="2px dashed"
              borderColor="gray.300"
              flex="1"
            >
              {components.map((comp, index) => {
                const Component = ComponentLibrary[comp.type];
                return (
                  <DndDraggable key={comp.id} draggableId={comp.id} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        position="absolute"
                        top={comp.position.y}
                        left={comp.position.x}
                      >
                        <Draggable
                          bounds="parent"
                          position={{ x: comp.position.x, y: comp.position.y }}
                          onStop={(_, data) => handlePositionChange(comp.id, { x: data.x, y: data.y })}
                        >
                          <Box
                            p={4}
                            bg="white"
                            borderRadius="md"
                            boxShadow="md"
                          >
                            <Component content={comp.content} styles={comp.styles} />
                          </Box>
                        </Draggable>
                      </Box>
                    )}
                  </DndDraggable>
                );
              })}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Flex>
  );
};

// Panel to Add Components
interface ComponentLibraryPanelProps {
  onAddComponent: (type: "text" | "heading" | "button" | "image") => void;
}

const ComponentLibraryPanel: React.FC<ComponentLibraryPanelProps> = ({ onAddComponent }) => {
  return (
    <VStack spacing={4} p={4} bg="gray.100" borderRadius="md" mr={4} minWidth="200px">
      <Button onClick={() => onAddComponent("text")}>Add Text</Button>
      <Button onClick={() => onAddComponent("heading")}>Add Heading</Button>
      <Button onClick={() => onAddComponent("button")}>Add Button</Button>
      <Button onClick={() => onAddComponent("image")}>Add Image</Button>
    </VStack>
  );
};

export default PageBuilder;
