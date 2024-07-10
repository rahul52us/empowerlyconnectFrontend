import { observer } from "mobx-react-lite";
import HolidayForm from "./form/HolidayForm";
import FormModel from "../../../../../config/component/common/FormModel/FormModel";
import { useState } from "react";
import store from "../../../../../store/store";
import { getStatusType } from "../../../../../config/constant/statusCode";

const EditHoliday = observer(({ formValues, setFormValues, getAllRecords }: any) => {
  const {
    company: { updateHoliday },
    auth: { openNotification },
  } = store;
  const [showError, setShowError] = useState(false);

  const closeModel = () => {
    setFormValues({ open: false, loading: false, data : null, type : 'add' });
    setShowError(false);
  };

  const handleSubmit = ({ values, setSubmitting, resetForm }: any) => {
    updateHoliday({ ...values, title : values?.title?.trim(), oldTitle : formValues?.data?.title, edit : 1 })
      .then((data: any) => {
        openNotification({
          title: "Updated Successfully",
          message: data?.message,
          type: "success",
        });
        getAllRecords()
        resetForm();
        closeModel();
      })
      .catch((err: any) => {
        openNotification({
          title: "Update Failed",
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
      open={formValues.open && formValues.type === "edit"}
      title={`${formValues?.data?.title}`}
      footer={false}
      close={closeModel}
    >
      <HolidayForm
        initialValues={{
          title: formValues?.data?.title,
          date:  new Date(formValues?.data?.date) || new Date(),
          description: formValues?.data?.description
        }}
        close={closeModel}
        setShowError={setShowError}
        showError={showError}
        handleSubmit={handleSubmit}
      />
    </FormModel>
  );
});

export default EditHoliday;
