import { observer } from "mobx-react-lite";
import FormModel from "../../../../../../config/component/common/FormModel/FormModel";
import AddNewUserForm from "./AddNewUserForm";
import { useState } from "react";

const AddNewUser = observer(({ type, open, close }: any) => {
  const [showError, setShowError] = useState([]);

  const handleSubmit = ({ setSubmitting, values }: any) => {
    setSubmitting(false);
    console.log(values);
  };

  return (
    <FormModel title={`Add New ${type} `} open={open} close={close} isCentered>
      <AddNewUserForm
        initialValues={{ user: undefined, check: true }}
        showError={showError}
        setShowError={setShowError}
        close={close}
        handleSubmit={handleSubmit}
      />
    </FormModel>
  );
});

export default AddNewUser;
