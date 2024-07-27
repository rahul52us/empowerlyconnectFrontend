import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import store from "../store";

class TripStore {
  trips : any = {
    data : [],
    loading : false,
    hasFetch : false,
    totalPages : 1
  }

  tripChartCount : any = {
    data : [],
    loading : false,
    hasFetch : false
  }

  tripCount : any = {
    data : 0,
    loading : false,
    hasFetch : false
  }

  constructor() {
    makeObservable(this, {
      trips : observable,
      tripChartCount: observable,
      tripCount:observable,
      createTrip: action,
      updateTrip:action,
      getTripChartCounts:action,
      getTripCounts:action
    });
  }

  createTrip = async (sendData : any) => {
    try {
      const { data } = await axios.post("trip/create", {...sendData,company : store.auth.getCurrentCompany()});
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
  }

  updateTrip = async (sendData : any,id : any) => {
    try {
      const { data } = await axios.put(`trip/${id}`, sendData);
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
  }

  getAllTrip = async (sendData : any) => {
    try {
      this.trips.loading = true;
      const { data } = await axios.get("/trip", {params : {...sendData, company : store.auth.getCurrentCompany()}});
      this.trips.data = data?.data?.data || [];
      this.trips.totalPages = data?.data?.totalPages || 0
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.trips.loading = false;
    }
  };

  getTripChartCounts = async () => {
    try {
      this.tripChartCount.loading = true;
      const { data } = await axios.get(`/trip/tripcounts`);
      this.tripChartCount.data = data?.data
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.tripChartCount.loading = false;
    }
  }

  getTripCounts = async () => {
    try {
      this.tripCount.loading = true;
      const { data } = await axios.get(`/trip/total/count`,{params : {company : store.auth.getCurrentCompany()}});
      this.tripCount.data = data?.data || 0
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.tripCount.loading = false;
    }
  }

}

export default TripStore;