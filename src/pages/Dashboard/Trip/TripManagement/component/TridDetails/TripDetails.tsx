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
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { MdLocationOn, MdEvent, MdAttachMoney } from "react-icons/md";
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
  createdBy: any;
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
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const secondaryTextColor = useColorModeValue("gray.500", "gray.400");
  const boxHoverBg = useColorModeValue("gray.50", "gray.700");

  return (
    <Box
      p={{ base: 5, md: 10 }}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      bg={bgColor}
      w="100%"
    >
      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={10}
        mb={8}
        align={{ base: "center", lg: "start" }}
      >
        <Image
          borderRadius="lg"
          boxSize={{ base: "150px", lg: "200px" }}
          objectFit="cover"
          src={trip.thumbnail.url}
          alt={trip.thumbnail.name}
          mb={{ base: 4, lg: 0 }}
          boxShadow="md"
        />
        <VStack align="start" spacing={4} w="full">
          <Text fontSize="3xl" fontWeight="bold" color={textColor}>
            {trip.title}
          </Text>
          <Text color={secondaryTextColor} fontSize="md">
            {trip.description}
          </Text>
          <HStack spacing={4}>
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
          Created by {trip.createdBy && trip?.createdBy?.length > 0 && trip?.createdBy[0]?.username} on{" "}
          {new Date(trip.createdAt).toLocaleDateString()}
          </Text>
        </VStack>
      </Flex>

      <Divider my={6} />

      <Stack spacing={6}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold" mb={6} color={textColor}>
            Travel Details
          </Text>
          {trip.travelDetails.map((detail) => (
            <Box
              key={detail._id}
              p={6}
              borderWidth="1px"
              borderRadius="xl"
              mb={4}
              bg={boxHoverBg}
              boxShadow="md"
              transition="all 0.3s ease"
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: "xl",
              }}
            >
              <Stack spacing={4}>
                <HStack spacing={3} align="center">
                  <Icon as={MdLocationOn} color="blue.500" />
                  <Text fontWeight="bold" color={textColor} fontSize="lg">
                    From {detail.fromCity}, {detail?.fromState} to{" "}
                    {detail.toCity}, {detail?.toState}
                  </Text>
                </HStack>
                <HStack spacing={3} align="center">
                  <Icon as={MdEvent} color="blue.500" />
                  <Tag colorScheme="telegram" w={"fit-content"}>
                    Date: {new Date(detail?.startDate).toLocaleDateString()} to{" "}
                    {new Date(detail?.endDate).toLocaleDateString()}
                  </Tag>
                </HStack>

                <Grid
                  mt={4}
                  templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                  gap={8}
                >
                  <ShowData label="Travel Mode" value={detail?.travelMode} />
                  <ShowData
                    label="Travel Cost"
                    value={`${trip.currency} ${detail?.travelCost}`}
                  />
                  {detail.isCab && (
                    <ShowData
                      label="Cab Cost"
                      value={`${trip.currency} ${detail?.cabCost}`}
                    />
                  )}
                  {detail.isAccommodation && (
                    <ShowData
                      label="Accommodation Cost"
                      value={`${trip.currency} ${detail?.accommodationCost}`}
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

        {trip.additionalExpenses.length > 0 && (
          <Box>
            <Text fontSize="2xl" fontWeight="bold" mb={6} color={textColor}>
              Additional Expenses
            </Text>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={8}
            >
              {trip?.additionalExpenses.map((expense) => (
                <Box
                  key={expense._id}
                  p={5}
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
                    <Text
                      fontSize={"xl"}
                      fontWeight="bold"
                      color="green.400"
                      display="flex"
                      alignItems="center"
                    >
                      <Icon as={MdAttachMoney} mr={1} />
                      {trip?.currency} {expense?.amount}
                    </Text>
                  </Flex>
                </Box>
              ))}
            </Grid>
          </Box>
        )}

        <Box>
          <Text fontSize="2xl" fontWeight="bold" color={textColor} mb={6}>
            Participants
          </Text>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            {trip.participants.map((participant) => (
              <HStack
                key={participant?._id}
                spacing={4}
                p={5}
                borderWidth="1px"
                borderRadius="md"
                bg={boxHoverBg}
                boxShadow="sm"
              >
                <Tag colorScheme="teal" size="lg">
                  {participant?.role}
                </Tag>
                <Text color={textColor}>{participant?.username}</Text>
              </HStack>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};

export default TripDetails;
