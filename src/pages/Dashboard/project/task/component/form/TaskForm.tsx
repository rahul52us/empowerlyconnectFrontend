import { useEffect, useState } from "react";
import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import store from "../../../../../../store/store";
import { activeStatus, taskPrioties, taskStatus } from "../utils/constant";
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
                  <CustomInput
                    type="select"
                    name="isActive"
                    label="Is Active"
                    placeholder="Select the Active State"
                    value={values.isActive}
                    error={errors.isActive}
                    onChange={(e: any) => {
                      setFieldValue("isActive", e);
                    }}
                    options={activeStatus}
                    showError={showError}
                    isClear={false}
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
                    type="dateAndTime"
                    onChange={(date: any) => {
                      setFieldValue("reminders", date ? date.target.value : "");
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
                  <CustomInput
                    name="dependencies"
                    label="Dependency Members"
                    value={values.dependencies}
                    getOptionLabel={(option: any) => option.username}
                    getOptionValue={(option: any) => option._id}
                    options={companyUsers}
                    placeholder="Select the Dependency Members"
                    type="select"
                    onChange={(e: any) => {
                      setFieldValue("dependencies", e);
                    }}
                    isMulti
                    isSearchable
                    error={errors.dependencies}
                    showError={showError}
                  />
                </Grid>
                <Box mt={5}>
                <Text fontWeight={'bold'}>Add Attachments :- </Text>
                 </Box>
                 <Grid columnGap={5} rowGap={3} mb={5}>
                  <FieldArray name="attach_files">
                    {({ push, remove }) => (
                      <Box>
                        {values.attach_files.map((add: any, index: number) => (
                          <div key={index}>
                            <Grid
                              gridTemplateColumns={{ md: "1fr" }}
                              gap={2}
                              key={index}
                              mb="20px"
                            >
                              <CustomInput
                                name={`attach_files.${index}.title`}
                                type="text"
                                placeholder="Title"
                                label="Title"
                                value={add.title}
                                required
                                showError={showError}
                                // error={getAddressError(
                                //   errors,
                                //   "address",
                                //   index
                                // )}
                                onChange={handleChange}
                              />

                              <CustomInput
                                name={`attach_files.${index}.description`}
                                type="textarea"
                                placeholder="Description"
                                label="Description"
                                value={add.description}
                                showError={showError}
                                // error={getAddressError(
                                //   errors,
                                //   "pinCode",
                                //   index
                                // )}
                                onChange={handleChange}
                              />
                            </Grid>
                            {values.attach_files.length > 1 && (
                              <Button
                                colorScheme="red"
                                variant="outline"
                                size="sm"
                                mt="10px"
                                onClick={() => remove(index)}
                              >
                                Remove Section
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          colorScheme="blue"
                          variant="outline"
                          display="block"
                          size="sm"
                          mb="10px"
                          mt={5}
                          onClick={() =>
                            push({
                              title: "",
                              description: ""
                            })
                          }
                        >
                          Add Section
                        </Button>
                      </Box>
                    )}
                  </FieldArray>
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
