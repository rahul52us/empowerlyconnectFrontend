import { useState, useEffect } from "react";
import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import { FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const WidgetCard = ({
  totalCount,
  title,
  link,
}: {
  totalCount: number;
  title: string;
  link: string;
}) => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const intervalDelay = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < totalCount) {
        setCount(count + 1);
      }
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [count, totalCount]);

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={3}
      bgGradient="linear(to-r, #4FACFE, #2B8FF7)"
      boxShadow="lg"
      // _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
      cursor="pointer"
      transition="transform 0.2s, box-shadow 0.2s"
      color="white"
      onClick={() => navigate(link)}
    >
      <Text fontSize="md" fontWeight="semibold" mb={3}>
        {title}
      </Text>

      <Flex justify="space-between" alignItems="center" mb={1}>
        <Icon as={FiUsers} boxSize={8} mr={2} />
        <Text fontSize="3xl" fontWeight="bold">
          {count < totalCount ? count : totalCount}
        </Text>
      </Flex>
      <Flex justify="space-between" alignItems="center">
        <Text>completed orders</Text>
        <Text fontSize="sm" fontWeight="bold">
          {count < totalCount ? count : totalCount}
        </Text>
      </Flex>
    </Box>
  );
};

export default WidgetCard;
