import { Box, Grid, Heading, Text, Stack, useColorModeValue } from "@chakra-ui/react";
import TeacherCard from "./TeacherCard";
import { teachersData } from "../Constant/constants";

const TeacherSection = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("teal.600", "teal.300");

  return (
    <Box m={{ base: 2, md: 5 }} py={10} bg={bg}>
      <Stack spacing={4} textAlign="center" mb={10} px={{ base: 4, md: 0 }}>
        <Heading
          as="h2"
          size={{ base: "lg", md: "xl" }}
          fontWeight="bold"
          color={headingColor}
        >
          Meet Our Dedicated Teachers
        </Heading>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color={textColor}
          maxW={{ base: "100%", md: "600px" }}
          mx="auto"
        >
          Our passionate and experienced team of educators is here to guide you
          on your learning journey. With expertise across a wide range of
          subjects, they are committed to your success.
        </Text>
      </Stack>

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={8}
        maxW="85%"
        mx="auto"
      >
        {teachersData.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            name={teacher.name}
            subject={teacher.subject}
            imageUrl={teacher.imageUrl}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default TeacherSection;
