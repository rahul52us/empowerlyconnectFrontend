import { observer } from "mobx-react-lite";
import DashPageHeader from "../../../config/component/common/DashPageHeader/DashPageHeader";
import { companyBreadCrumb } from "../utils/breadcrumb.constant";
import WidgetCard from "../../../config/component/WigdetCard/WidgetCard";
import { Grid, GridItem } from "@chakra-ui/react";
import { dashboard } from "../../../config/constant/routes";

const Company = observer(() => {
  const cards: any = [
    {
      totalCount: 2,
      title: "Policy",
      link: dashboard.company.policy,
      loading: false,
    },
    {
      totalCount: 14,
      title: "Holidays",
      link: "",
      loading: false,
    },
  ];
  return (
    <div>
      <DashPageHeader title="Company" breadcrumb={companyBreadCrumb.index} />
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        gap={4}
        marginX="auto"
      >
        {cards.map((item: any, index: number) => {
          return (
            <GridItem key={index}>
              <WidgetCard
                key={index}
                totalCount={item.totalCount}
                title={item.title}
                link={item.link}
                loading={item.loading}
              />
            </GridItem>
          );
        })}
      </Grid>
    </div>
  );
});

export default Company;
