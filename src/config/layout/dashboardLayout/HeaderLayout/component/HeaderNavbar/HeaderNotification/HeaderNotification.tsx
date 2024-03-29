import React from "react";
import {
  Badge,
  Box,
  Divider,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import styles from './blinking.module.css';
import { FiBell } from "react-icons/fi";
import { useState } from "react";
import { BiTime } from "react-icons/bi";

interface Notification {
  id: number;
  type: "message" | "deadline" | "update";
  text: string;
  time: string;
  image?: string;
}

const HeaderNotification: React.FC = () => {
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      type: "message",
      text: "New message received",
      time: "10 min",
      image:
        "https://res.cloudinary.com/dsckn1jjj/image/upload/v1711637410/taskManager/modified.jpg",
    },
    {
      id: 2,
      type: "deadline",
      text: "Task deadline approaching",
      time: "1 hour",
      image:
        "https://res.cloudinary.com/dsckn1jjj/image/upload/v1711674003/taskManager/334843157_977901480284799_1399147790687063389_n%20%281%29.jpg", // Placeholder image URL
    },
    {
      id: 3,
      type: "update",
      text: "New update available",
      time: "2 days",
      image:
        "https://res.cloudinary.com/dsckn1jjj/image/upload/v1711651813/taskManager/WhatsApp%20Image%202024-03-29%20at%2000.13.36_33e5c4ea.jpg",
    },
    {
      id: 4,
      type: "update",
      text: "New update available",
      time: "2 days",
      image:
        "https://res.cloudinary.com/dsckn1jjj/image/upload/v1711635563/taskManager/WhatsApp%20Image%202024-03-20%20at%2017.54.37_3199f02c_magicstudio_2h8r6rwgi0g.png",
    },
    { id: 5, type: "update", text: "New update available", time: "2 days" },
  ]);

  const unreadCount = notifications.length;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const MessageContainer = ({ item }: any) => {
    return (
      <Flex flexDirection="column" cursor="pointer">
        <Flex
          p={4}
          borderBottom="2px solid lightgray"
          justifyContent="space-between"
        >
          <Flex alignItems="center">
            <Image
              src={item.image}
              borderRadius="full"
              boxSize="45px"
              objectFit="cover"
              title={item.type}
            />
            <Flex flexDirection="column" ml={3}>
              <Text fontWeight="bold">{item.type}</Text>
              <Text fontSize="sm" color="gray.600" maxWidth="300px">
                {item.text}
              </Text>
            </Flex>
          </Flex>
          <Flex alignItems="center">
            <BiTime fontSize="xs" />
            <Text fontSize="xs" ml={2}>
              {item.time}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex position="relative" align="center">
      <Menu isOpen={isOpen} onClose={onClose} closeOnSelect={false}>
        <MenuButton
          as={IconButton}
          icon={<FiBell />}
          variant="ghost"
          aria-label="Notifications"
          fontSize="xl"
          onClick={onOpen}
          mr={2}
        />
        <MenuList minWidth="350px" p={0} borderRight={10} mt={1.5}>
          <Flex
            m={0}
            p={3}
            pb={3.5}
            bgColor="#3b4650"
            justifyContent="space-between"
            alignItems="center"
            textColor="white"
            borderRadius={5}
            borderBottomRightRadius={0}
            borderBottomLeftRadius={0}
          >
            <Box>
              <Text>Notifications</Text>
            </Box>
            <Flex columnGap={4}>
              <Text textDecoration="underline" cursor="pointer">
                mark as read
              </Text>
              <Text textDecoration="underline" cursor="pointer">
                clear
              </Text>
            </Flex>
          </Flex>
          <Box maxHeight="300px" overflowY="auto">
            {notifications.map((item: any, index: number) => {
              return <MessageContainer item={item} key={index} />;
            })}
          </Box>
          {notifications.length === 0 && (
            <Flex h="120px" justifyContent="center" flexDirection="column">
              <Box>
                <Text fontSize="sm" cursor="pointer" textAlign="center">
                  No notifications Are found
                </Text>
              </Box>
            </Flex>
          )}
          <Divider />
          <Flex justifyContent="center" p={3} bgColor="#f6f7fb">
            <Text
              textDecoration="underline"
              fontSize="sm"
              cursor="pointer"
              fontWeight="bold"
            >
              Show All
            </Text>
          </Flex>
        </MenuList>
      </Menu>
      <>
      {unreadCount > 0 && (
        <Badge
          className={styles.blink}
          position="absolute"
          top="-2px"
          right="-3px"
          borderRadius="full"
          variant="solid"
          colorScheme="red"
          fontSize="0.8em"
          px={2}
          py={1}
        >
          {unreadCount}
        </Badge>
      )}
    </>
    </Flex>
  );
};

export default HeaderNotification;
