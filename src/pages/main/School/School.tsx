import { Box, Grid, Heading, Image, SimpleGrid } from "@chakra-ui/react";
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
import books from "./SchoolActivityCard/books.png";
import StatisticsCounter from "./StatisticsCounter/StatisticsCounter";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { GiLaurelsTrophy } from "react-icons/gi";

const metrics: any = [
  { id: 1, label: "Students", target: 1500, icon: FaUserGraduate },
  { id: 2, label: "Teachers", target: 100, icon: FaChalkboardTeacher },
  { id: 3, label: "Awards", target: 30, icon: GiLaurelsTrophy },
  // Add more metrics as needed
];
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
          <Grid templateColumns={"2fr 1fr"}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {activityData.map((camp, index) => (
                <CampCard
                  key={index}
                  title={camp.title}
                  description={camp.description}
                />
              ))}
            </SimpleGrid>

            <Image src={books} />
          </Grid>
        </Box>
      </ParallaxSection>

      <Box ref={eventsRef} my={10}>
        <GallerySection images={imageUrls} />
      </Box>

      <Box>
      <StatisticsCounter
        metrics={metrics}
        backgroundImage="https://img.freepik.com/free-photo/architecture-independence-palace-ho-chi-minh-city_181624-21243.jpg?t=st=1729011322~exp=1729014922~hmac=590a0f1b3700627efd9780676b739c65e5b00bfd9a3cf43a6b287ab872511870&w=1060"
      />
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
