import { Avatar, Box, Flex, Progress, Text, useColorModeValue } from "@chakra-ui/react";
import { FaClock, FaTrophy } from "react-icons/fa";

const MyCoursesCard = ({ course }: any) => {
  // const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const academyColor = useColorModeValue("gray.500", "gray.400");
  const progressColor = useColorModeValue("pink.500", "pink.300");
  const shadowColor = useColorModeValue("rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.4)");

  return (
    <Box
      p={4}
      bg={bgColor}
      rounded={12}
      
      boxShadow={`0 4px 6px ${shadowColor}`}
      _hover={{ boxShadow: `0 8px 10px ${shadowColor}` }}
      transition="box-shadow 0.3s ease"
    >
      <Flex gap={4}>
        <Avatar name={course.name} src={course.imageUrl} borderRadius={8} />
        <Box>
          <Text fontSize={"lg"} fontWeight={700} color={textColor}>
            {course.title}
          </Text>
          <Text fontSize={"sm"} color={academyColor} fontWeight={600}>
            {course.academy}
          </Text>
        </Box>
      </Flex>
      <Flex justify={"space-between"} mt={4} alignItems="center">
        <Flex align="center" gap={1}>
          <FaTrophy color={progressColor} />
          <Text fontSize={"sm"} color={textColor}>
            {course.completion}% Completed
          </Text>
        </Flex>
        <Flex align="center" gap={1}>
          <FaClock color={progressColor} />
          <Text fontSize={"sm"} color={textColor}>
            {course.timeLeft}
          </Text>
        </Flex>
      </Flex>
      <Progress
        value={course.completion}
        size="sm"
        colorScheme={course.colorScheme}
        mt={2}
        rounded={"full"}
        bg={useColorModeValue("gray.300", "gray.600")}
      />
    </Box>
  );
};

export default MyCoursesCard;
