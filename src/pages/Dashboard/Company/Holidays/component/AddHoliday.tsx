import { observer } from "mobx-react-lite";
import HolidayForm from "./form/HolidayForm";
import FormModel from "../../../../../config/component/common/FormModel/FormModel";
import { useState } from "react";

const AddHoliday = observer(({ addFormValues, setAddFormValues }: any) => {
  const [showError,setShowError] = useState(false)

  const closeModel = () => {
    setAddFormValues({ open: false, loading: false });
    setShowError(false)
  }

  const handleSubmit = ({values,setSubmitting, resetForm} : any) => {
    setSubmitting(true)
    console.log(values)
    setTimeout(() => {
      setSubmitting(false)
      resetForm()
    },3000)
  }


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
