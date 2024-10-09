import { Box } from "@chakra-ui/react"
import Contact from "../Contact/Contact"
import AboutSection from "./AboutSection/AboutSection"
import GallerySection from "./GallerySection/GallerySection"
import HeroSection from "./HeroSection/HeroSection"
import PrincipalSection from "./PrincipalSection/PrincipalSection"

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
    
      <Contact/>
      
    </Box>
  )
}

export default School
