import { lazy } from "react";
import { dashboard } from "../constant/routes";

const PersonalDetails = lazy(() => import("../../pages/Dashboard/Employes/PersonalDetails"))
const PersonalDetailUsersChart =  lazy(() => import("../../pages/Dashboard/Employes/PersonalDetails/component/PersonalDetailChart"))
const PageNotFound = lazy(() => import("../component/common/WebPages/PageNotFound"));

const DashboardIndex = lazy(
  () => import("../../pages/Dashboard/DashboardIndex")
);
const QuizDashIndex = lazy(
  () => import("../../pages/Dashboard/quiz/QuizIndex")
);

// task
const TaskIndex = lazy(() => import("../../pages/Dashboard/Task/Task"));
const CustomDragForm = lazy(() => import("../../pages/Dashboard/CustomDragForm/CustomFragForm"))

// project
const ProjectIndex = lazy(
  () => import("../../pages/Dashboard/project/ProjectIndex")
);
const CustomCalender = lazy(
  () => import("../../pages/Dashboard/CustomCalender/CustomCalender")
);

const Testimonial = lazy(
  () => import("../../pages/Dashboard/Testimonial/Testimonial")
);
const VideosIndex = lazy(
  () => import("../../pages/Dashboard/Videos/VideosIndex")
);

const NotesIndex = lazy(() => import("../../pages/Dashboard/Notes/NotesIndex"));

const MarksheetDesignTool = lazy(
  () => import("../component/CreateDeisgn/MarksheetDesignTool")
);
const ClassIndex = lazy(() => import("../../pages/Dashboard/Class/ClassIndex"));

//users
const StudentIndex = lazy(
  () => import("../../pages/Dashboard/UserTypes/Student/StudentIndex")
);
const StudentProfileIndex = lazy(
  () =>
    import(
      "../../pages/Dashboard/UserTypes/Student/component/studentProfile/StudentProfileIndex"
    )
);
const StudentFormIndex = lazy(
  () =>
    import("../../pages/Dashboard/UserTypes/Student/component/StudentFormIndex")
);

// teacher
const TeacherIndex = lazy(
  () => import("../../pages/Dashboard/UserTypes/Teacher/TeacherIndex")
);

//staff
const StaffIndex = lazy(
  () => import("../../pages/Dashboard/UserTypes/Staff/StaffIndex")
);

// trip

const TripManagementIndex = lazy(
  () => import("../../pages/Dashboard/Trip/TripManagement")
);

// Employes


const EmployesManagementIndex = lazy(
  () => import("../../pages/Dashboard/Employes")
);

const EmployeDetails = lazy(
  () => import("../../pages/Dashboard/Employes/component/EmployeDetails/EmployeDetails")
);

const EmployeCreate = lazy(
  () => import("../../pages/Dashboard/Employes/component/EmployeDetails/formContainer/EmployeFormContainer")
);


const Department = lazy(() => import("../../pages/Dashboard/Company/Department/Department"))

// Company

const CompanyPolicy = lazy(() => import( "../../pages/Dashboard/Company/CompanyPolicy"));
const Company = lazy(() => import( "../../pages/Dashboard/Company/index"));

// Request

const Request = lazy(() => import("../../pages/Dashboard/Request"));
const LeaveRequest = lazy(() => import('../../pages/Dashboard/Request/component/LeaveRequest/LeaveRequest'))
const LeaveEditRequest = lazy(() => import('../../pages/Dashboard/Request/component/LeaveRequest/component/form/LeaveEditRequest'))
// Manager Request
const ManagerRequest = lazy(() => import("../../pages/Dashboard/Request/ManagerRequest/index"))

