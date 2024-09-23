import { Box, Center, Icon, Text, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const NewWidgetCard = ({
  totalCount,
  title,
  loading,
  icon,
  handleClick,
}: {
  totalCount: number;
  title: string;
  handleClick: any;
  loading: boolean;
  icon: any;
}) => {
  const [count, setCount] = useState(0);
  const bgGradient = useColorModeValue(
    "linear(to-r, blue.100, blue.200)",
    "linear(to-r, blue.700, blue.800)"
  );
  const textColor = useColorModeValue("blue.600", "white");
  const countColor = useColorModeValue("blue.700", "white");
  const descriptionColor = useColorModeValue("gray.600", "gray.200");

  const intervalDelay = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < totalCount) {
        setCount(count + 1);
      }
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [count, totalCount]);

  if (loading === true) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      onClick={() => handleClick()}
      p={4}
      mt={8}
      shadow={"lg"}
      rounded={"2xl"}
      textAlign={"center"}
      bgGradient={bgGradient}
      _hover={{ transform: "scale(1.02)", transition: "all 0.3s ease" }}
    >
      <VStack spacing={0}>
        <Center>
          <Icon color={textColor} as={icon} w={9} h={9} />
        </Center>
        <Box>
          <Text color={textColor} fontWeight={700} fontSize={"lg"}>
            {title}
          </Text>
          <Text color={countColor} fontWeight={700} fontSize={"3xl"} mt={-2}>
            {count < totalCount ? count : totalCount}
          </Text>
          <Text color={descriptionColor} fontSize={"md"}>
            {`Total ${title.toLowerCase()}`}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default NewWidgetCard;
