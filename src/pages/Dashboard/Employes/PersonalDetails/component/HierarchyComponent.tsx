import React from "react";
import { Box, Grid, Heading } from "@chakra-ui/react";
import UserProfileCard from "./UserProfileCard";

interface User {
  _id: string;
  username: string;
  name: string;
  code: string;
  title: string;
  userDetails:any;
}

interface UserDetails extends User {
  profiledetails: {
    aadharNo: string;
    bloodGroup: string;
    dob: string;
    emergencyNo: string;
    healthCardNo: string;
    insuranceCardNo: string;
    maritalStatus: string;
    medicalCertificationDetails: string;
    mobileNo: string;
    nickName: string;
    panNo: string;
    personalEmail: string;
    pfUanNo: string;
    refferedBy: string;
    weddingDate: string;
  };
  designation: { title: string }[];
  department: { title: string }[];
  managerDetails: User[];
}

interface UserHierarchyProps {
  data: {
    userDetails: UserDetails[];
    users: User[];
  };
}

const UserHierarchy: React.FC<UserHierarchyProps> = ({ data }) => {
  const user = data.userDetails?.[0];
  const manager = user?.managerDetails?.[0];
  const subordinates = data.users || [];

  return (
    <Box p={4}>
      <Heading as="h2" size="md" mb={4}>
        User Hierarchy
      </Heading>

      <Box mb={4}>
        <Heading as="h3" size="sm" mb={2}>
          Manager
        </Heading>
        {manager && <UserProfileCard userData={manager} />}
      </Box>

      <Box mb={4}>
        <Heading as="h3" size="sm" mb={2}>
          Current User
        </Heading>
        {user && <UserProfileCard userData={user} />}
      </Box>

      <Box>
        <Heading as="h3" size="sm" mb={2}>
          Subordinates
        </Heading>
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4}>
          {subordinates.map((subordinate: User, index) => (
            <UserProfileCard key={index} userData={subordinate.userDetails} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default UserHierarchy;
