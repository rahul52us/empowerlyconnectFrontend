import React from "react";
import { Box, Center, Grid, Heading, VStack } from "@chakra-ui/react";
import UserProfileCard from "./UserProfileCard";
import { FaAnglesDown } from "react-icons/fa6";
import CurrentUser from "./CurrentUser/CurrentUser";

import { ApiResponse } from "./utils/constant";

// interface User {
//   _id: string;
//   username: string;
//   name: string;
//   code: string;
//   title: string;
//   userDetails: any;

// }

// interface UserDetails extends User {
//   profiledetails: {
//     aadharNo: string;
//     bloodGroup: string;
//     dob: string;
//     emergencyNo: string;
//     healthCardNo: string;
//     insuranceCardNo: string;
//     maritalStatus: string;
//     medicalCertificationDetails: string;
//     mobileNo: string;
//     nickName: string;
//     panNo: string;
//     personalEmail: string;
//     pfUanNo: string;
//     refferedBy: string;
//     weddingDate: string;
//   };
//   designation: { title: string }[];
//   department: { title: string }[];
//   managerDetails: User[];
// }

// interface UserHierarchyProps {
//   data: {
//     userDetails: UserDetails[];
//     users: User[];
//   };
// }

const UserHierarchy: React.FC<ApiResponse> = ({ data }) => {
  const user = data.userDetails?.[0];
  const manager = user?.managerDetails?.[0];
  const subordinates: any = data.users || [];

  // console.log(
  //   "subordinates",
  //   subordinates[0].companydetail.designation[0].title
  // );

  return (
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
        <CurrentUser userData={user} />
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
  );
};

export default UserHierarchy;
