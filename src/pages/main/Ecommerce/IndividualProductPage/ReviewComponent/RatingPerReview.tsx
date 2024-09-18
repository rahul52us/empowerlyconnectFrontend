import React from "react";
import {
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  Text,
  Box,
  Icon,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

// Define a type for the rating data
interface RatingData {
  star: number; // The star rating (1 to 5)
  count: number; // How many users gave this rating
}

// Define props for the RatingPerReview component
interface RatingPerReviewProps {
  ratings: RatingData[]; // Array of rating data
}

const RatingPerReview: React.FC<RatingPerReviewProps> = ({ ratings }) => {
  // Calculate the total number of reviews
  const totalReviews = ratings.reduce(
    (total, rating) => total + rating.count,
    0
  );

  return (
    <Box maxW={"md"} p={6} shadow={"lg"} borderWidth={1} rounded={"xl"}>
      <Text textAlign={"start"} fontSize={"xl"} fontWeight={700} mb={2}>
        Reviews
      </Text>
      {ratings.map((rating) => {
        const percentage = (rating.count / totalReviews) * 100;

        return (
          <Flex key={rating.star} align="center" width="100%" mb={2}>
            <Text
              fontWeight="bold"
              display={"flex"}
              color={"gray"}
              alignItems={"center"}
              gap={1}
            >
              {rating.star} <Icon as={StarIcon} fontSize={"14px"} />
            </Text>
            <Slider
              value={percentage}
              isReadOnly
              width="80%"
              ml={2}
              aria-label={`slider-${rating.star}-stars`}
            >
              <SliderTrack bg="gray.300" rounded={"full"} h={"10px"}>
                <SliderFilledTrack
                  bgGradient="linear(to-r, pink.300, purple.300)" // Gradient color
                />
              </SliderTrack>
            </Slider>
            <Text ml={4} fontWeight="bold" color={"gray.600"}>
              {percentage.toFixed(0)}%
            </Text>
          </Flex>
        );
      })}
    </Box>
  );
};

export default RatingPerReview;
