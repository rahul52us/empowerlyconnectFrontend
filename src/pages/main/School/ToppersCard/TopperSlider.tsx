import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Heading,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ToppersCard from "./ToppersCard";
import { toppersData } from "../Constant/constants";

export default function TopperSlider() {
  const sliderRef: any = useRef(null);

  // Define number of slides to show based on the screen size
  const slidesToShow = useBreakpointValue({
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  });

  const settings = {
    centerMode: true,
    infinite: true,
    arrows: false,
    dots: true,
    slidesToShow: slidesToShow, // Use responsive slidesToShow
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesPerRow: 1,
  };

  return (
    <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
      <Box textAlign="center" mb={4}>
        <Text
          as="span"
          display="block"
          fontSize={{ base: "sm", md: "md" }}
          color="gray.500"
          letterSpacing="widest"
        >
          Our Achievers
        </Text>
        <Heading
          as="h2"
          size={{base : 'md', md : "2xl"}}
          color="teal.600"
          fontWeight="bold"
          letterSpacing="tight"
          lineHeight="shorter"
        >
          Meet Our Top Performers
        </Heading>
      </Box>

      <Box
        p={{ base: 2, md: 4 }} // Adjust padding for smaller screens
        mt={{ base: 4, md: 0 }} // Add margin-top for mobile screens
      >
        <Slider ref={sliderRef} {...settings}>
          {toppersData.map((item, index) => (
            <Box key={index} px={{ base: 1, md: 2 }}>
              {" "}
              {/* Reduce padding on mobile */}
              <ToppersCard
                img={item.imageUrl}
                name={item.name}
                classs={item.className}
                year={item.year}
                percentage={item.percentage}
              />
            </Box>
          ))}
        </Slider>

        <Stack direction="row" justifyContent="center" mt={10} spacing={4}>
          <IconButton
            aria-label="Previous"
            icon={<ArrowBackIcon />}
            onClick={() => sliderRef.current.slickPrev()}
            colorScheme="teal"
          />
          <IconButton
            aria-label="Next"
            icon={<ArrowForwardIcon />}
            onClick={() => sliderRef.current.slickNext()}
            colorScheme="teal"
          />
        </Stack>
      </Box>
    </Container>
  );
}
