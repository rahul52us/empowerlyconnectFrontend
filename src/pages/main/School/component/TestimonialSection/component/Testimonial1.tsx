import { useState } from "react";
import Slider from "react-slick";
import {
  Box,
  Image,
  Text,
  VStack,
  Heading,
  useColorModeValue,
  useColorMode,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { useSectionColorContext } from "../../../School";

const Testimonial1 = ({ content, setContent, isEditable, webColor }: any) => {
  const { colorMode } = useColorMode();
  const { colors } = useSectionColorContext() || { colors: webColor || {} };

  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("teal.600", "teal.400");
  const testimonialColor = useColorModeValue("gray.600", "gray.300");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<any>(null);
  const [editedContent, setEditedContent] = useState({
    title: content.title || "What Our Community Says",
    subTitle: content.subTitle || "Hear from parents, students, and alumni about their experiences.",
    name: "",
    testimonial: "",
    imageUrl: "",
  });

  const openEditModal = (testimonialIndex: number = -1) => {
    if (testimonialIndex === -1) {
      setEditedContent({ ...editedContent, title: content.title, subTitle: content.subTitle });
    } else {
      const testimonial = content.testimonials[testimonialIndex];
      setEditedContent({ ...testimonial });
      setCurrentTestimonial(testimonialIndex);
    }
    setIsModalOpen(true);
  };

  const saveChanges = () => {
    if (currentTestimonial === -1) {
      setContent({
        ...content,
        title: editedContent.title,
        subTitle: editedContent.subTitle,
      });
    } else {
      const updatedTestimonials = [...content.testimonials];
      updatedTestimonials[currentTestimonial] = { ...editedContent };
      setContent({ ...content, testimonials: updatedTestimonials });
    }
    setIsModalOpen(false);
  };

  return (
    <Box
      m={{ base: 2, md: 5 }}
      py={10}
      bg={bg}
      maxW={{ base: "98%", md: "100%" }}
      p={{ base: 5, md: 10 }}
    >
      <Heading
        as="h2"
        size="xl"
        textAlign="center"
        mb={4}
        color={
          colorMode === "light"
            ? colors?.headingColor?.light
            : colors?.headingColor?.dark
        }
      >
        {content.title || "What Our Community Says"}
        {isEditable && (
          <Button
            size="xs"
            ml={2}
            onClick={() => openEditModal(-1)}
            variant="ghost"
            colorScheme="teal"
            leftIcon={<FaEdit />}
          >
            Edit
          </Button>
        )}
      </Heading>
      <Text
        textAlign="center"
        fontSize="lg"
        color={
          colorMode === "light"
            ? colors?.subHeadingColor?.light
            : colors?.subHeadingColor?.dark
        }
        mb={6}
      >
        {content.subTitle || "Hear from parents, students, and alumni about their experiences."}
      </Text>
      <Slider {...settings}>
        {content.testimonials.map(({ id, name, testimonial, imageUrl }: any, index: number) => (
          <Box key={id} mx={2} my={3}>
            <VStack
              spacing={4}
              align="center"
              p={5}
              borderWidth={1}
              borderColor={borderColor}
              borderRadius="lg"
              boxShadow="md"
              bg={cardBg}
              transition="0.3s"
              _hover={{ boxShadow: "xl", transform: "scale(1.03)" }}
              position="relative"
            >
              {isEditable && (
                <Button
                  size="xs"
                  position="absolute"
                  top={2}
                  right={2}
                  onClick={() => openEditModal(index)}
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<FaEdit />}
                >
                  Edit
                </Button>
              )}
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

      {/* Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
        <ModalOverlay />
        <ModalContent bg={cardBg} borderRadius="md" boxShadow="lg">
          <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold">
            {currentTestimonial === -1 ? "Edit Title and Subtitle" : "Edit Testimonial"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {currentTestimonial === -1 ? (
              <>
                <Input
                  mb={4}
                  placeholder="Title"
                  value={editedContent.title}
                  onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                  borderRadius="md"
                  _focus={{ borderColor: "teal.400" }}
                  size="lg"
                />
                <Textarea
                  placeholder="Subtitle"
                  value={editedContent.subTitle}
                  onChange={(e) => setEditedContent({ ...editedContent, subTitle: e.target.value })}
                  borderRadius="md"
                  _focus={{ borderColor: "teal.400" }}
                  size="lg"
                  rows={3}
                />
              </>
            ) : (
              <>
                <Input
                  mb={4}
                  placeholder="Name"
                  value={editedContent.name}
                  onChange={(e) => setEditedContent({ ...editedContent, name: e.target.value })}
                  borderRadius="md"
                  _focus={{ borderColor: "teal.400" }}
                  size="lg"
                />
                <Textarea
                  placeholder="Testimonial"
                  value={editedContent.testimonial}
                  onChange={(e) =>
                    setEditedContent({ ...editedContent, testimonial: e.target.value })
                  }
                  borderRadius="md"
                  _focus={{ borderColor: "teal.400" }}
                  size="lg"
                  rows={5}
                  mb={4}
                />
                <Input
                  placeholder="Image URL"
                  value={editedContent.imageUrl}
                  onChange={(e) =>
                    setEditedContent({ ...editedContent, imageUrl: e.target.value })
                  }
                  borderRadius="md"
                  _focus={{ borderColor: "teal.400" }}
                  size="lg"
                />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={saveChanges} mr={3} size="lg" px={6}>
              Save
            </Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} size="lg" px={6}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Testimonial1;
