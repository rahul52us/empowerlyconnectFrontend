import { Box, Divider, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { main } from "../../../../../../constant/routes";

const CoursesMenus = () => {
    return (
      <Box>
        <VStack align="stretch" spacing={4}>
          <Text fontSize="lg" fontWeight="bold">
            Popular Courses
          </Text>
          <Divider />
          <Link to={`${main.courses}`}>Introduction to React</Link>
          <Link to={`${main.courses}`}>JavaScript Fundamentals</Link>
          <Link to={`${main.courses}`}>Python for Beginners</Link>
        </VStack>
        <VStack align="stretch" spacing={4} mt={4}>
          <Text fontSize="lg" fontWeight="bold">
            Recent Courses
          </Text>
          <Divider />
          <Link to={`${main.courses}`}>Data Structures and Algorithms</Link>
          <Link to={`${main.courses}`}>Machine Learning Basics</Link>
          <Link to={`${main.courses}`}>Web Development Bootcamp</Link>
        </VStack>
      </Box>
    );
};

export default CoursesMenus