import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    HStack,
    Icon,
    Step,
    StepIndicator,
    StepNumber,
    Stepper,
    StepSeparator,
    StepStatus,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { FaBuilding, FaCalendarAlt, FaClock, FaUserTie } from "react-icons/fa";

const CompanyDetails = ({ data }: any) => {
  const currentDetails = data[0];
  const current = currentDetails?.details[0];

  const cardBg = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
//   const sectionBg = useColorModeValue("gray.200", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box >
      {/* Current Details Section */}
      <Card
        rounded={16}
        boxShadow="0 0 10px rgba(0,0,0,0.07)"
        borderWidth={1}
        borderColor={borderColor}
        bg={cardBg}
        mb={8}
      >
        <CardHeader pb={0}>
          <Heading color="blue.600" size="md">
            Current Details
          </Heading>
        </CardHeader>
        <CardBody pt={2}>
          <HStack
            spacing={4}
            alignItems="center"
            borderBottom="1px"
            borderColor={borderColor}
            py={2}
          >
            <Icon as={FaUserTie} boxSize={6} color="blue.500" />
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold" color={textColor}>
                Department
              </Text>
              <Text color={textColor}>{current.department}</Text>
            </VStack>
          </HStack>
          <HStack
            spacing={4}
            alignItems="center"
            borderBottom="1px"
            borderColor={borderColor}
            py={2}
          >
            <Icon as={FaBuilding} boxSize={6} color="blue.500" />
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold" color={textColor}>
                Location
              </Text>
              <Text color={textColor}>
                {current.workingLocation.join(", ")}
              </Text>
            </VStack>
          </HStack>
          <HStack
            spacing={4}
            alignItems="center"
            borderBottom="1px"
            borderColor={borderColor}
            py={2}
          >
            <Icon as={FaClock} boxSize={6} color="blue.500" />
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold" color={textColor}>
                Work Timing
              </Text>
              <Text color={textColor}>{current.workTiming.join(", ")}</Text>
            </VStack>
          </HStack>
          <HStack
            spacing={4}
            alignItems="center"
            borderBottom="1px"
            borderColor={borderColor}
            py={2}
          >
            <Icon as={FaCalendarAlt} boxSize={6} color="blue.500" />
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold" color={textColor}>
                Date of Joining
              </Text>
              <Text color={textColor}>
                {new Date(current.doj).toLocaleDateString()}
              </Text>
            </VStack>
          </HStack>
          <HStack
            spacing={4}
            alignItems="center"
            borderBottom="1px"
            borderColor={borderColor}
            py={2}
          >
            <Icon as={FaCalendarAlt} boxSize={6} color="blue.500" />
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold" color={textColor}>
                Confirmation Date
              </Text>
              <Text color={textColor}>
                {new Date(current.confirmationDate).toLocaleDateString()}
              </Text>
            </VStack>
          </HStack>
          <Box py={2}>
            <Text fontWeight="bold" color={textColor}>
              Description
            </Text>
            <Text color={textColor}>{current.description}</Text>
          </Box>
        </CardBody>
      </Card>

      {/* Work History Section */}
      <Box p="6" rounded="md" shadow="md">
        <Heading size="md" mb={4} color="blue.600">Work History</Heading>
        <Stepper index={0} orientation="vertical" gap={0} size="lg">
          {currentDetails.workHistory.map((history:any, index:any) => (
            <Step key={index} >
              <StepIndicator>
                <StepStatus
                  complete={<StepNumber />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <StepSeparator />
              <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
                mt={4}
                mb={8}
                position="relative"
                textAlign="left"
              >
                <Box
                  p={4}
                  bg={cardBg}
                  borderRadius="md"
                  shadow="md"
                  borderColor={borderColor}
                  borderWidth={1}
                  maxW="500px"
                >
                  <Text fontSize="lg" fontWeight="bold" mb={1} color={textColor}>{history.companyName}</Text>
                  <Text color={textColor}><strong>Duration:</strong> {history.duration}</Text>
                  <Text color={textColor}><strong>Role:</strong> {history.role}</Text>
                </Box>
              </Flex>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
};

export default CompanyDetails;
