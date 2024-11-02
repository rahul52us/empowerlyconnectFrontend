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
import Contact from "../../../main/School/component/ContactUs/Contact";

const WebsiteBuilder = observer(() => {
  const {
    WebTemplateStore: { createWebTemplate },
    auth: { openNotification },
  } = store;

  const [webContent, setWebContent] = useState(schoolInitialValues);
  const [colorSetting, setColorSetting] = useState(initialColorSettings());
  const { colorMode, toggleColorMode } = useColorMode();
  const [sections, setSections] = useState<any>(getInitialSections());
  const [currentSection, setCurrentSection] = useState<any>(sections[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function initialColorSettings() {
    return {
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
    };
  }

  function getInitialSections() {
    return [
      { label: "MetaData", page: "metaData", key: "metaData1" },
      { label: "Hero", page: "hero", key: "hero1", layouts: ["hero1", "hero2"] },
      { label: "About", page: "about", key: "about1", layouts: ["about1", "about2"] },
      { label: "Principal", page: "principal", key: "principal1", layouts: ["principal1", "principal2"] },
      { label: "Faq", page: "faq", key: "faq1", layouts: ["faq1", "faq2"] },
      { label: "Curriculum", page: "curriculum", key: "curriculum1", layouts: ["curriculum1", "curriculum2"] },
      { label: "Testimonial", page: "testimonial", key: "testimonial1", layouts: ["testimonial1", "testimonial2"] },
      { label: "Contact", page: "contact", key: "contact1", layouts: ["contact1", "contact2"] },
    ];
  }

  const handleKeyPress = (section: string, e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setCurrentSection(section);
    }
  };

  const saveWebTemplate = async () => {
    try {
      const data = await createWebTemplate({
        sectionsLayout: sections,
        webInfo: webContent,
        webType: "school",
        colorSetting
      });
      openNotification({
        title: "Successfully Created",
        message: `${data.message}`,
        type: "success",
      });
    } catch (err : any) {
      openNotification({
        title: "Error",
        message: err?.data?.message || "An error occurred",
        type: getStatusType(err.status),
      });
    }
  };

  const renderCurrentSection = () => {
    switch (currentSection.page) {
      case "metaData":
        return (
          <Box>
          <MetadataSettingsForm
            content={webContent.metaData}
            setContent={(newContent: any) => setWebContent({ ...webContent, metaData: newContent })}
          />
          </Box>
        );
      case "about":
        return (
          <Box m={-6} mt={-8} overflow="hidden">
          <AboutSection
            selectedLayout={currentSection}
            webColor={colorSetting}
            isEditable={true}
            content={webContent.about}
            setContent={(newContent: any) => setWebContent({ ...webContent, about: newContent })}
          />
          </Box>
        );
      case "faq":
        return (
          <FaqSection
            content={webContent.faq}
            webColor={colorSetting}
            setContent={(newContent: any) => setWebContent({ ...webContent, faq: newContent })}
          />
        );
      case "hero":
        return <Box overflowY="auto"> <HeroCarousal content={webContent.hero} /></Box>
      case "principal":
        return (
          <Box m={-6} mt={-8} overflow="hidden">
          <PrincipalSection
            isEditable={true}
            webColor={colorSetting}
            content={webContent.principal}
            setContent={(newContent: any) => setWebContent({ ...webContent, principal: newContent })}
          />
          </Box>
        );
      case "curriculum":
        return (
          <CurriculumSection
            isEditable={true}
            webColor={colorSetting}
            content={webContent.curriculum}
            setContent={(newContent: any) => setWebContent({ ...webContent, curriculum: newContent })}
          />
        );
      case "testimonial":
        return (
          <TestimonialsSection
            isEditable={true}
            webColor={colorSetting}
            content={webContent.testimonial}
            setContent={(newContent: any) => setWebContent({ ...webContent, testimonial: newContent })}
          />
        );
      case "contact":
          return (
            <Box m={-8} mt={-10}>
            <Contact
              isEditable={true}
              webColor={colorSetting}
              content={webContent.testimonial}
              setContent={(newContent: any) => setWebContent({ ...webContent, testimonial: newContent })}
            />
            </Box>
          );
      default:
        return null;
    }
  };

  return (
    <HStack align="flex-start" flexDirection={{base : "column", md : 'row'}} p={1} spacing={0} h={{base : "100%", md : '87vh'}}>
      {/* Sidebar */}
      <VStack
        minW={{base : '100%', md : '280px'}}
        h="full"
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
            onClick={() => setSections([...sections, { label: `Section ${sections.length + 1}`, page: `Page${sections.length + 1}` }])}
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
            icon={<FaPlus />}
            colorScheme="purple"
            aria-label="Color Settings"
            variant="solid"
          />
        </HStack>
        <Box overflowY="auto" flex="1" overflowX="hidden">
          {sections.map((section : any) => (
            <Box
              key={section.page}
              w="full"
              p={3}
              borderRadius="md"
              bg={currentSection.page === section.page ? "teal.500" : "gray.200"}
              color={currentSection.page === section.page ? "white" : "black"}
              fontWeight="bold"
              cursor="pointer"
              mt={2}
              transition="background-color 0.2s, color 0.2s"
              onClick={() => setCurrentSection(section)}
              onKeyPress={(e) => handleKeyPress(section.page, e)}
              tabIndex={0}
            >
              {section.label}
            </Box>
          ))}
        </Box>
        <Button mt={4} onClick={saveWebTemplate}>
          Save Template
        </Button>
      </VStack>

      {/* Content Section */}
      <Box flex={1} p={0} overflowY={["hero","testimonial"].includes(currentSection.page) ? "auto" : undefined}>
        <Tabs>
          <TabPanels>
            <TabPanel>
              {renderCurrentSection()}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      {/* Drawer for Color Settings */}
      <Drawer isOpen={isDrawerOpen} placement="right" onClose={() => setIsDrawerOpen(false)}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Color Settings</DrawerHeader>
          <DrawerBody>
            <ColorSettingsForm colorSetting={colorSetting} setColorSetting={setColorSetting} />
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="blue" onClick={() => setIsDrawerOpen(false)}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
});

export default WebsiteBuilder;
