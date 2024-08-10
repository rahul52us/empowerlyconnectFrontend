// src/components/BookCard.tsx
import React from 'react';
import {
  Box,
  Image,
  Badge,
  Text,
  Stack,
  Heading,
  Tag,
  Flex,
  Spacer,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import StarRatingIcon from '../../../../../../config/component/StarRatingIcon/StarRatingIcon';

interface Book {
  _id: string;
  title: string;
  author: string;
  user: string;
  company: string;
  isbn: string;
  categories: string[];
  language: string;
  availableCopies: number;
  totalCopies: number;
  description: string;
  tags: string[];
  isReferenceOnly: boolean;
  createdAt: string;
  ratings: any[];
  coverImage: {
    name: string;
    url: string;
    type: string;
  };
}

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const shadow = useColorModeValue('md', 'dark-lg');
  const hoverShadow = useColorModeValue('lg', 'dark-lg');
  const placeholderImage = 'https://via.placeholder.com/300x400?text=No+thumbnail+found';

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      bg={bg}
      shadow={shadow}
      maxW={{ base: '100%', md: '100%' }}
      transition="all 0.3s"
      _hover={{ shadow: hoverShadow }}
    >
      <Image
        src={book?.coverImage?.url || placeholderImage}
        alt={book?.coverImage?.name || 'No Image'}
        borderRadius="md"
        objectFit="cover"
        w="100%"
        h={{ base: '200px', md: '300px' }}
      />
      <Stack mt="6" spacing="3">
        <Heading as="h4" size="md" isTruncated>
          {book.title}
        </Heading>
        <Text fontSize="sm" isTruncated>
          Author: {book.author}
        </Text>
        <Text fontSize="sm" isTruncated>
          ISBN: {book.isbn}
        </Text>
        <Text fontSize="sm" isTruncated>
          Language: {book.language}
        </Text>
        <Flex align="center">
          <Badge colorScheme="green" mr="2">
            {book.availableCopies} Available / {book.totalCopies} Total
          </Badge>
          {book.isReferenceOnly && <Badge colorScheme="red">Reference Only</Badge>}
          <Spacer />
          <StarRatingIcon ratings={book.ratings || 0 } color="red"/>
        </Flex>
        <Text fontSize="sm" noOfLines={[1, 2,3]} minHeight={12}>
          {book.description}
        </Text>
        <Flex wrap="wrap" minH={10}>
          {book.tags.map((tag: string) => (
            <Tag key={tag} colorScheme="teal" mr="2" mb="2">
              {tag}
            </Tag>
          ))}
        </Flex>
      </Stack>
      <Button mt="4" colorScheme="blue" size="sm" w="full">
        Borrow
      </Button>
    </Box>
  );
};

export default BookCard;
