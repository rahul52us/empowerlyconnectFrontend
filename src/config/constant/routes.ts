export const authentication = {
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password/:token",
  verifyEmail: "/verify-account/:token",
  createOrganisation: "/create/company/:token",
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
  },
  department: {
    index: `/${dashboardName}/department`,
    details: `/${dashboardName}/employes/details`,
    new: `/${dashboardName}/employes/details/new`,
    edit: `/${dashboardName}/employes/details/edit/:id`,
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
