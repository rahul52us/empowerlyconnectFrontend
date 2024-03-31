import DashPageHeader from "../../../../config/component/common/DashPageHeader/DashPageHeader";
import { tripBreadCrumb } from "../../utils/breadcrumb.constant";
import { observer } from "mobx-react-lite";
import TripChartContainer from "./component/TripChartContainer/TripChartContainer";
import TripLayout from "./layout/TripLayout";
import { useState } from "react";
import AddTripForm from "./component/forms/AddTripForm";
import EditTripForm from "./component/forms/EditTripForm";

const TripManagement = observer(() => {
  const [gridType, setGripType] = useState({loading : true, type : "grid"});
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
          setGripType((prev) => ({...prev,loading : true}))
          setTimeout(() => {
            setGripType({loading : false , type : type});
          },1000)
        }}
      />
      <TripChartContainer
        addData={() => setTripFormData({ open: true, type: "add", data: null })}
      />
      <TripLayout setTripFormData={setTripFormData} gridType={gridType.type} gridLoading={gridType.loading} setGripType={setGripType} />
      <AddTripForm
        tripFormData={tripFormData}
        setTripFormData={setTripFormData}
      />
      {tripFormData?.type === "edit" && (
        <EditTripForm
          tripFormData={tripFormData}
          setTripFormData={setTripFormData}
        />
      )}
    </div>
  );
});

export default TripManagement;
