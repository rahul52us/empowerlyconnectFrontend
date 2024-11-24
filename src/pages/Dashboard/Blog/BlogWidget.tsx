import React from "react";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Tag,
  Text,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { FaTags } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { dashboard } from "../../../config/constant/routes";

interface BlogData {
  _id: string;
  title: string;
  subTitle: string;
  isPrivate: boolean;
  tags: string[];
  comments: any[];
  coverImage?: {
    url: string;
    alt: string;
  };
  createdBy: {
    pic: {
      name: string;
      url: string;
      type: string;
    };
    _id: string;
    name: string;
    username: string;
    createdAt: string;
  };
  createdAt: string;
  reactions: any[];
}

const BlogWidget: React.FC<{ blog: BlogData }> = ({ blog }) => {
  const navigate = useNavigate()
  const cardBg = useColorModeValue("white", "gray.800");
  const tagBg = useColorModeValue("blue.100", "blue.700");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const subtitleColor = useColorModeValue("gray.600", "gray.400");
  const coverFallback = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      bg={cardBg}
      borderRadius="xl"
      boxShadow="lg"
      overflow="hidden"
      transition="transform 0.2s ease-in-out, box-shadow 0.2s ease"
      _hover={{
        transform: "scale(1.01)",
        boxShadow: "sm",
      }}
      cursor="pointer"
      maxW="lg"
      m="auto"
      mb={6}
    >
      <Box bg={coverFallback} h="200px" position="relative">
        {blog?.coverImage?.url ? (
          <Image
            src={blog.coverImage.url}
            alt={blog.coverImage.alt || "Blog Cover"}
            objectFit="cover"
            width="100%"
            height="100%"
            transition="opacity 0.3s ease"
            _hover={{ opacity: 0.8 }}
          />
        ) : (
          <Flex
            h="100%"
            justifyContent="center"
            alignItems="center"
            color="gray.500"
            fontWeight="bold"
          >
            No Cover Image
          </Flex>
        )}
      </Box>

      <Box p={6}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading
            as="h2"
            size="md"
            textTransform="capitalize"
            fontWeight="semibold"
            onClick={() => navigate(`${dashboard.blog.index}/edit/${blog.title?.split(' ').join('-')}`)}
          >
            {blog?.title}
          </Heading>
          <Text
            fontSize="sm"
            fontWeight="bold"
            color={blog.isPrivate ? "red.500" : "green.500"}
          >
            {blog?.isPrivate ? "Private" : "Public"}
          </Text>
        </Flex>

        <Text
  mb={4}
  color={subtitleColor}
  fontSize="sm"
  lineHeight="1.6"
  noOfLines={2} // Chakra's built-in property for limiting lines
  sx={{
    display: "-webkit-box",
    WebkitLineClamp: "2", // Limit to 2 lines
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }}
>
  <Box as="span" dangerouslySetInnerHTML={{ __html: blog.subTitle }} />
</Text>


        <HStack spacing={3} wrap="wrap" mb={4}>
          <Icon as={FaTags} color="blue.500" />
          {blog?.tags?.map((tag) => (
            <Tooltip key={tag} label={tag} aria-label="Tag Tooltip">
              <Tag
                size="md"
                bg={tagBg}
                color="blue.800"
                textTransform="capitalize"
                fontWeight="medium"
                transition="background-color 0.2s ease"
                _hover={{ bg: "blue.500", color: "white" }}
              >
                {tag}
              </Tag>
            </Tooltip>
          ))}
        </HStack>

        <Flex alignItems="center" p={4} borderRadius="md" mb={4}>
          <Avatar
            name={blog?.createdBy?.name}
            src={blog?.createdBy?.pic?.url}
            size="lg"
            mr={4}
            borderWidth={2}
            borderColor="blue.500"
          />
          <Box>
            <Text fontWeight="bold" fontSize="lg" color={textColor}>
              {blog?.createdBy?.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              @{blog?.createdBy?.username}
            </Text>
          </Box>
        </Flex>

        <Flex justify="space-between" align="center">
          <HStack spacing={2}>
            <Icon as={BsFillPersonFill} color="green.500" />
            <Text fontSize="sm" color={textColor}>
              Created At:{" "}
              {new Date(blog?.createdAt).toLocaleString("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </Text>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default BlogWidget;