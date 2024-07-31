import { useEffect, useState } from "react";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import store from "../../../../../../store/store";
import { taskPrioties, taskStatus } from "../utils/constant";
import CustomSubmitBtn from "../../../../../../config/component/CustomSubmitBtn/CustomSubmitBtn";
import CustomInput from "../../../../../../config/component/CustomInput/CustomInput";
import { TaskCreateValidation } from "../utils/validation";

const TaskForm = observer(({ initialValues, handleSubmitForm }: any) => {
  const [showError, setShowError] = useState(false);
  const {
    auth: { getCompanyUsers, companyUsers, openNotification },
    Project: { setOpenTaskDrawer },
  } = store;

  useEffect(() => {
    getCompanyUsers({ page: 1 })
      .then(() => {})
      .catch((err) => {
        openNotification({
          message: err?.message,
          title: "Fetch Users Failed",
          type: "err",
        });
      });
  }, [getCompanyUsers, openNotification]);

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={TaskCreateValidation}
        onSubmit={() => {
          handleSubmitForm();
        }}
      >
        {({ handleChange, values, errors, setFieldValue, isSubmitting }) => {
          return (
            <Form>
              <Box height="78vh" overflowY="auto" p={4}>
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  }}
                  gap={2}
                >
                  <CustomInput
                    value={values.title}
                    name="title"
                    label="Title"
                    placeholder="Enter The Title"
                    required={true}
                    error={errors.title}
                    showError={showError}
                    onChange={handleChange}
                  />
                  <CustomInput
                    name="priority"
                    label="Priority"
                    value={values.priority}
                    required
                    placeholder="Select the Priority"
                    options={taskPrioties}
                    type="select"
                    onChange={(e: any) => {
                      setFieldValue("priority", e);
                    }}
                    error={errors.priority}
                    showError={showError}
                  />
                  <CustomInput
                    type="select"
                    name="status"
                    label="Status"
                    placeholder="Select the status"
                    value={values.status}
                    error={errors.status}
                    onChange={(e: any) => {
                      setFieldValue("status", e);
                    }}
                    options={taskStatus}
                    showError={showError}
                  />
                  <GridItem colSpan={{ base: 1, sm: 2, md: 3 }}>
                    <CustomInput
                      name="description"
                      label="Description"
                      placeholder="Write the Description"
                      type="textarea"
                      onChange={handleChange}
                      value={values.description}
                      error={errors.description}
                      showError={showError}
                    />
                  </GridItem>
                  <CustomInput
                    value={values.startDate}
                    error={errors.startDate}
                    name="startDate"
                    label="Start Date"
                    onChange={(date: any) => {
                      setFieldValue("startDate", date ? date : "");
                    }}
                    placeholder="Select the Start Date"
                    type="date"
                    showError={showError}
                  />
                  <CustomInput
                    value={values.endDate}
                    name="endDate"
                    label="End Date"
                    onChange={(date: any) => {
                      setFieldValue("endDate", date ? date : "");
                    }}
                    minDate={values.startDate}
                    placeholder="Select the End Date"
                    type="date"
                    error={errors.endDate}
                    showError={showError}
                  />
                  <CustomInput
                    value={values.dueDate}
                    name="dueDate"
                    label="Due Date"
                    placeholder="Select the Due Date"
                    type="date"
                    onChange={(date: any) => {
                      setFieldValue("dueDate", date ? date : "");
                    }}
                    error={errors.dueDate}
                    showError={showError}
                    minDate={values.startDate}
                  />
                  <CustomInput
                    value={values.reminders}
                    name="reminders"
                    label="Reminders"
                    placeholder="Select the reminders"
                    type="date"
                    onChange={(date: any) => {
                      setFieldValue("reminders", date ? date : "");
                    }}
                    error={errors.reminders}
                    showError={showError}
                    minDate={values.startDate}
                  />
                  <CustomInput
                    name="team_members"
                    label="Team"
                    value={values.team_members}
                    getOptionLabel={(option: any) => option.username}
                    getOptionValue={(option: any) => option._id}
                    options={companyUsers}
                    placeholder="Select the Team Members"
                    type="select"
                    onChange={(e: any) => {
                      setFieldValue("team_members", e);
                    }}
                    isMulti
                    isSearchable
                    error={errors.team_members}
                    showError={showError}
                  />
                </Grid>
              </Box>
              <Flex justifyContent={"end"} mt={4}>
                <CustomSubmitBtn
                  cancelFunctionality={{
                    show: true,
                    onClick: setOpenTaskDrawer,
                  }}
                  onClick={() => setShowError(true)}
                  type="submit"
                  loading={isSubmitting}
                />
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
});

export default TaskForm;
