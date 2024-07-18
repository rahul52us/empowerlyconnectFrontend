import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import store from "../store";
import { paginationLimit } from "../../config/constant/variable";

class ProjectStore {
  projects: any = {
    data: [],
    loading: false,
  };

  openProjectDrawer = {
    type: "",
    open: false,
  };

  constructor() {
    makeObservable(this, {
      openProjectDrawer: observable,
      projects:observable,
      setOpenProjectDrawer: action,
      createProject: action,
      getProjects: action,
    });
  }

  createProject = async (sendData: any) => {
    try {
      const { data } = await axios.post("/project", {...sendData,company : store.auth.getCurrentCompany()});
      return data;
    } catch (err: any) {
      return Promise.reject(err?.response || err);
    }
  };

  getProjects = async (sendData: any) => {
    this.projects.loading = true;

    try {
      const { data } = await axios.post(
        `/project/get?page=${sendData.page}&limit=${
          sendData.limit || paginationLimit
        }&company=${store.auth.getCurrentCompany()}`,
        {},
        { ...sendData }
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
    if (type === "edit") {
      console.log(data);
    } else {
    }
  };
}

export default ProjectStore;
