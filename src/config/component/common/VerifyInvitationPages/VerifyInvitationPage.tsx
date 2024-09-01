import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  VStack,
  Heading,
  Flex,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

const verifyInvitationPage = observer(() => {
  const { invitationType, token } = useParams();

  useEffect(() => {
    // Perform verification logic or API calls here
    console.log("Invitation Type:", invitationType);
    console.log("Token:", token);
  }, [invitationType, token]);

  // Function to generate the message based on invitationType
  const getMessage = (type: any) => {
    switch (type) {
      case "team":
        return "You have been invited to join our team. This is your chance to collaborate with talented professionals and contribute to our success!";
      case "project":
        return "You have been invited to collaborate on a project. We are excited to see what we can achieve together!";
      case "event":
        return "You have been invited to an exclusive event. Join us for a memorable experience!";
      default:
        return "You have been invited to join us. We are looking forward to your participation!";
    }
  };

  // Using theme values for colors and background
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const headingColor = useColorModeValue("teal.600", "teal.400");

  return (
    <Flex
      minHeight="104%"
      direction={{ base: "column", md: "row" }}
      m={-3.5}
      bg={bgColor}
    >
      {/* Left Section with Image */}
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={{ base: 6, md: 8 }}
      >
        <Image
          src="https://decisive-attraction-317cbbe3f7.media.strapiapp.com/Document_Verification_illustration_2e81eb006f.svg"
          alt="Invitation Background"
          objectFit="contain"
          width="80%"
          height="80%"
        />
      </Box>

      {/* Right Section with Text and Buttons */}
      <Flex
        flex="1"
        alignItems="center"
        justifyContent="center"
        p={{ base: 6, md: 12 }}
      >
        <VStack spacing={6} maxW="lg" align="flex-start">
          <Heading fontSize={{ base: "2xl", md: "3xl" }} color={headingColor}>
            You're Invited!
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color={textColor}>
            {getMessage(invitationType)}
          </Text>
          <VStack spacing={4} width="100%">
            <Button colorScheme="teal" size="lg" width="full">
              Confirm Invitation
            </Button>
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
});

export default verifyInvitationPage;
