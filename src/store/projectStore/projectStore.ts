import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import store from "../store";
import { paginationLimit } from "../../config/constant/variable";

class ProjectStore {
  projects: any = {
    data: [],
    loading: false,
    currentPage :1,
    limit : paginationLimit
  };

  projectCount : any = {
    data : 0,
    loading : false
  }

  openProjectDrawer : any = {
    type: "create",
    open: false,
    data: null,
  };

  constructor() {
    makeObservable(this, {
      openProjectDrawer: observable,
      projects: observable,
      projectCount:observable,
      setOpenProjectDrawer: action,
      createProject: action,
      getProjects: action,
      getSingleProject: action,
      updateProject:action,
      getProjectCounts:action
    });
  }

  updateProject = async (sendData: any) => {
    try {
      const { data } = await axios.put(`/project/${sendData._id}`, {
        ...sendData,
        company: store.auth.getCurrentCompany(),
      });
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
  };

  createProject = async (sendData: any) => {
    try {
      const { data } = await axios.post("/project", {
        ...sendData,
        company: store.auth.getCurrentCompany(),
      });
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
  };

  getSingleProject = async (sendData: any) => {
    try {
      const { data } = await axios.get(`/project/single/${sendData.id}`, {
        params: { company: store.auth.getCurrentCompany() },
      });
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
  };

  getProjectCounts = async () => {
    try {
      this.projectCount.loading = true;
      const { data } = await axios.post(`/project/total/count`,{company : [store.auth.getCurrentCompany()]});
      this.projectCount.data = data?.data || 0
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.projectCount.loading = false;
    }
  }

  getProjects = async (sendData: any) => {
    this.projects.loading = true;
    try {
      const { data } = await axios.post(
        `/project/get`,
        {...sendData, company : [store.auth.getCurrentCompany() ]},
        {params : {page : this.projects.currentPage, limit : this.projects.limit }}
      );
      this.projects.data = data.data?.data || [];
      this.projects.totalPages = data.data?.totalPages || 1;
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    } finally {
      this.projects.loading = false;
    }
  };

  setOpenProjectDrawer = (type: string, data?: any) => {
    this.openProjectDrawer.open = this.openProjectDrawer.open ? false : true;
    this.openProjectDrawer.type = type;
    this.openProjectDrawer.data = this.openProjectDrawer.open
      ? data || null
      : null;
    this.openProjectDrawer.type = this.openProjectDrawer.open ? type : "create";
  };
}

export default ProjectStore;
