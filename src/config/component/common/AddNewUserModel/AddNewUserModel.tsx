import { useState } from "react";
import FormModel from "../FormModel/FormModel";
import AddNewUserForm from "./AddNewUser";

const AddNewUserModel = ({ open, close, handleSubmit }: any) => {
  const [showError, setShowError] = useState(false);


  return (
    <FormModel
      isCentered
      open={open}
      title="Add User"
      footer={false}
      close={close}
      size="xl"
    >
      <AddNewUserForm
        initialValues={{ user: undefined }}
        close={close}
        showError={showError}
        setShowError={setShowError}
        handleSubmit={handleSubmit}
      />
    </FormModel>
  );
};

export default AddNewUserModel;
