import { useState } from "react";
import { Box, Button, Divider, Flex, Grid, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import CustomInput from "../../../../../../../config/component/CustomInput/CustomInput";
import ShowFileUploadFile from "../../../../../../../config/component/common/ShowFileUploadFile/ShowFileUploadFile";

const PersonalBankDetails = ({
  type,
  handleSubmitProfile,
  initialValues,
  validations,
  files,
  setFiles,
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
      {({ values, errors, handleChange, handleSubmit, isSubmitting }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Box p={4} borderRadius="lg" boxShadow="md">
              <Grid>
                <Heading color="#002058" fontSize="xl" mb={4}>
                  Bank Information :-
                </Heading>
                <Divider />
                <Flex>
                  {files.cancelledCheque?.file === null ? (
                    <CustomInput
                      type="file-drag"
                      name="cancelledCheque"
                      value={files.cancelledCheque}
                      isMulti={false}
                      accept="image/*"
                      onChange={(e: any) => {
                        setFiles((prev: any) => ({
                          ...prev,
                          cancelledCheque: {
                            ...prev.cancelledCheque,
                            file: e.target.files,
                            isAdd: 1,
                          },
                        }));
                      }}
                    />
                  ) : (
                    <Box mt={-5} width="100%">
                      <ShowFileUploadFile
                        isFileDeleted={files.cancelledCheque.isDeleted}
                        edit={type === "edit" ? true : false}
                        files={
                          files?.cancelledCheque?.file
                            ? files?.cancelledCheque.file[0]
                            : []
                        }
                        removeFile={(_: any) => {
                          setFiles((prev: any) => ({
                            ...prev,
                            cancelledCheque: {
                              ...prev.cancelledCheque,
                              file: null,
                              isDeleted: 1,
                              isAdd: 0,
                            },
                          }));
                        }}
                      />
                    </Box>
                  )}
                </Flex>
                <Grid
                  gridTemplateColumns={{ md: "1fr 1fr 1fr" }}
                  columnGap={4}
                  rowGap={2}
                  mb={5}
                >
                  <CustomInput
                    name="nameAsPerBank"
                    type="text"
                    placeholder="Enter the name As Per Bank"
                    label="Name As Per Bank"
                    value={values.nameAsPerBank}
                    error={errors.nameAsPerBank}
                    showError={showError}
                    onChange={handleChange}
                    required
                  />
                  <CustomInput
                    name="name"
                    type="text"
                    placeholder="Enter the Bank Name"
                    label="Bank Name"
                    value={values.name}
                    error={errors.name}
                    showError={showError}
                    onChange={handleChange}
                    required
                  />
                  <CustomInput
                    name="branch"
                    type="text"
                    placeholder="Enter the branch Name"
                    label="Branch Name"
                    value={values.branch}
                    error={errors.branch}
                    showError={showError}
                    onChange={handleChange}
                    required
                  />
                  <CustomInput
                    name="accountNo"
                    type="text"
                    placeholder="Enter the Account Number"
                    label="Account Number"
                    value={values.accountNo}
                    error={errors.accountNo}
                    showError={showError}
                    onChange={handleChange}
                    required
                  />
                  <CustomInput
                    name="ifsc"
                    type="text"
                    placeholder="Enter the ifsc Code"
                    label="ifsc Code"
                    value={values.ifsc}
                    error={errors.ifsc}
                    showError={showError}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                onClick={() => {
                  setShowError(true);
                }}
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

export default PersonalBankDetails;
