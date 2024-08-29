import { Box, Container, Flex, Grid } from "@chakra-ui/react";
import HomeCard from "../Cards/HomeCard";
import Headphone from "../assets/headphones.png";
import VerticalCard from "../Cards/VerticalCard/VerticalCard";
import Heels from '../assets/heels.png'
import Phone from '../assets/phone.png'

const EcomHomePage = () => {
  return (
    <Container maxW={"7xl"} mx={"auto"} my={{ base: 2, md: 12 }}>
      <Grid templateColumns={"1fr 1fr"}>
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
        </Grid> 
    </Container>
  );
};

export default EcomHomePage;
