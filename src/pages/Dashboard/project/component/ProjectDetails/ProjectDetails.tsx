import { CalendarIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  IconButton,
  // IconButton,
  // Image,
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaPeopleGroup } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";
import { MdOutlineDescription } from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
import { TbProgress, TbTags } from "react-icons/tb";
import store from "../../../../../store/store";
import AttachmentSection from "../ProjectAttachments/ProjectAttachments";
import TaskTable from "../TaskTable/TaskTable";
import { observer } from "mobx-react-lite";

const ProjectDetails = ({ selectedProject }: any) => {
  const {
    Project: { setOpenProjectDrawer },
  } = store;

  const gridColumns = "1fr 4fr";
  return (
    <Box pl={2}>
      <Flex justifyContent={"space-between"} align={"start"}>
        <Text fontWeight={500} fontSize={"2xl"}>
          Name of the Project
        </Text>
        <IconButton
          onClick={() => {
            setOpenProjectDrawer("edit", selectedProject);
          }}
          aria-label="Edit"
          icon={<EditIcon />}
        />
      </Flex>
      <VStack spacing={6} mt={6} align={"start"}>
        <Grid templateColumns={"1fr 4fr"} gap={4} w={"full"}>
          <Flex gap={2} align={"center"} color={"gray"} fontWeight={500}>
            <Icon as={TbProgress} />
            <Text>Status</Text>
          </Flex>
          <Tag colorScheme="green" rounded={"full"} w={"fit-content"}>
            In Progress
          </Tag>
        </Grid>
        <Grid templateColumns={gridColumns} rowGap={5} columnGap={4} w={"full"}>
          <Flex gap={2} align={"center"} color={"gray"} fontWeight={500}>
            <Icon as={CalendarIcon} />
            <Text>Start Date</Text>
          </Flex>
          <Text fontWeight={700}>14 March 2024</Text>
          <Flex gap={2} align={"center"} color={"gray"} fontWeight={500}>
            <Icon as={CalendarIcon} />
            <Text>Due Date</Text>
          </Flex>
          <Text fontWeight={700}>20 December 2024</Text>
        </Grid>

        <Grid templateColumns={gridColumns} gap={4} w={"full"}>
          <Flex gap={2} align={"center"} color={"gray"} fontWeight={500}>
            <Icon as={GrUserManager} />
            <Text>Manager</Text>
          </Flex>
          <Text fontWeight={700}>Ayush Yadav</Text>
        </Grid>

        <Grid
          templateColumns={"1fr 4fr"}
          gap={4}
          alignItems={"center"}
          w={"full"}
        >
          <Flex gap={2} align={"center"} color={"gray"} fontWeight={500}>
            <Icon as={TbTags} />
            <Text>Tags</Text>
          </Flex>
          <Flex gap={3}>
            {[0, 1, 2].map((item) => (
              <Tag
                // fontSize={"sm"}
                w={"fit-content"}
                colorScheme="purple"
                key={item}
              >
                Backend
              </Tag>
            ))}
          </Flex>
        </Grid>

        <Grid templateColumns={gridColumns} gap={4} w={"full"}>
          <Flex gap={2} align={"center"} color={"gray"} fontWeight={500}>
            <Icon as={FaPeopleGroup} />
            <Text>Team</Text>
          </Flex>
          <Flex align={"center"} justify={"space-between"}>
            <Flex wrap={"wrap"} gap={2} align={"start"}>
              {[0, 1, 2].map((item) => (
                <Tag
                  size="lg"
                  colorScheme="telegram"
                  borderRadius="full"
                  w={"fit-content"}
                  key={item}
                >
                  <Avatar
                    src="https://bit.ly/sage-adebayo"
                    size="xs"
                    name="Segun Adebayo"
                    ml={-1}
                    mr={2}
                  />
                  <TagLabel>Ayush Yadav</TagLabel>
                </Tag>
              ))}
            </Flex>
            <Button
              leftIcon={<RiUserAddLine />}
              variant="outline"
              size={"sm"}
              rounded={"full"}
            >
              Invite
            </Button>
          </Flex>
        </Grid>

        <Box mt={2}>
          <Flex gap={2} align={"center"} color={"gray.600"} fontWeight={500}>
            <Icon boxSize={5} as={MdOutlineDescription} />
            <Text fontWeight={500}>Description</Text>
          </Flex>
          <Text
            color={"gray.500"}
            fontSize={"sm"}
            p={2}
            borderWidth={2}
            rounded={12}
            mt={2}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sed
            delectus accusantium repellat eligendi odit beatae perferendis vel
            illum. Voluptate ex nulla magni accusantium architecto quibusdam
            velit, est dicta modi! ashd aosid asodas d09
          </Text>
        </Box>
        <AttachmentSection />
      </VStack>
      <Box py={4}>
        <TaskTable />
      </Box>
    </Box>
  );
};

export default observer(ProjectDetails);
