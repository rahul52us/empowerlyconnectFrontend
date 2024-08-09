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
  useColorModeValue,
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
    fromState?: string;
    toState?: string;
    fromCity?: string;
    toCity?: string;
    startDate: string;
    endDate: string;
    travelMode: string;
    travelCost: string;
    isCab: boolean;
    cabCost: string;
    isAccommodation?: boolean;
    locality?: string;
    durationOfStay?: number;
    accommodationCost?: string;
    _id: string;
  }>;
  additionalExpenses: Array<{
    type?: string;
    amount?: string;
    _id?: string;
  }>;
}

const TripDetails: React.FC<{ trip: TripData }> = ({ trip }) => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");
  const boxHoverBg = useColorModeValue("gray.100", "gray.900");

  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      bg={bgColor}
      w="100%"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={6}
        mb={2}
        align={{ base: "center", md: "start" }}
      >
        <Image
          borderRadius="md"
          boxSize={{ base: "120px", md: "160px" }}
          objectFit="contain"
          src={trip.thumbnail.url}
          alt={trip.thumbnail.name}
          mb={{ base: 4, md: 0 }}
        />
        <VStack align="start" spacing={2} w="full">
          <Text fontSize="2xl" fontWeight="bold" color={textColor}>
            {trip.title}
          </Text>
          <Text color={secondaryTextColor}>{trip.description}</Text>
          <HStack spacing={2}>
            <Tag rounded={"full"} colorScheme="purple">
              {trip.country}
            </Tag>
            <Tag
              textTransform={"capitalize"}
              py={1}
              rounded={"full"}
              colorScheme="blue"
            >
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
          <Text fontSize="sm" color={secondaryTextColor}>
            Created by {trip.createdBy} on{" "}
            {new Date(trip.createdAt).toLocaleDateString()}
          </Text>
        </VStack>
      </Flex>

      <Divider my={4} />

      <Stack spacing={6}>
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={2} color={textColor}>
            Travel Details
          </Text>
          {trip.travelDetails.map((detail) => (
            <Box
              key={detail._id}
              p={5}
              borderWidth="1px"
              borderRadius="xl"
              mb={4}
              bg={boxHoverBg}
              boxShadow="md"
            >
              <Stack spacing={2}>
                <Text fontWeight="bold" color={textColor}>
                  From {detail.fromCity}, {detail?.fromState} to {detail.toCity}
                  , {detail?.toState}
                </Text>
                <Tag colorScheme="telegram" w={"fit-content"}>
                  Date: {new Date(detail?.startDate).toLocaleDateString()} to{" "}
                  {new Date(detail?.endDate).toLocaleDateString()}
                </Tag>

                <Grid
                  mt={2}
                  templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                  gap={4}
                >
                  <ShowData label="Travel Mode" value={detail?.travelMode} />
                  <ShowData label="Travel Cost" value={detail?.travelCost} />
                  {detail.isCab && (
                    <ShowData label="Cab Cost" value={detail?.cabCost} />
                  )}

                  {detail.isAccommodation && (
                    <ShowData
                      label="Accommodation Cost"
                      value={detail?.accommodationCost}
                    />
                  )}

                  <ShowData label="Locality" value={detail?.locality} />
                  {detail?.durationOfStay && (
                    <ShowData
                      label="Duration of Stay"
                      value={`${detail?.durationOfStay} days`}
                    />
                  )}
                </Grid>
              </Stack>
            </Box>
          ))}
        </Box>
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4} color={textColor}>
            Additional Expenses
          </Text>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={4}
          >
            {trip?.additionalExpenses.map((expense) => (
              <Box
                key={expense._id}
                p={3}
                borderWidth={1}
                borderRadius="xl"
                bg={boxHoverBg}
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
                    color={textColor}
                  >
                    {expense?.type}
                  </Text>
                  <Text fontSize={"lg"} fontWeight={500} color="green.400">
                    {trip?.currency} {expense?.amount}
                  </Text>
                </Flex>
              </Box>
            ))}
          </Grid>
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight="bold" color={textColor}>
            Participants
          </Text>
          {trip.participants.map((participant) => (
            <HStack
              key={participant?._id}
              spacing={2}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              mb={4}
              bg={boxHoverBg}
              boxShadow="sm"
            >
              <Tag colorScheme="teal">{participant?.role}</Tag>
              <Text color={textColor}>{participant?.username}</Text>
            </HStack>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

export default TripDetails;
