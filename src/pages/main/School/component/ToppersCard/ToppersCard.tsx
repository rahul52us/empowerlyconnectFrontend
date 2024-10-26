import {
  Box,
  Card,
  Image,
  Tag,
  Text,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Divider,
  Button,
  Grid,
  GridItem,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function ToppersCard({
  percentage,
  name,
  img,
  year,
  classs,
  bio,
}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Bio truncation for the card view
  const bioLines = bio.split("\n");
  const shortBio = bioLines.slice(0, 2).join("\n");

  // Color themes
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorderColor = useColorModeValue("gray.300", "gray.700");
  const overlayGradient = "linear(to-b, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8))";
  const headerBg = useColorModeValue("teal.500", "teal.400");
  const headerTextColor = useColorModeValue("white", "gray.100");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const bioTextColor = useColorModeValue("gray.600", "gray.400");
  const tagColorScheme = useColorModeValue("purple", "cyan");

  return (
    <Card
      shadow="lg"
      maxW={{ base: "100%", md: "100%" }}
      rounded="lg"
      my={6}
      overflow="hidden"
      position="relative"
      transition="transform 0.3s, box-shadow 0.3s"
      _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
      bg={cardBg}
      borderWidth={1}
      borderColor={cardBorderColor}
      onClick={onOpen}
      cursor="pointer"
    >
      {/* Image with overlay */}
      <Box position="relative">
        <Image
          w="100%"
          h={{ base: "180px", md: "200px" }}
          objectFit="cover"
          src={img}
          alt={`${name}'s achievement`}
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgGradient={overlayGradient}
          opacity="0.8"
        />
      </Box>

      <Box p={5}>
        <HStack justify="space-between" mb={2}>
          <Tag colorScheme="orange" fontWeight="bold" borderRadius="full" px={3}>
            <FaStar style={{ marginRight: 4 }} /> {percentage}%
          </Tag>
          <Text fontWeight="medium" color={textColor} fontSize="sm">
            {year}
          </Text>
        </HStack>

        {/* Name and Class */}
        <Text fontSize="lg" fontWeight="bold" color={textColor} mb={2}>
          {name}
        </Text>
        <Tag size="sm" colorScheme={tagColorScheme} variant="solid" borderRadius="full">
          Class: {classs}
        </Tag>

        <Divider borderColor={cardBorderColor} my={3} />

        {/* Bio Preview */}
        <Text fontSize="sm" color={bioTextColor} noOfLines={2}>
          {shortBio}
        </Text>
      </Box>

      {/* Modal for full details */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            alignItems="center"
            bg={headerBg}
            color={headerTextColor}
            borderTopRadius="md"
          >
            <Image
              borderRadius="full"
              boxSize="50px"
              src={img}
              alt={`${name}'s achievement`}
              mr={4}
            />
            <Text fontSize="lg" fontWeight="bold">
              {name}'s Details
            </Text>
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody p={6} bg={cardBg}>
            <VStack spacing={4} align="stretch">
              <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
                <GridItem>
                  <Text fontSize="lg" color={textColor} fontWeight="bold">
                    <strong>Class:</strong> {classs}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="lg" color={textColor} fontWeight="bold">
                    <strong>Year:</strong> {year}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="lg" color={textColor} fontWeight="bold">
                    <strong>Percentage:</strong> {percentage}%
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="lg" color={textColor} textAlign="justify">
                    <strong>Bio:</strong> {bio}
                  </Text>
                </GridItem>
              </Grid>
              <Flex justify="flex-end">
                <Button
                  colorScheme="teal"
                  onClick={onClose}
                  variant="solid"
                  _hover={{ bg: "teal.500", color: "white" }}
                >
                  Close
                </Button>
              </Flex>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
}
