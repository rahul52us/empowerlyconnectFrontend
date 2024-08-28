import { Container } from "@chakra-ui/react";
import HomeCard from "../Cards/HomeCard";
import Headphone from "../assets/headphones.png";

const EcomHomePage = () => {
  return (
    <Container maxW={"7xl"} mx={"auto"} my={{ base: 2, md: 12 }}>
      {/* <Grid templateColumns={"1fr 1fr"}>
        
      </Grid> */}
      <HomeCard
        title="Wireless Headphones"
        imageSrc={Headphone}
        description="Explore Now"
        // isImageLeft={true}
      />
    </Container>
  );
};

export default EcomHomePage;
