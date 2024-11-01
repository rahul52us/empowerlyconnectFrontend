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
import { schoolInitialValues } from "../common/constant";

const WebsiteBuilder = observer(() => {
  const {
    WebTemplateStore: { createWebTemplate },
    auth: { openNotification },
  } = store;

  const [webContent, setWebContent] = useState(schoolInitialValues);

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
    {
      label: "Testimonial",
      page: "testimonial",
      key: "testimonial1",
      layouts: ["testimonial1", "testimonial2"],
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
              return (
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
                        setWebContent({
                          ...webContent,
                          curriculum: newContent,
                        });
                      }}
                    />
                  )}
                  {currentSection?.page === "testimonial" && (
                    <TestimonialsSection
                      isEditable={true}
                      webColor={colorSetting}
                      content={webContent.testimonial}
                      setContent={(newContent: any) => {
                        setWebContent({
                          ...webContent,
                          testimonial: newContent,
                        });
                      }}
                    />
                  )}
                </TabPanel>
              );
            })}
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