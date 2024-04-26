import { observer } from "mobx-react-lite";
import HolidayForm from "./form/HolidayForm";
import FormModel from "../../../../../config/component/common/FormModel/FormModel";
import { useState } from "react";
import store from "../../../../../store/store";
import { getStatusType } from "../../../../../config/constant/statusCode";

const AddHoliday = observer(({ addFormValues, setAddFormValues }: any) => {
  const {
    company: { createHolidays },
    auth: { openNotification },
  } = store;
  const [showError, setShowError] = useState(false);

  const closeModel = () => {
    setAddFormValues({ open: false, loading: false });
    setShowError(false);
  };

  const handleSubmit = ({ values, setSubmitting, resetForm }: any) => {
    createHolidays({ ...values })
      .then((data: any) => {
        console.log(data)
        openNotification({
          title: "Create Successfully",
          message: data?.message,
          type: "success",
        });
        resetForm();
        closeModel();
      })
      .catch((err: any) => {
        openNotification({
          title: "Create Failed",
          message: err?.data?.message,
          type: getStatusType(err.status),
        });
      })
      .finally(() => {
        setSubmitting(false);
        setShowError(false);
      });
  };

  return (
    <FormModel
      isCentered
      open={addFormValues.open}
      title="Add Holiday"
      footer={false}
      close={closeModel}
    >
      <HolidayForm
        initialValues={{
          title: "",
          date: new Date(),
          description: "",
        }}
        close={closeModel}
        setShowError={setShowError}
        showError={showError}
        handleSubmit={handleSubmit}
      />
    </FormModel>
  );
});

export default AddHoliday;
