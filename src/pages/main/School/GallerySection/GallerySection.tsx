import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface GallerySectionProps {
  images: string[];
}

export default function GallerySection({ images }: GallerySectionProps) {
  const sliderRef: any = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  },[images]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  },[images]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        goToNext();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentImageIndex, goToNext, goToPrevious]);

  return (
    <Box id="gallery" py={{ base: 8, md: 16 }} bg="white">
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        <Heading as="h2" size="xl" textAlign="center" mb={8}>
          Gallery
        </Heading>

        <Slider ref={sliderRef} {...settings}>
          {images.map((src, index) => (
            <Box key={index} p={2} onClick={() => openModal(index)}>
              <Image
                src={src}
                rounded={8}
                objectFit="cover"
                alt={`Gallery image ${index + 1}`}
                width="100%"
                height="auto"
                maxH={{ base: "150px", md: "275px" }}
                display="block"
                cursor="pointer"
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

        <Modal isOpen={isOpen} onClose={closeModal} size="6xl" isCentered>
          <ModalOverlay />
          <ModalContent h="90vh" bg={"blackAlpha.900"}>
            <Flex position="relative" height="100%">
              <ModalCloseButton color={'white'} />
              <IconButton
                aria-label="Previous Image"
                icon={<ArrowBackIcon />}
                onClick={goToPrevious}
                position="absolute"
                left={4}
                variant={"outline"}
                isRound
                top="50%"
                transform="translateY(-50%)"
                colorScheme="whiteAlpha"
                zIndex="overlay"
              />
              <IconButton
                aria-label="Next Image"
                icon={<ArrowForwardIcon />}
                onClick={goToNext}
                position="absolute"
                right={4}
                top="50%"
                variant={"outline"}
                isRound
                transform="translateY(-50%)"
                colorScheme="whiteAlpha"
                zIndex="overlay"
              />
              <ModalBody
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <Image
                  src={images[currentImageIndex]}
                  alt={`Gallery image ${currentImageIndex + 1}`}
                  maxW="100%"
                  maxH="100%"
                  objectFit="contain"
                />
              </ModalBody>
            </Flex>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
}
