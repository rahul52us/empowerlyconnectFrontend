import { Grid, GridItem } from "@chakra-ui/react";
import WidgetCard from "../../../config/component/WigdetCard/WidgetCard";
import { dashboard } from "../../../config/constant/routes";
import { observer } from "mobx-react-lite";
import store from "../../../store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashWidgetCard = observer(() => {
  const navigate = useNavigate();
  const {
    auth: { openNotification },
    tripStore: { getTripCounts, tripCount },
    User: { getUsersCount, UsersCounts },
    Project : {getProjectCounts, projectCount}
  } = store;

  const fetchData = (getDataFn: any) =>
    new Promise((resolve, reject) => {
      getDataFn().then(resolve).catch(reject);
    });

  useEffect(() => {
    Promise.all([fetchData(getTripCounts), fetchData(getUsersCount), fetchData(getProjectCounts)])
      .then(() => {})
      .catch((error: any) => {
        openNotification({
          type: "error",
          message: error?.message || "Something went wrong",
          title: "Failed to get dashboard data",
        });
      });
  }, [getTripCounts, getUsersCount, getProjectCounts, openNotification]);

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(4, 1fr)",
        lg: "repeat(5, 1fr)",
      }}
      gap={4}
    >
      {[
        {
          count: UsersCounts.data,
          title: "Users",
          link: dashboard.Users.index,
          loading: UsersCounts.loading,
        },
        {
          count: UsersCounts.data,
          title: "Company",
          link: dashboard.company.index,
          loading: UsersCounts.loading,
        },
        {
          count: tripCount.data,
          title: "Total Trips",
          link: dashboard.tripManagement.index,
          loading: tripCount.loading
        },
        {
          count: projectCount.data,
          title: "Projects",
          link: dashboard.application.project,
          loading: projectCount.loading
        },
        {
          count: 2000,
          title: "Quiz",
          link: dashboard.quiz,
          loading: tripCount.loading,
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