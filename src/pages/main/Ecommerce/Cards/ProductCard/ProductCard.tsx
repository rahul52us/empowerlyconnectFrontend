// import React from 'react';
import {
  Badge,
  Box,
  Flex,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

const ProductCard = () => {
  const product = {
    name: "Stylish Sneakers",
    imageUrl:
      "https://img.freepik.com/free-photo/full-length-portrait-happy-excited-girl-bright-colorful-clothes-holding-shopping-bags-while-standing-showing-peace-gesture-isolated_231208-5946.jpg?uid=R98118533&ga=GA1.1.1822911562.1716356990&semt=ais_hybrid",
    price: "$79.99",
    rating: 4.5,
    numReviews: 34,
    isNew: true,
  };

  return (
    <Box
      maxW="300px"
      overflow="hidden"
      position="relative"
      bg={useColorModeValue("whiteAlpha.800", "blackAlpha.400")}
      boxShadow="base"
      backdropFilter="blur(10px)"
    >
      <Box h="300px" overflow="hidden" position="relative">
        <Image
          src={product.imageUrl}
          alt={product.name}
          objectFit="cover"
          height="100%"
          width="100%"
          transition="transform 0.3s"
          _hover={{ transform: "scale(1.1)" }}
        />
        {product.isNew && (
          <Badge
            position="absolute"
            top="10px"
            variant={"outline"}
            left="10px"
            borderRadius="full"
            px="3"
            py="1"
            colorScheme="pink"
          >
            New
          </Badge>
        )}
      </Box>

      <Box p="2" px={4}>
        <VStack align="start" mt="2">
          <Flex justify={"space-between"} w={"100%"}>
            <Box>
              <Text
                as="h3"
                // fontSize="lg"
                fontWeight="bold"
                noOfLines={1}
                w={"100%"}
              >
                {product.name}
              </Text>
              <Text color={"gray"} fontSize={"sm"}>
                Allen Solly
              </Text>
            </Box>
            <Text fontSize="lg" fontWeight="bold" color={"blue.700"}>
              {product.price}
            </Text>
          </Flex>
          <HStack align="center">
            <Box as="span" color="yellow.400" fontSize="lg">
              ★ {product.rating}
            </Box>
            <Text fontSize="sm" color="gray.500">
              ({product.numReviews} reviews)
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
