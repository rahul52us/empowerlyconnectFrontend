import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Image,
  VStack,
} from "@chakra-ui/react";

export default function AboutSection() {
  return (
    <Box py={16} bg="white">
      <Container maxW="container.xl">
        <Heading as="h2" size="xl" textAlign="center" mb={10}>
          About Our School
        </Heading>
        <Flex direction={{ base: "column", md: "row" }} gap={8} align="center">
          <Box flex="1">
            <Image
              src="https://img.freepik.com/free-photo/anime-school-building-illustration_23-2151150989.jpg?t=st=1728491164~exp=1728494764~hmac=8d8ef7b2a7859a99d53d716c000d090e442a5815b8268b5ee433cc85698a33f5&w=360"
              alt="School campus"
              w={520}
              rounded={12}
              h={380}
              objectFit={"cover"}
            />
          </Box>
          <Box flex="1">
            <VStack color="gray.700" fontSize={"lg"} spacing={6}>
              <Text>
                Evergreen Academy is a prestigious institution dedicated to
                providing high-quality education to students from diverse
                backgrounds.
              </Text>
              <Text>
                Our dedicated faculty consists of passionate educators with
                extensive expertise in their respective fields.
              </Text>
              <Text>
                Founded in 1995, we have a rich history of academic excellence
                and have produced numerous successful alumni.
              </Text>
              <Text>
                As we look to the future, Evergreen Academy remains committed to
                upholding its mission of academic excellence and innovation. We
                continually invest in state-of-the-art facilities and resources,
                ensuring that our students have access to the tools necessary
                for success .
              </Text>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
