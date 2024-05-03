import { observer } from "mobx-react-lite";
import DashPageHeader from "../../../config/component/common/DashPageHeader/DashPageHeader";
import { companyBreadCrumb } from "../utils/breadcrumb.constant";
import WidgetCard from "../../../config/component/WigdetCard/WidgetCard";
import { Grid, GridItem } from "@chakra-ui/react";
import { dashboard } from "../../../config/constant/routes";
import WorkTiming from "./WorkTiming/WorkTiming";
import WorkLocationDetails from "./workLocation/WorkLocation";
import HolidaysDetailTable from "./Holidays/Holidays";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Company = observer(() => {
  const navigate = useNavigate();
  const [workTimingForm, setworkTimingForm] = useState({
    open : false
  })

  const cards: any = [
    {
      totalCount: 2,
      title: "Policy",
      link: dashboard.company.holidays,
      loading: false,
    },
    {
      totalCount: 14,
      title: "Work Timing",
      onclick: () => setworkTimingForm({open : true}),
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
          sm: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(3, 1fr)",
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
                handleClick={() => {
                  if(item.link){
                    navigate(item.link);
                  }
                  if(item.onclick){
                    item.onclick()
                  }
                }}
                loading={item.loading}
              />
            </GridItem>
          );
        })}
      </Grid>
      <Grid gridTemplateColumns={{ md: "1fr", xl: "1fr 1fr" }} gap={4} mt={5}>
        <GridItem overflowX="auto">
          <HolidaysDetailTable />
        </GridItem>
        <GridItem overflowX="auto">
          <WorkLocationDetails />
        </GridItem>
      </Grid>
      <WorkTiming formData={workTimingForm} setFormData={setworkTimingForm}/>
    </div>
  );
});

export default Company;
