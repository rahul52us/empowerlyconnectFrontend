import { useState } from "react";
import {
  Box,
  Text,
  Heading,
  Center,
  Divider,
  Grid,
  GridItem,
  useBreakpointValue,
  useColorModeValue,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaBookOpen } from "react-icons/fa"; // Example icon, you can choose any other

const CurriculumSection = ({
  titleColor,
  borderColor,
  textColor,
}: any) => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const sectionBgColor = useColorModeValue("white", "gray.800");

  const [curriculumData] = useState({
    title: "Our Curriculum",
    description:
      "Our curriculum is designed to inspire a love for learning while catering to the diverse needs of our students. We focus on academic excellence, creativity, and critical thinking.",
    sections: [
      {
        title: "Preschool",
        content:
          "Engaging activities that promote social skills, creativity, and early literacy.",
      },
      {
        title: "Primary School",
        content:
          "A balanced curriculum of core subjects with an emphasis on inquiry-based learning.",
      },
      {
        title: "Extracurricular Activities",
        content:
          "Sports, arts, and clubs to enhance personal growth and teamwork.",
      },
    ],
  });

  return (
    <Box
      m={{ base: 2, md: 5 }}
      py={10}
      bg={bg}
      maxW={{ base: "98%", md: "100%" }}
      p={{ base: 5, md: 10 }}
    >
      <Center>
        <Heading
          as="h2"
          size="xl"
          textAlign="center"
          mb={3}
          fontWeight="bold"
          color={titleColor}
        >
          {curriculumData.title}
        </Heading>
      </Center>
      <Text
        textAlign="center"
        mb={10}
        maxW={{ base: "100%", md: "600px" }}
        mx="auto"
        fontSize={{ base: "md", md: "lg" }}
      >
        {curriculumData.description}
      </Text>
      <Grid
        templateColumns={useBreakpointValue({
          base: "1fr",
          md: "repeat(2, 1fr)",
        })}
        gap={6}
      >
        {curriculumData.sections.map((section, index) => (
          <GridItem key={index}>
            <Box
              p={6} // Increased padding
              borderWidth={1}
              borderColor={borderColor}
              borderRadius="lg" // Rounded corners
              bg={sectionBgColor}
              boxShadow="md"
              transition="all 0.3s"
              _hover={{ boxShadow: "lg", transform: "scale(1.03)" }} // Enhanced hover effect
            >
              <Flex alignItems="center" mb={4}>
                <Icon as={FaBookOpen} boxSize={6} color={titleColor} mr={2} />
                <Heading as="h3" size="lg" color={titleColor}>
                  {section.title}
                </Heading>
              </Flex>
              <Divider orientation="horizontal" borderColor="gray.300" my={2} />
              <Text color={textColor} fontSize="md">
                {section.content}
              </Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default CurriculumSection;
