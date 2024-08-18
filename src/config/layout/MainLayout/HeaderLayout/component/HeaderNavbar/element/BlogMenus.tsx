import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import store from "../../../../../../../store/store";
import { useEffect } from "react";
import {
  Box,
  Divider,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

const BlogsMenus = observer(() => {
  const navigate = useNavigate();
  const {
    BlogStore: { getBlogs, blogs },
    auth: { openNotification },
  } = store;

  const hoverBg = useColorModeValue("blue.50", "blue.900");
  const borderWidth = useColorModeValue(1, 0);

  useEffect(() => {
    getBlogs({ page: 1, limit: 15 })
      .then(() => {})
      .catch((err: any) => {
        openNotification({
          title: "GET Blogs Failed",
          message: err.message,
          type: "error",
        });
      });
  }, [openNotification, getBlogs]);

  const blogCategories = [
    {
      title: "Featured Blogs",
    },
    {
      title: "Latest Posts",
    },
  ];

  return (
    <Box>
      {blogCategories.map((category: any) => (
        <VStack key={category.title} align="stretch" spacing={2}>
          <Text fontSize="lg" fontWeight="bold" color="blue.600" mt={2}>
            {category.title}
          </Text>
          <Divider borderColor="blue.200" />
          {blogs.data.map((blog: any, index: number) => (
            <Text
              cursor="pointer"
              transition="0.3s"
              _hover={{
                textDecoration: "none",
                bg: hoverBg,
                transform: "scale(1.02)",
              }}
              borderWidth={borderWidth}
              fontSize={"sm"}
              bg="whiteAlpha.100"
              p={2}
              borderRadius="xl"
              key={index}
              onClick={() => {
                navigate(`/blog/${blog?.title.split(" ").join("-")}`, {
                  state: blog?._id,
                });
              }}
            >
              {blog.title}
            </Text>
          ))}
        </VStack>
      ))}
    </Box>
  );
});

export default BlogsMenus;
