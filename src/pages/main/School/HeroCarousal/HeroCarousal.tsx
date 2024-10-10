import React from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Type definition for a card
interface CarouselCard {
  image: string;
  title: string;
  text: string;
}

// Props for the CaptionCarousel
interface CaptionCarouselProps {
  cards: CarouselCard[];
  sliderSettings?: object; // Optional slider settings
}

const defaultSettings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const HeroCarousal: React.FC<CaptionCarouselProps> = ({
  cards,
  sliderSettings,
}) => {
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  return (
    <Box
      position={"relative"}
      height={"600px"}
      width={"full"}
      overflow={"hidden"}
    >
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>

      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>

      <Slider
        {...{ ...defaultSettings, ...sliderSettings }}
        ref={(slider) => setSlider(slider)}
      >
        {cards.map((card, index) => (
          <Box
            key={index}
            // height={"6xl"}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
          >
            <Container size="container.lg" height="600px" position="relative">
              <Stack
                spacing={4}
                w={"full"}
                maxW={"lg"}
                position="absolute"
                top="75%"
                transform="translateX(80%)"
                bg="rgba(0, 0, 0, 0.6)" // Optional: Add a background for better text contrast
                p={6}
                rounded="md"
              >
                <Heading
                  fontSize={{ base: "3xl", md: "4xl" }}
                  color="white"
                  textAlign={"center"}
                >
                  {card.title}
                </Heading>
                <Text
                  fontSize={{ base: "md", lg: "lg" }}
                  color="white"
                  textAlign="center"
                >
                  {card.text}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HeroCarousal;
