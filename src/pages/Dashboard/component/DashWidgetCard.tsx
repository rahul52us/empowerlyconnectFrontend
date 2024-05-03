import { Grid, GridItem } from "@chakra-ui/react";
import WidgetCard from "../../../config/component/WigdetCard/WidgetCard";
import { dashboard } from "../../../config/constant/routes";
import { observer } from "mobx-react-lite";
import store from "../../../store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashWidgetCard = observer(() => {
  const navigate = useNavigate()
  const {
    auth: { openNotification },
    tripStore: { getTripCounts, tripCount },
    Employe: { getEmployesCount, employesCounts },
    DepartmentStore : {getDepartmentCounts, departmentCounts}
  } = store;

  const fetchData = (getDataFn: any) =>
    new Promise((resolve, reject) => {
      getDataFn().then(resolve).catch(reject);
    });

  useEffect(() => {
    Promise.all([fetchData(getTripCounts), fetchData(getEmployesCount), fetchData(getDepartmentCounts)])
      .then(() => {})
      .catch((error: any) => {
        openNotification({
          type: "error",
          message: error.message,
          title: "Failed to get dashboard data",
        });
      });
  }, [getTripCounts, getEmployesCount,getDepartmentCounts, openNotification]);

  return (
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(5, 1fr)" }}
      gap={4}
      marginX="auto"
    >
      {[
        {
          count: employesCounts.data,
          title: "Users",
          link: dashboard.employes.index,
          loading: employesCounts.loading,
        },
        {
          count: employesCounts.data,
          title: "Company",
          link: dashboard.company.index,
          loading: employesCounts.loading,
        },
        {
          count: tripCount.data,
          title: "Total Trips",
          link: dashboard.tripManagement.index,
          loading: tripCount.loading,
        },
        {
          count: 2000,
          title: "Calender",
          link: dashboard.calender,
          loading: tripCount.loading,
        },
        {
          count: departmentCounts.data,
          title: "Departments",
          link: dashboard.department.index,
          loading: departmentCounts.loading,
        },
      ].map((item, key) => (
        <GridItem key={key}>
          <WidgetCard
            totalCount={item.count}
            title={item.title}
            handleClick={() => navigate(item.link)}
            loading={item.loading}
          />
        </GridItem>
      ))}
    </Grid>
  );
});

export default DashWidgetCard;
