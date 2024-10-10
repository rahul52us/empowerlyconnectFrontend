import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, IconButton, Stack } from "@chakra-ui/react";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ToppersCard from "./ToppersCard";

const toppersData = [
  {
    name: "Lara Croft",
    className: "XI",
    year: "2022-2024",
    percentage: 93,
    imageUrl:
      "https://as2.ftcdn.net/v2/jpg/10/16/40/19/1000_F_1016401913_Dz4YOrT6I2qsYVi7xzRL2oAaSNEeretl.jpg",
  },
  {
    name: "Lara Croft",
    className: "XI",
    year: "2022-2024",
    percentage: 93,
    imageUrl:
      "https://as2.ftcdn.net/v2/jpg/10/16/40/19/1000_F_1016401913_Dz4YOrT6I2qsYVi7xzRL2oAaSNEeretl.jpg",
  },
  {
    name: "Lara Croft",
    className: "XI",
    year: "2022-2024",
    percentage: 93,
    imageUrl:
      "https://as2.ftcdn.net/v2/jpg/10/16/40/19/1000_F_1016401913_Dz4YOrT6I2qsYVi7xzRL2oAaSNEeretl.jpg",
  },
  {
    name: "Lara Croft",
    className: "XI",
    year: "2022-2024",
    percentage: 93,
    imageUrl:
      "https://as2.ftcdn.net/v2/jpg/10/16/40/19/1000_F_1016401913_Dz4YOrT6I2qsYVi7xzRL2oAaSNEeretl.jpg",
  },
  {
    name: "Lara Croft",
    className: "XI",
    year: "2022-2024",
    percentage: 93,
    imageUrl:
      "https://as2.ftcdn.net/v2/jpg/10/16/40/19/1000_F_1016401913_Dz4YOrT6I2qsYVi7xzRL2oAaSNEeretl.jpg",
  },
  {
    name: "Lara Croft",
    className: "XI",
    year: "2022-2024",
    percentage: 93,
    imageUrl:
      "https://as2.ftcdn.net/v2/jpg/10/16/40/19/1000_F_1016401913_Dz4YOrT6I2qsYVi7xzRL2oAaSNEeretl.jpg",
  },
  {
    name: "Lara Croft",
    className: "XI",
    year: "2022-2024",
    percentage: 93,
    imageUrl:
      "https://as2.ftcdn.net/v2/jpg/10/16/40/19/1000_F_1016401913_Dz4YOrT6I2qsYVi7xzRL2oAaSNEeretl.jpg",
  },
  {
    name: "Lara Croft",
    className: "XI",
    year: "2022-2024",
    percentage: 93,
    imageUrl:
      "https://as2.ftcdn.net/v2/jpg/10/16/40/19/1000_F_1016401913_Dz4YOrT6I2qsYVi7xzRL2oAaSNEeretl.jpg",
  },
];

export default function TopperSlider() {
  const sliderRef: any = useRef(null);

  const settings = {  
    centerMode: true,  
    infinite: true,  
    arrows: false,  
    dots: true,  
    slidesToShow: 6,  
    autoplay: true, // Make sure this is set to true  
    autoplaySpeed: 2000, // Auto play speed in milliseconds  
    speed: 500,  
    slidesPerRow: 1,  
  };  

  return (
    <Box bg="white" p={4}>  
      <Slider ref={sliderRef} {...settings}>  
        {toppersData.map((item, index) => (  
          <Box key={index}>  
            <ToppersCard  
              img={item.imageUrl}  
              name={item.name}  
              classs={item.className}  
              year={item.year}  
              percentage={item.percentage}  
            />  
          </Box>  
        ))}  
      </Slider>  

      <Stack direction="row" justifyContent="end" mt={4} spacing={2} mr={4}>  
        <IconButton  
          aria-label="Previous"  
          isRound  
          icon={<ArrowBackIcon />}  
          variant={"outline"}  
          onClick={() => sliderRef.current.slickPrev()}  
          colorScheme="blue"  
        />  
        <IconButton  
          variant={"outline"}  
          isRound  
          aria-label="Next"  
          icon={<ArrowForwardIcon />}  
          onClick={() => sliderRef.current.slickNext()}  
          colorScheme="blue"  
        />  
      </Stack>  
    </Box>  
  );
}
