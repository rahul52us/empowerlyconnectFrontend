import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import store from "../store";

class EmployeStore {
  studentDetails: any = {
    data: null,
    loading: true,
    hasFetch: false,
  };

  classes = {
    data: [],
    loading: false,
    hasFetch: false,
  };

  employes = {
    data: [],
    loading: false,
    hasFetch: false,
    totalPages: 0,
  };

  designationCount = {
    data: [],
    loading: false,
  };

  employesCounts: any = {
    data: 0,
    loading: false,
  };

  studentDrawerForm = {
    type: "",
    open: false,
  };

  constructor() {
    makeObservable(this, {
      studentDrawerForm: observable,
      studentDetails: observable,
      classes: observable,
      employes: observable,
      designationCount: observable,
      employesCounts: observable,
      resetStudentDetails: action,
      setHandleFormDrawer: action,
      createEmploye: action,
      getStudentById: action,
      getAllEmployes: action,
      getEmployesDetailsById: action,
      updateEmployeProfile: action,
      getDesignationCount: action,
      getEmployesCount: action,
      updateEmployeBankDetails: action,
      updateFamilyDetails: action,
      updateWorkExperience: action,
      updateDocuments: action,
      updateCompanyDetails:action
    });
  }

  getAllEmployes = async (sendData: any) => {
    try {
      this.employes.loading = true;
      const { data } = await axios.get("/employe", {
        params: { ...sendData, company: store.auth.company },
      });
      this.employes.hasFetch = true;
      this.employes.data = data?.data?.data || [];
      this.employes.totalPages = data?.data?.totalPages || 0;
      return data.data;
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    } finally {
      this.employes.loading = false;
    }
  };

  getDesignationCount = async () => {
    try {
      this.designationCount.loading = true;
      const { data } = await axios.get("/employe/designation/count");
      this.designationCount.data = data?.data || [];
      return data.data;
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    } finally {
      this.designationCount.loading = false;
    }
  };

  getEmployesCount = async () => {
    try {
      this.employesCounts.loading = true;
      const { data } = await axios.get("/employe/total/count",{params : {company: store.auth.company}});
      this.employesCounts.data = data?.data || 0;
      return data.data;
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    } finally {
      this.employesCounts.loading = false;
    }
  };

  getEmployesDetailsById = async (id: any) => {
    try {
      const { data } = await axios.get(`/employe/${id}`);
      return data.data;
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

  createEmploye = async (sendData: any) => {
    try {
      const { data } = await axios.post("employe/create", {...sendData, company: store.auth.company});
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    }
  };

  updateDocuments = async (id: any, sendData: any) => {
    try {
      const { data } = await axios.put(
        `employe/updateDocuments/${id}`,
        sendData
      );
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    }
  };
  updateEmployeProfile = async (id: any, sendData: any) => {
    try {
      const { data } = await axios.put(`employe/profile/${id}`, sendData);
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    }
  };

  updateWorkExperience = async (id: any, sendData: any) => {
    try {
      const { data } = await axios.put(
        `employe/workExperience/${id}`,
        sendData
      );
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    }
  };

  updateFamilyDetails = async (id: any, sendData: any) => {
    try {
      const { data } = await axios.put(`employe/familyDetails/${id}`, sendData);
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    }
  };

  updateEmployeBankDetails = async (id: any, sendData: any) => {
    try {
      const { data } = await axios.put(`employe/bankDetails/${id}`, sendData);
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    }
  };

  updateCompanyDetails = async (id: any, sendData: any) => {
    try {
      const { data } = await axios.put(`employe/companyDetails/${id}`, sendData);
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    }
  };

  getStudentById = async (sendData: any) => {
    try {
      const { data } = await axios.get(`student/${sendData._id}`);
      this.studentDetails.data = data.data;
      this.studentDetails.hasFetch = true;
      return data;
    } catch (err: any) {
      this.studentDetails.hasFetch = false;
      return Promise.reject(err?.response?.data || err);
    } finally {
      this.studentDetails.loading = false;
    }
  };

  resetStudentDetails = async () => {
    this.studentDetails.data = null;
    this.studentDetails.loading = true;
    this.studentDetails.hasFetch = false;
  };
}

export default EmployeStore;
