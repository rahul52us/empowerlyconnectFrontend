import {
  Box,
  Divider,
  Flex,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { observer } from "mobx-react-lite";
import HeaderProfile from "./HeaderProfile/HeaderProfile";
import HeaderNotification from "./HeaderNotification/HeaderNotification";
import HeaderThemeSwitch from "./HeaderThemeSwitch/HeaderThemeSwitch";
import HeaderLanguageSwitch from "./HeaderLanguageSwitch/HeaderLanguageSwitch";
import HeaderChatMessage from "./HeaderChatMessage/HeaderChatMessage";
import Header from "../../../../dashboardLayout/HeaderLayout/menu/HeaderMenu";
import { main } from "../../../../../constant/routes";
import { Link, useNavigate } from "react-router-dom";
import store from "../../../../../../store/store";
import { useEffect } from "react";

const HeaderNavbar = observer(() => {
  const [isLargerThan1020] = useMediaQuery("(min-width: 1020px)");

  return (
    <Flex
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      width={isLargerThan1020 ? "45%" : "10%"}
    >
      {isLargerThan1020 ? (
        <>
          <Header title="Home" link={main.home} />
          <Header title="About" link={main.about} />
          <Header title="Blogs" link={main.blog} Menus={BlogsMenus} />
          <Header title="Courses" link={main.courses} Menus={CoursesMenus} />
          <Header title="Faq" link={main.faq} />
          <Box display="none">
            <HeaderLanguageSwitch />
            <HeaderThemeSwitch />
            <HeaderChatMessage />
            <HeaderNotification />
          </Box>
          <HeaderProfile />
        </>
      ) : (
        <FaBars cursor="pointer" />
      )}
    </Flex>
  );
});

export default HeaderNavbar;

const CoursesMenus = () => {
  return (
    <Box>
      <VStack align="stretch" spacing={4}>
        <Text fontSize="lg" fontWeight="bold">
          Popular Courses
        </Text>
        <Divider />
        <Link to="/">Introduction to React</Link>
        <Link to="">JavaScript Fundamentals</Link>
        <Link to="">Python for Beginners</Link>
      </VStack>
      <VStack align="stretch" spacing={4} mt={4}>
        <Text fontSize="lg" fontWeight="bold">
          Recent Courses
        </Text>
        <Divider />
        <Link to="">Data Structures and Algorithms</Link>
        <Link to="">Machine Learning Basics</Link>
        <Link to="">Web Development Bootcamp</Link>
      </VStack>
    </Box>
  );
};

const BlogsMenus = observer(() => {
  const navigate = useNavigate()
  const {
    BlogStore: { getBlogs, blogs },
    auth: { openNotification },
  } = store;

  useEffect(() => {
    getBlogs()
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
