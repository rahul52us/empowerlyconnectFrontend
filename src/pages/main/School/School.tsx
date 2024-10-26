import { Box, useColorModeValue } from "@chakra-ui/react";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { GiLaurelsTrophy } from "react-icons/gi";
import { cards, imageUrls } from "./Constant/constants";
import { largeHeaderHeight } from "./layout/common/constant";

// Lazy-loaded components
const Contact = React.lazy(() => import("../Contact/Contact"));
const AboutSection = React.lazy(() => import("./component/AboutSection/AboutSection"));
const GallerySection = React.lazy(() => import("./component/GallerySection/GallerySection"));
const HeroCarousal = React.lazy(() => import("./component/HeroCarousal/HeroCarousal"));
const MapSection = React.lazy(() => import("./component/MapSection/MapSection"));
const Navbar = React.lazy(() => import("./layout/Navbar/Navbar"));
const PrincipalSection = React.lazy(() => import("./component/PrincipalSection/PrincipalSection"));
const TopperSlider = React.lazy(() => import("./component/ToppersCard/TopperSlider"));
const StatisticsCounter = React.lazy(() => import("./component/StatisticsCounter/StatisticsCounter"));
const TeacherSection = React.lazy(() => import("./component/TeacherSection/TeacherSection"));
const SchoolFeatureSection = React.lazy(() => import("./component/SchoolFeatureSection/SchoolFeatureSection"));
const FaqSection = React.lazy(() => import("./component/FaqSection/FaqSection"));
const CurriculumSection = React.lazy(() => import("./component/curriculumSection/CurriculumSection"));
const TestimonialsSection = React.lazy(() => import("./component/TestimonialSection/TestimonialSection"));

// Metrics data with explicit typing
interface Metric {
  id: number;
  label: string;
  target: number;
  icon: React.ElementType; // More specific type for icons
}

// Configuration for dynamic sections
interface SectionConfig {
  id: string;
  component: React.FC<any>; // Using 'any' for props, can be refined
  props: any; // Define specific props types if known
}

const metrics: Metric[] = [
  { id: 1, label: "Students", target: 1500, icon: FaUserGraduate },
  { id: 2, label: "Teachers", target: 100, icon: FaChalkboardTeacher },
  { id: 3, label: "Awards", target: 30, icon: GiLaurelsTrophy },
];

// Initial sections configuration with typing
const initialSectionsConfig: SectionConfig[] = [
  { id: "home", component: HeroCarousal, props: { cards } },
  { id: "about", component: AboutSection, props: {} },
  { id: "principal", component: PrincipalSection, props: {} },
  { id: "curriculum", component: CurriculumSection, props: {} },
  { id: "statistics", component: StatisticsCounter, props: { metrics } },
  { id: "topper", component: TopperSlider, props: {} },
  { id: "teachers", component: TeacherSection, props: {} },
  { id: "features", component: SchoolFeatureSection, props: {} },
  { id: "gallery", component: GallerySection, props: { images: imageUrls } },
  { id: "testimonial", component: TestimonialsSection, props: {} },
  { id: "faq", component: FaqSection, props: {} },
  { id: "contact", component: Contact, props: {} },
  { id: "map", component: MapSection, props: {} },
];

const School: React.FC = () => {
  const [sectionsConfig, setSectionsConfig] = useState<SectionConfig[]>(initialSectionsConfig);
  const [activeSection, setActiveSection] = useState<string>("home");

  const sectionRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>(
    initialSectionsConfig.reduce((acc, section) => {
      acc[section.id] = React.createRef<HTMLDivElement>();
      return acc;
    }, {} as Record<string, React.RefObject<HTMLDivElement>>)
  );

  const scrollToSection = (sectionId: string) => {
    const ref = sectionRefs.current[sectionId];
    if (ref && ref.current) {
      const navbarHeight = 60; // Adjust this if your navbar height changes
      const sectionTop = ref.current.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: sectionTop, behavior: "smooth" });
    }
  };

  const fetchUserPreferences = async (): Promise<string[]> => {
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
      const preferences = await fetchUserPreferences();
      const orderedSections = preferences
        .map((preferenceId) =>
          initialSectionsConfig.find((section) => section.id === preferenceId)
        )
        .filter((section): section is SectionConfig => section !== undefined);

      setSectionsConfig(orderedSections);
    };

    getUserPreferences();
  }, []);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-50% 0px -50% 0px", // Trigger when section is around the middle of the viewport
    });

    sectionsConfig.forEach(({ id }) => {
      const ref = sectionRefs.current[id].current;
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [sectionsConfig]);

  const curriculumTitleColor = useColorModeValue("teal.500", "teal.300");
  const curriculumSectionBgColor = useColorModeValue("white", "gray.800");
  const curriculumBorderColor = "teal.200";
  const curriculumTextColor = "gray.600";
  const statisticsBackgroundImage =
    "https://img.freepik.com/free-photo/architecture-independence-palace-ho-chi-minh-city_181624-21243.jpg?t=st=1729011322~exp=1729014922~hmac=590a0f1b3700627efd9780676b739c65e5b00bfd9a3cf43a6b287ab872511870&w=1060";

  const activeSectionIds = initialSectionsConfig.map(section => section.id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Box>
        <Navbar
          scrollToSection={scrollToSection}
          activeSection={activeSection}
          linksConfig={activeSectionIds.map((item) => ({
            id: item,
            name: item.charAt(0).toUpperCase() + item.slice(1),
          }))}
        />
        <Box marginTop={largeHeaderHeight}>
          {sectionsConfig
            .filter(({ id }) => activeSectionIds.includes(id))
            .map(({ id, component: Component, props }) => {
              let sectionProps = { ...props };

              // Custom props for Curriculum section
              if (id === "curriculum") {
                sectionProps = {
                  ...props,
                  titleColor: curriculumTitleColor,
                  sectionBgColor: curriculumSectionBgColor,
                  borderColor: curriculumBorderColor,
                  textColor: curriculumTextColor,
                };
              }

              // Custom props for Statistics section
              if (id === "statistics") {
                sectionProps = {
                  ...props,
                  backgroundImage: statisticsBackgroundImage,
                };
              }

              return (
                <Box key={id} ref={sectionRefs.current[id]} my={7} id={id}>
                  <Component {...sectionProps} />
                </Box>
              );
            })}
        </Box>
      </Box>
    </Suspense>
  );
};

export default School;
