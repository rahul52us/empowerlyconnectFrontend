import { Box, useColorModeValue } from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
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
import CurriculumSection from "./component/curriculumSection/CurriculumSection";
import TestimonialsSection from "./component/TestimonialSection/TestimonialSection";

// Metrics data
const metrics = [
  { id: 1, label: "Students", target: 1500, icon: FaUserGraduate },
  { id: 2, label: "Teachers", target: 100, icon: FaChalkboardTeacher },
  { id: 3, label: "Awards", target: 30, icon: GiLaurelsTrophy },
  // Add more metrics as needed
];

// Configuration for dynamic sections
const initialSectionsConfig = [
  { id: "home", component: HeroCarousal, props: { cards } },
  { id: "about", component: AboutSection, props: {} },
  { id: "principal", component: PrincipalSection, props: {} },
  { id: "curriculum", component: CurriculumSection, props: {} },
  { id: "statistics", component: StatisticsCounter, props: { metrics } },
  { id: "topper", component: TopperSlider, props: {} },
  { id: "teachers", component: TeacherSection, props: {} },
  { id: "features", component: SchoolFeatureSection, props: {} },
  { id: "gallery", component: GallerySection, props: { images: imageUrls } },
  {id : "testimonial", component : TestimonialsSection, props : {}},
  { id: "faq", component: FaqSection, props: {} },
  { id: "contact", component: Contact, props: {} },
  { id: "map", component: MapSection, props: {} },
];

const School = () => {
  const [sectionsConfig, setSectionsConfig] = useState(initialSectionsConfig);
  const sectionRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>(
    initialSectionsConfig.reduce((acc, section) => {
      acc[section.id] = React.createRef<HTMLDivElement>();
      return acc;
    }, {} as Record<string, React.RefObject<HTMLDivElement>>)
  );

  const scrollToSection = (sectionId: string) => {
    const ref = sectionRefs.current[sectionId];
    if (ref && ref.current) {
      const navbarHeight = 60; // Adjust as necessary
      const sectionTop =
        ref.current.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: sectionTop, behavior: "smooth" });
    }
  };

  const fetchUserPreferences = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          "home",
          "about",
          "principal",
          "statistics",
          "topper",
          "curriculum",
          "teachers",
          "gallery",
          "features",
          "testimonial",
          "faq",
          "contact",
          "map",
        ]);
      }, 1000);
    });
  };

  useEffect(() => {
    const getUserPreferences = async () => {
      const preferences: any = await fetchUserPreferences();
      const orderedSections = preferences
        .map((preferenceId: any) =>
          initialSectionsConfig.find((section) => section.id === preferenceId)
        )
        .filter((section: any) => section); // Remove any undefined values

      setSectionsConfig(orderedSections);
    };

    getUserPreferences();
  }, []);

  const curriculumTitleColor = useColorModeValue("teal.500", "teal.300");
  const curriculumSectionBgColor = useColorModeValue("white", "gray.800");
  const curriculumBorderColor = "teal.200";
  const curriculumTextColor = "gray.600";
  const statisticsBackgroundImage =
    "https://img.freepik.com/free-photo/architecture-independence-palace-ho-chi-minh-city_181624-21243.jpg?t=st=1729011322~exp=1729014922~hmac=590a0f1b3700627efd9780676b739c65e5b00bfd9a3cf43a6b287ab872511870&w=1060";

  const activeSectionIds = [
    "home",
    "about",
    "principal",
    "statistics",
    "topper",
    "curriculum",
    "teachers",
    "gallery",
    "features",
    "testimonial",
    "faq",
    "contact",
    "map",
  ];

  return (
    <Box>
      <Navbar
        scrollToSection={scrollToSection}
        linksConfig={activeSectionIds.map((item) => ({ id: item, name: item.charAt(0).toUpperCase() + item.slice(1) }))}
      />
      <Box marginTop={largeHeaderHeight}>
        {sectionsConfig
          .filter(({ id }) => activeSectionIds.includes(id)) // Only render components in activeSectionIds
          .map(({ id, component: Component, props }) => {
            let sectionProps: any = { ...props };

            if (id === "curriculum") {
              sectionProps = {
                ...props,
                titleColor: curriculumTitleColor,
                sectionBgColor: curriculumSectionBgColor,
                borderColor: curriculumBorderColor,
                textColor: curriculumTextColor,
              };
            }

            if (id === "statistics") {
              sectionProps = {
                ...props,
                backgroundImage: statisticsBackgroundImage,
              };
            }

            return (
              <Box key={id} ref={sectionRefs.current[id]} my={7}>
                <Component {...sectionProps} />
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

export default School;