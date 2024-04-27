import { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  // Heading,
  Image,
} from "@chakra-ui/react";
// import { BiGrid } from "react-icons/bi";
// import { FaList } from "react-icons/fa";
import FilterContainer from "../../../config/component/FilterContainer/FilterContainer";
import CourseCardContainer from "./CourseCardContainer/CourseCardContainer";
import { observer } from "mobx-react-lite";
import store from "../../../store/store";
// import CoursesPage from "./component/CoursesPage/CoursesPage";
import BgImg from "./component/bg2.jpeg";

const BlueishGradientBox = observer(() => {
  const {
    notesStore: { getCategories, categories },
    auth: { openNotification },
  } = store;

  useEffect(() => {
    if (!categories.hasFetch) {
      getCategories({ page: 1 })
        .then(() => {})
        .catch((err) => {
          openNotification({
            type: "error",
            message: err?.message,
            title: "Get Categories Failed",
          });
        });
    }
  }, [getCategories, categories.hasFetch, openNotification]);

  return (
    <Box>
      <Box position="relative" overflow="hidden">
        <Image
          src={BgImg}
          h={"25rem"}
          objectFit="cover"
          w={"100%"}
          filter={"brightness(0.4)"}
        />
        <Flex
          direction="column"
          align="center"
          justify="center"
          position="absolute"
          top="0"
          right="0"
          bottom="14"
          left="0"
        >
          <Flex alignItems="end" gap={4}>
            <Heading size="2xl" fontFamily={"heading"} color={"white"}>
              All Courses
            </Heading>
            <Button
              size={"sm"}
              border="1px solid white"
              bg="rgba(255, 255, 255, 0.05)"
              borderRadius={30}
              pt={2}
              pb={2}
              _hover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            >
              🎉 {categories?.data?.length} Courses
            </Button>
          </Flex>

          {/* <Text mt={2} color={"white"}>
            Courses that help beginner designers become true unicorns.
          </Text> */}
          <Box width="45%">
            <Box mt={5}>
              <FilterContainer />
            </Box>
          </Box>
        </Flex>
      </Box>
      <Container maxW={"8xl"}>
        <Box mt={10}>
          <CourseCardContainer />
        </Box>
      </Container>
    </Box>
  );
});

export default BlueishGradientBox;

{
  /* <Container maxW="7xl" style={{ marginTop: "60px" }}>
          <Box display="flex" alignItems="center">
            <Heading fontSize="5xl">All Courses</Heading>
            <Button
              border="1px solid white"
              bgColor="rgba(255, 255, 255, 0.05)"
              borderRadius={30}
              pt={6}
              pb={6}
              ml={10}
              mt={2}
              _hover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            >
              🎉 {categories?.data?.length} Courses
            </Button>
          </Box>
          <Text mt={4} fontWeight={500} position={"absolute"}>
            Courses that help beginner designers become true unicorns.
          </Text>
          <Box mt={10}>
            <ButtonGroup
              borderRadius={20}
              border="1px solid rgba(255, 255, 255, 0.05)"
              bgColor="rgba(255, 255, 255, 0.05)"
              p={2}
            >
              <Button
                borderRadius={20}
                w={100}
                leftIcon={<BiGrid />}
                bgColor={"blue.500"}
                color="white"
              >
                Grid
              </Button>
              <Button borderRadius={20} w={100} leftIcon={<FaList />}>
                List
              </Button>
            </ButtonGroup>
          </Box>
          <Box mt={5} mb={120}>
            <FilterContainer />
          </Box>
        </Container> */
}
