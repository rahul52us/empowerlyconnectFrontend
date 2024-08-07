import { observer } from "mobx-react-lite";
import CustomDrawer from "../../../../../../config/component/Drawer/CustomDrawer";
import store from "../../../../../../store/store";
import { useEffect, useState } from "react";
import { getStatusType } from "../../../../../../config/constant/statusCode";
import DrawerLoader from "../../../../../../config/component/Loader/DrawerLoader";
import { Heading } from "@chakra-ui/react";

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
      width={"80vw"}
    >
      <DrawerLoader
        loading={tripData.loading}
        noRecordFoundText={!tripData.data}
      >
        {
            tripData?.data &&
            <Heading fontSize="lg" textAlign="center">{tripData?.data?.title}</Heading>
        }

      </DrawerLoader>
    </CustomDrawer>
  );
});

export default ViewTripData;
