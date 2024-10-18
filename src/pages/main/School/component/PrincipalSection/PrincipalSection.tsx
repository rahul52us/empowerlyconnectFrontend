import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

export default function PrincipalSection() {
  // Dynamic color modes for light and dark themes
  const textColor = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("teal.500", "teal.300");
  const subheadingColor = useColorModeValue("gray.600", "gray.400");
  const bg = useColorModeValue("gray.50", "gray.900");

  return (
    <Box m={{ base: 2, md: 5 }} py={10} bg={bg}>
      <Container maxW="container.xl">
        <Heading
          as="h2"
          size="xl"
          textAlign="center"
          mb={4}  // Adjusted margin for subheading
          color={headingColor}
          fontWeight="bold"
        >
          A Message From Our Principal
        </Heading>

        <Text
          textAlign="center"
          fontSize="lg"
          mb={8}  // Space below subheading
          color={subheadingColor}
        >
          Guiding the way to excellence with experience, passion, and a commitment to shaping the future.
        </Text>

        <Flex
          direction={{ base: "column", md: "row" }}
          gap={10}
          align="center"
          justify="center"
        >
          <Box flex="1" textAlign="center" data-aos="fade-up">
            <Image
              src="https://img.freepik.com/free-photo/experienced-businessman-standing-office-room-indian-content-office-employee-eyeglasses-smiling-posing-with-folded-hands-business-management-corporation-concept_74855-11681.jpg?t=st=1728491985~exp=1728495585~hmac=8fe791a61b6d34227a8bdcbd839d354c7246e23959e2c847ff9a0addd188e3a4&w=1060"
              alt="Principal"
              width={{ base: "250px", md: "300px" }}
              height={{ base: "250px", md: "300px" }}
              objectFit="cover"
              rounded="full"
              boxShadow="2xl"
              transition="transform 0.3s"
              _hover={{ transform: "scale(1.05)" }}
            />
          </Box>

          <Box flex="2" data-aos="fade-left">
            <Heading
              as="h3"
              size="lg"
              mb={4}
              fontWeight="bold"
              color={headingColor}
            >
              Dr. Jane Smith
            </Heading>

            <Text mb={4} color={textColor} fontSize="lg" lineHeight="tall">
              Dr. Jane Smith has been the principal of Evergreen Academy for
              over a decade. With her visionary leadership and commitment to
              educational excellence, she has transformed our school into one of
              the top-performing institutions in the region.
            </Text>

            <Text color={textColor} fontSize="lg" lineHeight="tall">
              Dr. Smith holds a Ph.D. in Education from Harvard University and
              has over 25 years of experience in the field of education. Her
              innovative approaches to teaching and learning have inspired both
              students and faculty to achieve their highest potential.
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