// Attendence Request
const Attendence = lazy(() => import("../../pages/Dashboard/Attendence"))
const ManagerUserAttendence = lazy(() => import("../../pages/Dashboard/Attendence/ManagerAttendence/index"))
export const DashboardRoutes = [
  {
    element: <DashboardIndex />,
    path: dashboard.home,
    privateRoutes: true,
  },
  {
    element: <QuizDashIndex />,
    path: "/dashboard/quiz",
    privateRoutes: true,
  },
  {
    element: <TaskIndex />,
    path: "/dashboard/task",
    privateRoutes: true,
  },
  {
    element: <NotesIndex />,
    path: "/dashboard/courses",
    privateRoutes: true,
  },
  {
    element: <ProjectIndex />,
    path: "/dashboard/project",
    privateRoutes: true,
  },
  {
    element: <CustomCalender />,
    path: "/dashboard/calender",
    privateRoutes: true,
  },
  {
    element: <CustomDragForm />,
    path: "/dashboard/formbuilder",
    privateRoutes: true,
  },
  {
    element: <Testimonial />,
    path: dashboard.testimonial,
  },
  {
    element: <VideosIndex />,
    path: dashboard.videos,
    privateRoutes: true,
  },
  {
    element: <ClassIndex />,
    path: dashboard.class,
    privateRoutes: true,
  },
  {
    element: <MarksheetDesignTool />,
    path: "/dashboard/marksheet",
    privateRoutes: true,
  },
  {
    element: <StudentIndex />,
    path: dashboard.student.index,
    privateRoutes: true,
  },
  {
    element: <TeacherIndex />,
    path: dashboard.teacher.index,
    privateRoutes: true,
  },
  {
    element: <StaffIndex />,
    path: dashboard.staff.index,
    privateRoutes: true,
  },
  {
    element: <StudentFormIndex />,
    path: dashboard.student.table,
    privateRoutes: true,
  },
  {
    element: <StudentProfileIndex />,
    path: dashboard.student.profile,
    privateRoutes: true,
  },
  {
    element: <TripManagementIndex />,
    path: dashboard.tripManagement.index,
    privateRoutes: true,
  },

  // employes
  {
    element : <EmployesManagementIndex />,
    path : dashboard.employes.index,
    privateRoutes : true
  },
  {
    element : <EmployeDetails />,
    path : dashboard.employes.details,
    privateRoutes : true
  },
  {
    element : <EmployeCreate />,
    path : dashboard.employes.new,
    privateRoutes : true
  },
  {
    element : <EmployeCreate />,
    path : dashboard.employes.edit,
    privateRoutes : true
  },
  {
    element : <Department />,
    path:dashboard.department.index,
    privateRoutes:true
  },

  // employes personal details

  {
    element : <PersonalDetails />,
    path : dashboard.employes.personalDetails,
    privateRoutes : true
  },
  {
    element : <PersonalDetailUsersChart />,
    path : dashboard.employes.personalDetailsUserChart,
    privateRoutes : true
  },
  // Company
  {
    element : <Company />,
    path : dashboard.company.index,
    privateRoutes: true
  },
  {
    element : <CompanyPolicy />,
    path : dashboard.company.holidays,
    privateRoutes: true
  },

  // Request
  {
    element : <Request />,
    path : dashboard.request.index,
    privateRoutes : true
  },
  {
    element : <LeaveRequest />,
    path : dashboard.request.leaveAdd,
    privateRoutes : true
  },
  {
    element : <LeaveEditRequest />,
    path : dashboard.request.leaveEdit,
    privateRoutes : true
  },
  {
    element : <ManagerRequest />,
    path : dashboard.request.userList,
    privateRoutes : true
  },
  {
    element : <Request />,
    path : dashboard.request.uniqueUser,
    privateRoutes : true
  },
  {
    element : <LeaveEditRequest />,
    path : dashboard.request.uniqueEdit,
    privateRoutes : true
  },

  // Attendence
  {
    element : <Attendence />,
    path : dashboard.attendence.index
  },
  {
    element : <Attendence />,
    path : dashboard.attendence.uniqueUser,
    privateRoutes : true
  },
  {
    element : <ManagerUserAttendence />,
    path : dashboard.attendence.userList
  },
  // Not found
  {
    element : <PageNotFound />,
    path : '/dashboard/*',
    privateRoutes : true
  },

];
