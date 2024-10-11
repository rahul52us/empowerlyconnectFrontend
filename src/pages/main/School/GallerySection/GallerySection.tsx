import {
  Box,
  Container,
  Heading,
  IconButton,
  Image,
  Stack,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useRef } from "react";

interface GallerySectionProps {
  images: string[]; // Expecting an array of image URLs
}

export default function GallerySection({ images }: GallerySectionProps) {
  const sliderRef: any = useRef(null);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    rows: 2,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          rows: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          rows: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          rows: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <Box id="gallery" py={{ base: 8, md: 16 }} bg="white">
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        <Heading as="h2" size="xl" textAlign="center" mb={8}>
            Gallery
        </Heading>

        <Slider ref={sliderRef} {...settings}>
          {images.map((src, index) => (
            <Box key={index} p={2}>
              <Image
                src={src}
                rounded={8}
                objectFit="cover"
                alt={`Gallery image ${index + 1}`}
                width="100%"
                height="auto"
                maxH={{ base: "150px", md: "275px" }}
                display="block"
              />
            </Box>
          ))}
        </Slider>
        <Stack direction="row" justifyContent="center" mt={4} spacing={4}>
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
      </Container>
    </Box>
  );
}
