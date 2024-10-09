import { Box, Container, Heading, Text, Flex, Image } from "@chakra-ui/react";

export default function AboutSection() {
  return (
    <Box py={16} bg="white">
      <Container maxW="container.xl">
        <Heading as="h2" size="xl" textAlign="center" mb={8}>
          About Our School
        </Heading>
        <Flex direction={{ base: "column", md: "row" }} gap={8} align="center">
          <Box flex="1">
            <Image
              src="https://img.freepik.com/free-photo/anime-school-building-illustration_23-2151150989.jpg?t=st=1728491164~exp=1728494764~hmac=8d8ef7b2a7859a99d53d716c000d090e442a5815b8268b5ee433cc85698a33f5&w=360"
              alt="School campus"
              w={520}
              rounded={12}
              h={400}
              objectFit={"cover"}
            />
          </Box>
          <Box flex="1">
            <Text mb={4} color="gray.700" fontSize={"xl"}>
              Evergreen Academy is a prestigious institution dedicated to
              providing high-quality education to students from diverse
              backgrounds.
            </Text>
            <Text color="gray.700" fontSize={"lg"}>
              Founded in 1995, we have a rich history of academic excellence and
              have produced numerous successful alumni.
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
