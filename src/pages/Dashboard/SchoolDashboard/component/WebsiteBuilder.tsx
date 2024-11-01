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
import CurriculumSection from "../../../main/School/component/curriculumSection/CurriculumSection";
import TestimonialsSection from "../../../main/School/component/TestimonialSection/TestimonialSection";

const WebsiteBuilder = observer(() => {
  const {
    WebTemplateStore: { createWebTemplate },
    auth: { openNotification },
  } = store;

  const [webContent, setWebContent] = useState({
    metaData: {
      name: "Harmony Institute",
      title: "Welcome to Harmony Institute",
      description: "Cultivating Minds, Inspiring Futures.",
      keywords: "education, harmony, learning, innovation",
      author: "John Smith",
      viewport: "width=device-width, initial-scale=1",
      language: "en-US",
      robots: "index, follow",
      themeColor: "#006699",
      ogTitle: "Harmony Institute",
      ogDescription: "Cultivating Minds, Inspiring Futures.",
      ogImageUrl: "https://example.com/harmony-institute.jpg",
      faviconUrl: "https://example.com/favicon.ico",
      canonicalUrl: "https://example.com/harmony-institute",
    },

    hero: [
      {
        image: "https://img.freepik.com/free-photo/sunset-over-harmony-institute_23-2148822078.jpg?t=st=1728569941~exp=1728573541~hmac=a1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcde&w=1060",
        title: "Explore Your Potential",
        text: "Join us at Harmony Institute where your journey begins.",
      },
      {
        image: "https://img.freepik.com/free-photo/students-participating-in-activities_23-2148822080.jpg?t=st=1728569941~exp=1728573541~hmac=a1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcde&w=1060",
        title: "Innovative Learning Experiences",
        text: "Discover a new way of learning with us.",
      },
      {
        image: "https://img.freepik.com/free-photo/group-of-students-celebrating-graduation_23-2148822085.jpg?t=st=1728569941~exp=1728573541~hmac=a1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcde&w=1060",
        title: "Together We Achieve More",
        text: "At Harmony Institute, teamwork makes the dream work.",
      },
    ],

    about: {
      title: "About Harmony Institute",
      subtitle: "Fostering Growth and Innovation",
      description: [
        "Harmony Institute is dedicated to delivering an outstanding educational experience that encourages students to thrive in all aspects of life.",
        "Our approach emphasizes creativity, critical thinking, and collaboration, equipping students for future challenges.",
        "Established in 2010, we prioritize innovative teaching methods and personalized learning to cater to individual student needs.",
        "With modern facilities and a devoted faculty, we aim to empower every student to realize their full potential.",
      ],
      imageUrl: "https://img.freepik.com/free-photo/harmony-institute-building_23-2148822090.jpg",
    },

    principal: {
      name: "Ms. Sarah Williams",
      imageUrl: "https://img.freepik.com/free-photo/school-principal-waving_23-2148822095.jpg?t=st=1728569941~exp=1728573541~hmac=a1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcde&w=1060",
      title: "A Message From Our Principal",
      subheading: "Empowering Students Through Commitment and Vision",
      bio: [
        "Ms. Williams brings over a decade of experience in educational leadership, devoted to creating a nurturing and innovative learning environment at Harmony Institute.",
        "Her goal is to provide a safe and stimulating atmosphere where every student can excel.",
      ],
    },

    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Find Answers to Common Inquiries",
      faqData: [
        {
          question: "How do I apply for admission?",
          answer: [
            "Start by visiting our admissions section and fill out the online form.",
            "Make sure to upload necessary documents such as transcripts and recommendations.",
            "You will be invited for an interview with our admissions committee.",
            "Expect to hear back regarding your application status within 10 business days.",
          ],
        },
        {
          question: "What clubs and organizations are available?",
          answer: [
            "Harmony Institute offers a wide range of clubs, including sports, arts, and leadership programs.",
            "Students can engage in various activities such as environmental initiatives, coding clubs, and performing arts.",
            "We regularly host events that allow students to demonstrate their skills and creativity.",
          ],
        },
      ],
    },

    curriculum: {
      title: "Our Curriculum",
      description: "Our curriculum emphasizes a well-rounded education, balancing academic rigor with personal development.",
      sections: [
        {
          title: "Preschool",
          content: "Fun and interactive activities designed to develop early learning skills.",
        },
        {
          title: "Primary School",
          content: "A comprehensive curriculum that promotes inquiry, creativity, and critical thinking.",
        },
        {
          title: "Secondary School",
          content: "Challenging courses and electives that prepare students for higher education and careers.",
        },
      ],
    },

    testimonial: [
      {
        id: 1,
        name: "Jessica Taylor",
        testimonial: "Harmony Institute has greatly impacted my daughter's confidence and love for learning!",
        imageUrl: "https://via.placeholder.com/100",
      },
      {
        id: 2,
        name: "Daniel Clark",
        testimonial: "The supportive community at this school has made my transition into high school seamless.",
        imageUrl: "https://via.placeholder.com/100",
      },
      {
        id: 3,
        name: "Ava Johnson",
        testimonial: "I am grateful for the personalized attention and encouragement I received from my teachers.",
        imageUrl: "https://via.placeholder.com/100",
      },
      {
        id: 4,
        name: "Lucas Martinez",
        testimonial: "Harmony Institute has been a great place for my child to grow and explore their interests.",
        imageUrl: "https://via.placeholder.com/100",
      },
    ],
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
    { label: "MetaData", page: "metaData", key: "metaData1" },
    { label: "Hero", page: "hero", key: "hero1", layouts: ["hero1", "hero2"] },
    {
      label: "About",
      page: "about",
      key: "about2",
      layouts: ["about1", "about2"],
    },
    {
      label: "Principal",
      page: "principal",
      key: "principal1",
      layouts: ["principal1", "principal2"],
    },
    { label: "Faq", page: "faq", key: "faq1", layouts: ["faq1", "faq2"] },
    {
      label: "Curriculum",
      page: "curriculum",
      key: "curriculum1",
      layouts: ["curriculum1", "curriculum2"],
    },
  ]);
  const [currentSection, setCurrentSection] = useState<any>(sections[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleKeyPress = (section: string, e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setCurrentSection(section);
    }
  };

  const saveWebTemplate = () => {
    createWebTemplate({
      sectionsLayout: sections,
      webInfo: webContent,
      webType: "school",
      colorSetting: colorSetting,
    })
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
      .finally(() => {});
  };

  console.log('the current selections are', currentSection)

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
          <Button width="100%" onClick={saveWebTemplate}>
            Save Data
          </Button>
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
            {sections.map((section) => {
              return(
              <TabPanel key={section} m={-4}>
                {currentSection?.page === "metaData" && (
                  <MetadataSettingsForm
                    content={webContent.metaData}
                    setContent={(newContent: any) =>
                      setWebContent({ ...webContent, metaData: newContent })
                    }
                  />
                )}
                {currentSection.page === "about" && (
                  <AboutSection
                    selectedLayout={section}
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
                    isEditable={true}
                    webColor={colorSetting}
                    content={webContent.principal}
                    setContent={(newContent: any) => {
                      setWebContent({ ...webContent, principal: newContent });
                    }}
                  />
                )}
                {currentSection?.page === "curriculum" && (
                  <CurriculumSection
                    isEditable={true}
                    webColor={colorSetting}
                    content={webContent.curriculum}
                    setContent={(newContent: any) => {
                      setWebContent({ ...webContent, curriculum: newContent });
                    }}
                  />
                )}
                {currentSection?.page === "testimonial" && (
                  <TestimonialsSection
                    isEditable={true}
                    webColor={colorSetting}
                    content={webContent.curriculum}
                    setContent={(newContent: any) => {
                      setWebContent({ ...webContent, curriculum: newContent });
                    }}
                  />
                )}
              </TabPanel>
            )})}
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
