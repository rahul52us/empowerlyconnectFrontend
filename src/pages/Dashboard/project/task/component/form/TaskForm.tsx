import { useEffect, useState } from "react";
import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import store from "../../../../../../store/store";
import { activeStatus, taskPrioties, taskStatus } from "../utils/constant";
import SubmitFormBtn from "../../../../../../config/component/Button/SubmitFormBtn";
import CustomInput from "../../../../../../config/component/CustomInput/CustomInput";
import { TaskCreateValidation } from "../utils/validation";
import ShowFileUploadFile from "../../../../../../config/component/common/ShowFileUploadFile/ShowFileUploadFile";
import NotFoundData from "../../../../../../config/component/commonPages/NotFoundData";
import DrawerFormHeightContainer from "../../../../../../config/component/Drawer/DrawerFormHeightContainer";

const TaskForm = observer(
  ({ type = "create", initialValues, handleSubmitForm }: any) => {
    const [showError, setShowError] = useState(false);
    const {
      auth: { getCompanyUsers, openNotification },
      Project: { setOpenTaskDrawer },
    } = store;

    useEffect(() => {
      getCompanyUsers({ page: 1 })
        .then(() => {})
        .catch((err) => {
          openNotification({
            message: err?.message,
            title: "Fetch Users Failed",
            type: "error",
          });
        });
    }, [getCompanyUsers, openNotification]);

    const generateErrors = (
      errorType: any,
      errors: any,
      type: string,
      index: number
    ) => {
      if (errorType === "attach_files") {
        const errorTypes = ["title"];
        if (errors.attach_files && errors.attach_files[index]) {
          const errorTypeIndex = errorTypes.indexOf(type);
          if (errorTypeIndex !== -1) {
            return errors.attach_files[index][errorTypes[errorTypeIndex]];
          }
        }
        return undefined;
      }
      if (errorType === "followers") {
        const errorTypes = ["user"];
        if (errors.followers && errors.followers[index]) {
          const errorTypeIndex = errorTypes.indexOf(type);
          if (errorTypeIndex !== -1) {
            return errors.followers[index][errorTypes[errorTypeIndex]];
          }
        }
        return undefined;
      }
      if (errorType === "team_members") {
        const errorTypes = ["user"];
        if (errors.team_members && errors.team_members[index]) {
          const errorTypeIndex = errorTypes.indexOf(type);
          if (errorTypeIndex !== -1) {
            return errors.team_members[index][errorTypes[errorTypeIndex]];
          }
        }
        return undefined;
      }
      if (errorType === "customers") {
        const errorTypes = ["user"];
        if (errors.customers && errors.customers[index]) {
          const errorTypeIndex = errorTypes.indexOf(type);
          if (errorTypeIndex !== -1) {
            return errors.customers[index][errorTypes[errorTypeIndex]];
          }
        }
        return undefined;
      }
      if (errorType === "project_manager") {
        const errorTypes = ["user"];
        if (errors.project_manager && errors.project_manager[index]) {
          const errorTypeIndex = errorTypes.indexOf(type);
          if (errorTypeIndex !== -1) {
            return errors.project_manager[index][errorTypes[errorTypeIndex]];
          }
        }
        return undefined;
      }
    };

    return (
      <Box>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={TaskCreateValidation}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            handleSubmitForm({ values, resetForm, setSubmitting });
          }}
        >
          {({ handleChange, values, errors, setFieldValue, isSubmitting }) => {
            return (
              <Form>
                <DrawerFormHeightContainer>
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
                        setFieldValue(
                          "reminders",
                          date ? date.target.value : ""
                        );
                      }}
                      error={errors.reminders}
                      showError={showError}
                      minDate={values.startDate}
                    />
                    <CustomInput
                      name="assigner"
                      label="Assigner"
                      value={values.assigner}
                      options={
                        type === "edit"
                          ? [values.assigner]
                          : []
                      }
                      placeholder="Search OR Select the Assigner"
                      type="real-time-user-search"
                      onChange={(e: any) => {
                        setFieldValue("assigner", e);
                      }}
                      isSearchable
                      error={errors.assigner}
                      showError={showError}
                    />
                        <GridItem colSpan={3} rowGap={3} mb={5}>
                      <Box mt={5} mb={2}>
                        <Text fontWeight={"bold"}>Add Members :- </Text>
                      </Box>
                      <FieldArray name="team_members">
                        {({ push, remove }) => (
                          <Box>
                            {values.team_members.length > 0 ? (
                              <Grid
                                templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                                gap={4}
                                mb={4}
                              >
                                {values.team_members.map(
                                  (user: any, index: number) => (
                                    <Box
                                      key={index}
                                      p={4}
                                      borderWidth="1px"
                                      borderRadius="md"
                                      boxShadow="sm"
                                    >
                                      <Flex
                                        direction={{
                                          base: "column",
                                          md: "row",
                                        }}
                                        align="center"
                                        justify="space-between"
                                        gap={4}
                                      >
                                        <CustomInput
                                          name={`team_members.${index}.user`}
                                          label="Members"
                                          value={
                                            type === "edit" && user?.user
                                              ? {
                                                  label: user.user.username,
                                                  value: user.user._id,
                                                }
                                              : undefined
                                          }
                                          options={
                                            type === "edit" && user?.user
                                              ? [
                                                  {
                                                    label: user.user.username,
                                                    value: user.user._id,
                                                  },
                                                ]
                                              : []
                                          }
                                          placeholder="Select Member"
                                          type="real-time-user-search"
                                          onChange={(selectedOption) => {
                                            setFieldValue(
                                              `team_members.${index}.user`,
                                              selectedOption
                                            );
                                          }}
                                          isMulti={false}
                                          isSearchable
                                          showError={showError}
                                          error={generateErrors(
                                            "team_members",
                                            errors,
                                            "user",
                                            index
                                          )}
                                          // flex="1"
                                        />
                                        <CustomInput
                                          type="checkbox"
                                          name={`team_members.${index}.isActive`}
                                          label="Active"
                                          value={user.isActive}
                                          onChange={(e: any) => {
                                            setFieldValue(
                                              `team_members.${index}.isActive`,
                                              e.target.checked
                                            );
                                          }}
                                          // flexShrink={0}
                                        />
                                        {user.isAdd && (
                                          <CustomInput
                                            type="checkbox"
                                            name={`team_members.${index}.invitationMail`}
                                            label="Send Invitation Mail"
                                            value={user.invitationMail}
                                            onChange={(e: any) => {
                                              setFieldValue(
                                                `team_members.${index}.invitationMail`,
                                                e.target.checked
                                              );
                                            }}
                                            rest={{ flexShrink: 0 }}
                                          />
                                        )}
                                        <Button
                                          onClick={() => remove(index)}
                                          size="sm"
                                          colorScheme="red"
                                          variant="outline"
                                          flexShrink={0}
                                        >
                                          Delete
                                        </Button>
                                      </Flex>
                                    </Box>
                                  )
                                )}
                              </Grid>
                            ) : (
                              <Text
                                fontSize="md"
                                color="gray.500"
                                mb={4}
                                textAlign="center"
                                fontWeight="bold"
                              >
                                No Team Manager added yet.
                              </Text>
                            )}
                            <Button
                              mt={4}
                              width="100%"
                              onClick={() =>
                                push({
                                  user: undefined,
                                  isActive: true,
                                  isAdd: true,
                                  invitationMail: true,
                                })
                              }
                              colorScheme="blue"
                            >
                              Add Member
                            </Button>
                          </Box>
                        )}
                      </FieldArray>
                    </GridItem>
                    <CustomInput
                      name="dependencies"
                      label="Dependency Members"
                      value={values.dependencies}
                      options={values.dependencies}
                      placeholder="Search OR Select the Dependency Members"
                      type="real-time-user-search"
                      onChange={(e: any) => {
                        setFieldValue("dependencies", e);
                      }}
                      isMulti={true}
                      isSearchable
                      error={errors.dependencies}
                      showError={showError}
                    />
                  </Grid>
                  <Box>
                    <Box mt={5} mb={2}>
                      <Text fontWeight={"bold"}>Add Attachments :- </Text>
                    </Box>
                    <Box>
                      {values.attach_files?.length === 0 ? (
                        <Box>
                          <NotFoundData
                            title="No Attachment Are Found"
                            subTitle="Add New Attachment for the project description"
                            btnText="Add New Attachment"
                            onClick={() => {
                              setFieldValue("attach_files", [
                                {
                                  title: "",
                                  description: "",
                                  file: null,
                                },
                              ]);
                            }}
                          />
                        </Box>
                      ) : (
                        <Grid columnGap={5} rowGap={3} mb={5}>
                          <FieldArray name="attach_files">
                            {({ push, remove }) => (
                              <Box>
                                {values.attach_files.map(
                                  (file: any, index: number) => (
                                    <Box key={index} mb="20px">
                                      <Grid
                                        gridTemplateColumns={{ md: "1fr" }}
                                        gap={2}
                                      >
                                        <Box width="100%">
                                          {file.file ? (
                                            <ShowFileUploadFile
                                              edit={type === "edit"}
                                              files={file.file[0]}
                                              removeFile={() => {
                                                const updatedFiles =
                                                  values.attach_files.map(
                                                    (item: any, i: number) =>
                                                      i === index
                                                        ? {
                                                            ...item,
                                                            file: null,
                                                            isDeleted: 1,
                                                            isAdd: 0,
                                                          }
                                                        : item
                                                  );
                                                setFieldValue(
                                                  "attach_files",
                                                  updatedFiles
                                                );
                                              }}
                                              // Optionally, you can add functionality to remove files
                                            />
                                          ) : (
                                            <CustomInput
                                              name={`attach_files.${index}.file`}
                                              type="file-drag"
                                              placeholder="File"
                                              label="File"
                                              required
                                              showError={showError}
                                              onChange={(e: any) => {
                                                setFieldValue(
                                                  `attach_files.${index}.file`,
                                                  e.target.files
                                                );
                                              }}
                                            />
                                          )}
                                        </Box>
                                        <CustomInput
                                          name={`attach_files.${index}.title`}
                                          type="text"
                                          placeholder="Title"
                                          label="Title"
                                          value={file.title}
                                          required
                                          showError={showError}
                                          onChange={handleChange}
                                          error={generateErrors(
                                            'attach_files',
                                            errors,
                                            "title",
                                            index
                                          )}
                                        />
                                        <CustomInput
                                          name={`attach_files.${index}.description`}
                                          type="textarea"
                                          placeholder="Description"
                                          label="Description"
                                          value={file.description}
                                          showError={showError}
                                          onChange={handleChange}
                                        />
                                      </Grid>
                                      {values.attach_files.length && (
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
                                    </Box>
                                  )
                                )}
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
                                      description: "",
                                      file: null,
                                    })
                                  }
                                >
                                  Add Section
                                </Button>
                              </Box>
                            )}
                          </FieldArray>
                        </Grid>
                      )}
                    </Box>
                  </Box>
                </DrawerFormHeightContainer>
                <SubmitFormBtn
                  cancelFunctionality={{
                    show: true,
                    onClick: () => setOpenTaskDrawer("create"),
                  }}
                  onClick={() => setShowError(true)}
                  type="submit"
                  loading={isSubmitting}
                />
              </Form>
            );
          }}
        </Formik>
      </Box>
    );
  }
);

export default TaskForm;
