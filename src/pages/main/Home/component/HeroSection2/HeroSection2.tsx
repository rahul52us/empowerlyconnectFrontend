import {
  Flex,
  Image,
  Text,
  Box,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import HeroImage from "./heroimage.png";

const HeroSection2 = () => {
  return (
    <>
      <Flex
        bg={useColorModeValue(
          "linear-gradient(70deg, rgba(208,106,255,1) 0%, rgba(255,167,234,1) 51%, rgba(255,205,247,1) 100%)",
          "linear-gradient(70deg, rgba(62,27,78,1) 0%, rgba(103,23,118,1) 51%, rgba(234,6,198,1) 100%)"
        )}
        // justifyContent={"center"}
        direction={{ base: "column", lg: "unset" }}
      >
        <Box
          p={{ base: 4, lg: "4rem" }}
          ml={{ base: "unset", lg: 12 }}
          textAlign={{ base: "center", lg: "unset" }}
        >
          <Text
            fontSize={{ base: "2xl",md:'4xl', lg: "5xl" }}
            fontWeight={600}
            color="white"
            fontFamily={"cursive"}
          >
            Transforming Education <br /> Management into the Digital Age
          </Text>
          <Text fontSize={{md:'xl',lg:"lg"}} my={4}>
            Empower your school with our comprehensive <br /> management system,
            designed to streamline administrative <br /> tasks and enhance
            learning experiences.
          </Text>
          <Button
            variant={"outline"}
            color={"white"}
            rounded={"2rem"}
            size={"lg"}
            _hover={{ transform: "scale(1.1)" }}
          >
            Get Started
          </Button>
        </Box>

        <Image
          src={HeroImage}
          w={{ base: "100%", lg: "60%" }}
          borderRadius="xl"
        />
      </Flex>
    </>
  );
};

export default HeroSection2;
