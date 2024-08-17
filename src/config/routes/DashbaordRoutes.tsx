import { lazy } from "react";
import { dashboard } from "../constant/routes";

const PersonalDetails = lazy(
  () => import("../../pages/Dashboard/Users/PersonalDetails")
);

const ProfileIndex = lazy(() => import("../../pages/Dashboard/profile/ProfileIndex"))

const PersonalDetailUsersChart = lazy(
  () =>
    import(
      "../../pages/Dashboard/Users/PersonalDetails/component/PersonalDetailChart"
    )
);
const PageNotFound = lazy(
  () => import("../component/common/WebPages/PageNotFound")
);

const DashboardIndex = lazy(
  () => import("../../pages/Dashboard/DashboardIndex")
);
const QuizDashIndex = lazy(
  () => import("../../pages/Dashboard/quiz/QuizIndex")
);

// task
const TaskIndex = lazy(() => import("../../pages/Dashboard/project/task/TaskIndex"));
const CustomDragForm = lazy(
  () => import("../../pages/Dashboard/CustomDragForm/CustomFragForm")
);

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

// Users

const UsersManagementIndex = lazy(
  () => import("../../pages/Dashboard/Users")
);

const UserDetails = lazy(
  () =>
    import(
      "../../pages/Dashboard/Users/component/UserDetails/UserDetails"
    )
);

const UserCreate = lazy(
  () =>
    import(
      "../../pages/Dashboard/Users/component/UserDetails/formContainer/UserFormContainer"
    )
);

const Department = lazy(
  () => import("../../pages/Dashboard/Company/Department/Department")
);

// Company

const CompanyPolicy = lazy(
  () => import("../../pages/Dashboard/Company/policy/CompanyPolicy")
);
const Company = lazy(() => import("../../pages/Dashboard/Company/index"));

// Request

const Request = lazy(() => import("../../pages/Dashboard/Request"));
const LeaveRequest = lazy(
  () =>
    import("../../pages/Dashboard/Request/component/LeaveRequest/LeaveRequest")
);
const LeaveEditRequest = lazy(
  () =>
    import(
      "../../pages/Dashboard/Request/component/LeaveRequest/component/form/LeaveEditRequest"
    )
);
// Manager Request
const ManagerRequest = lazy(
  () => import("../../pages/Dashboard/Request/ManagerRequest/index")
);

// Attendence Request
const Attendence = lazy(() => import("../../pages/Dashboard/Attendence"));
const ManagerUserAttendence = lazy(
  () => import("../../pages/Dashboard/Attendence/ManagerAttendence/index")
);


// Liberary Management
const LiberaryManagement = lazy(() => import("../../pages/Dashboard/LiberaryManagement/LiberaryManagement"))
const LiberaryBookCategory = lazy(() => import("../../pages/Dashboard/LiberaryManagement/component/Books/BookCategoryDetails/BookCategoryDetails"))
const BookUserDetails = lazy(() => import("../../pages/Dashboard/LiberaryManagement/component/Books/BookUserDetails/BookUserDetails"));
const LiberaryRoomIndex = lazy(() => import("../../pages/Dashboard/LiberaryManagement/component/Rooms/RoomDetails/RoomIndex"))
const LiberaryRoomUserDetails =lazy(() => import("../../pages/Dashboard/LiberaryManagement/component/Rooms/UserDetails/UserDetails"));

export const DashboardRoutes = [
  {
    element: <DashboardIndex />,
    path: dashboard.home,
    privateRoutes: true,
  },
  {
    element: <ProfileIndex />,
    path: dashboard.profile,
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

  // Users
  {
    element: <UsersManagementIndex />,
    path: dashboard.Users.index,
    privateRoutes: true,
  },
  {
    element: <UserDetails />,
    path: dashboard.Users.details,
    privateRoutes: true,
  },
  {
    element: <UserCreate />,
    path: dashboard.Users.new,
    privateRoutes: true,
  },
  {
    element: <UserCreate />,
    path: dashboard.Users.edit,
    privateRoutes: true,
  },
  {
    element: <Department />,
    path: dashboard.department.index,
    privateRoutes: true,
  },

  // Users personal details

  {
    element: <PersonalDetails />,
    path: dashboard.Users.personalDetails,
    privateRoutes: true,
  },
  {
    element: <PersonalDetailUsersChart />,
    path: dashboard.Users.personalDetailsUserChart,
    privateRoutes: true,
  },
  // Company
  {
    element: <Company />,
    path: dashboard.company.index,
    privateRoutes: true,
  },
  {
    element: <CompanyPolicy />,
    path: dashboard.company.holidays,
    privateRoutes: true,
  },

  // Request
  {
    element: <Request />,
    path: dashboard.request.index,
    privateRoutes: true,
  },
  {
    element: <LeaveRequest />,
    path: dashboard.request.leaveAdd,
    privateRoutes: true,
  },
  {
    element: <LeaveEditRequest />,
    path: dashboard.request.leaveEdit,
    privateRoutes: true,
  },
  {
    element: <ManagerRequest />,
    path: dashboard.request.userList,
    privateRoutes: true,
  },
  {
    element: <Request />,
    path: dashboard.request.uniqueUser,
    privateRoutes: true,
  },
  {
    element: <LeaveEditRequest />,
    path: dashboard.request.uniqueEdit,
    privateRoutes: true,
  },

  // Attendence
  {
    element: <Attendence />,
    path: dashboard.attendence.index,
  },
  {
    element: <Attendence />,
    path: dashboard.attendence.uniqueUser,
    privateRoutes: true,
  },
  {
    element: <ManagerUserAttendence />,
    path: dashboard.attendence.userList,
  },

  // Books Liberary
  {
    element : <LiberaryManagement />,
    path : dashboard.liberary.books.index,
    privateRoutes: true
  },
  {
    element : <LiberaryBookCategory />,
    path : dashboard.liberary.books.category.index,
    privateRoutes: true
  },
  {
    element : <BookUserDetails />,
    path : dashboard.liberary.books.users,
    privateRoutes : true
  },
  {
    element : <LiberaryRoomIndex />,
    path : dashboard.liberary.room.index,
    privateRoutes : true
  },
  {
    element : <LiberaryRoomUserDetails />,
    path : dashboard.liberary.room.users,
    privateRoutes : true
  },
  // Not found
  {
    element: <PageNotFound />,
    path: "/dashboard/*",
    privateRoutes: true,
  },

  // Project

  {
    element: <ProjectIndex />,
    path: dashboard.project.index,
    privateRoutes: true,
  },
  {
    element: <TaskIndex />,
    path: dashboard.project.task.index,
    privateRoutes: true
  },
];