import { CalendarIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  IconButton,
  Image,
  Tag,
  TagLabel,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { GrUserManager } from "react-icons/gr";
import { MdOutlineDescription } from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
import { TbProgress } from "react-icons/tb";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import store from "../../../../../store/store";
import AttachmentSection from "../ProjectAttachments/ProjectAttachments";
import TaskTable from "../TaskTable/TaskTable";
import DrawerLoader from "../../../../../config/component/Loader/DrawerLoader";
import {
  formatDate,
  formatDateTime,
  LONG_DATE_FORMAT,
} from "../../../../../config/constant/dateUtils";
import { generateProjectInitialValues } from "../utils/function";
import { FaPeopleGroup } from "react-icons/fa6";
import { BiTagAlt } from "react-icons/bi";
import AddNewUser from "./component/AddNewUser";

const ProjectDetails = ({ selectedProject }: any) => {
  const [addNewUser, setAddNewUser] = useState<any>({
    type: null,
    data: null,
    open: false,
  });
  const {
    Project: { setOpenProjectDrawer, getSingleProject },
  } = store;

  const [fetchProjectData, setFetchProjectData] = useState<any>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    setFetchProjectData({ loading: true, data: null });
    getSingleProject({ id: selectedProject?._id })
      .then((data: any) => {
        setFetchProjectData({
          loading: false,
          data: generateProjectInitialValues(data.data),
        });
      })
      .catch(() => {
        setFetchProjectData({ loading: false, data: null });
      });
  }, [getSingleProject, selectedProject]);

  const placeholderImage =
    "https://via.placeholder.com/300x400?text=No+thumbnail+found";

  // Theme-aware colors
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const descBgColor = useColorModeValue("gray.50", "gray.700");
  const labelColor = useColorModeValue("gray.600", "gray.400"); // Adjust label color based on theme

  return (
    <>
      <DrawerLoader
        loading={fetchProjectData.loading}
        noRecordFoundText={!fetchProjectData.data}
        height="25vh"
      >
        <Box
          p={3}
          bg={bgColor}
          rounded="lg"
          shadow="lg"
          borderWidth={1}
          borderColor={borderColor}
        >
          {/* Logo and Title Section */}
          <Flex justifyContent={"end"}>
            <IconButton
              onClick={() => setOpenProjectDrawer("edit", selectedProject)}
              aria-label="Edit"
              icon={<EditIcon />}
              variant="outline"
              colorScheme="teal"
              size="sm"
              ml={3}
            />
          </Flex>
          <Flex direction="column" align="center" mb={4} px={4} py={3}>
            <Image
              src={fetchProjectData?.data?.logo?.file?.url || placeholderImage}
              alt={fetchProjectData?.data?.logo?.file?.name || "Project Logo"}
              borderRadius="full"
              boxSize={{ base: "120px", md: "150px" }}
              objectFit="cover"
              mb={2}
            />
            <Text
              fontWeight="bold"
              fontSize="3xl"
              color={textColor}
              textAlign="center"
            >
              {fetchProjectData?.data?.project_name}
            </Text>
            <Text fontSize="md" color={labelColor} textAlign="center" mt={1}>
              {fetchProjectData?.data?.subtitle}
            </Text>
          </Flex>

          {/* Project Details */}
          <VStack spacing={8} align="start" w="full">
            <Flex
              gap={2}
              w="full"
              borderBottom="1px"
              borderColor={borderColor}
              pb={4}
              justifyContent="space-between"
              flexDirection={{ base: "column", sm: "row" }}
            >
              <Flex>
                <Flex
                  gap={2}
                  align="center"
                  color={labelColor}
                  fontWeight="medium"
                >
                  <Icon as={TbProgress} boxSize={5} />
                  <Text>Status :- </Text>
                </Flex>
                <Tag ml={2} colorScheme="yellow" rounded="full" w="fit-content">
                  {fetchProjectData?.data?.status?.value}
                </Tag>
              </Flex>
              <Flex>
                <Flex
                  gap={2}
                  align="center"
                  color={labelColor}
                  fontWeight="medium"
                >
                  <Text>Create Date:-</Text>
                </Flex>
                <Tag ml={2} colorScheme="green" rounded="full" w="fit-content">
                  {formatDateTime(fetchProjectData?.data?.createdAt)}
                </Tag>
              </Flex>
            </Flex>

            <Grid
              templateColumns={{ base: "1fr", md: "1fr 3fr" }}
              gap={6}
              w="full"
            >
              <Flex
                gap={2}
                align="center"
                color={labelColor}
                fontWeight="medium"
              >
                <Icon as={CalendarIcon} boxSize={5} />
                <Text>Start Date</Text>
              </Flex>
              <Text fontWeight="bold">
                {formatDate(
                  fetchProjectData?.data?.startDate,
                  LONG_DATE_FORMAT
                )}
              </Text>
              <Flex
                gap={2}
                align="center"
                color={labelColor}
                fontWeight="medium"
              >
                <Icon as={CalendarIcon} boxSize={5} />
                <Text>End Date</Text>
              </Flex>
              <Text fontWeight="bold">
                {formatDate(fetchProjectData?.data?.endDate, LONG_DATE_FORMAT)}
              </Text>
              <Flex
                gap={2}
                align="center"
                color={labelColor}
                fontWeight="medium"
              >
                <Icon as={CalendarIcon} boxSize={5} />
                <Text>Due Date</Text>
              </Flex>
              <Text fontWeight="bold">
                {formatDate(fetchProjectData?.data?.dueDate, LONG_DATE_FORMAT)}
              </Text>
            </Grid>

            <Grid
              templateColumns={{ base: "1fr", md: "1fr 3fr" }}
              gap={6}
              w="full"
            >
              <Flex
                gap={2}
                align="center"
                color={labelColor}
                fontWeight="medium"
              >
                <Icon as={BiTagAlt} boxSize={5} />
                <Text>Tags</Text>
              </Flex>
              <Flex wrap="wrap" gap={2}>
                {fetchProjectData?.data?.tags?.map(
                  (item: any, index: number) => (
                    <Tag
                      size="lg"
                      colorScheme="teal"
                      borderRadius="full"
                      key={index}
                    >
                      <TagLabel>{item}</TagLabel>
                    </Tag>
                  )
                )}
                <Button
                  leftIcon={<RiUserAddLine />}
                  variant="outline"
                  size="sm"
                  rounded="full"
                >
                  Add New
                </Button>
              </Flex>
            </Grid>

            <Grid
              templateColumns={{ base: "1fr", md: "1fr 3fr" }}
              gap={6}
              w="full"
            >
              <Flex
                gap={2}
                align="center"
                color={labelColor}
                fontWeight="medium"
              >
                <Icon as={GrUserManager} boxSize={5} />
                <Text>Manager</Text>
              </Flex>
              <Flex wrap="wrap" gap={2}>
                {fetchProjectData?.data?.project_manager?.map(
                  (item: any, index: number) => (
                    <Tag
                      size="lg"
                      colorScheme="teal"
                      borderRadius="full"
                      key={index}
                    >
                      <Avatar
                        src="https://bit.ly/sage-adebayo"
                        size="xs"
                        ml={-1}
                        mr={2}
                      />
                      <TagLabel>{item?.user?.username}</TagLabel>
                    </Tag>
                  )
                )}
                <Button
                  leftIcon={<RiUserAddLine />}
                  variant="outline"
                  size="sm"
                  rounded="full"
                  onClick={() =>
                    setAddNewUser({ type: "manager", open: true, data: "user" })
                  }
                >
                  Invite New
                </Button>
              </Flex>
            </Grid>

            <Grid
              templateColumns={{ base: "1fr", md: "1fr 3fr" }}
              gap={6}
              w="full"
            >
              <Flex
                gap={2}
                align="center"
                color={labelColor}
                fontWeight="medium"
              >
                <Icon as={FaPeopleGroup} boxSize={5} />
                <Text>Team</Text>
              </Flex>
              <Flex wrap="wrap" gap={3}>
                {fetchProjectData?.data?.team_members?.map(
                  (item: any, index: number) => (
                    <Tag
                      size="lg"
                      colorScheme="teal"
                      borderRadius="full"
                      key={index}
                    >
                      <Avatar
                        src="https://bit.ly/sage-adebayo"
                        size="xs"
                        ml={-1}
                        mr={2}
                      />
                      <TagLabel>{item?.user?.username}</TagLabel>
                    </Tag>
                  )
                )}
                <Button
                  leftIcon={<RiUserAddLine />}
                  variant="outline"
                  size="sm"
                  rounded="full"
                >
                  Invite New
                </Button>
              </Flex>
            </Grid>

            <Grid
              templateColumns={{ base: "1fr", md: "1fr 3fr" }}
              gap={6}
              w="full"
            >
              <Flex
                gap={2}
                align="center"
                color={labelColor}
                fontWeight="medium"
              >
                <Icon as={FaPeopleGroup} boxSize={5} />
                <Text>Followers</Text>
              </Flex>
              <Flex wrap="wrap" gap={3}>
                {fetchProjectData?.data?.followers?.map(
                  (item: any, index: number) => (
                    <Tag
                      size="lg"
                      colorScheme="teal"
                      borderRadius="full"
                      key={index}
                    >
                      <Avatar
                        src="https://bit.ly/sage-adebayo"
                        size="xs"
                        ml={-1}
                        mr={2}
                      />
                      <TagLabel>{item?.user?.username}</TagLabel>
                    </Tag>
                  )
                )}
                <Button
                  leftIcon={<RiUserAddLine />}
                  variant="outline"
                  size="sm"
                  rounded="full"
                >
                  Invite New
                </Button>
              </Flex>
            </Grid>

            <Grid
              templateColumns={{ base: "1fr", md: "1fr 3fr" }}
              gap={6}
              w="full"
            >
              <Flex
                gap={2}
                align="center"
                color={labelColor}
                fontWeight="medium"
              >
                <Icon as={MdOutlineDescription} boxSize={5} />
                <Text>Description</Text>
              </Flex>
              <Box bg={descBgColor} p={4} rounded="md" shadow="sm" w="full">
                <Text>{fetchProjectData?.data?.description}</Text>
              </Box>
            </Grid>
          </VStack>

          {/* Attachments */}
          <Box mt={2}>
            <AttachmentSection
              attach_files={fetchProjectData.data?.attach_files || []}
            />
          </Box>
          {/* Tasks Table */}
          <Box mt={3}>
            <TaskTable />
          </Box>
        </Box>
      </DrawerLoader>
      {addNewUser.open && addNewUser.data && (
        <AddNewUser
          open={addNewUser.open}
          type={addNewUser.type}
          data={addNewUser.data}
          close={() => setAddNewUser({ open: false, data: null, type: null })}
        />
      )}
    </>
  );
};

export default observer(ProjectDetails);
