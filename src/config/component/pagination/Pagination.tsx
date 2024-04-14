import ReactPaginate from "react-paginate";
import { Box } from "@chakra-ui/react";
import './pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  props?:any
}

const Pagination = ({ currentPage, totalPages, onPageChange, props }: PaginationProps) => {
  const handlePageChange = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };

  return (
    totalPages ?
    <Box display="flex" alignItems="center" justifyContent="center" marginTop="0.1rem" {...props}>
      <ReactPaginate
        previousLabel="Prev"
        nextLabel="Next"
        breakLabel="..."
        pageCount={totalPages}
        forcePage={currentPage - 1}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        previousLinkClassName="paginationLink"
        nextLinkClassName="paginationLink"
        disabledClassName="paginationDisabled"
        activeClassName="paginationActive"
        pageClassName="paginationItem"
        pageLinkClassName="paginationLink"
        pageRangeDisplayed={5} // Show 5 pages at a time
        marginPagesDisplayed={1}
      />
    </Box> : null
  );
};

export default Pagination;
