import { useEffect, useState } from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import CustomInput from "../../../../../config/component/CustomInput/CustomInput";
import { Form, Formik } from "formik";
import { ProjectCreateValidation } from "../utils/validation";
import { observer } from "mobx-react-lite";
import store from "../../../../../store/store";
import CustomSubmitBtn from "../../../../../config/component/CustomSubmitBtn/CustomSubmitBtn";
import { debounce } from "lodash";
import { ProjectFormValuesI } from "../utils/dto";
import { initialValuesOfProjects, ProjectPrioties, projectStatus } from "../utils/constant";
import { generateProjectResponse } from "../utils/function";
import { getStatusType } from "../../../../../config/constant/statusCode";

const ProjectForm = observer(() => {
  const [searchProjectName, setSearchProjectName] = useState("");
  const [showError, setShowError] = useState(false);
  const {
    auth: { getCompanyUsers, companyUsers, openNotification },
    Project: { getProjects, createProject, setOpenProjectDrawer },
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

  useEffect(() => {
    const searchDebounceProject = debounce((value) => {
      getProjects(value)
        .then(() => {})
        .catch((err: any) => {
          console.log(err);
        });
    }, 2000);

    searchDebounceProject(searchProjectName);

    return () => {
      searchDebounceProject.cancel();
    };
  }, [searchProjectName, getProjects]);

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
          createProject({ ...values, ...sendDataObject })
            .then((data) => {
              openNotification({
                title: "Successfully Created",
                message: `${data.message}`,
                type: "success",
              });
              resetForm();
              setOpenProjectDrawer('create')
            })
            .catch((err) => {
              openNotification({
                title: "Create Failed",
                message: err?.data?.message,
                type: getStatusType(err.status),
              });
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ handleChange, values, errors, setFieldValue, isSubmitting }) => {
          return (
            <Form>
              <Grid
                gridTemplateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                overflowY={'auto'}
                gap={2}
                minH={'81vh'}
                maxH={'81vh'}
              >
                  <CustomInput
                    value={values.project_name}
                    name="project_name"
                    label="Project Name"
                    placeholder="Enter The project name"
                    required
                    onChange={(e: any) => {
                      setSearchProjectName(e.target.value);
                      handleChange(e);
                    }}
                    error={errors.project_name}
                    showError={showError}
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
                    getOptionLabel={(option: any) => option.username}
                    getOptionValue={(option: any) => option._id}
                    options={companyUsers}
                    placeholder="Select the Customers"
                    type="select"
                    onChange={(e: any) => {
                      setFieldValue("customers", e);
                    }}
                    isMulti
                    isSearchable
                    showError={showError}
                  />
                </GridItem>
                <GridItem>
                  <CustomInput
                    name="project_manager"
                    label="Project Manager"
                    value={values.project_manager}
                    getOptionLabel={(option: any) => option.username}
                    getOptionValue={(option: any) => option._id}
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
                  />
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 1 }}>
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
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 1 }}>
                  <CustomInput
                    name="followers"
                    label="Followers"
                    value={values.followers}
                    getOptionLabel={(option: any) => option.username}
                    getOptionValue={(option: any) => option._id}
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
                  />
                </GridItem>
              </Grid>
              <Flex justifyContent={'end'}>
                <CustomSubmitBtn
                  cancelFunctionality={{show : true, onClick : setOpenProjectDrawer}}
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
});

export default ProjectForm;
