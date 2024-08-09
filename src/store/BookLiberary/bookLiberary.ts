import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import store from "../store";

class BookLiberary {
  booksCounts = {
    loading : false,
    data : 0
  }

  bookCategoryCount = {
    loading : false,
    data : 0
  }

  bookUsersCount = {
    loading : false,
    data : 0
  }

  booksData = {
    loading : false,
    data : [],
    currentPage : 1,
    totalPages : 0
  }

  constructor() {
    makeObservable(this, {
      booksCounts : observable,
      bookCategoryCount : observable,
      bookUsersCount:observable,
      booksData:observable,
      getBooksCounts:action,
      getBooksCategoryCounts:action,
      getBookUsersCounts:action,
      getAllBooks:action
    });
  }

  getBooksCounts = async () => {
    try {
      this.booksCounts.loading = true
      const { data } = await axios.post("/liberary/book/total/counts",{company : [store.auth.getCurrentCompany()]});
      this.booksCounts.data = data?.data || 0;
      return data.data
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.booksCounts.loading = false;
    }
  };

  getBookUsersCounts = async () => {
    try {
      this.bookUsersCount.loading = true
      const { data } = await axios.post("/liberary/book/user/total/counts",{company : [store.auth.getCurrentCompany()]});
      this.bookUsersCount.data = data?.data || 0;
      return data.data
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.bookUsersCount.loading = false;
    }
  };

  getBooksCategoryCounts = async () => {
    try {
      this.bookCategoryCount.loading = true
      const { data } = await axios.post("/liberary/book/category/total/counts",{company : [store.auth.getCurrentCompany()]});
      this.bookCategoryCount.data = data?.data || 0;
      return data.data
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.bookCategoryCount.loading = false;
    }
  };

  getAllBooks = async (sendData : any) => {
    try {
      this.booksData.loading = true
      const { data } = await axios.post("/liberary/book",{company : [store.auth.getCurrentCompany()]}, {params : {...sendData}});
      this.booksData.data = data?.data?.data || [];
      this.booksData.totalPages = data?.data?.totalPages || 0
      return data.data
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.booksData.loading = false;
    }
  };

}

export default BookLiberary;
