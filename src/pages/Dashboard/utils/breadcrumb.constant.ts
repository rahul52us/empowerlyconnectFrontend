import { dashboard } from "../../../config/constant/routes";

const videoBreadCrumb = [
    { label: "Home", link: "/" },
    { label: "Dashboard", link: dashboard.home },
    { label: "Videos" },
];

const quizBreadCrumb = [
  { label: "Home", link: "/" },
  { label: "Dashboard", link: dashboard.home },
  { label: "Quiz" },
];

const dashBreadCrumb = [
  { label: "Home", link: "/" },
  { label: "Dashboard" },
];

const coursesBreadCrumb = [
  { label: "Home", link: "/" },
  { label: "Dashboard", link: dashboard.home },
  { label: "Courses" },
];

const employesBreadCrumb = [
  { label: "Home", link: "/" },
  { label: "Dashboard", link: dashboard.home },
  { label: "Employes" },
];

const tripBreadCrumb = [
  { label: "Home", link: "/" },
  { label: "Dashboard", link: dashboard.home },
  { label: "Trip" },
];

export {videoBreadCrumb, coursesBreadCrumb, quizBreadCrumb, dashBreadCrumb,tripBreadCrumb, employesBreadCrumb}