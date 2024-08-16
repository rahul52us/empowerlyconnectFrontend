import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import store from "../../../../../../../store/store";
import { useEffect } from "react";
import { Box, Divider, Text, VStack } from "@chakra-ui/react";

const BlogsMenus = observer(() => {
    const navigate = useNavigate()
    const {
      BlogStore: { getBlogs, blogs },
      auth: { openNotification },
    } = store;

    useEffect(() => {
      getBlogs({page : 1, limit : 15})
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
        title: "Featured Blogs"
      },
      {
        title: "Latest Posts"
      },
    ];

    return (
      <Box>
        {blogCategories.map((category: any) => (
          <VStack key={category.title} align="stretch" spacing={3}>
            <Text fontSize="xl" fontWeight="bold" color="blue.600" mt={3}>
              {category.title}
            </Text>
            <Divider borderColor="blue.200" />
            {blogs.data.map((blog: any, index: number) => (
              <Text cursor="pointer" key={index} onClick={() => {
                navigate(`/blog/${blog?.title.split(" ").join("-")}`, {
                  state: blog?._id,
                });
              }}>
                {blog.title}
              </Text>
            ))}
          </VStack>
        ))}
      </Box>
    );
});

export default BlogsMenus