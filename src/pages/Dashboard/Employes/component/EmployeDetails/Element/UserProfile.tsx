// Import necessary dependencies
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaBuilding, FaFileAlt, FaUser } from "react-icons/fa";
import store from "../../../../../../store/store";
import ShowData from "../component/ShowData";
import userData from "./dummyEmployeeData.json";

const UserProfile: React.FC<any> = ({ employeeId }) => {
  const [employeeData, setEmployeeData] = useState<any>();

  const user = userData;

  console.log(employeeData);

  const [tabIndex, setTabIndex] = useState(0);
  console.log(employeeData);

  const {
    Employe: { getEmployesDetailsById },
    auth: { openNotification },
  }: any = store;

  useEffect(() => {
    if (employeeId) {
      getEmployesDetailsById(employeeId)
        .then((details: any) => {
          setEmployeeData(details);

          // openNotification("Employee details fetched successfully");
        })
        .catch((error: any) => {
          console.error("Failed to fetch employee details", error);
          // openNotification("Failed to fetch employee details", "error");
        });
    }
  }, [employeeId, getEmployesDetailsById, openNotification]);

  return (
    <Box>
      {/* Profile Header */}
      <Box p={2} mb={4} bg={"gray.100"}>
        <HStack spacing={6}>
          <Avatar
            name={user?.name}
            src="https://bit.ly/dan-abramov"
            boxSize={"85px"}
            size={"lg"}
          />
          <VStack align="start" spacing={0}>
            <Heading fontSize={"2xl"} textTransform={"capitalize"}>
              {user?.title} {user?.name}
            </Heading>
            <Text fontSize="lg" fontWeight="semibold" color={"gray"}>
              {user?.designation.join(", ")}
            </Text>
            <Text>{user?.bio}</Text>
          </VStack>
        </HStack>
      </Box>

      {/* Tabs */}
      <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
        <TabList fontWeight={500} gap={6}>
          <Tab fontWeight={500}> Details</Tab>
          <Tab fontWeight={500}> Personal</Tab>
          <Tab fontWeight={500}> Docs & Bank</Tab>
          <Tab fontWeight={500}>Resume</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box p={2}>
              <Text fontWeight={"bold"}>Basic Information</Text>
              <Divider my={2} borderColor="gray.300" />
              <Grid templateColumns={"1fr 1.5fr"} gap={4}>
                <ShowData label="Name" value={user?.name} />
                <ShowData label="Email" value={user?.username} />
                <ShowData
                  label="Phone"
                  value={user?.profileDetails[0]?.mobileNo}
                />
                <ShowData label="Employee Code" value={user?.code} />
                <ShowData
                  label="Languages"
                  type="multi"
                  value={user?.profileDetails[0]?.language}
                />
                <ShowData
                  label="Designation"
                  value={user?.designation}
                  type="multi"
                />
                <ShowData label="Employment Type" value={user?.role} />
                <ShowData
                  label="Referred By"
                  value={user?.profileDetails[0]?.refferedBy}
                />
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box p={2}>
              <Text fontWeight={"bold"}>Personal Information</Text>
              <Divider my={2} borderColor="gray.300" />
              <Grid templateColumns={"2fr 3fr"} gap={4}>
                {" "}
                {user?.profileDetails?.map((detail) => (
                  <React.Fragment key={detail?._id}>
                    <ShowData label="Nickname" value={detail?.nickName} />
                    <ShowData
                      label="Personal Email"
                      value={detail?.personalEmail}
                    />
                    <ShowData
                      label="Date of Birth"
                      value={new Date(detail?.dob).toLocaleDateString()}
                    />
                    <ShowData label="Mobile Number" value={detail?.mobileNo} />
                    <ShowData
                      label="Emergency Number"
                      value={detail?.emergencyNo}
                    />
                    <ShowData label="Blood Group" value={detail?.bloodGroup} />
                    <ShowData label="PAN Number" value={detail?.panNo} />
                    <ShowData label="Aadhar Number" value={detail?.aadharNo} />
                    <ShowData label="PF UAN Number" value={detail?.pfUanNo} />
                    <ShowData
                      label="Marital Status"
                      value={detail?.maritalStatus}
                    />
                    <ShowData
                      label="Insurance Card Number"
                      value={detail?.insuranceCardNo}
                    />
                    <ShowData
                      label="Health Card Number"
                      value={detail?.healthCardNo}
                    />
                    <ShowData
                      label="Wedding Date"
                      value={new Date(detail?.weddingDate).toLocaleDateString()}
                    />
                    <ShowData
                      label="Medical Certification Details"
                      value={detail?.medicalCertificationDetails}
                    />
                  </React.Fragment>
                ))}
              </Grid>
              <Box rounded={14} mt={6} shadow={"sm"}>
                <Heading size="sm" mb={2}>
                  Address Info
                </Heading>
                <Divider my={2} borderColor="gray.300" />

                <Grid templateColumns={"1fr 1fr"} gap={4}>
                  {user.profileDetails[0]?.addressInfo.map((address) => (
                    <React.Fragment key={address?._id}>
                      <ShowData label="Address" value={address?.address} />
                      <ShowData label="Country" value={address?.country} />
                      <ShowData label="State" value={address?.state} />
                      <ShowData label="City" value={address?.city} />
                      <ShowData label="Pin Code" value={address?.pinCode} />
                    </React.Fragment>
                  ))}
                </Grid>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel>

          <Box p={5}>
      <SimpleGrid columns={[1, null, 1]} spacing={5}>
        {/* Bank Details */}
        <Card rounded={16} boxShadow="lg" bg={'gray.50'}>
          <CardHeader  >
              <Heading size="md">Bank Details</Heading>
          </CardHeader>
          <CardBody>
            {user.bankDetails.map((bank) => (
              <Grid key={bank._id} gap={4} templateColumns={'1fr 1fr'}>
                <Box>
                  <Text fontWeight="bold">Account Number:</Text>
                  <Text>{bank.accountNumber}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Bank Name:</Text>
                  <Text>{bank.bankName}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Branch:</Text>
                  <Text>{bank.branch}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">IFSC Code:</Text>
                  <Text>{bank.ifscCode}</Text>
                </Box>
              </Grid>
            ))}
          </CardBody>
        </Card>

        {/* Documents */}
        <Card borderRadius="md" boxShadow="md">
          <CardHeader bg="blue.500" color="white" borderTopRadius="md">
            <HStack spacing={3}>
              <Icon as={FaFileAlt} boxSize={6} />
              <Heading size="md">Documents</Heading>
            </HStack>
          </CardHeader>
          <CardBody>
            {user.documents.map((doc) => (
              <HStack key={doc._id} spacing={4} alignItems="center" borderBottom="1px" borderColor="gray.200" py={2}>
                <Icon as={FaFileAlt} boxSize={6} color="blue.500" />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold">{doc.documentType}</Text>
                  <Text>{doc.documentNumber}</Text>
                </VStack>
              </HStack>
            ))}
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
          </TabPanel>
          <TabPanel>
            <Grid>
              <Box
                p={4}
                borderWidth={1}
                borderRadius="md"
                bg="white"
                boxShadow="md"
              >
                <HStack mb={4}>
                  <Icon as={FaUser} boxSize={6} color="teal.500" />
                  <Heading as="h2" size="md">
                    Basic Info
                  </Heading>
                </HStack>
                <VStack align="start" spacing={2}>
                  <Text>
                    <strong>Email:</strong>{" "}
                    {user?.profileDetails[0]?.personalEmail}
                  </Text>
                  <Text>
                    <strong>Username:</strong> {user?.username}
                  </Text>
                  <Text>
                    <strong>Mobile:</strong> {user?.profileDetails[0]?.mobileNo}
                  </Text>
                  <Text>
                    <strong>Emergency No:</strong>{" "}
                    {user?.profileDetails[0]?.emergencyNo}
                  </Text>
                  <Text>
                    <strong>Blood Group:</strong>{" "}
                    {user?.profileDetails[0]?.bloodGroup}
                  </Text>
                  <Text>
                    <strong>Pan No:</strong> {user?.profileDetails[0]?.panNo}
                  </Text>
                  <Text>
                    <strong>Aadhar No:</strong>{" "}
                    {user?.profileDetails[0]?.aadharNo}
                  </Text>
                </VStack>
              </Box>

              <Box
                p={4}
                borderWidth={1}
                borderRadius="md"
                bg="white"
                boxShadow="md"
              >
                <HStack mb={4}>
                  <Icon as={FaBuilding} boxSize={6} color="teal.500" />
                  <Heading as="h2" size="md">
                    Address
                  </Heading>
                </HStack>
                <VStack align="start" spacing={2}>
                  <Text>
                    <strong>Address:</strong>{" "}
                    {user?.profileDetails[0]?.addressInfo[0]?.address}
                  </Text>
                  <Text>
                    <strong>City:</strong>{" "}
                    {user?.profileDetails[0]?.addressInfo[0]?.city}
                  </Text>
                  <Text>
                    <strong>State:</strong>{" "}
                    {user?.profileDetails[0]?.addressInfo[0]?.state}
                  </Text>
                  <Text>
                    <strong>Country:</strong>{" "}
                    {user?.profileDetails[0]?.addressInfo[0]?.country}
                  </Text>
                  <Text>
                    <strong>Pin Code:</strong>{" "}
                    {user?.profileDetails[0]?.addressInfo[0]?.pinCode}
                  </Text>
                </VStack>
              </Box>

              <Box
                p={4}
                borderWidth={1}
                borderRadius="md"
                bg="white"
                boxShadow="md"
              >
                <HStack mb={4}>
                  <Icon as={FaFileAlt} boxSize={6} color="teal.500" />
                  <Heading as="h2" size="md">
                    Personal Documents
                  </Heading>
                </HStack>
                <VStack align="start" spacing={2}>
                  <Text>
                    <strong>Insurance Card No:</strong>{" "}
                    {user?.profileDetails[0]?.insuranceCardNo}
                  </Text>
                  <Text>
                    <strong>Medical Certification:</strong>{" "}
                    {user?.profileDetails[0]?.medicalCertificationDetails}
                  </Text>
                  <Text>
                    <strong>Wedding Date:</strong>{" "}
                    {user?.profileDetails[0]?.weddingDate}
                  </Text>
                  <Text>
                    <strong>Referred By:</strong>{" "}
                    {user?.profileDetails[0]?.refferedBy}
                  </Text>
                </VStack>
              </Box>
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default UserProfile;
