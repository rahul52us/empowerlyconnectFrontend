import { Box, Heading, SimpleGrid, Flex, Icon, Button } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect, useState, useCallback } from "react";
import { FaBook } from "react-icons/fa6";
import MainPagePagination from "../../../../../config/component/pagination/MainPagePagination";
import { getStatusType } from "../../../../../config/constant/statusCode";
import store from "../../../../../store/store";
import NotFoundData from "../../../../../config/component/NotFound/NotFoundData";
import { useQueryParams } from "../../../../../config/component/customHooks/useQuery";
import { FaPlus } from "react-icons/fa";
import BookDetailDrawer from "../BookDetailDrawers";
import BookCategory from "./element/BookCategory";
// import BookCard from "../BooksDetails/element/BookCard";

const BookDetails = observer(() => {
  const {
    auth: { openNotification },
    bookLiberary: {
      getAllBooksCategory,
      booksCategory,
      handleBookForm,
      handleBookCategoryForm,
    },
  } = store;

  const { getQueryParam, setQueryParam } = useQueryParams();
  const [currentPage, setCurrentPage] = useState(() =>
    getQueryParam("page") ? Number(getQueryParam("page")) : 1
  );

  const fetchRecords = useCallback(
    (page: number = currentPage) => {
      getAllBooksCategory({ page, limit: 10 })
        .then(() => {})
        .catch((err: any) => {
          openNotification({
            title: "Failed to Retrieve Books Category",
            message: err?.data?.message,
            type: getStatusType(err.status),
          });
        });
    },
    [getAllBooksCategory, openNotification, currentPage]
  );

  useEffect(() => {
    fetchRecords(currentPage);
  }, [currentPage, fetchRecords]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page.selected);
    setQueryParam("page", page.selected);
  };

  return (
    <Box>
      <Flex mb={6} justifyContent={"space-between"}>
        <Heading
          display="flex"
          alignItems="center"
          fontSize={{ base: "xl", md: "2xl" }}
          color="teal.600"
        >
          <Icon as={FaBook} boxSize={6} mr={2} />
          Books Category
        </Heading>
        <Flex columnGap={4}>
          <Button
            leftIcon={<FaPlus />}
            colorScheme="teal"
            variant="solid"
            size="lg"
            _hover={{ bg: "teal.600" }}
            _active={{ bg: "teal.700" }}
            _focus={{ boxShadow: "outline" }}
            onClick={() =>
              handleBookCategoryForm({ open: true, data: null, type: "add" })
            }
          >
            Add Category
          </Button>
          <Button
            leftIcon={<FaPlus />}
            colorScheme="teal"
            variant="solid"
            size="lg"
            _hover={{ bg: "teal.600" }}
            _active={{ bg: "teal.700" }}
            _focus={{ boxShadow: "outline" }}
            onClick={() =>
              handleBookForm({ open: true, data: null, type: "add" })
            }
          >
            Add Book
          </Button>
        </Flex>
      </Flex>
      {booksCategory.data.length === 0 && !booksCategory.loading ? (
        <NotFoundData
          onClick={() => {}}
          btnText="Add First Book"
          title="No Books found"
          subTitle="Start by creating a new book to get started."
        />
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={2} mb={8}>
          {booksCategory.data.map((item: any, index: number) => (
            <BookCategory item={item} key={index}
            onClick={(item: any, type: string) => {
                handleBookCategoryForm({ open: true, data: item, type: type })
              }}
            />
          ))}
        </SimpleGrid>
      )}
      <Flex justifyContent="center" mt={8}>
        <MainPagePagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={booksCategory.totalPages}
        />
      </Flex>
      <BookDetailDrawer fetchRecords={fetchRecords} />
    </Box>
  );
});

export default BookDetails;