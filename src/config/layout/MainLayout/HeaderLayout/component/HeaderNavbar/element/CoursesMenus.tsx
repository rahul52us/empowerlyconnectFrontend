import { Box, Divider, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

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

export default CoursesMenus