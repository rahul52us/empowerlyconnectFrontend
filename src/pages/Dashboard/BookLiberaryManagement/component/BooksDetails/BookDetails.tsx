import { Box, Heading, SimpleGrid, Flex, Icon } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect, useState, useCallback } from "react";
import { FaBook } from "react-icons/fa6";
import MainPagePagination from "../../../../../config/component/pagination/MainPagePagination";
import { getStatusType } from "../../../../../config/constant/statusCode";
import store from "../../../../../store/store";
import BookCard from "./element/BookCard";
import NotFoundData from "../../../../../config/component/NotFound/NotFoundData";
import { useQueryParams } from "../../../../../config/component/customHooks/useQuery";

const BookDetails = observer(() => {
  const {
    auth: { openNotification },
    bookLiberary: { getAllBooks, booksData },
  } = store;

  const { getQueryParam, setQueryParam } = useQueryParams();
  const [currentPage, setCurrentPage] = useState(() =>
    getQueryParam("page") ? Number(getQueryParam("page")) : 1
  );

  const fetchBooks = useCallback(
    (page: number) => {
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
    [getAllBooks, openNotification]
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
      <Heading
        display="flex"
        alignItems="center"
        mb={6}
        fontSize={{ base: "xl", md: "2xl" }}
        color="teal.600"
      >
        <Icon as={FaBook} boxSize={6} mr={2} />
        Books
      </Heading>
      {booksData.data.length === 0 && !booksData.loading ? (
        <NotFoundData
          onClick={() => {}}
          btnText="CREATE First Book"
          title="No Books found"
          subTitle="Start by creating a new book to get started."
        />
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
          {booksData.data.map((item: any, index: number) => (
            <BookCard book={{ ...item, ratings: item.ratings || [] }} key={index} />
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
    </Box>
  );
});

export default BookDetails;
