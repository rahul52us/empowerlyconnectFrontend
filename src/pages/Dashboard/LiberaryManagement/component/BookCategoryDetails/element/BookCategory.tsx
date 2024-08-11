import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Image,
  Heading,
  Text,
  Stack,
  Tooltip,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

const BookCategory = observer(({ item, onClick }: any) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      mb={4}
      boxShadow="md"
      maxW="sm"
      _hover={{ boxShadow: "lg" }}
    >
      {/* Image Container */}
      <Box
        borderRadius="md"
        overflow="hidden"
        mb={4}
        height="200px"
        bg="gray.200"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src={
            item?.coverImage?.url ||
            "https://via.placeholder.com/300x400?text=No+thumbnail+found"
          }
          alt={item.title}
          objectFit="cover"
          height="100%"
          width="100%"
        />
      </Box>
      <Stack spacing={3}>
        <Flex justifyContent="space-between">
          <Heading
            size="md"
            cursor="pointer"
            onClick={() => onClick(item, "view")}
          >
            {item.title}
          </Heading>
          <Tooltip label="Edit Category" aria-label="Edit Category">
            <IconButton
              icon={<EditIcon />}
              onClick={() => onClick(item, "edit")}
              variant="ghost"
              colorScheme="teal"
              aria-label="Edit Category"
            />
          </Tooltip>
        </Flex>
        <Text color="gray.500" noOfLines={[1, 2, 3]} minHeight={12}>
          {item.description}
        </Text>
        <Text fontWeight="bold">Books Available: {item.bookCount}</Text>
      </Stack>
    </Box>
  );
});

export default BookCategory;
