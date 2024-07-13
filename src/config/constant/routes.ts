export const authentication = {
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password/:token",
  verifyEmail: "/verify-account/:token",
  createOrganisation2: "/create/company/:token",
  createOrganisationStep1: "/create/company",
};

const dashboardName = "dashboard";

export const dashboard = {
  home: `/${dashboardName}`,
  calender: `/${dashboardName}/calender`,
  testimonial: `/${dashboardName}/testimonial`,
  videos: `/${dashboardName}/videos`,
  class: `/${dashboardName}/class`,
  course: `/${dashboardName}/courses`,
  quiz: `/${dashboardName}/quiz`,
  student: {
    index: `/${dashboardName}/students`,
    table: `/${dashboardName}/students/:type`,
    profile: `/${dashboardName}/students/class/:className/:profileTab`,
  },
  teacher: {
    index: `/${dashboardName}/teachers`,
  },
  staff: {
    index: `/${dashboardName}/staffs`,
  },
  tripManagement: {
    index: `/${dashboardName}/trip`,
  },
  employes: {
    index: `/${dashboardName}/employes`,
    details: `/${dashboardName}/employes/details`,
    new: `/${dashboardName}/employes/details/new`,
    edit: `/${dashboardName}/employes/details/edit/:id`,
    personalDetails:`/${dashboardName}/employes/personal-details`,
    personalDetailsUserChart:`/${dashboardName}/employes/personal-details/:id`
  },
  department: {
    index: `/${dashboardName}/department`,
    details: `/${dashboardName}/employes/details`,
    new: `/${dashboardName}/employes/details/new`,
    edit: `/${dashboardName}/employes/details/edit/:id`,
  },
  company: {
    index: `/${dashboardName}/company`,
    holidays: `/${dashboardName}/company/policy/holidays`,
  },
  request : {
    index : `/${dashboardName}/request`,
    leave : `/${dashboardName}/request/leave`,
    leaveAdd : `/${dashboardName}/request/leave/add`,
    leaveEdit : `/${dashboardName}/request/leave/edit/:requestId`,
    userList : `/${dashboardName}/request/users`,
    uniqueUser : `/${dashboardName}/request/users/:userId`,
    uniqueEdit : `/${dashboardName}/request/users/:userId/leave/edit/:requestId`,
  },
  attendence : {
    index : `/${dashboardName}/attendence`,
    leave : `/${dashboardName}/request/leave`,
    userList : `/${dashboardName}/attendence/users`,
    uniqueUser : `/${dashboardName}/attendence/users/:userId`
  },
};

export const main = {
  home: "/",
  about: "/about",
  project: "/project",
  changePassword: "/profile?&profileTab=change-password",
  contact: "/contact",
  courses: "/courses",
  testimonial: "/testimonial",
  product: "/product",
  video: "/videos",
  profile: "/profile",
  profileTab: "/profile/:profileTab",
  faq: "/faq",
  blog: "/blog",
  createBlog: "/blog/create",
  singleBlog: "/blog/:blogTitle",
  addingparaform: "/addingparaform",
  quizIndex: "/quiz",
  quizTitle: "/quiz/:quizTitle",
  quizQuestionIndex: "/quiz/:quizTitle/:categoryTitle",
  individualHomeCompany: "/:individualCompany",
};

export const privateMain = {
  createBlog: "/blog/create",
};
