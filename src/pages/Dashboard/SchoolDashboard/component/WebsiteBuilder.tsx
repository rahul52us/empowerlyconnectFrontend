import {
  Box,
  VStack,
  HStack,
  Tabs,
  TabPanels,
  TabPanel,
  useColorMode,
  Heading,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus, FaMoon, FaSun } from "react-icons/fa";
import FaqSection from "../../../main/School/component/FaqSection/FaqSection";
import AboutSection from "../../../main/School/component/AboutSection/AboutSection";
import PrincipalSection from "../../../main/School/component/PrincipalSection/PrincipalSection";
import ColorSettingsForm from "./ColorSettingsForm";
import HeroCarousal from "../../../main/School/component/HeroCarousal/HeroCarousal";
import MetadataSettingsForm from "./metaDataSettingsForm";
import { observer } from "mobx-react-lite";
import store from "../../../../store/store";
import { getStatusType } from "../../../../config/constant/statusCode";

const WebsiteBuilder = observer(() => {
  const {WebTemplateStore : {createWebTemplate}, auth : {openNotification}} = store;

  const [webContent, setWebContent] = useState({
    metaData: {
      name: "Evergreen Academy",
      title: "Welcome to Evergreen Academy",
      description: "A place where students thrive through intellectual growth.",
      keywords: "education, school, academy, learning",
      author: "John Doe", // New field for Author
      viewport: "width=device-width, initial-scale=1", // New field for Viewport
      language: "en-US", // New field for Language
      robots: "index, follow", // New field for Robots
      themeColor: "#ffffff", // New field for Theme Color
      ogTitle: "Evergreen Academy", // New field for Open Graph Title
      ogDescription:
        "A place where students thrive through intellectual growth.", // New field for Open Graph Description
      ogImageUrl: "https://example.com/image.jpg", // New field for Open Graph Image URL
      faviconUrl: "https://example.com/favicon.ico", // New field for Favicon URL
      canonicalUrl: "https://example.com/page", // New field for Canonical URL
    },

    hero: [
      {
        image:
          "https://img.freepik.com/free-photo/analog-landscape-city-with-buildings_23-2149661462.jpg?t=st=1728569941~exp=1728573541~hmac=d115d8d250d4e7cfed4970be5f1c3045454426a7cf9b322876302e26ab49e14b&w=1060",
        title: "Welcome to Our School",
        text: "Your journey begins here.",
      },
      {
        image:
          "https://img.freepik.com/free-photo/bustling-school-cafeteria-lunchtime_1268-30762.jpg?t=st=1728569297~exp=1728572897~hmac=90a4fe5fe6f2b6590ff3ec2f447f3e2cc82ee0b2672cf3695a3b9b593191b1af&w=1380",
        title: "Welcome to Our School",
        text: "Your journey begins here.",
      },
      {
        image:
          "https://img.freepik.com/free-photo/students-learning-school-their-classroom_23-2149511018.jpg?t=st=1728569336~exp=1728572936~hmac=f87c39731de3399c571c6e11cfbc591cbde859d2378936e2080894365fa5f6d1&w=1060",
        title: "Innovative Learning",
        text: "Experience our cutting-edge programs.",
      },
      // Add more card objects as needed
    ],
    about: {
      title: "About Our School",
      subtitle: "Dedicated to Excellence in Education",
      description: [
        "Welcome to Evergreen Academy, a place where students from all backgrounds thrive through intellectual growth and personal development. Our diverse learning environment encourages curiosity, collaboration, and exploration.",
        "Our faculty members, passionate and skilled, strive for excellence, fostering a spirit of innovation and curiosity in every student. They are dedicated to guiding each learner to realize their full potential.",
        "Since 1995, Evergreen Academy has set the benchmark for educational excellence. We are proud of our alumni's significant contributions across various fields, and their impact is felt globally.",
        "Looking toward the future, we continue to invest in top-tier resources, state-of-the-art facilities, and innovative learning methodologies. We are committed to preparing each student to meet the challenges of an evolving world with confidence and knowledge.",
      ],
      imageUrl:
        "https://img.freepik.com/free-photo/anime-school-building-illustration_23-2151150989.jpg",
    },
    principal: {
      name: "Dr. Jane Smith",
      imageUrl:
        "https://img.freepik.com/free-photo/experienced-businessman-standing-office-room-indian-content-office-employee-eyeglasses-smiling-posing-with-folded-hands-business-management-corporation-concept_74855-11681.jpg?t=st=1728491985~exp=1728495585~hmac=8fe791a61b6d34227a8bdcbd839d354c7246e23959e2c847ff9a0addd188e3a4&w=1060",
      title: "A Message From Our Principal",
      subheading:
        "Guiding the way to excellence with experience, passion, and a commitment to shaping the future.",
      bio: [
        "Dr. Jane Smith has been the principal of Evergreen Academy for over a decade. With her visionary leadership and commitment to educational excellence, she has transformed our school into one of the top-performing institutions in the region.",
        "Dr. Smith holds a Ph.D. in Education from Harvard University and has over 25 years of experience in the field of education. Her innovative approaches to teaching and learning have inspired both students and faculty to achieve their highest potential.",
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle:
        "Find answers to common questions about admissions, facilities, and programs.",
      faqData: [
        {
          question: "How do I apply for admission?",
          answer: [
            "Visit our online application portal and create an account.",
            "Fill out the required personal and academic information.",
            "Upload necessary documents such as transcripts and identification.",
            "Submit your application before the deadline.",
            "For details on the admission timeline and requirements, visit our admissions page.",
          ],
        },
        {
          question: "What facilities does the school provide?",
          answer: [
            "Modern classrooms with interactive technology for enhanced learning.",
            "A library with a vast selection of books, periodicals, and digital resources.",
            "State-of-the-art science labs for hands-on experiments.",
            "Computer labs equipped with high-speed internet and educational software.",
            "Sports facilities including a gymnasium and swimming pool.",
          ],
        },
      ],
    },
  });

  const [colorSetting, setColorSetting] = useState({
    headingColor: { light: "#222222", dark: "#E2E8F0" },
    subHeadingColor: { light: "#4A5568", dark: "#A0AEC0" },
    buttonColor: { light: "#3182CE", dark: "#2B6CB0" },
    buttonHoverColor: { light: "#2B6CB0", dark: "#3182CE" },
    buttonTextColor: { light: "#FFFFFF", dark: "#E2E8F0" },
    buttonTextHoverColor: { light: "#FFFFFF", dark: "#E2E8F0" },
    iconColor: { light: "#2D3748", dark: "#A0AEC0" },
    iconHoverColor: { light: "#4A5568", dark: "#CBD5E0" },
    iconTextColor: { light: "#2D3748", dark: "#A0AEC0" },
    iconTextHoverColor: { light: "#4A5568", dark: "#CBD5E0" },
  });

  const { colorMode, toggleColorMode } = useColorMode();
  const [sections, setSections] = useState<any[]>([
    { label: "MetaData", page: "metaData", key : "metaData1" },
    { label: "Hero", page: "hero", key : "hero1" },
    { label: "About", page: "about", key : "about1" },
    { label: "Principal", page: "principal",key : "principal1" },
    { label: "Faq", page: "faq", key : "faq1" },
  ]);
  const [currentSection, setCurrentSection] = useState<any>(sections[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleKeyPress = (section: string, e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setCurrentSection(section);
    }
  };

  const saveWebTemplate = () => {
    createWebTemplate({sectionsLayout:sections, webInfo : webContent, webType : 'school', colorSetting : colorSetting})
    .then((data) => {
      openNotification({
        title: "Successfully Created",
        message: `${data.message}`,
        type: "success",
      });
    })
    .catch((err) => {
      openNotification({
        title: "Successfully Created",
        message: err?.data?.message,
        type: getStatusType(err.status),
      });
    })
    .finally(() => {
    })}


  return (
    <HStack align="flex-start" p={1} spacing={2} h="87vh">
      {/* Sidebar */}
      <VStack
        w={{ base: "100%", md: "25%", lg: "20%" }}
        h="full"
        flex={1}
        p={4}
        bg={colorMode === "light" ? "gray.50" : "gray.800"}
        borderRadius="md"
        boxShadow="md"
        spacing={4}
        align="stretch"
      >
        <Heading size="lg" mb={4}>
          Sections
        </Heading>
        <HStack spacing={2} mb={4} wrap="wrap">
          <IconButton
            onClick={() =>
              setSections([
                ...sections,
                {
                  label: `Section ${sections.length + 1}`,
                  page: `Page${sections.length + 1}`,
                },
              ])
            }
            icon={<FaPlus />}
            colorScheme="teal"
            aria-label="Add Section"
            variant="solid"
          />
          <IconButton
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            colorScheme="blue"
            aria-label="Toggle Theme"
            variant="solid"
          />
          <IconButton
            onClick={() => setIsDrawerOpen(true)}
            icon={<FaPlus />} // Change this icon to represent color settings
            colorScheme="purple"
            aria-label="Color Settings"
            variant="solid"
          />
        </HStack>
        <Box overflowY="auto" flex="1" overflowX="hidden">
          {sections.map((section: any) => (
            <Box
              key={section.page}
              w="full"
              p={3}
              borderRadius="md"
              bg={
                currentSection.page === section?.page ? "teal.500" : "gray.200"
              }
              color={currentSection?.page === section?.page ? "white" : "black"}
              fontWeight="bold"
              cursor="pointer"
              mt={2}
              transition="background-color 0.2s, transform 0.2s"
              _hover={{
                bg:
                  currentSection.page !== section.page
                    ? "gray.300"
                    : "teal.600",
                transform: "scale(1.02)",
              }}
              onClick={() => setCurrentSection(section)}
              role="button" // Improved accessibility
              tabIndex={0} // Allow keyboard navigation
              onKeyPress={(e) => handleKeyPress(section, e)} // Handle Enter key
            >
              {section.label}
            </Box>
          ))}
        </Box>
        <Box w="full">
           <Button width="100%" onClick={saveWebTemplate}>Save Data</Button>
          </Box>
      </VStack>

      {/* Editor and Preview Panel */}
      <VStack
        w={{ base: "100%", md: "75%", lg: "80%" }} // Responsive widths
        h="full"
        borderRadius="md"
        align="stretch"
        spacing={0}
      >
        {/* Editor Tabs */}
        <Tabs variant="soft-rounded" colorScheme="teal" w="full">
          <TabPanels h={"88vh"} overflowY="auto" overflowX="hidden">
            {sections.map((section) => (
              <TabPanel key={section} m={-4}>
                {currentSection?.page === "metaData" && (
                  <MetadataSettingsForm
                    content={webContent.metaData}
                    setContent={(newContent: any) =>
                      setWebContent({ ...webContent, metaData: newContent })
                    }
                  />
                )}
                {currentSection?.page === "about" && (
                  <AboutSection
                    webColor={colorSetting}
                    isEditable={true}
                    content={webContent.about}
                    setContent={(newContent: any) =>
                      setWebContent({ ...webContent, about: newContent })
                    }
                  />
                )}
                {currentSection?.page === "faq" && (
                  <FaqSection
                    content={webContent.faq}
                    webColor={colorSetting}
                    setContent={(newContent: any) => {
                      setWebContent({ ...webContent, faq: newContent });
                    }}
                  />
                )}
                {currentSection?.page === "hero" && (
                  <HeroCarousal content={webContent.hero} />
                )}
                {currentSection?.page === "principal" && (
                  <PrincipalSection
                    webColor={colorSetting}
                    content={webContent.principal}
                    setContent={(newContent: any) => {
                      setWebContent({ ...webContent, principal: newContent });
                    }}
                  />
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Drawer for Color Settings */}
      <Drawer
        size="xl"
        isOpen={isDrawerOpen}
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>Color Settings</DrawerHeader>
            <DrawerBody>
              <ColorSettingsForm
                colorSetting={colorSetting}
                setColorSetting={setColorSetting}
              />
            </DrawerBody>
            <DrawerFooter>
              <Button
                variant="outline"
                mr={3}
                onClick={() => setIsDrawerOpen(false)}
              >
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </HStack>
  );
});

export default WebsiteBuilder;
