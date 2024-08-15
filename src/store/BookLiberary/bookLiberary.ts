import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import store from "../store";

class BookLiberary {
  booksCounts = {
    loading: false,
    data: 0,
  };

  roomsCounts = {
    loading: false,
    data: 0,
  };

  roomSeatCounts = {
    loading: false,
    data: 0,
  };

  availableRoomSeatCounts = {
    loading: false,
    data: 0,
  }

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

  roomSeatForm = {
    type: "add",
    data: null,
    open: false,
    item:null
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
      roomsCounts:observable,
      booksCategory: observable,
      roomSeatForm:observable,
      roomForm: observable,
      roomSeatCounts:observable,
      availableRoomSeatCounts:observable,
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
      getSingleRoom:action,
      getRoomsCounts:action,
      handleRoomSeatForm:action,
      createRoomSeat:action,
      getRoomsSeatCounts:action,
      getAvailableRoomSeatCounts:action
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

  handleRoomSeatForm = (data: any) => {
    if (data.open === false) {
      this.roomSeatForm.data = null;
      this.roomSeatForm.open = false;
      this.roomSeatForm.type = "add";
    } else {
      this.roomSeatForm.data = data.data;
      this.roomSeatForm.open = data.open;
      this.roomSeatForm.type = data.type;
    }
  };

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

  getRoomsCounts = async () => {
    try {
      this.roomsCounts.loading = true;
      const { data } = await axios.post("/liberary/room/total/counts", {
        company: [store.auth.getCurrentCompany()],
      });
      this.roomsCounts.data = data?.data || 0;
      return data.data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.roomsCounts.loading = false;
    }
  };

  getRoomsSeatCounts = async () => {
    try {
      this.roomSeatCounts.loading = true;
      const { data } = await axios.post("/liberary/room/seat/total/counts", {
        company: [store.auth.getCurrentCompany()],
      });
      this.roomSeatCounts.data = data?.data || 0;
      return data.data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.roomSeatCounts.loading = false;
    }
  };

  getAvailableRoomSeatCounts = async () => {
    try {
      this.availableRoomSeatCounts.loading = true;
      const { data } = await axios.post("/liberary/room/seat/available/total/counts", {
        company: [store.auth.getCurrentCompany()],
      });
      this.availableRoomSeatCounts.data = data?.data || 0;
      return data.data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.availableRoomSeatCounts.loading = false;
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

  createRoomSeat = async (sendData: any) => {
    try {
      const { data } = await axios.post("/liberary/room/seat/create", {
        ...sendData,
        company: store.auth.getCurrentCompany(),
      });
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
  };

}

export default BookLiberary;
