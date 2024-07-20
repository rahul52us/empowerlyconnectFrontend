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

const projectBreadCrumb = {
  index: [
    { label: "Home", link: "/" },
    { label: "Dashboard", link: dashboard.home },
    { label: "project" },
  ],
};

const UsersBreadCrumb = {
  index: [
    { label: "Home", link: "/" },
    { label: "Dashboard", link: dashboard.home },
    { label: "Users" },
  ],
  details: [
    { label: "Home", link: "/" },
    { label: "Users", link: dashboard.Users.index },
    { label: "Details" },
  ],
  new: [
    { label: "Home", link: "/" },
    { label: "Users", link: dashboard.Users.details },
    { label: "New" },
  ],
  personalDetails: [
    { label: "Home", link: "/" },
    { label: "Dashboard", link: dashboard.home },
    { label: "Details" },
  ],
};

const tripBreadCrumb = [
  { label: "Home", link: "/" },
  { label: "Dashboard", link: dashboard.home },
  { label: "Trip" },
];

const departmentsBreadCrumb = [
  { label: "Home", link: "/" },
  { label: "Company", link: dashboard.company.index },
  { label: "Departments" },
];

const companyBreadCrumb = {
  index: [
    { label: "Home", link: "/" },
    { label: "Dashboard", link: dashboard.home },
    { label: "Company" },
  ],
  policy: [
    { label: "Home", link: "/" },
    { label: "Company", link: dashboard.company.index },
    { label: "Policy" },
  ],
};

const requestBreadCrumb = {
  userIndex: [
    { label: "Home", link: "/" },
    { label: "User List", link: dashboard.request.userList },
    { label: "Request" },
  ],
  userList: [
    { label: "Home", link: "/" },
    { label: "Dashboard", link: dashboard.home },
    { label: "User List" },
  ],
  index: [
    { label: "Home", link: "/" },
    { label: "Dashboard", link: dashboard.home },
    { label: "Request" },
  ],
  leave: [
    { label: "Home", link: "/" },
    { label: "Request", link: dashboard.request.index },
    { label: "Leave" },
  ],
};

const attendenceBreadCrumb = {
  attendence: [
    { label: "Home", link: "/" },
    { label: "Dashboard", link: dashboard.home },
    { label: "Attendence" },
  ],
  userList: [
    { label: "Home", link: "/" },
    { label: "Dashboard", link: dashboard.home },
    { label: "User List" },
  ],
};

const liberaryBreadCrumb = {
  liberary: [
    { label: "Home", link: "/" },
    { label: "Dashboard", link: dashboard.home },
    { label: "Liberay" },
  ]
};

export {
  videoBreadCrumb,
  coursesBreadCrumb,
  quizBreadCrumb,
  dashBreadCrumb,
  tripBreadCrumb,
  UsersBreadCrumb,
  departmentsBreadCrumb,
  companyBreadCrumb,
  requestBreadCrumb,
  attendenceBreadCrumb,
  projectBreadCrumb,
  liberaryBreadCrumb
};
