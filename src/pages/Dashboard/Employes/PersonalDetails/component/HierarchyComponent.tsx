import React, { useState } from "react";
import {
  Box,
  Center,
  Grid,
  Heading,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Text,
  Flex,
} from "@chakra-ui/react";
import UserProfileCard from "./UserProfileCard";
import { FaAngleDown } from "react-icons/fa6";
import CurrentUser from "./CurrentUser/CurrentUser";
import { ApiResponse } from "./utils/constant";
import NormalTable from "../../../../../config/component/Table/NormalTable/NormalTable";
import ProfileCard from "../../../../main/Home/component/ProfileCard/ProfileCard";

const UserHierarchy: React.FC<ApiResponse> = ({ data }) => {
  const [showAllSubordinates, setShowAllSubordinates] = useState(false);

  const user = data.userDetails?.[0];
  const manager = user?.managerDetails?.[0];
  const subordinates: any = data.users || [];

  const toggleShowAllSubordinates = () => {
    setShowAllSubordinates(!showAllSubordinates);
  };

  return (
    <VStack align="stretch" spacing={2} alignItems="center">
      <Flex justify={'end'}>
        <ProfileCard user={user} />
      </Flex>
      <Center>
        <Box>
          <Heading as="h3" size="sm" mb={5} mt={2} textAlign="center">
            My Manager
          </Heading>
          {manager && <UserProfileCard userData={manager} />}
          <Center mt={5} mb={3}>
            <FaAngleDown fontSize={"24px"} />
          </Center>
        </Box>
      </Center>
      <Center>
        <CurrentUser userData={user} />
      </Center>
      <Box>
        <Center mt={2} mb={5}>
          <Flex direction="column" alignItems="center">
            <Heading as="h3" size="sm" mb={2} mt={2} alignItems="center">
              My Subordinates
            </Heading>
            {subordinates.length === 0 && (
              <>
                <FaAngleDown fontSize={"24px"} />
                <Text>No Subordinates Available</Text>
              </>
            )}
          </Flex>
        </Center>
        <Grid
          templateColumns={{ lg: "repeat(2,1fr)", xl: "repeat(3, 1fr)" }}
          gap={5}
          justifyContent="space-around"
        >
          {subordinates.slice(0, 5).map((subordinate: any, index: number) => (
            <Box key={index} cursor="pointer">
              <UserProfileCard
                userData={subordinate.userDetails}
                designation={subordinate?.companydetail?.designation[0]?.title}
              />
            </Box>
          ))}
          {subordinates.length > 5 && (
            <Box key={6} onClick={toggleShowAllSubordinates} cursor="pointer">
              <Center>
                <Button size="sm">
                  {showAllSubordinates ? "Show Less" : "Show More"}
                </Button>
              </Center>
            </Box>
          )}
        </Grid>
      </Box>

      <Modal
        isOpen={showAllSubordinates}
        onClose={toggleShowAllSubordinates}
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <NormalTable
              title="All Subordinates"
              columns={[
                { header: "Name", key: "name" },
                { header: "Code", key: "code" },
                { header: "Username", key: "username" },
                { header: "Department", key: "department" },
                { header: "Designation", key: "designation" },
              ]}
              data={
                subordinates?.length > 0
                  ? subordinates.map((subordinate: any) => {
                      console.log("the subordinates are", subordinate);
                      const designation =
                        subordinate.companydetail?.designation[0]?.title;
                      const department =
                        subordinate.companydetail?.department[0]?.title;
                      return {
                        name: subordinate.userDetails?.name,
                        username: subordinate.userDetails?.username,
                        designation: designation,
                        department: department,
                        code: subordinate.userDetails?.code,
                      };
                    })
                  : []
              }
              loading={false}
              totalPages={1}
              currentPage={1}
              onPageChange={() => {}}
            />
          </ModalBody>
          <ModalFooter m={-2}>
            <Button colorScheme="blue" onClick={toggleShowAllSubordinates}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default UserHierarchy;
