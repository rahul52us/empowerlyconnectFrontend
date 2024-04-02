import { Box, Image, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  description: string;
  alt: string;
  image: string;
  id?: any;
}

const Card1 = ({ title, description, alt, image, id }: Props) => {
  // const columnCount = useBreakpointValue({ base: 1, md: 2, lg: 4 });

  return (
    <Box
      key={id}
      boxShadow="lg"
      p="1.2rem"
      borderRadius="1.5rem"
      cursor="pointer"
      _hover={{ transform: "scale(1.06)" }}
      transition="transform 0.3s ease-in-out"
    >
      <Image src={image} alt={alt} w="auto" h="auto" objectFit="contain" />
      <Text mt={2} fontWeight="600" fontSize={{ base: "1.8rem", md: "1.4rem" }}>
        {title}
      </Text>
      <Text mt=".8rem">{description}</Text>
    </Box>
  );
};

export default Card1;
