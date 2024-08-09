import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Icon,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { HiDotsHorizontal } from "react-icons/hi";

// Assuming you have a function to fetch avatar URLs
const getAvatarUrl = (userId: string) => {
  // Placeholder logic to fetch the avatar URL
  return `https://api.example.com/avatars/${userId}.jpg`;
};

 const TaskCard = ({ task }: any) => {
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.4)",
    "rgba(255, 255, 255, 0.055)"
  );
  const borderColor = useColorModeValue(
    "gray.200",
    "rgba(255, 255, 255, 0.3)"
  );

  const { title, description, priority, team_members, endDate } = task;

  // Mapping team members to avatars
  const avatars = team_members.map((member: any) => ({
    name: `User ${member?.user}`, // Replace with actual user names if available
    src: getAvatarUrl(member?.user),
  }));

  return (
    <Box
      p={4}
      boxShadow="md"
      borderRadius="xl"
      borderColor={borderColor}
      bg={bgColor}
      backdropFilter="blur(10px)"
      _hover={{
        backdropFilter: "blur(15px)",
      }}
    >
      <Flex justify={"space-between"} align={"center"}>
        <Tag variant={"subtle"} rounded={"full"} colorScheme="cyan" py={"1.5"}>
          {priority}
        </Tag>
        <Icon cursor={"pointer"} as={HiDotsHorizontal} boxSize={5} />
      </Flex>
      <Text mt={1} fontSize={"xl"} fontWeight={"bold"}>
        {title}
      </Text>
      <Text fontSize={"sm"} color={"gray.500"}>
        {description}
      </Text>
      <Flex align={"center"} justify={"space-between"} mt={2}>
        <AvatarGroup size="sm" max={3}>
          {avatars.map((avatar: any, index: number) => (
            <Avatar key={index} name={avatar?.name} src={avatar?.src} />
          ))}
        </AvatarGroup>
        <Tag colorScheme="orange">{new Date(endDate).toLocaleDateString()}</Tag>
      </Flex>
    </Box>
  );
};

export default observer(TaskCard);

// Assuming you are mapping over an array of tasks
