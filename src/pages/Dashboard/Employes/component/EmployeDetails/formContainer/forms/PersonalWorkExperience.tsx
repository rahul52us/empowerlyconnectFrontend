import { useState } from "react";
import { Box, Button, Divider, Flex, Grid, Heading } from "@chakra-ui/react";
import { Form, Formik, FieldArray } from "formik";
import CustomInput from "../../../../../../../config/component/CustomInput/CustomInput";
import ShowFileUploadFile from "../../../../../../../config/component/common/ShowFileUploadFile/ShowFileUploadFile";

const PersonalWorkExperience = ({
  handleSubmitProfile,
  initialValues,
  validations,
  type,
}: any) => {
  const [showError, setShowError] = useState(false);

  return (
    <Formik
      validationSchema={validations}
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
        handleSubmitProfile({
          values,
          setSubmitting,
          resetForm,
          setErrors,
          setShowError
      });
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }: any) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Box p={4} borderRadius="lg" boxShadow="md">
              <Grid>
                <Heading color="#002058" fontSize="xl" mb={4}>
                  Experience Details:
                </Heading>
                <Divider />
                <FieldArray name="experienceDetails">
                  {({ push, remove }) => (
                    <div>
                      {values.experienceDetails.map(
                        (experience: any, index: number) => {
                          console.log(index,experience.certificate)
                          return (
                            <div key={index}>
                              <Flex>
                                {!experience?.certificate || experience?.certificate?.file === null ? (
                                  <CustomInput
                                    type="file-drag"
                                    name={`experienceDetails[${index}].certificate`}
                                    value={experience.certificate}
                                    isMulti={false}
                                    accept="image/*"
                                    onChange={(e: any) => {
                                      setFieldValue(
                                        `experienceDetails[${index}].certificate`,
                                         {...experience.certificate,file : e.target.files, isAdd : 1}
                                      );
                                    }}
                                  />
                                ) : (
                                  <Box mt={-5} width="100%">
                                    <ShowFileUploadFile
                                      isFileDeleted={
                                        experience.certificate?.isDeleted
                                      }
                                      edit={type === "edit" ? true : false}
                                      files={
                                        experience.certificate?.file
                                          ? experience.certificate.file[0]
                                          : []
                                      }
                                      removeFile={(_: any) => {
                                        setFieldValue(
                                          `experienceDetails[${index}].certificate`,
                                           {...experience.certificate,file : null, isDeleted : 1, isAdd : 0}
                                        );
                                      }}
                                    />
                                  </Box>
                                )}
                              </Flex>
                              <Grid
                                gridTemplateColumns={{ md: "1fr 1fr" }}
                                columnGap={4}
                                rowGap={2}
                                mb={5}
                              >
                                <CustomInput
                                  name={`experienceDetails[${index}].pastEmployer`}
                                  type="text"
                                  placeholder="Past Employer"
                                  label="Past Employer"
                                  showError={showError}
                                  value={experience.pastEmployer}
                                  onChange={handleChange}
                                  error={
                                    errors.experienceDetails &&
                                    errors.experienceDetails[index] &&
                                    errors.experienceDetails[index].pastEmployer
                                  }
                                />
                                <CustomInput
                                  name={`experienceDetails[${index}].designation`}
                                  type="text"
                                  placeholder="Designation"
                                  label="Designation"
                                  showError={showError}
                                  value={experience.designation}
                                  onChange={handleChange}
                                  error={
                                    errors.experienceDetails &&
                                    errors.experienceDetails[index] &&
                                    errors.experienceDetails[index].designation
                                  }
                                />
                                <CustomInput
                                  name={`experienceDetails[${index}].jobProfile`}
                                  type="text"
                                  placeholder="Job Profile"
                                  label="Job Profile"
                                  showError={showError}
                                  onChange={handleChange}
                                  value={experience.jobProfile}
                                  error={
                                    errors.experienceDetails &&
                                    errors.experienceDetails[index] &&
                                    errors.experienceDetails[index].jobProfile
                                  }
                                />
                                <CustomInput
                                  name={`experienceDetails[${index}].relevantExperience`}
                                  type="text"
                                  placeholder="Relevant Experience"
                                  label="Relevant Experience"
                                  showError={showError}
                                  value={experience.relevantExperience}
                                  onChange={handleChange}
                                  error={
                                    errors.experienceDetails &&
                                    errors.experienceDetails[index] &&
                                    errors.experienceDetails[index]
                                      .relevantExperience
                                  }
                                />
                                <CustomInput
                                  name={`experienceDetails[${index}].startDate`}
                                  type="date"
                                  placeholder="Start Date"
                                  label="Start Date"
                                  value={experience.startDate}
                                  showError={showError}
                                  onChange={(e: any) => {
                                    setFieldValue(
                                      `experienceDetails[${index}].startDate`,
                                      e
                                    );
                                  }}
                                  error={
                                    errors.experienceDetails &&
                                    errors.experienceDetails[index] &&
                                    errors.experienceDetails[index].startDate
                                  }
                                />
                                <CustomInput
                                  name={`experienceDetails[${index}].endDate`}
                                  type="date"
                                  placeholder="End Date"
                                  label="End Date"
                                  value={experience.endDate}
                                  showError={showError}
                                  onChange={(e: any) => {
                                    setFieldValue(
                                      `experienceDetails[${index}].endDate`,
                                      e
                                    );
                                  }}
                                  error={
                                    errors.experienceDetails &&
                                    errors.experienceDetails[index] &&
                                    errors.experienceDetails[index].endDate
                                  }
                                />
                                <CustomInput
                                  name={`experienceDetails[${index}].Lastctc`}
                                  type="text"
                                  placeholder="Last CTC"
                                  label="Last CTC"
                                  showError={showError}
                                  value={experience.Lastctc}
                                  onChange={handleChange}
                                  error={
                                    errors.experienceDetails &&
                                    errors.experienceDetails[index] &&
                                    errors.experienceDetails[index].Lastctc
                                  }
                                />
                                <CustomInput
                                  name={`experienceDetails[${index}].leavingReason`}
                                  type="text"
                                  placeholder="Leaving Reason"
                                  label="Leaving Reason"
                                  showError={showError}
                                  value={experience.leavingReason}
                                  onChange={handleChange}
                                  error={
                                    errors.experienceDetails &&
                                    errors.experienceDetails[index] &&
                                    errors.experienceDetails[index]
                                      .leavingReason
                                  }
                                />
                              </Grid>
                              <Button
                                type="button"
                                onClick={() => remove(index)}
                                variant="outline"
                              >
                                Remove
                              </Button>
                            </div>
                          );
                        }
                      )}
                      <Button
                        type="button"
                        onClick={() =>
                          push({
                            pastEmployer: "",
                            startDate: new Date(
                              Date.now() - 365 * 24 * 60 * 60 * 1000
                            ),
                            endDate: new Date(),
                            relevantExperience: "",
                            designation: "",
                            jobProfile: "",
                            Lastctc: "",
                            leavingReason: "",
                            certificate: {
                              file:null,
                              isDeleted: 0,
                              isAdd: 0,
                            },
                          })
                        }
                        variant="outline"
                      >
                        Add Experience
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </Grid>
              <Button
                type="submit"
                onClick={() => setShowError(true)}
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PersonalWorkExperience;
