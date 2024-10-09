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

export default function GallerySection() {
  const sliderRef: any = useRef(null);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    // centerPadding: "10px",
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

        {/* Slick Slider */}
        <Slider ref={sliderRef} {...settings}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => (
            <Box key={i} p={4}>
              <Image
                src={
                  "https://images.pexels.com/photos/11366728/pexels-photo-11366728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                rounded={8}
                objectFit={"contain"}
                // h={300}
                // w={500}

                alt={`School image ${i}`}

                // style={{
                //   width: "100%",
                //   height: ,
                //   borderRadius: "8px",
                //   objectFit: "cover",
                // }}
              />
            </Box>
          ))}
        </Slider>

        {/* Navigation Buttons */}
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
