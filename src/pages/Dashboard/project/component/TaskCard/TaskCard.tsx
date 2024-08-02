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
  import { HiDotsHorizontal } from "react-icons/hi";
  
  const TaskCard = ({ title, description, category, avatars, deadline }:any) => {
    const bgColor = useColorModeValue("rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.055)");
    const borderColor = useColorModeValue("rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.3)");
  
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
            {category}
          </Tag>
          <Icon cursor={"pointer"} as={HiDotsHorizontal} boxSize={5} />
        </Flex>
        <Text mt={2} fontSize={"xl"} fontWeight={"bold"}>
          {title}
        </Text>
        <Text fontSize={"sm"} mt={1} color={"gray.500"}>
          {description}
        </Text>
        <Flex align={"center"} justify={"space-between"} mt={4}>
          <AvatarGroup size="sm" max={3}>
            {avatars.map((avatar:any, index:number) => (
              <Avatar key={index} name={avatar.name} src={avatar.src} />
            ))}
          </AvatarGroup>
          <Tag colorScheme="orange">{deadline}</Tag>
        </Flex>
      </Box>
    );
  };
  
  export default TaskCard;
  