import { observer } from "mobx-react-lite";
import TaskForm from "./TaskForm";
import { useState } from "react";
import { initialValuesOfTask } from "../utils/constant";
import { generateSendTaskResponse } from "../utils/function";
import { readFileAsBase64 } from "../../../../../../config/constant/function";
import store from "../../../../../../store/store";
import { getStatusType } from "../../../../../../config/constant/statusCode";

const AddTask = observer(({projectId, fetchRecords, close} : any) => {
  const {Project : {createTask, setOpenTaskDrawer}, auth : {openNotification}} = store
  const [showError, setShowError] = useState(false);

  const handleSubmit = async ({ values, setSubmitting, resetForm } : any) => {
    let formData = {
      ...values,
      attach_files: values.attach_files.map((fileObj : any) => ({
        ...fileObj,
        file: fileObj.file ? [...fileObj.file] : null,
      }))
    };


    for (const dt of formData.attach_files) {
      if (dt.file) {
        const file = await readFileAsBase64(dt.file[0]);
        dt.file = {
          buffer: file,
          filename: dt.file[0].name,
          type: dt.file[0].type,
        };
      }
    }
    const response = generateSendTaskResponse(formData);
    createTask({...response,projectId}).then((data : any) => {
      openNotification({
        title: "Successfully Created",
        message: `${data.message}`,
        type: "success",
      });
      if(fetchRecords){
        fetchRecords()
      }
      setShowError(false);
      resetForm()
      setOpenTaskDrawer('create')
    }).catch((err) => {
      openNotification({
        title: "Create Failed",
        message: err?.data?.message,
        type: getStatusType(err.status),
      });
    }).finally(() => {
      setSubmitting(false);
    })
  };


  return (
    <TaskForm
      close={close}
      handleSubmitForm={handleSubmit}
      initialValues={initialValuesOfTask}
      showError={showError}
      setShowError={setShowError}
    />
  );
});

export default AddTask;