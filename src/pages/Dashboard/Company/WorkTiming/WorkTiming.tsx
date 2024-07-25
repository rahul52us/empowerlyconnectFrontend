import { observer } from "mobx-react-lite";
import FormModel from "../../../../config/component/common/FormModel/FormModel";
import WorkTimingForm from "./component/WorkTimingForm";

const WorkTiming = observer(({ formData, setFormData }: any) => {

  return (
    <FormModel
      size="6xl"
      title="Work Timing"
      isCentered
      open={formData.open}
      close={() => setFormData({ open: false })}
    >
      <WorkTimingForm setFormData={setFormData}/>
    </FormModel>
  );
});

export default WorkTiming;
