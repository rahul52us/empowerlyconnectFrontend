import {
  Box,
  Grid,
  Heading,
  SimpleGrid
} from "@chakra-ui/react";
import { useRef } from "react";
import Contact from "../Contact/Contact";
import AboutSection from "./AboutSection/AboutSection";
import ParallaxSection from "./common/Parallax/Parallax";
import {
  activityData,
  cards,
  imageUrls,
  teachersData,
} from "./Constant/constants";
import GallerySection from "./GallerySection/GallerySection";
import HeroCarousal from "./HeroCarousal/HeroCarousal";
import MapSection from "./MapSection/MapSection";
import Navbar from "./Navbar/Navbar";
import PrincipalSection from "./PrincipalSection/PrincipalSection";
import CampCard from "./SchoolActivityCard/SchoolActivityCard";
import TeacherCard from "./TeacherCard/TeacherCard";
import TopperSlider from "./ToppersCard/TopperSlider";
// import Parallax from "./common/Parallax/Parallax";

const School = () => {
  // Create refs for each section
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const admissionsRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const academicsRef = useRef<HTMLDivElement>(null);
  const teachersRef = useRef<HTMLDivElement>(null);
  const principalRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    let ref: React.RefObject<HTMLDivElement> | null = null;

    switch (section) {
      case "Home":
        ref = homeRef;
        break;
      case "About":
        ref = aboutRef;
        break;
      case "Admissions":
        ref = admissionsRef;
        break;
      case "Gallery":
        ref = eventsRef;
        break;
      case "Contact Us":
        ref = contactRef;
        break;
      case "Academics":
        ref = academicsRef;
        break;
      case "Teachers":
        ref = teachersRef;
        break;
      case "Principal":
        ref = principalRef;
        break;
      default:
        return;
    }

    if (ref && ref.current) {
      // Get the navbar height (adjust this value based on your navbar's actual height)
      const navbarHeight = 60; // Example: 60px

      // Calculate the position to scroll to
      const sectionTop =
        ref.current.getBoundingClientRect().top + window.scrollY - navbarHeight;

      // Scroll to the calculated position
      window.scrollTo({ top: sectionTop, behavior: "smooth" });
    }
  };
  return (
    <Box>
      <Navbar scrollToSection={scrollToSection} />

      <Box ref={homeRef} mb={4}>
        <HeroCarousal cards={cards} />
      </Box>

      <Box ref={aboutRef} my={10}>
        <AboutSection />
      </Box>

      <Box ref={academicsRef} my={12}>
        <Heading as="h2" size="lg" textAlign="center" mb={8}>
          Toppers
        </Heading>
        <TopperSlider />
      </Box>
      <Box ref={principalRef} mt={10}>
        <PrincipalSection />
      </Box>

      {/* //  imageUrl="https://img.freepik.com/free-photo/door-leading-magical-world_23-2151038217.jpg?t=st=1728924662~exp=1728928262~hmac=84060247f460e67497a669a91e1cb1b0bcba1b0948ac80885af9ce6df4f06de0&w=1060"> */}
      <ParallaxSection imageUrl="https://kidslifedev.wpengine.com/wp-content/uploads/2020/03/cloud-bg1.png">
        <Box maxW={"75%"} mx={"auto"} color={"white"} maxH={"90%"} my={"auto"}>
          <Heading mb={4} size={"lg"}>
            Our school has
          </Heading>
          <Grid templateColumns={'2fr 1fr'}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {activityData.map((camp, index) => (
                <CampCard
                  key={index}
                  title={camp.title}
                  description={camp.description}
                />
              ))}
            </SimpleGrid>
            {/* <Box p={2} maxW={"xs"}>
              <Flex align={"center"} gap={4}>
                <Icon
                  as={FaPencilAlt}
                  p={2}
                  boxSize={"12"}
                  color={"black"}
                  bg={"white"}
                  rounded={"30%"}
                />
                <Text fontSize={"xl"} fontWeight={700} mb={2}>
                  English Summer Camp
                </Text>
              </Flex>
              <Text fontSize={"sm"} fontWeight={500} mt={2}>
                Play As You Learn English Summer Camp Nam ullamcorper, diam sit
                amet euismod pelleontesque, eros risus rhoncus libero, inst
                tibulum nisl ligula….
              </Text>
            </Box> */}
          </Grid>
        </Box>
      </ParallaxSection>

      {/* <Parallax imageSrc="https://img.freepik.com/free-photo/door-leading-magical-world_23-2151038217.jpg?t=st=1728922079~exp=1728925679~hmac=86f3607278ad7da4f7027bfbbf5dd8c45c9898a96bdb2c0bab9643114b3dfe55&w=1060">
                <Box textAlign="center" color="black">
                    <Heading fontSize="4xl">Welcome to Our Site</Heading>
                    <Text fontSize="xl">Experience the beauty of nature</Text>
                </Box>
            </Parallax>   */}

      <Box ref={eventsRef} my={10}>
        <GallerySection images={imageUrls} />
      </Box>
      <Box ref={teachersRef} mt={10}>
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          Our Teachers
        </Heading>
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(6, 1fr)" }}
          gap={4}
          maxW={"90%"}
          mx={"auto"}
        >
          {teachersData.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              name={teacher.name}
              subject={teacher.subject}
              imageUrl={teacher.imageUrl}
            />
          ))}
        </Grid>
      </Box>
      <Box ref={contactRef} my={8}>
        <Contact />
        <MapSection />
      </Box>
    </Box>
  );
};

export default School;
