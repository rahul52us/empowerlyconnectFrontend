import {
  Box,
  Divider,
  Flex,
  Grid,
  HStack,
  Image,
  Stack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import ShowData from "../../../../Employes/component/EmployeDetails/component/ShowData";

interface TripData {
  _id: string;
  title: string;
  description: string;
  country: string;
  thumbnail: {
    name: string;
    url: string;
    type: string;
  };
  currency: string;
  type: string;
  isActive: boolean;
  createdBy: string;
  company: string;
  companyOrg: string;
  createdAt: string;
  participants: Array<{
    _id: string;
    username: string;
    role: string;
  }>;
  travelDetails: Array<{
    fromState: string;
    toState: string;
    fromCity: string;
    toCity: string;
    startDate: string;
    endDate: string;
    travelMode: string;
    travelCost: string;
    isCab: boolean;
    cabCost: string;
    isAccommodation: boolean;
    locality: string;
    durationOfStay: number;
    accommodationCost: string;
    _id: string;
  }>;
  additionalExpenses: Array<{
    type: string;
    amount: string;
    _id: string;
  }>;
}

const TripDetails: React.FC<{ trip: TripData }> = ({ trip }) => {
  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      bg="white"
      w="100%"
    >
      <HStack spacing={6} mb={2}>
        <Image
          borderRadius="md"
          boxSize="160px"
          // h={{ base: "200px", md: "200px" }}
          // w="50%"
          objectFit="contain"
          src={trip.thumbnail.url}
          alt={trip.thumbnail.name}
        />
        <VStack align="start" spacing={2} w="full">
          <Text fontSize="2xl" fontWeight="bold">
            {trip.title}
          </Text>
          <Text color="gray.600">{trip.description}</Text>
          <HStack spacing={2}>
            <Tag rounded={"full"} colorScheme="purple">
              {trip.country}
            </Tag>
            <Tag py={1} rounded={"full"} colorScheme="blue">
              {trip.type}
            </Tag>
            <Tag
              py={1}
              rounded={"full"}
              colorScheme={trip.isActive ? "green" : "red"}
            >
              {trip.isActive ? "Active" : "Inactive"}
            </Tag>
          </HStack>
          <Text fontSize="sm" color="gray.500">
            Created by {trip.createdBy} on{" "}
            {new Date(trip.createdAt).toLocaleDateString()}
          </Text>
        </VStack>
      </HStack>

      <Divider my={2} />

      <Stack spacing={6}>
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Travel Details
          </Text>
          {trip.travelDetails.map((detail) => (
            <Box
              key={detail._id}
              p={5}
              borderWidth="1px"
              borderRadius="xl"
              mb={4}
              //   bg="gray.50"
              boxShadow="md"
            >
              <Stack spacing={2}>
                <Text fontWeight="bold">
                  From {detail.fromCity}, {detail?.fromState} to {detail.toCity}
                  , {detail?.toState}
                </Text>
                <Tag colorScheme="telegram" w={"fit-content"}>
                  Date: {new Date(detail?.startDate).toLocaleDateString()} to{" "}
                  {new Date(detail?.endDate).toLocaleDateString()}
                </Tag>

                {/* <ShowData label='From Date' value={new Date(detail?.startDate).toLocaleDateString()} /> */}
                <Grid mt={2} templateColumns={"1fr 1fr 1fr"} gap={4}>
                  <ShowData label="Travel Mode" value={detail?.travelMode} />
                  <ShowData label="Travel Cost" value={detail?.travelCost} />
                  {detail.isCab && (
                    <ShowData label="Cab Cost" value={detail?.cabCost} />
                  )}

                  {detail.isAccommodation && (
                    <ShowData
                      label="Accommodation Cost (Rs)"
                      value={detail?.accommodationCost}
                    />
                  )}

                  <ShowData label="Locality" value={detail?.locality} />
                  {detail?.durationOfStay && (
                    <ShowData
                      label="Duration of Stay"
                      value={detail?.durationOfStay}
                    />
                  )}
                </Grid>
              </Stack>
            </Box>
          ))}
        </Box>
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Additional Expenses
          </Text>
          <Grid templateColumns="1fr 1fr" gap={4}>
            {trip?.additionalExpenses.map((expense) => (
              <Box
                key={expense._id}
                p={3}
                borderWidth={2}
                borderColor="gray.200"
                borderRadius="xl"
                bg="white"
                // boxShadow="lg"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "xl",
                }}
              >
                <Flex justify="space-between" align="center">
                  <Text
                    fontWeight="bold"
                    fontSize="lg"
                    textTransform={"capitalize"}
                  >
                    {expense?.type}
                  </Text>
                  {/* <Text color="gray.600">Amount:</Text>   */}
                  <Text fontSize={"lg"} fontWeight={500} colorScheme="green">
                    {trip?.currency} {expense?.amount}
                  </Text>
                </Flex>
              </Box>
            ))}
          </Grid>
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight="bold">
            Participants
          </Text>
          {trip.participants.map((participant) => (
            <HStack
              key={participant._id}
              spacing={2}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              mb={4}
              bg="gray.50"
              boxShadow="sm"
            >
              <Tag colorScheme="teal">{participant.role}</Tag>
              <Text>{participant.username}</Text>
            </HStack>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

export default TripDetails;
