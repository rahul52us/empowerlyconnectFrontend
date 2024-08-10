import { useEffect, useState } from "react";
import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import CustomInput from "../../../../../config/component/CustomInput/CustomInput";
import { FieldArray, Form, Formik } from "formik";
import { ProjectCreateValidation } from "../utils/validation";
import { observer } from "mobx-react-lite";
import store from "../../../../../store/store";
import CustomSubmitBtn from "../../../../../config/component/CustomSubmitBtn/CustomSubmitBtn";
import { ProjectFormValuesI } from "../utils/dto";
import { ProjectPrioties, projectStatus } from "../utils/constant";
import { generateProjectResponse } from "../utils/function";
import ShowFileUploadFile from "../../../../../config/component/common/ShowFileUploadFile/ShowFileUploadFile";
import { removeDataByIndex } from "../../../../../config/constant/function";
import NotFoundData from "../../../../../config/component/NotFound/NotFoundData";
import DrawerFormHeightContainer from "../../../../../config/component/Drawer/DrawerFormHeightContainer";

const ProjectForm = observer(
  ({ initialValuesOfProjects, handleSubmitForm, isEdit }: any) => {
    const [showError, setShowError] = useState(false);
    const {
      auth: { getCompanyUsers, companyUsers, openNotification },
      Project: { setOpenProjectDrawer },
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

    const getAttachFilesError = (errors: any, type: string, index: number) => {
      const errorTypes = ["title"];
      if (errors.attach_files && errors.attach_files[index]) {
        const errorTypeIndex = errorTypes.indexOf(type);
        if (errorTypeIndex !== -1) {
          return errors.attach_files[index][errorTypes[errorTypeIndex]];
        }
      }
      return undefined;
    };

    return (
      <div>
        <Formik
          initialValues={initialValuesOfProjects}
          validationSchema={ProjectCreateValidation}
          onSubmit={(
            values: ProjectFormValuesI,
            { setSubmitting, resetForm }
          ) => {
            const sendDataObject = generateProjectResponse(values);
            handleSubmitForm({
              values: { ...values, ...sendDataObject },
              setSubmitting,
              resetForm,
            });
          }}
        >
          {({ handleChange, values, errors, setFieldValue, isSubmitting }) => {
            return (
              <Form>
                <DrawerFormHeightContainer>
                  <Flex>
                    {values?.logo?.file?.length === 0 ? (
                      <CustomInput
                        type="file-drag"
                        name="logo"
                        value={values.logo}
                        isMulti={true}
                        accept="image/*"
                        onChange={(e: any) => {
                          setFieldValue("logo", {
                            ...values.logo,
                            file: e.target.files[0],
                            isAdd: 1,
                          });
                        }}
                        required={true}
                        showError={showError}
                        error={errors.logo}
                      />
                    ) : (
                      <Box mt={-5} width="100%">
                        <ShowFileUploadFile
                          files={values.logo?.file}
                          removeFile={(_: any) => {
                            setFieldValue("logo", {
                              ...values.logo,
                              file: removeDataByIndex(values.logo, 0),
                              isDeleted: 1,
                            });
                          }}
                          edit={isEdit}
                        />
                      </Box>
                    )}
                  </Flex>
                  <Grid
                    gridTemplateColumns={{
                      base: "repeat(1, 1fr)",
                      md: "repeat(2, 1fr)",
                      lg: "repeat(3, 1fr)",
                    }}
                    gap={2}
                  >
                    <CustomInput
                      value={values.project_name}
                      name="project_name"
                      label="Project Name"
                      placeholder="Enter The project name"
                      required={true}
                      error={errors.project_name}
                      showError={showError}
                      onChange={handleChange}
                    />
                    <CustomInput
                      name="priority"
                      label="Priority"
                      value={values.priority}
                      required
                      placeholder="Select the Priority"
                      options={ProjectPrioties}
                      type="select"
                      onChange={(e: any) => {
                        setFieldValue("priority", e);
                      }}
                      error={errors.priority}
                      showError={showError}
                    />
                    <CustomInput
                      name="subtitle"
                      label="Sub Title"
                      placeholder="Write the subtitle"
                      value={values.subtitle}
                      error={errors.subtitle}
                      onChange={handleChange}
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
                      options={projectStatus}
                      showError={showError}
                    />
                    <GridItem colSpan={{ base: 1, md: 3 }}>
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
                      name="tags"
                      type="tags"
                      label="Tags"
                      placeholder="Add a tag and press Enter"
                      value={values.tags}
                      onChange={(e) => {
                        setFieldValue("tags", e);
                      }}
                      showError={showError}
                    />
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
                    <GridItem colSpan={{ base: 1, md: 1 }}>
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
                    </GridItem>
                    <GridItem>
                      <CustomInput
                        name="customers"
                        label="Customers"
                        value={values.customers}
                        getOptionLabel={(option: any) => option.user?.username}
                        getOptionValue={(option: any) => option.user?._id}
                        options={companyUsers}
                        placeholder="Select the Customers"
                        type="select"
                        onChange={(e: any) => {
                          setFieldValue("customers", e);
                        }}
                        isMulti
                        isSearchable
                        showError={showError}
                        isPortal={true}
                      />
                    </GridItem>
                    <GridItem>
                      <CustomInput
                        name="project_manager"
                        label="Project Manager"
                        value={values.project_manager}
                        getOptionLabel={(option: any) => option.user?.username}
                        getOptionValue={(option: any) => option.user?._id}
                        options={companyUsers}
                        placeholder="Select the Project Manager"
                        type="select"
                        onChange={(e: any) => {
                          setFieldValue("project_manager", e);
                        }}
                        isMulti
                        isSearchable
                        error={errors.project_manager}
                        showError={showError}
                        isPortal={true}
                      />
                    </GridItem>
                    <GridItem colSpan={{ base: 1, md: 1 }}>
                      <CustomInput
                        name="team_members"
                        label="Team"
                        value={values.team_members}
                        getOptionLabel={(option: any) => option.user?.username}
                        getOptionValue={(option: any) => option.user?._id}
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
                        isPortal={true}
                      />
                    </GridItem>
                    <GridItem colSpan={{ base: 1, md: 1 }}>
                      <CustomInput
                        name="followers"
                        label="Followers"
                        value={values.followers}
                        getOptionLabel={(option: any) => option.user?.username}
                        getOptionValue={(option: any) => option.user?._id}
                        options={companyUsers}
                        placeholder="Select the Team Followers"
                        type="select"
                        onChange={(e: any) => {
                          setFieldValue("followers", e);
                        }}
                        isMulti
                        isSearchable
                        error={errors.followers}
                        showError={showError}
                        isPortal={true}
                      />
                    </GridItem>
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
                                  (file: any, index: number) => {
                                    console.log("the file are", file);
                                    return (
                                      <Box key={index} mb="20px">
                                        <Grid
                                          gridTemplateColumns={{ md: "1fr" }}
                                          gap={2}
                                        >
                                          <Box width="100%">
                                            {file.file ? (
                                              <ShowFileUploadFile
                                                edit={isEdit}
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
                                            error={getAttachFilesError(
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
                                    );
                                  }
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
                <Flex justifyContent={"end"}>
                  <CustomSubmitBtn
                    cancelFunctionality={{
                      show: true,
                      onClick: setOpenProjectDrawer,
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
      </div>
    );
  }
);

export default ProjectForm;
