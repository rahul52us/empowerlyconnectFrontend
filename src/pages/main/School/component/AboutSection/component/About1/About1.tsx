import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Image,
  VStack,
  useColorModeValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Input,
  Textarea,
  IconButton,
  useColorMode,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useSectionColorContext } from "../../../../School";
import { motion } from "framer-motion";

// Motion components
const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionImage = motion(Image);

// Define types for props
type ContentProps = {
  title: string;
  subtitle: string;
  imageUrl: string;
  description: string[];
};

type AboutProps = {
  content: any;
  setContent: (content: ContentProps) => void;
  webColor: any;
  isEditable?: boolean;
};

export default function About1({
  content = {},
  setContent,
  webColor,
  isEditable = false,
}: AboutProps) {
  const { colorMode } = useColorMode();
  const { colors } = useSectionColorContext() || { colors: webColor || {} };
  const bg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.300");

  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const [editContent, setEditContent] = useState({ ...content });

  const handleSave = () => {
    setContent(editContent);
    onClose();
  };

  const addDescription = () => {
    setEditContent((prev : any) => ({
      ...prev,
      description: [...prev.description, ""],
    }));
  };

  const deleteDescription = (index: number) => {
    const newDescription = editContent.description.filter(
      (_ : any, idx : any) => idx !== index
    );
    setEditContent({ ...editContent, description: newDescription });
  };

  return (
    <MotionBox
      m={{ base: 2, md: 5 }}
      py={8}
      bg={bg}
      borderRadius="lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center" mb={8}>
          <Box textAlign="center" flex="1">
            <Heading
              as="h2"
              size="xl"
              textAlign="center"
              fontWeight="bold"
              mb={3}
              color={
                colorMode === "light"
                  ? colors?.headingColor?.light
                  : colors?.headingColor?.dark
              }
            >
              {content?.title}
            </Heading>
            <MotionText
              color={
                colorMode === "light"
                  ? colors?.subHeadingColor?.light
                  : colors?.subHeadingColor?.dark
              }
              fontSize={{ base: "lg", md: "xl" }}
              mb={12}
              maxW={{ base: "100%", md: "600px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {content?.subtitle}
            </MotionText>
          </Box>
          {isEditable && (
            <Button
              color={
                colorMode === "light"
                  ? webColor?.buttonTextColor?.light
                  : webColor?.buttonTextColor?.dark
              }
              backgroundColor={
                colorMode === "light"
                  ? webColor?.buttonColor?.light
                  : webColor?.buttonColor?.dark
              }
              _hover={{
                backgroundColor:
                  colorMode === "light"
                    ? webColor?.buttonHoverColor?.light
                    : webColor?.buttonHoverColor?.dark,
                color:
                  colorMode === "light"
                    ? webColor?.buttonTextHoverColor?.light
                    : webColor?.buttonTextHoverColor?.dark,
              }}
              onClick={onOpen}
            >
              Edit Content
            </Button>
          )}
        </Flex>

        <Flex
          direction={{ base: "column", md: "row" }}
          gap={10}
          align="center"
          justify="space-between"
        >
          <MotionBox
            flex="1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <MotionImage
              src={content?.imageUrl}
              alt="School campus"
              w="100%"
              maxW={{ base: "100%", md: "520px" }}
              rounded="xl"
              h={{ base: "100%", md: "380px" }}
              objectFit="cover"
              boxShadow="lg"
            />
          </MotionBox>

          <MotionBox flex="1">
            <VStack
              color={textColor}
              fontSize={{ base: "md", md: "lg" }}
              spacing={6}
              textAlign="left"
            >
              {content?.description?.map((paragraph : any, index : number) => (
                <MotionText key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 * index }}>
                  {paragraph}
                </MotionText>
              ))}
            </VStack>
          </MotionBox>
        </Flex>

        {/* Modal with animations */}
        <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
          <ModalOverlay />
          <MotionBox as={ModalContent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <ModalHeader>Edit About Section</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Tabs variant="enclosed">
                <TabList>
                  <Tab>Title</Tab>
                  <Tab>Subtitle</Tab>
                  <Tab>Descriptions</Tab>
                  <Tab>Image URL</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Input
                      placeholder="Title"
                      value={editContent.title}
                      onChange={(e) =>
                        setEditContent({ ...editContent, title: e.target.value })
                      }
                    />
                  </TabPanel>
                  <TabPanel>
                    <Input
                      placeholder="Subtitle"
                      value={editContent.subtitle}
                      onChange={(e) =>
                        setEditContent({ ...editContent, subtitle: e.target.value })
                      }
                    />
                  </TabPanel>
                  <TabPanel>
                    <VStack align="stretch" spacing={3}>
                      {editContent.description.map((desc : any, index : number) => (
                        <Flex key={index} align="center">
                          <Textarea
                            placeholder="Description"
                            value={desc}
                            onChange={(e) =>
                              setEditContent((prev : any) => {
                                const updatedDescriptions = [...prev.description];
                                updatedDescriptions[index] = e.target.value;
                                return { ...prev, description: updatedDescriptions };
                              })
                            }
                          />
                          <IconButton
                            aria-label="Delete description"
                            icon={<DeleteIcon />}
                            ml={2}
                            onClick={() => deleteDescription(index)}
                          />
                        </Flex>
                      ))}
                      <Button onClick={addDescription}>Add Description</Button>
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    <Input
                      placeholder="Image URL"
                      value={editContent.imageUrl}
                      onChange={(e) =>
                        setEditContent({ ...editContent, imageUrl: e.target.value })
                      }
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSave} width="full">
                Save Changes
              </Button>
            </ModalFooter>
          </MotionBox>
        </Modal>
      </Container>
    </MotionBox>
  );
}
