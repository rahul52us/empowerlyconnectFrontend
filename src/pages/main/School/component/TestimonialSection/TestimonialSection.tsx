import Slider from "react-slick";
import {
  Box,
  Image,
  Text,
  VStack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

// Sample testimonials data
const testimonialsData = [
  {
    id: 1,
    name: "John Doe",
    testimonial:
      "My child has flourished academically and socially at this school. The teachers are exceptional!",
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Jane Smith",
    testimonial:
      "I had an amazing experience at this school. It prepared me well for my future!",
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Alice Johnson",
    testimonial:
      "The supportive environment and extracurricular activities helped me discover my passions!",
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 4,
    name: "Tom Brown",
    testimonial:
      "This school has exceeded our expectations! The staff genuinely care.",
    imageUrl: "https://via.placeholder.com/100",
  },
];

const TestimonialsSlider = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("teal.600", "teal.400");
  const testimonialColor = useColorModeValue("gray.600", "gray.300");
  const subheadingColor = useColorModeValue("gray.600", "gray.400");

  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Loop through items
    speed: 500, // Transition speed
    slidesToShow: 3, // Number of slides to show
    slidesToScroll: 1, // Number of slides to scroll
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Show 2 slides on medium screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Show 1 slide on small screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      m={{ base: 2, md: 5 }}
      py={10}
      bg={bg}
      maxW={{ base: "98%", md: "100%" }}
      p={{ base: 5, md: 10 }}
    >
      <Heading as="h2" size="xl" textAlign="center" mb={4} color={textColor}>
        What Our Community Says
      </Heading>
      <Text textAlign="center" fontSize="lg" color={subheadingColor} mb={6}>
        Hear from parents, students, and alumni about their experiences.
      </Text>
      <Slider {...settings}>
        {testimonialsData.map(({ id, name, testimonial, imageUrl }) => (
          <Box
            key={id}
            mx={2} // Add horizontal margin for spacing between cards
            my={3} // Add vertical margin for spacing
          >
            <VStack
              spacing={4}
              align="center"
              p={5}
              borderWidth={1}
              borderColor={borderColor}
              borderRadius="lg"
              boxShadow="md"
              bg={cardBg}
              margin={4}
              transition="0.3s"
              _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
            >
              <Image
                borderRadius="full"
                boxSize="100px"
                src={imageUrl}
                alt={name}
                boxShadow="md"
              />
              <Text fontWeight="bold" fontSize="lg" color={textColor}>
                {name}
              </Text>
              <Text fontStyle="italic" color={testimonialColor} textAlign="center">
                "{testimonial}"
              </Text>
            </VStack>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default TestimonialsSlider;
