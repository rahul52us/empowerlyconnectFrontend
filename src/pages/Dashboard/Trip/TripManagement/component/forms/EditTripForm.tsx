import { observer } from "mobx-react-lite";
import TripForm from "./TripForm";
import CustomDrawer from "../../../../../../config/component/Drawer/CustomDrawer";
import { useEffect, useState } from "react";
import store from "../../../../../../store/store";
import { TripFormValues } from "../../utils/interface";
import {
  generateEditInitialValues,
  generateTripResponse,
} from "../../utils/functions";
import { getStatusType } from "../../../../../../config/constant/statusCode";

const EditTripForm = observer(({ tripFormData, setTripFormData, handleGetRecord }: any) => {
  const {
    tripStore: { updateTrip },
    auth: { openNotification },
  } = store;
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState(false);
  const [thumbnail, setThumbnail] = useState<any>([]);
  const [isFileDeleted, setIsFileDeleted] = useState(0);
  useEffect(() => {
    if (
      tripFormData?.data?.thumbnail?.name &&
      tripFormData?.data?.thumbnail?.url
    ) {
      setThumbnail([
        {
          ...tripFormData?.data?.thumbnail,
          file: tripFormData?.data?.thumbnail?.url,
        },
      ]);
    }
  }, [tripFormData]);

  const setInitialValues = () => {
    const dt = generateEditInitialValues(tripFormData?.data);
    return {
      ...tripFormData?.data,
      ...dt,
    };
  };

  const submitForm = async (values: TripFormValues, resetForm: any) => {
    setLoading(true);
    if (isFileDeleted === 1 && thumbnail?.length) {
      values.thumbnail = thumbnail;
    } else {
      if (thumbnail?.length) {
        if (thumbnail[0]?.url) {
          delete values["thumbnail"];
        } else {
          values.thumbnail = thumbnail;
        }
      }
    }
    if (isFileDeleted === 1 && thumbnail?.length === 0) {
      delete values["thumbnail"];
    }

    const payload = await generateTripResponse(values);
    updateTrip(
      { ...payload, isFileDeleted: isFileDeleted },
      tripFormData?.data?._id
    )
      .then(() => {
        openNotification({
          title: "Trip Updated Successfully",
          message: "Trip has been Updated successfully",
        });
        resetForm();
        setThumbnail([]);
        setIsFileDeleted(0);
        setTripFormData({ open: false, type: "add" });
        handleGetRecord({})
      })
      .catch((err) => {
        openNotification({
          title: "Update Failed",
          message: err?.data?.message,
          type: getStatusType(err.status),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <CustomDrawer
      title={`Edit Trip`}
      open={tripFormData.open && tripFormData.type === "edit"}
      close={() => {
        setTripFormData({ open: false, data: null, type: "add" });
        setThumbnail([]);
        setIsFileDeleted(0);
      }}
      props={{ minWidth: "85vw" }}
    >
      <TripForm
        isEdit={true}
        loading={loading}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        initialValues={{ ...setInitialValues(), thumbnail: thumbnail }}
        onSubmit={submitForm}
        showError={showError}
        setShowError={setShowError}
        isFileDeleted={isFileDeleted}
        setIsFileDeleted={setIsFileDeleted}
        onClose={() => {
          setTripFormData({ open: false, data: null, type: "add" });
          setIsFileDeleted(0);
          setThumbnail([]);
        }}
      />
    </CustomDrawer>
  );
});

export default EditTripForm;
