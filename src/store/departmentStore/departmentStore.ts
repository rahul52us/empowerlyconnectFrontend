import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import store from "../store";

class DepartmentStore {
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

  departmentCategories = {
    data: [],
    loading: false,
    hasFetch: false,
    totalPages:0
  };

  departments = {
    data: [],
    loading: false,
    hasFetch: false,
    totalPages:0
  };

  departmentCounts = {
    data : 0,
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
      departmentCategories:observable,
      departmentCounts:observable,
      departments:observable,
      resetStudentDetails:action,
      setHandleFormDrawer: action,
      createEmploye: action,
      getStudentById:action,
      getAllDepartmentCategories: action,
      getEmployesDetailsById:action,
      updateEmployeProfile: action,
      getPositionCount:action,
      getDepartmentCounts:action,
      getAllDepartment:action,
      deleteDepartment:action,
      deleteDepartmentCategory:action
    });
  }

  getAllDepartmentCategories = async (sendData : any) => {
    try {
      this.departmentCategories.loading = true
      const { data } = await axios.get("/department/categories",{params : {company : store.auth.getCurrentCompany(), ...sendData}});
      this.departmentCategories.hasFetch = true
      this.departmentCategories.data = data?.data?.data || [];
      this.departmentCategories.totalPages = data?.data?.totalPages || 0
      return data.data
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    } finally {
      this.departmentCategories.loading = false;
    }
  };

  getAllDepartment = async (id : string, sendData: any) => {
    try {
      this.departments.loading = true
      const { data } = await axios.get(`/department/${id}`,{params : {id : id, company : store.auth.getCurrentCompany(), ...sendData}});
      this.departments.hasFetch = true
      this.departments.data = data?.data?.data || [];
      this.departments.totalPages = data?.data?.totalPages || 0
      return data.data
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    } finally {
      this.departments.loading = false;
    }
  };

  deleteDepartment = async (id : string) => {
    try {
      const { data } = await axios.delete(`department/${id}`);
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    }
  }

  deleteDepartmentCategory = async (id : string) => {
    try {
      const { data } = await axios.delete(`department/category/${id}`);
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    }
  }

  getPositionCount = async () => {
    try {
      this.departmentCounts.loading = true
      const { data } = await axios.get("/department/categories/count");
      this.departmentCounts.data = data?.data || [];
      return data.data
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    } finally {
      this.departmentCounts.loading = false;
    }
  };

  getDepartmentCounts = async () => {
    try {
      this.departmentCounts.loading = true
      const { data } = await axios.get("/department/categories/count",{params : {company : store.auth.getCurrentCompany()}});
      this.departmentCounts.data = data?.data || 0;
      return data.data
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    } finally {
      this.departmentCounts.loading = false;
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

export default DepartmentStore;
