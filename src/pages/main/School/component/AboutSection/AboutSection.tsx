import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Image,
  VStack,
  useColorModeValue,
  Center,
  Button,
} from "@chakra-ui/react";
import { useSectionColorContext } from "../../School";
import { useState } from "react";

export default function AboutSection() {
  const { colors, websiteMode } = useSectionColorContext();

  // Background, text, and shadow color based on the light/dark mode
  const bg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const shadowColor = useColorModeValue("lg", "dark-lg");

  // Initialize static data in state
  const [aboutContent, setAboutContent] = useState({
    title: "About Our School",
    subtitle: "Dedicated to Excellence in Education",
    description: [
      "Welcome to Evergreen Academy, a place where students from all backgrounds thrive through intellectual growth and personal development. Our diverse learning environment encourages curiosity, collaboration, and exploration.",
      "Our faculty members, passionate and skilled, strive for excellence, fostering a spirit of innovation and curiosity in every student. They are dedicated to guiding each learner to realize their full potential.",
      "Since 1995, Evergreen Academy has set the benchmark for educational excellence. We are proud of our alumni's significant contributions across various fields, and their impact is felt globally.",
      "Looking toward the future, we continue to invest in top-tier resources, state-of-the-art facilities, and innovative learning methodologies. We are committed to preparing each student to meet the challenges of an evolving world with confidence and knowledge."
  ],
    imageUrl: "https://img.freepik.com/free-photo/anime-school-building-illustration_23-2151150989.jpg",
  });

  // Local edit state to hold temporary edits
  const [editContent, setEditContent] = useState({ ...aboutContent });

  // Save handler
  const handleSave = () => {
    setAboutContent(editContent); // Save changes to main content state
    // Here you can add a call to save `editContent` to the database if needed
    console.log("Content saved:", editContent);
  };

  return (
    <Box m={{ base: 2, md: 5 }} py={10} bg={bg}>
      <Container maxW="container.xl">
        <Center>
          <Box maxW={{ base: "90%", md: "75%", lg: "60%" }}>
            <Heading
              as="h2"
              size="2xl"
              textAlign="center"
              mb={4}
              contentEditable={websiteMode}
              suppressContentEditableWarning={true}
              fontWeight="bold"
              color={useColorModeValue(
                colors?.headingColor?.light,
                colors?.headingColor?.dark
              )}
              onInput={(e : any) => setEditContent({ ...editContent, title: e.target.innerText })}
            >
              {editContent.title}
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              textAlign="center"
              mb={12}
              contentEditable={websiteMode}
              suppressContentEditableWarning={true}
              color={useColorModeValue(
                colors?.subHeadingColor?.light,
                colors?.subHeadingColor?.dark
              )}
              onInput={(e : any) => setEditContent({ ...editContent, subtitle: e.target.innerText })}
            >
              {editContent.subtitle}
            </Text>
          </Box>
        </Center>

        <Flex
          direction={{ base: "column", md: "row" }}
          gap={10}
          align="center"
          justify="space-between"
        >
          <Box flex="1" data-aos="fade-right">
            <Image
              src={editContent.imageUrl}
              alt="School campus"
              w="100%"
              maxW={{ base: "100%", md: "520px" }}
              rounded="xl"
              h={{ base: "100%", md: "380px" }}
              objectFit="cover"
              boxShadow={shadowColor}
              transition="transform 0.3s"
              _hover={{ transform: "scale(1.05)" }}
            />
          </Box>

          <Box flex="1" data-aos="fade-left">
            <VStack
              color={textColor}
              fontSize={{ base: "md", md: "lg" }}
              spacing={6}
              textAlign="left"
            >
              {editContent.description.map((paragraph, index) => (
                <Text
                  key={index}
                  contentEditable={websiteMode}
                  suppressContentEditableWarning={true}
                  onInput={(e : any) => {
                    const newDescription = [...editContent.description];
                    newDescription[index] = e.target.innerText;
                    setEditContent((prevContent) => ({
                      ...prevContent,
                      description: newDescription,
                    }));
                  }}
                >
                  {paragraph}
                </Text>
              ))}
            </VStack>
          </Box>
        </Flex>

        {/* Save Button */}
        {websiteMode && (
          <Center mt={8} justifyContent="end">
            <Button colorScheme="blue" onClick={handleSave}>
              Save Changes
            </Button>
          </Center>
        )}
      </Container>
    </Box>
  );
}
