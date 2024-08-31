import { Container } from "@chakra-ui/react";
// import ProductCard from "../Cards/ProductCard/ProductCard";
import IndividualProductPage from "../IndividualProductPage/IndividualProductPage";
// import HomeCard from "../Cards/HomeCard";
// import Headphone from "../assets/headphones.png";
// import VerticalCard from "../Cards/VerticalCard/VerticalCard";
// import Heels from '../assets/heels.png'
// import Phone from '../assets/phone.png'
import ProductData from '../IndividualProductPage/dummyData.json'

const EcomHomePage = () => {
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
<IndividualProductPage productData={ProductData}/>
        {/* <ProductCard/> */}
    </Container>
  );
};

export default EcomHomePage;
