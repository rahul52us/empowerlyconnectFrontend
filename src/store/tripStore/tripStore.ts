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

  tripTypeCount : any = {
    data : [],
    loading : false,
    hasFetch : false
  }

  userTripTypeCount : any = {
    data : {},
    loading : false,
    hasFetch : false
  }

  constructor() {
    makeObservable(this, {
      trips : observable,
      tripChartCount: observable,
      tripCount:observable,
      userTripTypeCount:observable,
      tripTypeCount:observable,
      createTrip: action,
      updateTrip:action,
      getTripChartCounts:action,
      getTripCounts:action,
      getSingleTrip:action,
      getUserTripTypeCounts:action,
      getTripTypesCounts:action,
      addTripMembers:action
    });
  }

  addTripMembers = async (sendData: any) => {
    try {
      const { data } = await axios.put(`/trip/add/member/${sendData._id}`, {
        ...sendData,
        company: store.auth.getCurrentCompany(),
      });
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
  };

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

  getSingleTrip = async (sendData : any) => {
    try {
      const { data } = await axios.get(`trip/single/${sendData._id}`);
      return data.data || {};
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
  }

  getAllTrip = async (sendData : any) => {
    try {
      this.trips.loading = true;
      const { data } = await axios.post("/trip", {company : [store.auth.getCurrentCompany()]},{params : {...sendData}}, );
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
      const { data } = await axios.post(`/trip/tripcounts`, {company : [store.auth.getCurrentCompany()]});
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
      const { data } = await axios.post(`/trip/total/count`,{company : [store.auth.getCurrentCompany()]});
      this.tripCount.data = data?.data || 0
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.tripCount.loading = false;
    }
  }

  getTripTypesCounts = async () => {
    try {
      this.tripTypeCount.loading = true;
      const { data } = await axios.post(`/trip/types/total/count`, { company: [store.auth.getCurrentCompany()] });
        const transformedData = data?.data && data.data.reduce((acc : any, item : any) => {
        acc[item.title] = item.count;
        return acc;
      }, {});
      this.tripTypeCount.data = transformedData || {};
      return data;
    } catch (err : any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.tripTypeCount.loading = false;
    }
  }


  getUserTripTypeCounts = async () => {
    try {
      this.userTripTypeCount.loading = true;
      const { data } = await axios.post(`/trip/user/types/total/count`,{company : [store.auth.getCurrentCompany()]});
      this.userTripTypeCount.data = data?.data || []
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.userTripTypeCount.loading = false;
    }
  }

}

export default TripStore;