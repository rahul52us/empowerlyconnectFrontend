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

const dashBreadCrumb = [{ label: "Home", link: "/" }, { label: "Dashboard" }];

const coursesBreadCrumb = [
  { label: "Home", link: "/" },
  { label: "Dashboard", link: dashboard.home },
  { label: "Courses" },
];

const employesBreadCrumb = {
  index: [
    { label: "Home", link: "/" },
    { label: "Dashboard", link: dashboard.home },
    { label: "Employes" },
  ],
  details: [
    { label: "Home", link: "/" },
    { label: "employes", link: dashboard.employes.index },
    { label: "Details" },
  ],
  new : [
    { label: "Home", link: "/" },
  { label: "employes", link: dashboard.employes.details },
  { label: "New" },
  ]
};

const tripBreadCrumb = [
  { label: "Home", link: "/" },
  { label: "Dashboard", link: dashboard.home },
  { label: "Trip" },
];

const departmentsBreadCrumb = [
  { label: "Home", link: "/" },
  { label: "Dashboard", link: dashboard.home },
  { label: "Departments" },
];

const companyBreadCrumb = {
  index : [
  { label: "Home", link: "/" },
  { label: "Dashboard", link: dashboard.home },
  { label: "Company" },
],policy : [
  { label: "Home", link: "/" },
  { label: "Company", link: dashboard.company.index },
  { label: "Policy" },
]};

const requestBreadCrumb = {
  index : [
  { label: "Home", link: "/" },
  { label: "Dashboard", link: dashboard.home },
  { label: "Request" },
],leave : [
  { label: "Home", link: "/" },
  { label: "Request", link: dashboard.request.index },
  { label: "Leave" },
]};

export {
  videoBreadCrumb,
  coursesBreadCrumb,
  quizBreadCrumb,
  dashBreadCrumb,
  tripBreadCrumb,
  employesBreadCrumb,
  departmentsBreadCrumb,
  companyBreadCrumb,
  requestBreadCrumb
};
