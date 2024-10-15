import { Box, Grid, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

const MapSection = () => {
  return (
    <Box my={10} width="100%">
      <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={6}>
        <Box>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1308.3472934977735!2d77.14517463054085!3d28.495267891737505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1ef6a6ac4793%3A0x323e6e261abec9af!2sAarya%20Kid's%20Garden%20School!5e0!3m2!1sen!2sin!4v1728752051958!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="map-section"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>

        <VStack
          align="start"
          spacing={4}
          p={6}
          borderWidth={1}
          borderRadius="xl"
          boxShadow="md"
        >
          <Text fontWeight="bold" fontSize="2xl" color="blue.600">
            Aarya Kid's Garden School
          </Text>

          <HStack>
            <Icon as={MdLocationOn} boxSize={5} color="blue.500" />
            <Text fontSize="md">
              Plot No. 123, ABC Street, XYZ Nagar, New Delhi, 110001
            </Text>
          </HStack>

          <HStack>
            <Icon as={MdPhone} boxSize={5} color="blue.500" />
            <Text fontSize="md">+91 12345 67890</Text>
          </HStack>

          <HStack>
            <Icon as={MdEmail} boxSize={5} color="blue.500" />
            <Text fontSize="md">info@aaryakids.com</Text>
          </HStack>

          <Text fontSize="md">
            Website:{" "}
            <a
              href="https://www.aaryakids.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              www.aaryakids.com
            </a>
          </Text>
        </VStack>
      </Grid>
    </Box>
  );
};

export default MapSection;
