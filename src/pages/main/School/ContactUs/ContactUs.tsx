import { Box, Container, Heading, Text, Stack, Button } from '@chakra-ui/react';

export default function ContactSection() {
  return (
    <Box id="contact" py={16} bg="white">
      <Container maxW="container.xl" textAlign="center">
        <Heading as="h2" size="xl" mb={8}>Contact Us</Heading>
        <Stack spacing={4}>
          <Text>Phone: (123) 456-7890</Text>
          <Text>Email: info@evergreenacademy.edu</Text>
          <Button colorScheme="blue">Get in Touch</Button>
        </Stack>
      </Container>
    </Box>
  );
}
