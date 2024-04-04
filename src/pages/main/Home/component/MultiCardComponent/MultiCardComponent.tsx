import {
  Box,
  Grid,
  Heading,
  Text,
  Image,
  Button,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

const MultiCardComponent = ({
  bgColor,
  buttonColor,
  // image,
  description,
  title,
  card,
}: // button
any) => {
  return (
    <>
      <Grid
        p={"2rem"}
        templateColumns={{
          base: "1fr",
          md: "1fr 1fr",
          lg: "1.5fr 1fr 1fr 1fr",
        }}
        gap={4}
        bg={bgColor}
        rounded={"1rem"}
      >
        <Box py={"1rem"}>
          <Heading
            fontSize={"2xl"}
            textDecoration={"underline"}
            my={2}
            color={useColorModeValue("white", "white")}
          >
            {title}
          </Heading>
          <Text fontSize={"lg"} color={useColorModeValue("white", "white")}>
            {description}
          </Text>
        </Box>

        {card.map((value: any) => (
          <Box bg={"white"} p={2} rounded={"1rem"}>
            <Image
              w={"100%"}
              h={"12rem"}
              objectFit={"contain"}
              src={value.image}
            />
            <Flex justifyContent={"center"}>
              <Button
                px={"1rem"}
                color={buttonColor}
                borderColor={buttonColor}
                variant={"outline"}
                _hover={{
                  bg: buttonColor,
                  color: "white",
                }}
                borderWidth={"3px"}
                w={"60%"}
              >
                {value.button}
              </Button>
            </Flex>
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default MultiCardComponent;
