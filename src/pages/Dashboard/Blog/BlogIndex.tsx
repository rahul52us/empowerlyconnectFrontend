import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import DashPageHeader from "../../../config/component/common/DashPageHeader/DashPageHeader";
import { tripBreadCrumb } from "../utils/breadcrumb.constant";
import {
  FaHome,
  FaPlus,
  FaProjectDiagram,
  FaTasks,
  FaUsers,
} from "react-icons/fa";
import SummaryWidget from "../../../config/component/WigdetCard/SummaryWidget";
import { useNavigate } from "react-router-dom";
import { dashboard } from "../../../config/constant/routes";
import BlogsLayout from "./BlogsLayout";

const BlogIndex = observer(() => {
  const navigate = useNavigate();
  const showIcon = useBreakpointValue({ base: true, md: false });

  const summaryData = [
    {
      label: "Total Projects",
      value: 10,
      icon: FaProjectDiagram,
      colorScheme: "teal",
      description: "Total number of projects.",
      loading: false,
    },
    {
      label: "Total Tasks",
      value: 128,
      icon: FaTasks,
      colorScheme: "blue",
      description: "Total number of tasks across all projects.",
      loading: false,
    },
    {
      label: "Team Members",
      value: 10,
      icon: FaUsers,
      colorScheme: "purple",
      description: "The number of active team members.",
      loading: false,
    },
  ];

  return (
    <Box p={2} borderRadius="lg" boxShadow="lg">
      <DashPageHeader
        breadcrumb={tripBreadCrumb.index}
        btnAction={(type: any) => {
          alert(type);
        }}
      />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={6}>
        {summaryData.map((data, index) => (
          <SummaryWidget
            key={index}
            label={data.label}
            value={data.value}
            icon={data.icon}
            colorScheme={data.colorScheme}
            description={data.description}
            loading={data.loading}
          />
        ))}
      </SimpleGrid>

      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Heading
          display="flex"
          alignItems="center"
          fontSize={{ base: "xl", md: "2xl" }}
          color="teal.600"
        >
          <Icon as={FaHome} boxSize={6} mr={2} />
          Blogs
        </Heading>
        {showIcon ? (
          <IconButton
            title="Create Blog"
            aria-label="Create Blog"
            icon={<FaPlus />}
            colorScheme="teal"
          />
        ) : (
          <Flex columnGap={4}>
            <Button
              leftIcon={<FaPlus />}
              colorScheme="teal"
              variant="solid"
              size="lg"
              _hover={{ bg: "teal.600" }}
              _active={{ bg: "teal.700" }}
              _focus={{ boxShadow: "outline" }}
              onClick={() => navigate(dashboard.blog.create)}
            >
              CREATE BLOG
            </Button>
          </Flex>
        )}
      </Flex>
      <Box mt={2}>
        <BlogsLayout />
      </Box>
    </Box>
  );
});

export default BlogIndex;
