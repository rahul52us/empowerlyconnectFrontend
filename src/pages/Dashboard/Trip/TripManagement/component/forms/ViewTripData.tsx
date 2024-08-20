import { Box } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import CustomDrawer from "../../../../../../config/component/Drawer/CustomDrawer";
import DrawerLoader from "../../../../../../config/component/Loader/DrawerLoader";
import { getStatusType } from "../../../../../../config/constant/statusCode";
import store from "../../../../../../store/store";
import TripDetails from "../TridDetails/TripDetails";

const ViewTripData = observer(({ item, open, onClose }: any) => {
  const {
    tripStore: { getSingleTrip },
    auth: { openNotification },
  } = store;
  const [tripData, setTripData] = useState<any>({ open: false, data: null });

  useEffect(() => {
    setTripData({ loading: true, data: null });
    getSingleTrip({ _id: item?._id })
      .then((data: any) => {
        setTripData({
          data: data,
          loading: false,
        });
      })
      .catch((err) => {
        openNotification({
          title: "Failed to Get",
          message: err?.data?.message,
          type: getStatusType(err.status),
        });
        setTripData({ data: null, loading: false });
      })
      .finally(() => {});
  }, [getSingleTrip, item, openNotification]);

  return (
    <CustomDrawer
      open={open}
      title={item?.title}
      close={onClose}
      width={"85vw"}
    >
      <DrawerLoader
        loading={tripData.loading}
        noRecordFoundText={!tripData.data}
      >
        {
            tripData?.data &&
            <Box>
              <TripDetails trip={tripData?.data} setTripData={setTripData}/>
            </Box>
        }

      </DrawerLoader>
    </CustomDrawer>
  );
});

export default ViewTripData;
