import { SimpleGrid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import SummaryWidget from "../../../../../../config/component/WigdetCard/SummaryWidget";
import store from "../../../../../../store/store";
import { FaUser, FaUsers } from "react-icons/fa";
import { useEffect } from "react";
import { MdOutlineTravelExplore } from "react-icons/md";

const TripWidget = observer(() => {
  const {
    auth: { openNotification },
    tripStore: { getTripCounts, tripCount, getTripTypesCounts, tripTypeCount },
  } = store;

  const fetchData = (getDataFn: any) =>
    new Promise((resolve, reject) => {
      getDataFn().then(resolve).catch(reject);
    });

  useEffect(() => {
    Promise.all([fetchData(getTripCounts), fetchData(getTripTypesCounts)])
      .then(() => {})
      .catch((error: any) => {
        openNotification({
          type: "error",
          message: error?.message || "Something went wrong",
          title: "Failed to get data",
        });
      });
  }, [getTripCounts, getTripTypesCounts, openNotification]);

  const summaryData = [
    {
      label: "Total Trips",
      value: tripCount.data,
      icon: MdOutlineTravelExplore,
      colorScheme: "teal",
      description: "The overall number of trips recorded.",
      loading: tripCount.loading,
    },
    {
      label: "Total Individual Trips",
      value: tripTypeCount?.data?.individual || 0,
      icon: FaUser,
      colorScheme: "blue",
      description: "The total number of individual trips.",
      loading: tripTypeCount.loading,
    },
    {
      label: "Total Group Trips",
      value: tripTypeCount?.data?.group || 0,
      icon: FaUsers,
      colorScheme: "purple",
      description: "The total number of group trips.",
      loading: tripTypeCount.loading,
    },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={6}>
      {summaryData.map((data, index) => (
        <SummaryWidget
          key={index}
          label={data.label}
          value={data.value}
          icon={data.icon}
          colorScheme={data.colorScheme}
          description={data.description}
          loading={data.loading}
        />
      ))}
    </SimpleGrid>
  );
});

export default TripWidget;
