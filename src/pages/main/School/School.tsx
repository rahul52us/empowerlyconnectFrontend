import { Box } from "@chakra-ui/react";
import Contact from "../Contact/Contact";
import AboutSection from "./AboutSection/AboutSection";
import GallerySection from "./GallerySection/GallerySection";
// import HeroSection from "./HeroSection/HeroSection";
import PrincipalSection from "./PrincipalSection/PrincipalSection";
import HeroCarousal from "./HeroCarousal/HeroCarousal";

const imageUrls = [
  "https://images.pexels.com/photos/11366728/pexels-photo-11366728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg",
  "https://images.pexels.com/photos/11366728/pexels-photo-11366728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://img.freepik.com/free-photo/medium-shot-boy-holding-book_23-2148892765.jpg?t=st=1728568866~exp=1728572466~hmac=d55a9b98e8071642da19161729ad21831ff788957baf392afb3cabc18355e37a&w=740",
  "https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg",
  "https://img.freepik.com/free-photo/empty-classroom-due-coronavirus-pandemic_637285-8845.jpg?t=st=1728568792~exp=1728572392~hmac=7db40890456a0763732b87bcb1df8479aa9ae1319b0af0db9b65667609cc7d83&w=1060",
  "https://images.pexels.com/photos/11366728/pexels-photo-11366728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg",
  "https://images.pexels.com/photos/11366728/pexels-photo-11366728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://img.freepik.com/free-photo/students-knowing-right-answer_329181-14271.jpg?t=st=1728568738~exp=1728572338~hmac=1123b00d0fa4648de829e059a73bd392430cf569b51670163c96bfc67f75e9f5&w=1060",
];

const cards = [
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
];
const School = () => {
  return (
    <Box>
      {/* <HeroSection /> */}
      <HeroCarousal cards={cards} />

      <AboutSection />
      <PrincipalSection />
      <GallerySection images={imageUrls} />

      {/* <CoursesSection /> */}
      {/* <DepartmentsSection /> */}
      {/* <FeeStructure /> */}

      <Contact />
    </Box>
  );
};

export default School;
