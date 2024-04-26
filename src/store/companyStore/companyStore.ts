import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import store from "../store";
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
      createHolidays: action,
      updateClass: action
    });
  }

  createHolidays = async (sendData: any) => {
    try {
      const { data } = await axios.put("/company/policy/holidays", {...sendData,company:store.auth.getCurrentCompany()});
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
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
      const { data } = await axios.post("/company/policy/holidays", {...sendData,company:store.auth.getCurrentCompany()});
      this.holidays.data = data.data || [];
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
