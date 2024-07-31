import { observer } from "mobx-react-lite";
import TaskForm from "./TaskForm";
import { useState } from "react";

const AddTask = observer(() => {
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {};

  return (
    <TaskForm
      close={() => {}}
      handleSubmit={handleSubmit}
      initialValues={{}}
      showError={showError}
      setShowError={setShowError}
    />
  );
});

export default AddTask;