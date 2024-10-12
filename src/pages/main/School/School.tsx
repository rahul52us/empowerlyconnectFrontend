import { Box, Grid, Heading } from "@chakra-ui/react";
import Contact from "../Contact/Contact";
import AboutSection from "./AboutSection/AboutSection";
import GallerySection from "./GallerySection/GallerySection";
import HeroCarousal from "./HeroCarousal/HeroCarousal";
import Navbar from "./Navbar/Navbar";
import PrincipalSection from "./PrincipalSection/PrincipalSection";
import TopperSlider from "./ToppersCard/TopperSlider";
import TeacherCard from "./TeacherCard/TeacherCard";
import MapSection from "./MapSection/MapSection";
import { useRef } from "react";
import { cards, imageUrls, teachersData } from "./Constant/constants";

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

  // Function to scroll to the desired section
  // const scrollToSection = (section: string) => {
  //   let ref: React.RefObject<HTMLDivElement> | null = null;

  //   switch (section) {
  //     case "Home":
  //       ref = homeRef;
  //       break;
  //     case "About":
  //       ref = aboutRef;
  //       break;
  //     case "Admissions":
  //       ref = admissionsRef;
  //       break;
  //     case "Gallery":
  //       ref = eventsRef;
  //       break;
  //     case "Contact Us":
  //       ref = contactRef;
  //       break;
  //     case "Academics":
  //       ref = academicsRef;
  //       break;
  //     case "Teachers":
  //       ref = teachersRef;
  //       break;
  //     case "Principal":
  //       ref = principalRef;
  //       break;
  //     default:
  //       return;
  //   }

  //   if (ref && ref.current) {
  //     ref.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

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

      <Box ref={admissionsRef} my={8}>
        <Heading as="h2" size="lg" textAlign="center" mb={8}>
          Admissions
        </Heading>
      </Box>
      <Box ref={eventsRef} my={10}>
        <GallerySection images={imageUrls} />
      </Box>
      <Box ref={teachersRef} mt={10}>
        <Heading as="h2" size="lg" textAlign="center"  mb={6}>
          Our Teachers
        </Heading>
        <Grid templateColumns="repeat(6, 1fr)" gap={4} maxW={"90%"} mx={"auto"}>
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
