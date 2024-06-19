import React from "react";
import { Box, Center, Flex, Grid, Heading, VStack } from "@chakra-ui/react";
import UserProfileCard from "./UserProfileCard";
import { FaAnglesDown } from "react-icons/fa6";
import CurrentUser from "./CurrentUser/CurrentUser";
import { ApiResponse } from "./utils/constant";
import ProfileCard from "../../../../main/Home/component/ProfileCard/ProfileCard";

const UserHierarchy: React.FC<ApiResponse> = ({ data }) => {
  const user: any = data.userDetails?.[0];
  const manager = user?.managerDetails?.[0];
  const subordinates: any = data.users || [];

  return (
    <Box>
      <Flex position={"absolute"} right={0}>
        <ProfileCard user={user} />
      </Flex>

      <VStack align={"stretch"} spacing={6}>
        <Center>
          <Box>
            <Heading as="h3" size="sm" mb={2}>
              My Manager
            </Heading>
            {manager && <UserProfileCard userData={manager} />}
            <Center mt={2}>
              <FaAnglesDown fontSize={"24px"} />
            </Center>
          </Box>
        </Center>
        <Center>
          <Box>
            <CurrentUser userData={user} />
            <Center mt={2}>
              <FaAnglesDown fontSize={"24px"} />
            </Center>
          </Box>
        </Center>

        <Box>
          <Heading as="h3" size="sm" mb={2}>
            My Subordinates
          </Heading>
          <Grid
            templateColumns={{ md: "repeat(4,1fr)", lg: "repeat(5, 1fr)" }}
            gap={4}
          >
            {subordinates.map((subordinate: any, index: number) => (
              <UserProfileCard
                key={index}
                userData={subordinate.userDetails}
                designation={subordinate?.companydetail?.designation[0]?.title}
              />
            ))}
          </Grid>
        </Box>
      </VStack>
    </Box>
  );
};

export default UserHierarchy;
