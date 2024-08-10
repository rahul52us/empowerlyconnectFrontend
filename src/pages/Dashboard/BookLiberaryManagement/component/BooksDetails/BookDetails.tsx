import { Box, Heading, SimpleGrid, Flex, Icon, Button } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect, useState, useCallback } from "react";
import { FaBook } from "react-icons/fa6";
import MainPagePagination from "../../../../../config/component/pagination/MainPagePagination";
import { getStatusType } from "../../../../../config/constant/statusCode";
import store from "../../../../../store/store";
import BookCard from "./element/BookCard";
import NotFoundData from "../../../../../config/component/NotFound/NotFoundData";
import { useQueryParams } from "../../../../../config/component/customHooks/useQuery";
import { FaPlus } from "react-icons/fa";
import CustomDrawer from "../../../../../config/component/Drawer/CustomDrawer";
import AddBook from "../forms/Book/AddBook";
import EditBook from "../forms/Book/EditBook";
import BookView from "../forms/Book/BookView";
import AddBookCategory from "../forms/BookCategory/AddBookCategory";
import EditBookCategory from "../forms/BookCategory/EditBookCategory";
import BookCategoryView from "../forms/BookCategory/BookCategoryView";

const BookDetails = observer(() => {
  const {
    auth: { openNotification },
    bookLiberary: {
      getAllBooks,
      booksData,
      handleBookForm,
      bookForm,
      handleBookCategoryForm,
      bookCategoryForm,
    },
  } = store;

  const { getQueryParam, setQueryParam } = useQueryParams();
  const [currentPage, setCurrentPage] = useState(() =>
    getQueryParam("page") ? Number(getQueryParam("page")) : 1
  );

  const fetchBooks = useCallback(
    (page: number = currentPage) => {
      getAllBooks({ page, limit: 10 })
        .then(() => {})
        .catch((err: any) => {
          openNotification({
            title: "Failed to Retrieve Books",
            message: err?.data?.message,
            type: getStatusType(err.status),
          });
        });
    },
    [getAllBooks, openNotification, currentPage]
  );

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage, fetchBooks]);

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
          Books
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
      {booksData.data.length === 0 && !booksData.loading ? (
        <NotFoundData
          onClick={() => {}}
          btnText="Add First Book"
          title="No Books found"
          subTitle="Start by creating a new book to get started."
        />
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
          {booksData.data.map((item: any, index: number) => (
            <BookCard
              book={{ ...item, ratings: item.ratings || [] }}
              key={index}
              handleBookForm={(item: any, type: string) =>
                handleBookForm({ open: true, data: item, type: type })
              }
            />
          ))}
        </SimpleGrid>
      )}

      <Flex justifyContent="center" mt={8}>
        <MainPagePagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={booksData.totalPages}
        />
      </Flex>

      {/* Book Form Drawer */}
      <CustomDrawer
        open={bookForm.open}
        title={bookForm.type === "add" ? "CREATE NEW BOOK" : "UPDATE BOOK"}
        close={() => handleBookForm({ open: false, type: "add", data: null })}
        width={bookForm.type === "view" ? "75vw" : "90vw"}
      >
        {bookForm.type === "view" ? (
          <BookCategoryView data={bookForm.data} />
        ) : bookForm.type === "add" ? (
          <AddBook
            fetchRecords={fetchBooks}
            close={() =>
              handleBookForm({ open: false, type: "add", data: null })
            }
          />
        ) : (
          <EditBook
            fetchRecords={fetchBooks}
            data={bookForm.data}
            close={() =>
              handleBookForm({ open: false, type: "add", data: null })
            }
          />
        )}
      </CustomDrawer>

      {/* Book Category Form Drawer */}

      <CustomDrawer
        open={bookCategoryForm.open}
        title={
          bookCategoryForm.type === "add"
            ? "CREATE NEW Category"
            : "UPDATE Category"
        }
        close={() =>
          handleBookCategoryForm({ open: false, type: "add", data: null })
        }
        width={bookCategoryForm.type === "view" ? "75vw" : "90vw"}
      >
        {bookCategoryForm.type === "view" ? (
          <BookView data={bookCategoryForm.data} />
        ) : bookCategoryForm.type === "add" ? (
          <AddBookCategory
            fetchRecords={fetchBooks}
            close={() =>
              handleBookCategoryForm({ open: false, type: "add", data: null })
            }
          />
        ) : (
          <EditBookCategory
            fetchRecords={fetchBooks}
            data={bookCategoryForm.data}
            close={() =>
              handleBookCategoryForm({ open: false, type: "add", data: null })
            }
          />
        )}
      </CustomDrawer>
    </Box>
  );
});

export default BookDetails;
