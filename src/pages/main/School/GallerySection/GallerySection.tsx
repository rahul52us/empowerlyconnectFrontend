import { Box, Container, Heading, SimpleGrid, Image } from "@chakra-ui/react";

export default function GallerySection() {
  return (
    <Box id="gallery" py={16} bg="white">
      <Container maxW="container.xl">
        <Heading as="h2" size="xl" textAlign="center" mb={8}>
          School Gallery
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Image
              key={i}
              src={
                "https://images.pexels.com/photos/11366728/pexels-photo-11366728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt={`School image ${i}`}
              width={400}
              objectFit={"cover"}
              height={300}
              rounded={"lg"}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
