import { observer } from "mobx-react-lite";
import FormModel from "../FormModel/FormModel";

const AddNewUserModel = observer(({ open, title, close }: any) => {
  return (
    <FormModel title={title} open={open} close={close}>
      AddNewUserModel
    </FormModel>
  );
});

export default AddNewUserModel;
