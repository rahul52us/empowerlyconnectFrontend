import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import store from "../store";

class BookLiberary {
  booksCounts = {
    loading: false,
    data: 0,
  };

  bookForm = {
    type: "add",
    data: null,
    open: false,
  };

  roomForm = {
    type: "add",
    data: null,
    open: false,
  };

  bookCategoryForm = {
    type: "add",
    data: null,
    open: false,
  };

  bookCategoryCount = {
    loading: false,
    data: 0,
  };

  bookUsersCount = {
    loading: false,
    data: 0,
  };

  booksData = {
    loading: false,
    data: [],
    currentPage: 1,
    totalPages: 0,
  };

  roomData = {
    loading: false,
    data: [],
    currentPage: 1,
    totalPages: 0,
  };

  booksCategory = {
    loading: false,
    data: [],
    currentPage: 1,
    totalPages: 0,
  };

  constructor() {
    makeObservable(this, {
      booksCounts: observable,
      bookCategoryCount: observable,
      bookUsersCount: observable,
      booksData: observable,
      bookForm: observable,
      roomData: observable,
      bookCategoryForm: observable,
      booksCategory: observable,
      roomForm: observable,
      getBooksCounts: action,
      getBooksCategoryCounts: action,
      getBookUsersCounts: action,
      getAllBooks: action,
      handleBookForm: action,
      handleRoomForm: action,
      createBook: action,
      getSingleBook: action,
      updateBook: action,
      handleBookCategoryForm: action,
      createBookCategory: action,
      updateBookCategory: action,
      getAllBooksCategory: action,
      getSingleBookCategory: action,
      getAllRooms: action,
      createRoom:action,
      updateRoom:action,
      getSingleRoom:action
    });
  }

  getBooksCounts = async () => {
    try {
      this.booksCounts.loading = true;
      const { data } = await axios.post("/liberary/book/total/counts", {
        company: [store.auth.getCurrentCompany()],
      });
      this.booksCounts.data = data?.data || 0;
      return data.data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.booksCounts.loading = false;
    }
  };

  getBookUsersCounts = async () => {
    try {
      this.bookUsersCount.loading = true;
      const { data } = await axios.post("/liberary/book/user/total/counts", {
        company: [store.auth.getCurrentCompany()],
      });
      this.bookUsersCount.data = data?.data || 0;
      return data.data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.bookUsersCount.loading = false;
    }
  };

  getBooksCategoryCounts = async () => {
    try {
      this.bookCategoryCount.loading = true;
      const { data } = await axios.post(
        "/liberary/book/category/total/counts",
        { company: [store.auth.getCurrentCompany()] }
      );
      this.bookCategoryCount.data = data?.data || 0;
      return data.data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.bookCategoryCount.loading = false;
    }
  };

  createBook = async (sendData: any) => {
    try {
      const { data } = await axios.post("/liberary/book/create", {
        ...sendData,
        company: store.auth.getCurrentCompany(),
      });
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
  };

  createBookCategory = async (sendData: any) => {
    try {
      const { data } = await axios.post("/liberary/book/category/create", {
        ...sendData,
        company: store.auth.getCurrentCompany(),
      });
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
  };

  updateBookCategory = async (sendData: any) => {
    try {
      const { data } = await axios.put(
        `/liberary/book/category/${sendData._id}`,
        {
          ...sendData,
          company: store.auth.getCurrentCompany(),
        }
      );
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
  };

  updateBook = async (sendData: any) => {
    try {
      const { data } = await axios.put(`/liberary/book/${sendData._id}`, {
        ...sendData,
        company: store.auth.getCurrentCompany(),
      });
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
  };

  updateRoom = async (sendData: any) => {
    try {
      const { data } = await axios.put(`/liberary/room/${sendData._id}`, {
        ...sendData,
        company: store.auth.getCurrentCompany(),
      });
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
  };

  getSingleBook = async (sendData: any) => {
    try {
      const { data } = await axios.get(`/liberary/book/single/${sendData.id}`);
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
  };

  getSingleBookCategory = async (sendData: any) => {
    try {
      const { data } = await axios.get(
        `/liberary/book/category/single/${sendData.id}`
      );
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
  };

  getAllBooks = async (sendData: any) => {
    try {
      this.booksData.loading = true;
      const { data } = await axios.post(
        "/liberary/book",
        { company: [store.auth.getCurrentCompany()] },
        { params: { ...sendData } }
      );
      this.booksData.data = data?.data?.data || [];
      this.booksData.totalPages = data?.data?.totalPages || 0;
      return data.data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.booksData.loading = false;
    }
  };

  getAllBooksCategory = async (sendData: any) => {
    try {
      this.booksCategory.loading = true;
      const { data } = await axios.post(
        "/liberary/book/category/get",
        { company: [store.auth.getCurrentCompany()] },
        { params: { ...sendData } }
      );
      this.booksCategory.data = data?.data?.data || [];
      this.booksCategory.totalPages = data?.data?.totalPages || 0;
      return data.data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.booksCategory.loading = false;
    }
  };

  handleBookForm = (data: any) => {
    if (data.open === false) {
      this.bookForm.data = null;
      this.bookForm.open = false;
      this.bookForm.type = "add";
    } else {
      this.bookForm.data = data.data;
      this.bookForm.open = data.open;
      this.bookForm.type = data.type;
    }
  };

  handleRoomForm = (data: any) => {
    if (data.open === false) {
      this.roomForm.data = null;
      this.roomForm.open = false;
      this.roomForm.type = "add";
    } else {
      this.roomForm.data = data.data;
      this.roomForm.open = data.open;
      this.roomForm.type = data.type;
    }
  };

  handleBookCategoryForm = (data: any) => {
    if (data.open === false) {
      this.bookCategoryForm.data = null;
      this.bookCategoryForm.open = false;
      this.bookCategoryForm.type = "add";
    } else {
      this.bookCategoryForm.data = data.data;
      this.bookCategoryForm.open = data.open;
      this.bookCategoryForm.type = data.type;
    }
  };

  // Room

  getAllRooms = async (sendData: any) => {
    try {
      this.roomData.loading = true;
      const { data } = await axios.post(
        "/liberary/room",
        { company: [store.auth.getCurrentCompany()] },
        { params: { ...sendData } }
      );
      this.roomData.data = data?.data?.data || [];
      this.roomData.totalPages = data?.data?.totalPages || 0;
      return data.data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.roomData.loading = false;
    }
  };

  createRoom = async (sendData: any) => {
    try {
      const { data } = await axios.post("/liberary/room/create", {
        ...sendData,
        company: store.auth.getCurrentCompany(),
      });
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
  };

  getSingleRoom = async (sendData: any) => {
    try {
      const { data } = await axios.get(`/liberary/room/single/${sendData.id}`);
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
  };

}

export default BookLiberary;
