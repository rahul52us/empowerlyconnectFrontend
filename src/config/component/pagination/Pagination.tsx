import ReactPaginate from "react-paginate";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { MdFirstPage, MdLastPage, MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import "./pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  props?: any;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  props,
}: PaginationProps) => {
  const handlePageChange = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };

  return totalPages ? (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginTop="0.1rem"
      {...props}
    >
      <Flex alignItems="center" gridColumnGap="5px">
        <IconButton
          aria-label="First page"
          icon={<MdFirstPage />}
          onClick={() => onPageChange(1)}
          isDisabled={currentPage === 1}
          color="gray.700"
          _disabled={{ color: 'gray.700' }}
        />
        <ReactPaginate
          previousLabel={<MdNavigateBefore />}
          nextLabel={<MdNavigateNext />}
          breakLabel="..."
          // pageCount={5}
          pageCount={totalPages}
          forcePage={currentPage - 1}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          previousLinkClassName={`paginationLink ${currentPage === 1 ? 'paginationDisabled' : ''}`}
          nextLinkClassName={`paginationLink ${currentPage === totalPages ? 'paginationDisabled' : ''}`}
          disabledClassName="paginationDisabled"
          activeClassName="paginationActive"
          pageClassName="paginationItem"
          pageLinkClassName="paginationLink"
          pageRangeDisplayed={5} // Show 5 pages at a time
          marginPagesDisplayed={1}
        />
        <IconButton
          aria-label="Last page"
          icon={<MdLastPage />}
          onClick={() => onPageChange(totalPages)}
          isDisabled={currentPage === totalPages}
          color="gray.700"
          _disabled={{ color: 'gray.700' }}
        />
      </Flex>
    </Box>
  ) : null;
};

export default Pagination;
