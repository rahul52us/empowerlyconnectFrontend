import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, IconButton, Stack, useBreakpointValue } from "@chakra-ui/react";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ToppersCard from "./ToppersCard";
import { toppersData } from "../Constant/constants";

export default function TopperSlider() {
  const sliderRef: any = useRef(null);

  // Define number of slides to show based on the screen size
  const slidesToShow = useBreakpointValue({
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6,
  });

  const settings = {
    centerMode: true,
    infinite: true,
    arrows: false,
    dots: true,
    slidesToShow: slidesToShow, // Use responsive slidesToShow
    autoplay: true,
    autoplaySpeed: 2000,
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

      <Stack
        direction="row"
        justifyContent="end"
        mt={{ base: 8, md: 4 }}
        spacing={2}
        mr={4}
      >
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
