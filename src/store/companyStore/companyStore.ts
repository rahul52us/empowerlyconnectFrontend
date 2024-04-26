import axios from "axios";
import { action, makeObservable, observable } from "mobx";

class CompanyStore {
  holidays = {
    data: [],
    loading: false,
    hasFetch: false,
    totalPages:0
  };

  openTaskDrawer = {
    type: "",
    open: false,
  };

  constructor() {
    makeObservable(this, {
      openTaskDrawer: observable,
      holidays: observable,
      getHolidays: action,
      createClass: action,
      updateClass: action
    });
  }

  createClass = async (sendData: any) => {
    try {
      const { data } = await axios.post("/class/create", sendData);
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    }
  };

  updateClass = async (sendData: any) => {
    try {
      const { data } = await axios.put(`/class/update/${sendData._id}`, sendData);
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    }
  };

  getHolidays = async (sendData: any) => {
    try {
      this.holidays.loading = true
      this.holidays.hasFetch = true
      const { data } = await axios.post("/company/holidays", sendData);

      this.holidays.data = data.data?.holidays || [];
      this.holidays.totalPages = data.data?.totalPages || 0
      return data;
    } catch (err: any) {
      this.holidays.hasFetch = false
      return Promise.reject(err?.response || err);
    } finally {
      this.holidays.loading = false;
    }
  };
}

export default CompanyStore;
