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

  workLocations = {
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
      workLocations:observable,
      getHolidays: action,
      updateHoliday: action,
      updateClass: action,
      updateWorkTiming:action,
      getWorkLocations:action
    });
  }

  updateHoliday = async (sendData: any) => {
    try {
      const { data } = await axios.put("/company/policy/holidays", {...sendData,company:store.auth.getCurrentCompany()});
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
  };

  updateWorkTiming = async (sendData: any) => {
    try {
      const { data } = await axios.put("/company/policy/workTiming", {...sendData,company:store.auth.getCurrentCompany()});
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
      const { data } = await axios.get("/company/policy/holidays", {params : {...sendData, company:store.auth.getCurrentCompany()}});
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

  getWorkLocations = async (sendData : any) => {
    try {
      this.workLocations.loading = true
      this.workLocations.hasFetch = true
      const { data } = await axios.get("/company/policy/workLocations", {params :  {...sendData,company:store.auth.getCurrentCompany()}});
      this.workLocations.data = data.data || [];
      this.workLocations.totalPages = data.data?.totalPages || 0
      return data;
    } catch (err: any) {
      this.workLocations.hasFetch = false
      return Promise.reject(err?.response || err);
    } finally {
      this.workLocations.loading = false;
  };
}
}



export default CompanyStore;
