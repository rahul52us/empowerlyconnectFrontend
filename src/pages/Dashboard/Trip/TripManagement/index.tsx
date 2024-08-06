import DashPageHeader from "../../../../config/component/common/DashPageHeader/DashPageHeader";
import { tripBreadCrumb } from "../../utils/breadcrumb.constant";
import { observer } from "mobx-react-lite";
import TripChartContainer from "./component/TripChartContainer/TripChartContainer";
import TripLayout from "./layout/TripLayout";
import { useState } from "react";
import TripWidget from "./component/TripWidget/TripWidget";
import { FaHome } from "react-icons/fa";
import { Heading, Icon } from "@chakra-ui/react";

const TripManagement = observer(() => {
  const [gridType, setGripType] = useState({ loading: true, type: "grid" });
  const [tripFormData, setTripFormData] = useState({
    open: false,
    type: "add",
    data: null,
  });
  return (
    <div>
      <DashPageHeader
        breadcrumb={tripBreadCrumb}
        selectedMode={gridType.type}
        btnAction={(type: any) => {
          setGripType((prev) => ({ ...prev, loading: true }));
          setTimeout(() => {
            setGripType({ loading: false, type: type });
          }, 1000);
        }}
      />
      <TripWidget />
      <TripChartContainer
        addData={() => setTripFormData({ open: true, type: "add", data: null })}
      />
      <Heading
        display="flex"
        alignItems="center"
        mb={6}
        fontSize={{ base: "xl", md: "2xl" }}
        color="teal.600"
      >
        <Icon as={FaHome} boxSize={6} mr={2} />
        Trips
      </Heading>
      <TripLayout
        tripFormData={tripFormData}
        setTripFormData={setTripFormData}
        gridType={gridType.type}
        gridLoading={gridType.loading}
        setGripType={setGripType}
      />
    </div>
  );
});

export default TripManagement;
