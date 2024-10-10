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

// Define prop types for the component
interface GallerySectionProps {
  images: string[]; // Expecting an array of image URLs
}

export default function GallerySection({ images }: GallerySectionProps) {
  const sliderRef: any = useRef(null);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    speed: 500,
    rows: 2, // Display 2 rows of images
    slidesPerRow: 1, // Number of slides per row
  };

  return (
    <Box id="gallery" py={16} bg="white">
      <Container maxW="container.xl">
        <Heading as="h2" size="xl" textAlign="center" mb={8}>
          School Gallery
        </Heading>

        <Slider ref={sliderRef} {...settings}>
          {images.map((src, index) => (
            <Box key={index} p={2}>
              <Image
                src={src}
                rounded={8}
                objectFit={"cover"} // Change to 'cover' for better fit
                alt={`Gallery image ${index + 1}`}
                width="100%" // Ensure width takes full space
                height="auto" // Maintain aspect ratio
                maxH={"275"}
                display="block" // Ensures no extra space on sides
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
