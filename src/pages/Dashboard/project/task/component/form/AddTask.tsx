import { observer } from "mobx-react-lite";
import TaskForm from "./TaskForm";
import { useState } from "react";
import { initialValuesOfTask } from "../utils/constant";

const AddTask = observer(() => {
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {};

  return (
    <TaskForm
      close={() => {}}
      handleSubmit={handleSubmit}
      initialValues={initialValuesOfTask}
      showError={showError}
      setShowError={setShowError}
    />
  );
});

export default AddTask;