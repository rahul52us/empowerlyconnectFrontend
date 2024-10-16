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
  const side = useBreakpointValue({ base: "10px", md: "40px" });

  // Check if the screen is mobile
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      position={"relative"}
      height={{ base: "500px", md: "700px" }}
      width={"full"}
      overflow={"hidden"}
    >
      {/* Left Arrow */}
      <IconButton
        aria-label="left-arrow"
        variant="solid"
        bg="whiteAlpha.700"
        _hover={{ bg: "whiteAlpha.900" }}
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
        size="lg"
        isRound
        icon={<BiLeftArrowAlt size="30px" />}
      />

      {/* Right Arrow */}
      <IconButton
        aria-label="right-arrow"
        variant="solid"
        bg="whiteAlpha.700"
        _hover={{ bg: "whiteAlpha.900" }}
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
        size="lg"
        isRound
        icon={<BiRightArrowAlt size="30px" />}
      />

      {/* Slider */}
      <Slider
        {...{ ...defaultSettings, ...sliderSettings }}
        ref={(slider) => setSlider(slider)}
      >
        {cards.map((card, index) => (
          <Box
            key={index}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
            height={{ base: "500px", md: "700px" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgGradient: "linear(to-b, transparent 40%, blackAlpha.900)",
              zIndex: 1,
            }}
          >
            <Container size="container.lg" position="relative" zIndex={2}>
              <Stack
                spacing={6}
                w={"full"}
                maxW={"lg"}
                textAlign="center"
                bg="rgba(0, 0, 0, 0.75)"
                p={{ base: 6, md: 10 }}
                rounded="lg"
                color="white"
                marginTop={isMobile ? "50%" : "auto"}
                boxShadow="lg"
                animation="fadeIn 0.5s"
              >
                <Heading
                  fontSize={{ base: "4xl", md: "6xl" }}
                  fontWeight="bold"
                  textTransform="uppercase"
                  lineHeight="1.2"
                  letterSpacing="wide"
                >
                  {card.title}
                </Heading>
                <Text
                  fontSize={{ base: "lg", md: "2xl" }}
                  fontWeight="medium"
                  px={4}
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
