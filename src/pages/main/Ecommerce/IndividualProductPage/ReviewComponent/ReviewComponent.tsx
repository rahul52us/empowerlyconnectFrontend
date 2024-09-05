import { ChevronDownIcon, ChevronUpIcon, StarIcon } from "@chakra-ui/icons";
import {
  // Badge,
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Tag,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

const ProductReviewCard = ({ review }: any) => {
  const { isOpen, onToggle } = useDisclosure();

  console.log('review',review)
  const {
    review_author,
    review_source,
    review_source_url,
    review_text,
    rating,
    review_datetime_utc,
    photos,
  } = review;
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      w={"50%"}
      p={4}
      bg="gray.50"
      mb={4}
      transition="all 0.3s ease"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        transition="all 0.3s ease"
      >
        <Image
          boxSize="100px"
          src={photos[0]} // Display the first image as a thumbnail
          alt="Review Image"
          borderRadius="md"
          objectFit="cover"
          mr={4}
          transition="all 0.3s ease"
        />

        <VStack align="start" flex="1" spacing={2}>
          <HStack justifyContent="space-between" width="full">
            <Heading size="md">{review_author}</Heading>
            <Tag colorScheme="teal" variant="outline">
              {rating} / 5 Stars
            </Tag>
          </HStack>

          <HStack spacing={1}>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < rating ? "yellow.400" : "gray.300"}
                />
              ))}
          </HStack>

          <Text fontSize="sm" color="gray.600" noOfLines={2}>
            {new Date(review_datetime_utc).toLocaleDateString()}
          </Text>

          <Text noOfLines={isOpen ? 0 : 1} fontSize="sm" transition="all 0.3s">
            {review_text}
          </Text>

          <Link
            href={review_source_url}
            isExternal
            color="blue.500"
            fontSize="sm"
          >
            {review_source}
          </Link>
        </VStack>
      </Flex>
      <Button
        size="sm"
        onClick={onToggle}
        variant="outline"
        colorScheme="teal"
        mt={{ base: 4, md: 0 }}
      >
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Flex gap={4} mt={4}>
          {photos.slice(1).map((photo: any, index: number) => (
            <Image
              key={index}
              src={photo}
              boxSize="8rem"
              alt={`Review Image ${index + 2}`}
              borderRadius="md"
              objectFit="cover"
              transition="all 0.3s ease"
            />
          ))}
        </Flex>
      </Collapse>
    </Box>
  );
};


// const ProductReview = () => {
//   const reviews = [
//     {
//       review_id: "596472698230412700",
//       review_title: null,
//       review_author: "Colton W.",
//       review_source: "stockx.com",
//       review_source_url:
//         "https://stockx.com/air-jordan-1-retro-high-white-university-blue-black",
//       review_text:
//         "My first pair of Jordan 1 Highs! These are very high-quality sneakers. My only real complaint is that the price is very steep. Otherwise, great sneakers that arrived in a timely manner and in pristine condition! The premium(?) leather is very crease-resistant. I don’t really mind creasing - I think of it as a badge of honor because it shows you wear your shoes - but I say that because I’ve worn them six times now and they still look fresh out the box! Plus, the suede is very easy to clean. (I got a drip of salsa on my drip, but a slightly damp paper towel followed up with a dry one cleared it right up and it looks like it never happened!) Definitely my favorite pair of sneakers. 10/10 highly recommend, especially for sneakerheads in training like me. :)",
//       rating: 5,
//       review_datetime_utc: "2023-05-10T00:00:00.000Z",
//       review_language: "en",
//       photos: [
//         "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT2WXdOqWwpW2uvvOPgAQ7l9PsXGP3D4i-7RRNEWWW9_p03tVQ&usqp=CAY",
//         "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSW1JE8CMAB2hNj4vfILXhlWe9ivYeT0aW3THz1B-8Gk2dRuG33&usqp=CAY",
//         "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQpYDnlJm0QEM_9uHfDgLn0Bq63FO7IWVaPmU_purqpVPgPIWo&usqp=CAY",
//       ],
//     },
//   ];

//   return (
//     <Box p={5}>
//       {reviews.map((review) => (
//         <ReviewCard key={review.review_id} review={review} />
//       ))}
//     </Box>
//   );
// };

export default ProductReviewCard;
