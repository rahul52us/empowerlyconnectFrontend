import {
  Box,
  Button,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Icon,
  Grid,
  Text,
  Flex,
  HStack,
  IconButton,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { FiSettings, FiLayers, FiChevronRight } from "react-icons/fi";
import { FaMoon, FaPlus, FaSun } from "react-icons/fa";

interface Section {
  label: string;
  page: string;
  key: string;
  layouts?: string[];
}

interface WebTempSidebarProps {
  colorMode?: string;
  setIsDrawerOpen: any;
  toggleColorMode?: any;
  sections: Section[];
  setSections: (sections: Section[]) => void;
  currentSection: Section;
  setCurrentSection: (section: Section) => void;
  handleKeyPress: (page: string, e: React.KeyboardEvent) => void;
  initialSections: Section[];
  saveWebTemplate: any;
  submitLoading:boolean
}

const WebTempSidebar: React.FC<WebTempSidebarProps> = ({
  colorMode,
  setIsDrawerOpen,
  toggleColorMode,
  sections,
  setSections,
  currentSection,
  setCurrentSection,
  handleKeyPress,
  initialSections,
  saveWebTemplate,
  submitLoading
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSections, setSelectedSections] = useState<Section[]>([]);

  useEffect(() => {
    setSelectedSections(sections);
  }, [sections]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;

    const reorderedSections = Array.from(sections);
    const [removed] = reorderedSections.splice(source.index, 1);
    reorderedSections.splice(destination.index, 0, removed);
    setSections(reorderedSections);
  };

  const handleCheckboxChange = (section: Section) => {
    setSelectedSections((prevSelectedSections) => {
      const isSelected = prevSelectedSections.some(
        (s) => s.page === section.page
      );
      if (isSelected) {
        return prevSelectedSections.filter((s) => s.page !== section.page);
      } else {
        return [...prevSelectedSections, section];
      }
    });
  };

  const handleLayoutChange = (page: string, newLayout: string) => {
    setSelectedSections((prevSections) =>
      prevSections.map((section) =>
        section.page === page ? { ...section, key: newLayout } : section
      )
    );
  };

  const handleSaveSections = () => {
    setSections(selectedSections);
    onClose();
  };

  return (
    <>
      <Box
        minW={{ base: "100%", md: "280px" }}
        w={{ base: "100%", md: "280px" }}
        color="gray.800"
        borderColor="gray.300"
        height={{ base: "100%", md: "82vh" }}
        display="flex"
        flexDirection="column"
        overflow="hidden"
        position="relative"
        bg="white"
        boxShadow="md"
        borderRadius="md"
      >
        <Flex
          p={4}
          borderBottom="1px solid"
          borderColor="gray.200"
          bg="teal.500"
          color="white"
          borderTopRadius="md"
          mb={2}
          justifyContent="center"
        >
          <Text fontSize="lg" fontWeight="bold" cursor="pointer">
            Manage Sections
          </Text>
        </Flex>
        <HStack spacing={3} mb={2} wrap="wrap" justifyContent="end" mr={2}>
          <IconButton
            onClick={onOpen}
            icon={<FiSettings />}
            colorScheme="purple"
            aria-label="Section Settings"
            variant="solid"
            boxShadow="md"
            borderRadius="md"
          />
          <IconButton
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            colorScheme="blue"
            aria-label="Toggle Theme"
            variant="solid"
            boxShadow="md"
            borderRadius="md"
          />
          <IconButton
            onClick={() => setIsDrawerOpen(true)}
            icon={<FaPlus />}
            colorScheme="purple"
            aria-label="Color Settings"
            variant="solid"
            boxShadow="md"
            borderRadius="md"
          />
        </HStack>
        <Box flex="1" overflowY="auto" bg="gray.50" borderRadius="md" p={2}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  flex="1"
                  py={2}
                  px={4}
                  bg="white"
                  borderRadius="md"
                  boxShadow="sm"
                  border="1px solid"
                  borderColor="gray.200"
                  transition="border-color 0.2s"
                  _hover={{ borderColor: "teal.300" }}
                >
                  {sections.map((section, index) => (
                    <Draggable
                      key={section.page}
                      draggableId={section.page}
                      index={index}
                    >
                      {(provided) => (
                        <Flex
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          align="center"
                          justify="space-between"
                          p={3}
                          bg={
                            currentSection.page === section.page
                              ? "teal.600"
                              : "white"
                          }
                          color={
                            currentSection.page === section.page
                              ? "white"
                              : "gray.800"
                          }
                          fontWeight="medium"
                          cursor="pointer"
                          mt={1}
                          borderRadius="md"
                          boxShadow="md"
                          transition="background-color 0.2s ease, transform 0.1s ease"
                          _hover={{
                            bg: "teal.100",
                            transform: "scale(1.02)",
                          }}
                          onClick={() => setCurrentSection(section)}
                          onKeyPress={(e) => handleKeyPress(section.page, e)}
                          tabIndex={0}
                        >
                          <Flex align="center">
                            <Icon as={FiLayers} mr={2} />
                            <Text>{section.label}</Text>
                          </Flex>
                          <Icon as={FiChevronRight} opacity={0.6} />
                        </Flex>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
        <Button
          mt={4}
          onClick={saveWebTemplate}
          colorScheme="teal"
          w="full"
          borderRadius="md"
          isLoading={submitLoading}
        >
          Save Template
        </Button>
      </Box>

      {/* Modal for managing sections */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", md: "lg" }}
        closeOnOverlayClick={true}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            bg="teal.500"
            color="white"
            borderTopRadius="md"
            fontSize="xl"
          >
            Manage Sections
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              {initialSections.map((section) => (
                <Box
                  key={section.page}
                  p={3}
                  borderRadius="md"
                  bg={
                    selectedSections.some((s) => s.page === section.page)
                      ? "teal.100"
                      : "white"
                  }
                  border="1px solid"
                  borderColor="gray.200"
                  transition="background-color 0.2s ease"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent accidental toggling
                  }}
                  cursor="pointer"
                  _hover={{ bg: "teal.50", transform: "scale(1.02)" }}
                >
                  <Checkbox
                    isChecked={selectedSections.some(
                      (s) => s.page === section.page
                    )}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleCheckboxChange(section);
                    }}
                  >
                    {section.label}
                  </Checkbox>
                  {section.layouts && (
                    <RadioGroup
                      value={
                        selectedSections.find((s) => s.page === section.page)
                          ?.key || section.key
                      }
                      onChange={(newLayout) =>
                        handleLayoutChange(section.page, newLayout)
                      }
                    >
                      <Stack spacing={1} mt={2}>
                        {section.layouts.map((layout) => (
                          <Radio
                            key={layout}
                            value={layout}
                            size="sm"
                            colorScheme="teal"
                          >
                            {layout}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  )}
                </Box>
              ))}
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={handleSaveSections}
            >
              Save Changes
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WebTempSidebar;
