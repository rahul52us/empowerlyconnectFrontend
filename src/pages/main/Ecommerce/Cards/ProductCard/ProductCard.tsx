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
import { useNavigate } from "react-router-dom";
import { main } from "../../../../../config/constant/routes";

const ProductCard = ({ product }: any) => {
  const navigate = useNavigate();

  return (
    <Box
      maxW="300px"
      overflow="hidden"
      position="relative"
      bg={useColorModeValue("whiteAlpha.800", "blackAlpha.400")}
      boxShadow="base"
      backdropFilter="blur(10px)"
      pb={2}
      onClick={() => {
        navigate(`${main.ecommerce.products}/${product?.product_id}`);
        
      }}
    >
      <Box h="300px" overflow="hidden" position="relative">
        <Image
          src={product?.product_photos[0]}
          alt={product?.product_title}
          objectFit="contain"
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
              <Text as="h3" fontWeight="bold" noOfLines={1} w={"100%"}>
                {product?.product_title}
              </Text>
              <Text color={"gray"} fontSize={"sm"}>
                {product?.offer?.store_name}
              </Text>
            </Box>
            <Text fontSize="lg" fontWeight="bold" color={"blue.700"}>
              {product?.offer?.price}
            </Text>
          </Flex>
          <HStack align="center">
            <Box as="span" color="blue.500">
              ★ {product?.product_rating}
            </Box>
            <Text fontSize="sm" color="gray.500">
              ({product?.product_num_reviews} reviews)
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
