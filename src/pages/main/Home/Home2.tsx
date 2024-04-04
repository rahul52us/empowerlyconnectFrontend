import { Box, Grid } from "@chakra-ui/react";
import Card1 from "./component/Card1/Card1";
import FlipCard from "./component/FlipCard/Flipcard";
import Card2 from "./component/Card2/Card2";
import MultiCardComponent from "./component/MultiCardComponent/MultiCardComponent";
import CircularProgressBar from "./component/CircularProgressBar/CircularProgressBar";

const servicesData = [
  {
    id: 0,
    src: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    alt: "System Analysis & Integration",
    title: "System Analysis & Integration",
    description:
      "Understanding and working closely with Network Partners to analyze their systems and integration requirements.",
  },
  {
    id: 1,
    src: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    alt: "Gap Analysis",
    title: "Gap Analysis",
    description:
      "Identifying and addressing any discrepancies for ONDC integration.",
  },
  {
    id: 2,
    src: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    alt: "Guidance & Recommendations",
    title: "Guidance & Recommendations",
    description:
      "Advising on necessary changes and enhancements for compatibility.",
  },
  {
    id: 3,
    src: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    alt: "Custom Development",
    title: "Custom Development",
    description:
      "Creating adapters and extensions for mapping APIs to ONDC standards.",
  },
];

const cardData = [
  {
    id: 1,
    imageUrl:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    imageAlt: "Food and Beverage",
    name: "Food and Beverage",
    backDescription:
      "Welcome to our hub for all things food and beverages, where indulgence meets convenience.",
  },
  {
    id: 2,
    imageUrl:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    imageAlt: "Fashion",
    name: "Fashion and Footwear",
    backDescription:
      "Discover the ease of online fashion and footwear shopping with our seamless interface.",
  },
  {
    id: 3,
    imageUrl: "/images/ondc/electronics.webp",
    imageAlt: "electronics",
    name: "Electronic",
    backDescription:
      "Discover our platform, crafted to make your shopping experience for electronics seamless and hassle-free.",
  },
  {
    id: 4,
    imageUrl: "/images/ondc/home.webp",
    imageAlt: "Home and Kitchen",
    name: "Home and Kitchen",
    backDescription:
      "Upgrade your home and kitchen effortlessly with our streamlined online shopping experience.",
  },
  {
    id: 5,
    imageUrl: "/images/ondc/grocery.webp",
    imageAlt: "Grocery",
    name: "Grocery",
    backDescription:
      "Join us and discover the ultimate convenience of online grocery shopping today!",
  },
  {
    id: 6,
    imageUrl: "/images/ondc/beauty-selfcare.webp",
    imageAlt: "Beauty and Personal Care",
    name: "Beauty and Personal Care",
    backDescription:
      "Elevate your beauty and personal care routine effortlessly with our curated selection and user-friendly shopping experience",
  },
  {
    id: 7,
    imageUrl: "/images/ondc/mobility.webp",
    imageAlt: "Mobility",
    name: "Mobility",
    backDescription:
      "Unlock boundless mobility possibilities with our platform - your key to seamless journeys and newfound freedom.",
  },
  {
    id: 8,
    imageUrl: "/images/ondc/financial-services.webp",
    imageAlt: "Financial Services",
    name: "Financial Services",
    backDescription:
      "Effortlessly explore diverse finance options on our platform, from gift cards to investments and insurance.",
  },
];

const data = [
  {
    id: "1",
    image: "https://cdn-icons-png.flaticon.com/128/6424/6424084.png",
    title: "Expertise in ONDC",
    about: "In-depth knowledge and experience in ONDC integrations.",
  },
  {
    id: "2",
    image: "https://cdn-icons-png.flaticon.com/128/6424/6424084.png",
    title: "Rapid Onboarding",
    about:
      "Quick and efficient partner integration to leverage ONDC benefits sooner.",
  },
  {
    id: "3",
    image: "https://cdn-icons-png.flaticon.com/128/6424/6424084.png",
    title: "Cloud-Based Solutions",
    about: "No server maintenance required with our cloud-based APIs.",
  },
  {
    id: "4",
    image: "https://cdn-icons-png.flaticon.com/128/6424/6424084.png",
    title: "Minimal Development Effort",
    about: "Easy integration with existing systems.",
  },
];

const card = [
  {
    image:
      "https://img.freepik.com/free-vector/woman-thinking-isoalted-design-illustration_18591-83949.jpg?t=st=1712074549~exp=1712078149~hmac=8701df5ed01458315f895f4ec71052571f98651a538d5c911fdcdc4c75a7860b&w=740",
    button: "FAQ",
  },
  {
    image:
      "https://img.freepik.com/free-vector/woman-thinking-isoalted-design-illustration_18591-83949.jpg?t=st=1712074549~exp=1712078149~hmac=8701df5ed01458315f895f4ec71052571f98651a538d5c911fdcdc4c75a7860b&w=740",
    button: "About",
  },
  {
    image:
      "https://img.freepik.com/free-vector/woman-thinking-isoalted-design-illustration_18591-83949.jpg?t=st=1712074549~exp=1712078149~hmac=8701df5ed01458315f895f4ec71052571f98651a538d5c911fdcdc4c75a7860b&w=740",
    button: "Contact Us",
  },
];

const Home2 = () => {
  return (
    <>
      <Box>
        <Grid templateColumns={"1fr 1fr 1fr 1fr"} columnGap={4}>
          {servicesData.map((value) => (
            <Card1
              id={value.id}
              title={value.title}
              description={value.description}
              alt={value.alt}
              image={value.src}
            />
          ))}
        </Grid>
      </Box>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={6}
        mx={{ base: "none", md: "2rem", lg: "10rem" }}
        placeItems={"center"}
      >
        {cardData.map((card) => (
          <FlipCard
            key={card.id}
            imageUrl={card.imageUrl}
            imageAlt={card.imageAlt}
            name={card.name}
            backDescription={card.backDescription}
          />
        ))}
      </Grid>
      <Box my={6}>
        <Grid templateColumns={"1fr 1fr"}>
          {data.map((value) => (
            <Card2
              key={value.id}
              image={value.image}
              about={value.about}
              title={value.title}
              bgColor="teal.300"
              cardBg={"white"}
            />
          ))}
        </Grid>
      </Box>
      <Box my={6}>
        <CircularProgressBar progressValue={50} description={"Million Views"} />
      </Box>
      <Box m={{ base: "1rem", lg: "6rem" }}>
        <MultiCardComponent
          bgColor={"telegram.500"}
          buttonColor={"telegram.500"}
          description={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga amet vitae sed ipsum incidunt eius commodi atque nemo magnam, dolore quia  dolorem tempora."
          }
          title={"Got Question?"}
          card={card}
          // image={
          //   "https://img.freepik.com/free-vector/woman-thinking-isoalted-design-illustration_18591-83949.jpg?t=st=1712074549~exp=1712078149~hmac=8701df5ed01458315f895f4ec71052571f98651a538d5c911fdcdc4c75a7860b&w=740"
          // }
          // button={"FAQ"}
        />
      </Box>
    </>
  );
};

export default Home2;
