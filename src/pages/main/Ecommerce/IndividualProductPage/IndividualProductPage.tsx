import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { FaRegComments, FaStar } from "react-icons/fa";
import { FaOpencart } from "react-icons/fa6";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PriceDisplay from "./PriceDisplay/PriceDisplay";
import ProductSpecification from "./ProductSpecification/ProductSpecification";

const IndividualProductPage = ({ productData }: any) => {
  const [mainImage, setMainImage] = useState(productData?.images[0]);

  const settings = {
    vertical: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };

  const options = {
    method: "GET",
    url: "https://real-time-product-search.p.rapidapi.com/product-details",
    params: {
      product_id: "11577822456427762145",
      country: "us",
      language: "en",
    },
    headers: {
      "x-rapidapi-key": "d4c4126cb1mshddd553eb7fe95bap1bdf13jsn19c6b312de3f",
      "x-rapidapi-host": "real-time-product-search.p.rapidapi.com",
    },
  };
  const getDetails = async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <Box>
      <Grid templateColumns={"1fr 3fr 4fr"} gap={4} mb={4}>
        <Box>
          <Slider {...settings}>
            {productData.images.map((img: any, index: any) => (
              <Box
                key={index}
                onClick={() => setMainImage(img)}
                boxSize={"6rem"}
              >
                <Image
                  src={img}
                  rounded={"2xl"}
                  boxSize={"6rem"}
                  objectFit={"cover"}
                  cursor={"pointer"}
                />
              </Box>
            ))}
          </Slider>
        </Box>
        <Box  >
          <Image
            w={"100%"}
            mx={{ base: 0, md: "auto" }}
            objectFit={"contain"}
            // h={"90%"}
            maxH={"78vh"}
            src={mainImage}
          />
        </Box>
        <Box p={5}>
          <VStack spacing={5} align={"start"}>
            <Box>
              <Heading mb={2} fontSize={"2xl"}>
                {productData.name}
              </Heading>
              <Text fontSize={"lg"} color={"gray"}>
                {productData.description}
              </Text>
            </Box>

            <Flex gap={12}>
              <Flex align={"center"} gap={"0.5"}>
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <Icon
                      key={i}
                      fontSize={"lg"}
                      as={FaStar}
                      color={
                        i < Math.round(productData.rating) ? "gold" : "gray.300"
                      }
                    />
                  ))}
                <Text ml={2} color={"gray"} fontWeight={500}>
                  {productData.rating}
                </Text>
              </Flex>
              <Flex align={"center"} color={"gray"}>
                <Icon fontSize={"lg"} as={FaRegComments} />

                <Text ml={2} fontWeight={500}>
                  {productData.reviewsCount} Reviews
                </Text>
              </Flex>
            </Flex>

            <Box>
              <PriceDisplay
                price={productData.price}
                currency={productData.currency}
                discount={productData.discount}
              />
            </Box>

            <Flex align={"center"} gap={8}>
              <Text fontWeight={500}>Select Size</Text>
              <Button
                rightIcon={<ArrowForwardIcon />}
                color={"gray"}
                rounded={"full"}
                variant="link"
              >
                Size Guide
              </Button>
            </Flex>
            <Flex gap={6}>
              {productData.available_sizes.map((size: any) => (
                <Button
                  key={size}
                  boxSize={9}
                  variant={"outline"}
                  borderWidth={2}
                  rounded={12}
                  fontSize={"sm"}
                  _hover={{ bg: "blackAlpha.800", color: "white" }}
                >
                  {size}
                </Button>
              ))}
            </Flex>
            <Box>
              <Text fontWeight={500} mb={1}>
                Colors Available
              </Text>
              <Flex gap={3}>
                {productData.available_colors.map((color: any) => (
                  <Box p={"0.5"} borderWidth={2} rounded={"full"} key={color}>
                    <Box
                      cursor={"pointer"}
                      bg={color.hex_code}
                      boxSize={6}
                      rounded={"full"}
                    ></Box>
                  </Box>
                ))}
              </Flex>
            </Box>
            <Flex mt={2} w={"100%"}>
              <Button
                bg={"blue.300"}
                w={"30%"}
                _hover={{ bg: "blue.400" }}
                rounded={"full"}
                variant={"solid"}
                leftIcon={<FaOpencart />}
                fontWeight={700}
              >
                Add To Cart
              </Button>
            </Flex>
            <Divider borderColor={"gray.300"} />
            <Grid templateColumns={"1fr 1fr"} rowGap={6} w={"90%"}>
              {productData.features.map((feature: any, index: any) => (
                <Flex align={"center"} color={"gray.700"} key={index}>
                  <Icon fontSize={"lg"} as={FaRegComments} />
                  <Text ml={4} fontWeight={500}>
                    {feature}
                  </Text>
                </Flex>
              ))}
            </Grid>
          </VStack>
        </Box>
      </Grid>
      <ProductSpecification
        productSpecifications={productData?.product_specifications}
      />
    </Box>
  );
};

export default IndividualProductPage;
