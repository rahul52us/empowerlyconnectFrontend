import { lazy } from "react";
import {  web } from "../constant/routes";
import { ecommerceRoutes } from "./component/ecommerceRoute";
const School = lazy(() => import("../../pages/main/School/School"));

export const WebRoutes = [
  {
    element : <School />,
    path: web.school,
    publicRoutes:true
  },
  ...ecommerceRoutes
];