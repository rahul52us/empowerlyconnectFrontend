import axios from "axios";
import { action, makeObservable, observable } from "mobx";

class EmployeStore {
  studentDetails : any = {
    data : null,
    loading:true,
    hasFetch:false
  }

  classes = {
    data: [],
    loading: false,
    hasFetch: false,
  };

  employes = {
    data: [],
    loading: false,
    hasFetch: false,
    totalPages:0
  };

  positionCounts = {
    data : [],
    loading : false
  }

  employesCounts : any = {
    data : 0,
    loading : false
  }

  studentDrawerForm = {
    type: "",
    open: false,
  };

  constructor() {
    makeObservable(this, {
      studentDrawerForm: observable,
      studentDetails:observable,
      classes: observable,
      employes:observable,
      positionCounts:observable,
      employesCounts:observable,
      resetStudentDetails:action,
      setHandleFormDrawer: action,
      createEmploye: action,
      getStudentById:action,
      getAllEmployes: action,
      getEmployesDetailsById:action,
      updateEmployeProfile: action,
      getPositionCount:action,
      getEmployesCount:action
    });
  }

  getAllEmployes = async (sendData: any) => {
    try {
      this.employes.loading = true
      const { data } = await axios.get("/employe",{params : sendData});
      this.employes.hasFetch = true
      this.employes.data = data?.data?.data || [];
      this.employes.totalPages = data?.data?.totalPages || 0
      return data.data
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    } finally {
      this.employes.loading = false;
    }
  };

  getPositionCount = async () => {
    try {
      this.positionCounts.loading = true
      const { data } = await axios.get("/employe/position/count");
      this.positionCounts.data = data?.data || [];
      return data.data
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    } finally {
      this.positionCounts.loading = false;
    }
  };

  getEmployesCount = async () => {
    try {
      this.employesCounts.loading = true
      const { data } = await axios.get("/employe/total/count");
      this.employesCounts.data = data?.data || 0;
      return data.data
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    } finally {
      this.employesCounts.loading = false;
    }
  };

  getEmployesDetailsById = async (id: any) => {
    try {
      const { data } = await axios.get(`/employe/${id}`);
      return data.data
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    }
  };

  setHandleFormDrawer = (type: string, data?: any) => {
    this.studentDrawerForm.open = this.studentDrawerForm.open ? false : true;
    this.studentDrawerForm.type = type;
    if (type === "edit") {
      console.log(data);
    } else {
    }
  };

  createEmploye = async (sendData : any) => {
    try {
      const { data } = await axios.post("employe/create", sendData);
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    }
  }

  updateEmployeProfile = async (id : any , sendData : any) => {
    try {
      const { data } = await axios.put(`employe/profile/${id}`, sendData);
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    }
  }

  getStudentById = async (sendData : any) => {
    try {
      const { data } = await axios.get(`student/${sendData._id}`);
      this.studentDetails.data = data.data
      this.studentDetails.hasFetch = true
      return data;
    } catch (err: any) {
      this.studentDetails.hasFetch = false
      return Promise.reject(err?.response?.data || err);
    }finally{
      this.studentDetails.loading = false
    }
  }

  resetStudentDetails = async () => {
    this.studentDetails.data = null;
    this.studentDetails.loading = true
    this.studentDetails.hasFetch = false
  }
}

export default EmployeStore;
