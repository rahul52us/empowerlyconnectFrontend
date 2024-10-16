import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Image,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

export default function AboutSection() {
  // Background, text, and shadow color based on the light/dark mode
  const bg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const shadowColor = useColorModeValue("lg", "dark-lg");

  return (
    <Box m={{base : 2, md : 5}} py={10} bg={bg}>
      <Container maxW="container.xl">
        <Heading
          as="h2"
          size="2xl"
          textAlign="center"
          mb={12}
          fontWeight="bold"
          color={useColorModeValue("teal.500", "teal.300")}
        >
          About Our School
        </Heading>

        <Flex
          direction={{ base: "column", md: "row" }}
          gap={10}
          align="center"
          justify="space-between"
        >
          <Box flex="1" data-aos="fade-right">
            <Image
              src="https://img.freepik.com/free-photo/anime-school-building-illustration_23-2151150989.jpg?t=st=1728491164~exp=1728494764~hmac=8d8ef7b2a7859a99d53d716c000d090e442a5815b8268b5ee433cc85698a33f5&w=360"
              alt="School campus"
              w="100%"
              maxW={{ base: "100%", md: "520px" }}
              rounded="xl"
              h={{ base: "300px", md: "380px" }}
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
              <Text>
                Welcome to <strong>Evergreen Academy</strong>, a place where
                students from all backgrounds thrive through intellectual growth
                and personal development. Our diverse learning environment
                encourages curiosity, collaboration, and exploration.
              </Text>
              <Text>
                Our faculty members, passionate and skilled, strive for
                excellence, fostering a spirit of innovation and curiosity in
                every student.
              </Text>
              <Text>
                Since 1995, Evergreen Academy has set the benchmark for
                educational excellence, and we are proud of our alumni's
                significant contributions to various fields worldwide.
              </Text>
              <Text>
                Looking toward the future, we continue to invest in top-tier
                resources and facilities, ensuring every student is equipped to
                meet the challenges of an evolving world.
              </Text>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
