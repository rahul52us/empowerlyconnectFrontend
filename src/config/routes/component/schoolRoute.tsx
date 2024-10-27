import { lazy } from "react";
import {  web } from "../../constant/routes";
const SchoolDashboard = lazy(() => import("../../../pages/Dashboard/SchoolDashboard/SchoolDashboard"))

export const schoolRoutes  = [
  {
    element : <SchoolDashboard />,
    path: web.schoolDashboard.index,
    publicRoutes:true
  },
];

