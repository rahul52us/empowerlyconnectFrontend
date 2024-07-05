import axios from "axios";
import { action, makeObservable, observable } from "mobx";

class AttendencePunchStore {
  recentPunch = {
    data: [],
    loading: false,
  };

  constructor() {
    makeObservable(this, {
      getRecentPunch: action,
      recentPunch: observable,
    });
  }

  getRecentPunch = async (sendData: any) => {
    try {
      this.recentPunch.loading = true;
      const { startDate, endDate } = sendData;
      const { data } = await axios.get("/attendenceRequest", {
        params: { startDate, endDate }
      });
      this.recentPunch.data = data?.data || [];
    } catch (error) {
      console.error("Error fetching recent punches:", error);
      // Handle error as needed
    } finally {
      this.recentPunch.loading = false;
    }
  }

}

export default AttendencePunchStore;
