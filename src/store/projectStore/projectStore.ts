import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import store from "../store";

class ProjectStore {
  projects : any = {
    data : [],
    loading : false
  }

  openProjectDrawer = {
    type: "",
    open: false,
  };

  constructor() {
    makeObservable(this, {
      openProjectDrawer: observable,
      setOpenProjectDrawer: action,
      createProject: action,
      getProjects: action,
    });
  }

  createProject = async (sendData: any) => {
    try {
      const { data } = await axios.post("/project/create", sendData);
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response?.data || err);
    }
  };

  getProjects = async (sendData : any) => {
    try {
      this.projects.loading = true
      const { data } = await axios.post(
        `/project`,{...sendData, company : store.auth.getCurrentCompany()}
      );
      this.projects.data = data.data
      this.projects.totalPages = data.totalPages
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
    finally {
      this.projects.loading = false
    }
  };

  setOpenProjectDrawer = (type: string, data?: any) => {
    this.openProjectDrawer.open = this.openProjectDrawer.open ? false : true;
    this.openProjectDrawer.type = type;
    if (type === "edit") {
      console.log(data);
    } else {
    }
  };
}

export default ProjectStore;