import {
  Box,
  Container,
  Text,
  Grid,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import styled from "styled-components";
import { MdLocationPin, MdMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import ContactForm from "./component/ContactForm";
import SocialMediaLink from "../../../config/component/SocialMediaLinkContainer/SocialMediaLink";
import LinkText from "../../../config/component/LinkText/LinkText";

// Style for Lottie animation on tablet devices
const BoxStyleFirst = styled(Box)`
  @media only screen and (min-device-width: 800px) and (max-device-width: 1024px) {
    svg {
      width: 25rem !important;
      height: 25.6rem !important;
    }
  }
`;

const Contact = observer(() => {
  const iconColor = useColorModeValue("blue.500", "white");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const bg = useColorModeValue("gray.50", "gray.900");

  return (
    <Container maxW={"container.xl"} my={{ base: 5, md: 14 }} bg={bg} py={10} borderRadius="lg" boxShadow="md">
      <Heading
        textAlign="center"
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight="bold"
        color={iconColor}
        mb={6}
      >
        Contact Us
      </Heading>

      <Grid
        mt={{ base: 2, md: 6 }}
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={10}
        alignItems="center"
      >
        {/* Contact Form */}
        <Box order={{ base: 1, md: 0 }}>
          <ContactForm />
        </Box>

        {/* Contact Information and Animation */}
        <Box>
          <BoxStyleFirst
            mx="auto"
            width={{
              base: "20rem",
              md: "30rem",
              lg: "35rem",
            }}
            height={{
              base: "20rem",
              md: "30rem",
              lg: "35rem",
            }}
          >
            <Player autoplay loop src="/img/contactus.json">
              <Controls visible={false} />
            </Player>
          </BoxStyleFirst>

          <Grid templateColumns="3rem 1fr" alignItems="center" gridRowGap={6} mt={8}>
            {/* Location */}
            <Box fontSize="2rem" color={iconColor}>
              <MdLocationPin />
            </Box>
            <Text color={textColor}>
              2000+ Our students are subscribed Around the World. Don’t be shy, introduce yourself!
            </Text>

            {/* Phone */}
            <Box fontSize="1.6rem" color={iconColor}>
              <FaPhoneAlt />
            </Box>
            <LinkText
              clickEvent={() => {
                alert("Call back");
              }}
              text="+91 9696969696"
              color={iconColor}
            />

            {/* Email */}
            <Box fontSize="1.8rem" color={iconColor}>
              <MdMail />
            </Box>
            <LinkText
              text="info@sequelstring.com"
              color={iconColor}
            />

            {/* Social Media */}
            <Box />
            <SocialMediaLink />
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
});

export default Contact;
