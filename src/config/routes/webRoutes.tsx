import { lazy } from "react";
import {  web } from "../constant/routes";
const School = lazy(() => import("../../pages/main/School/School"));

export const WebRoutes = [
  {
    element : <School />,
    path: web.school,
    publicRoutes:true
  },
];
