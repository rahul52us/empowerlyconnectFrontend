import { Box, Container, Grid } from "@chakra-ui/react";
import ProductCard from "../Cards/ProductCard/ProductCard";
import IndividualProductPage from "../IndividualProductPage/IndividualProductPage";
// import HomeCard from "../Cards/HomeCard";
// import Headphone from "../assets/headphones.png";
// import VerticalCard from "../Cards/VerticalCard/VerticalCard";
// import Heels from '../assets/heels.png'
// import Phone from '../assets/phone.png'
import ProductData from "../IndividualProductPage/dummyData.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import ProductReviewCard from "../IndividualProductPage/ReviewComponent/ReviewComponent";
import RatingPerReview from "../IndividualProductPage/ReviewComponent/RatingPerReview";
import ReviewInsights from "../IndividualProductPage/ReviewInsight/ReviewInsight";

const EcomHomePage = () => {
  const [data, setData] = useState<any>({});
  const options = {
    method: "GET",
    url: "https://real-time-product-search.p.rapidapi.com/search",
    params: {
      q: "*",
      country: "uk",
      language: "en",
      page: "1",
      limit: "10",
      sort_by: "BEST_MATCH",
      product_condition: "ANY",
      min_rating: "ANY",
    },
    headers: {
      "x-rapidapi-key": "d4c4126cb1mshddd553eb7fe95bap1bdf13jsn19c6b312de3f",
      "x-rapidapi-host": "real-time-product-search.p.rapidapi.com",
    },
  };
  const getData = async (data: any) => {
    try {
      const response = await axios.request(data);
      setData(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData(options);
  }, []);

  console.log("data", data);

  return (
    <Container maxW={"8xl"} mx={"auto"} my={{ base: 2, md: 12 }}>
      {/* <Grid templateColumns={"1fr 1fr"}>
        <Box>

        <HomeCard
        title="Wireless Headphones"
        imageSrc={Headphone}
        description="Explore Now"
        // isImageLeft={true}
        />
        </Box>
        <Flex gap={4}>
          
        <VerticalCard
        imageSrc={Heels}
        altText="Heels"
        title="Explore Now"
        subtitle="Latest Fashion Trends"
        />
      <VerticalCard
        imageSrc={Phone}
        altText="Sneakers"
        title="Shop Sneakers"
        subtitle="New Arrivals"
        bgGradient="linear(to-b, blue.50, blue.100)"
        />
        </Flex>
        </Grid>  */}
      <IndividualProductPage productData={ProductData} />
      <Grid templateColumns={'1fr 1fr'} gap={4} mt={4}>

      {ProductData?.reviews.map((review: any) => (
        <ProductReviewCard review={review} />
      ))}
      </Grid>
      {data?.products?.length > 0 && data && (
        <Grid templateColumns={"1fr 1fr 1fr 1fr"} gap={4}>
          {data?.products?.map((item: any) => (
            <ProductCard product={item} />
          ))}
        </Grid>
      )}

      <Box>
        {/* <Text fontSize="2xl" mb={4}>Rating Breakdown</Text> */}
        <RatingPerReview ratings={ProductData?.reviews_summary.reviews_per_rating} />
      </Box>
      {/* <ProductCard product={data} /> */}
      <Box>
        <ReviewInsights reviewsInsights={ProductData?.reviews_insights} />
      </Box>
    </Container>
  );
};

export default observer(EcomHomePage);
