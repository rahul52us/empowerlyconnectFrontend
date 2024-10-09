import { Box } from "@chakra-ui/react"
import HeroSection from "./HeroSection/HeroSection"
import AboutSection from "./AboutSection/AboutSection"
import PrincipalSection from "./PrincipalSection/PrincipalSection"
import GallerySection from "./GallerySection/GallerySection"
import ContactSection from "./ContactUs/ContactUs"

const School = () => {
  return (
    <Box >

<HeroSection />
      <AboutSection />
      <PrincipalSection />
      <GallerySection />
      {/* <CoursesSection /> */}
      {/* <DepartmentsSection /> */}
      {/* <FeeStructure /> */}
      <ContactSection />
      
    </Box>
  )
}

export default School
