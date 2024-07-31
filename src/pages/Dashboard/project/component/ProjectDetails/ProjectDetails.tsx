import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { FaCalendar, FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineDescription } from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
import { TbProgress, TbTags } from "react-icons/tb";
// import ProjectAttachments from "../ProjectAttachments/ProjectAttachments";
import AttachmentSection from "../ProjectAttachments/ProjectAttachments";
import store from "../../../../../store/store";

const ProjectDetails = () => {
  const {
    Project: { setOpenTaskDrawer },
  } = store;
  return (
    <Box pl={4}>
      <Flex justifyContent={"space-between"}>
        <Text fontWeight={500} fontSize={"2xl"}>
          Name of the Project
        </Text>
        <Button
          onClick={() => {
            setOpenTaskDrawer("create");
          }}
        >
          Create Task
        </Button>
      </Flex>
      <VStack spacing={6} mt={6} align={"start"}>
        <Grid templateColumns={"1fr 4fr"} gap={4} w={"full"}>
          <Flex gap={2} align={"center"} color={"gray"} fontWeight={500}>
            <Icon as={TbProgress} />
            <Text>Status</Text>
          </Flex>
          <Text fontWeight={700}>In Progress</Text>
        </Grid>
        <Grid templateColumns={"1fr 4fr"} gap={4} w={"full"}>
          <Flex gap={2} align={"center"} color={"gray"} fontWeight={500}>
            <Icon as={FaCalendar} />
            <Text>Due Date</Text>
          </Flex>
          <Text fontWeight={700}>4 March 2024</Text>
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

        <Grid templateColumns={"1fr 4fr"} gap={4} w={"full"}>
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
            <Text>Description</Text>
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
    </Box>
  );
};

export default observer(ProjectDetails);
