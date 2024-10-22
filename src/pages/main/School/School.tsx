import { Box } from "@chakra-ui/react";
import { useRef } from "react";
import Contact from "../Contact/Contact";
import AboutSection from "./component/AboutSection/AboutSection";
import { cards, imageUrls } from "./Constant/constants";
import GallerySection from "./component/GallerySection/GallerySection";
import HeroCarousal from "./component/HeroCarousal/HeroCarousal";
import MapSection from "./component/MapSection/MapSection";
import Navbar from "./layout/Navbar/Navbar";
import PrincipalSection from "./component/PrincipalSection/PrincipalSection";
import TopperSlider from "./component/ToppersCard/TopperSlider";
import StatisticsCounter from "./component/StatisticsCounter/StatisticsCounter";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { GiLaurelsTrophy } from "react-icons/gi";
import TeacherSection from "./component/TeacherSection/TeacherSection";
import { largeHeaderHeight } from "./layout/common/constant";
import SchoolFeatureSection from "./component/SchoolFeatureSection/SchoolFeatureSection";
import FaqSection from "./component/FaqSection/FaqSection";

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
  const faqRef = useRef<HTMLDivElement>(null);
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
      case "FAQ":
          ref = faqRef;
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
      <Box marginTop={largeHeaderHeight}>
        <Box ref={homeRef} mb={4}>
          <HeroCarousal cards={cards} />
        </Box>

        <Box ref={aboutRef} my={7}>
          <AboutSection />
        </Box>

        <Box ref={academicsRef} my={5}>
          <TopperSlider />
        </Box>

        <Box ref={principalRef} mt={5}>
          <PrincipalSection />
        </Box>

        <Box>
          <SchoolFeatureSection />
        </Box>

        <Box ref={eventsRef} my={7}>
          <GallerySection images={imageUrls} />
        </Box>

        <Box>
          <StatisticsCounter
            metrics={metrics}
            backgroundImage="https://img.freepik.com/free-photo/architecture-independence-palace-ho-chi-minh-city_181624-21243.jpg?t=st=1729011322~exp=1729014922~hmac=590a0f1b3700627efd9780676b739c65e5b00bfd9a3cf43a6b287ab872511870&w=1060"
          />
        </Box>
        <Box ref={teachersRef} mt={5}>
          <TeacherSection />
        </Box>
        <Box ref={faqRef} my={5}>
          <FaqSection />
        </Box>
        <Box ref={contactRef} my={8}>
          <Contact />
          <MapSection />
        </Box>
      </Box>
    </Box>
  );
};
export default School;
