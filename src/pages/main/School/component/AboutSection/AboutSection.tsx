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
  Grid,
  GridItem,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useSectionColorContext } from "../../School";

export default function AboutSection({
  content,
  setContent,
  webColor,
  isEditable = false,
}: any) {
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
    setEditContent((prev: any) => ({
      ...prev,
      description: [...prev.description, ""],
    }));
  };

  const deleteDescription = (index: number) => {
    const newDescription = editContent.description.filter(
      (_: any, idx: number) => idx !== index
    );
    setEditContent({ ...editContent, description: newDescription });
  };

  return (
    <Box m={{ base: 2, md: 5 }} py={10} bg={bg} borderRadius="lg">
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
              {content.title}
            </Heading>
            <Text
              color={
                colorMode === "light"
                  ? colors?.subHeadingColor?.light
                  : colors?.subHeadingColor?.dark
              }
              fontSize={{ base: "lg", md: "xl" }}
              mb={12}
            >
              {content.subtitle}
            </Text>
          </Box>
          {isEditable && (
            <Button
              color={
                colorMode === "light"
                  ? webColor.buttonTextColor?.light
                  : webColor.buttonTextColor?.dark
              }
              backgroundColor={
                colorMode === "light"
                  ? webColor.buttonColor?.light
                  : webColor.buttonColor?.dark
              }
              _hover={{
                backgroundColor:
                  colorMode === "light"
                    ? webColor.buttonHoverColor?.light
                    : webColor.buttonHoverColor?.dark,

                color:
                  colorMode === "light"
                    ? webColor.buttonTextHoverColor?.light
                    : webColor.buttonTextHoverColor?.dark,
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
          <Box flex="1">
            <Image
              src={content.imageUrl}
              alt="School campus"
              w="100%"
              maxW={{ base: "100%", md: "520px" }}
              rounded="xl"
              h={{ base: "100%", md: "380px" }}
              objectFit="cover"
              boxShadow="lg"
            />
          </Box>

          <Box flex="1">
            <VStack
              color={textColor}
              fontSize={{ base: "md", md: "lg" }}
              spacing={6}
              textAlign="left"
            >
              {content.description.map((paragraph: any, index: number) => (
                <Text key={index}>{paragraph}</Text>
              ))}
            </VStack>
          </Box>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
          <ModalOverlay />
          <ModalContent borderRadius="lg">
            <ModalHeader fontSize="lg" fontWeight="bold" color={textColor}>
              Edit About Section
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  placeholder="Title"
                  value={editContent.title}
                  onChange={(e) =>
                    setEditContent({ ...editContent, title: e.target.value })
                  }
                  borderColor="blue.300"
                  _focus={{ borderColor: "blue.500" }}
                />
                <Input
                  placeholder="Subtitle"
                  value={editContent.subtitle}
                  onChange={(e) =>
                    setEditContent({ ...editContent, subtitle: e.target.value })
                  }
                  borderColor="blue.300"
                  _focus={{ borderColor: "blue.500" }}
                />

                <Grid templateColumns="repeat(1, 1fr)" gap={4} width="100%">
                  <GridItem>
                    <Text fontWeight="bold">Description Points</Text>
                  </GridItem>
                  {editContent.description.map(
                    (paragraph: any, index: number) => (
                      <GridItem key={index}>
                        <Flex>
                          <Textarea
                            placeholder={`Description ${index + 1}`}
                            value={paragraph}
                            onChange={(e) => {
                              const newDescription = [
                                ...editContent.description,
                              ];
                              newDescription[index] = e.target.value;
                              setEditContent({
                                ...editContent,
                                description: newDescription,
                              });
                            }}
                            borderColor="blue.300"
                            _focus={{ borderColor: "blue.500" }}
                            mr={2}
                          />
                          <IconButton
                            aria-label="Delete Description"
                            icon={<DeleteIcon />}
                            onClick={() => deleteDescription(index)}
                            colorScheme="red"
                            variant="outline"
                            size="sm"
                          />
                        </Flex>
                      </GridItem>
                    )
                  )}
                </Grid>

                <Button
                  colorScheme="green"
                  onClick={addDescription}
                  width="full"
                >
                  Add Description Point
                </Button>

                <Input
                  placeholder="Image URL"
                  value={editContent.imageUrl}
                  onChange={(e) =>
                    setEditContent({ ...editContent, imageUrl: e.target.value })
                  }
                  borderColor="blue.300"
                  _focus={{ borderColor: "blue.500" }}
                />
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button
                color={
                  colorMode === "light"
                    ? webColor.buttonTextColor?.light
                    : webColor.buttonTextColor?.dark
                }
                backgroundColor={
                  colorMode === "light"
                    ? webColor.buttonColor?.light
                    : webColor.buttonColor?.dark
                }
                _hover={{
                  backgroundColor:
                    colorMode === "light"
                      ? webColor.buttonHoverColor?.light
                      : webColor.buttonHoverColor?.dark,

                  color:
                    colorMode === "light"
                      ? webColor.buttonTextHoverColor?.light
                      : webColor.buttonTextHoverColor?.dark,
                }}
                onClick={handleSave}
                width="full"
              >
                Save Changes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
}
