import { observer } from "mobx-react-lite";
import store from "../../../../../store/store";
import CustomDrawer from "../../../../../config/component/Drawer/CustomDrawer";
import AddBook from "../forms/Book/AddBook";
import EditBook from "../forms/Book/EditBook";
import BookView from "../forms/Book/BookView";
import AddBookCategory from "../forms/BookCategory/AddBookCategory";
import EditBookCategory from "../forms/BookCategory/EditBookCategory";
import BookCategoryView from "../forms/BookCategory/BookCategoryView";

const BookDetailDrawer = observer(({ fetchBooks }: any) => {
  const {
    bookLiberary: {
      handleBookForm,
      bookForm,
      handleBookCategoryForm,
      bookCategoryForm,
    },
  } = store;

  return (
    <>
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
    </>
  );
});

export default BookDetailDrawer;