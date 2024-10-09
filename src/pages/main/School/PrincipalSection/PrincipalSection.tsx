import { Box, Container, Heading, Text, Flex, Image } from "@chakra-ui/react";

export default function PrincipalSection() {
  return (
    <Box py={16} bg="gray.100">
      <Container maxW="container.xl">
        <Heading as="h2" size="xl" textAlign="center" mb={8}>
          Meet Our Principal
        </Heading>
        <Flex direction={{ base: "column", md: "row" }} gap={8} align="center">
          <Box flex="1" textAlign="center">
            <Image
              src="https://img.freepik.com/free-photo/experienced-businessman-standing-office-room-indian-content-office-employee-eyeglasses-smiling-posing-with-folded-hands-business-management-corporation-concept_74855-11681.jpg?t=st=1728491985~exp=1728495585~hmac=8fe791a61b6d34227a8bdcbd839d354c7246e23959e2c847ff9a0addd188e3a4&w=1060"
              alt="Principal"
              width={300}
              objectFit={"cover"}
              height={300}
              rounded={"full"}
            />
          </Box>
          <Box flex="2">
            <Heading as="h3" size="lg" mb={4}>
              Dr. Jane Smith
            </Heading>
            <Text mb={4} color="gray.700">
              Dr. Jane Smith has been the principal of Evergreen Academy for
              over a decade. With her visionary leadership and commitment to
              educational excellence, she has transformed our school into one of
              the top-performing institutions in the region.
            </Text>
            <Text>
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
