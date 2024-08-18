import { useState } from "react";
import { Box , Divider, Flex, Grid, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import CustomInput from "../../../../../../../config/component/CustomInput/CustomInput";
import ShowFileUploadFile from "../../../../../../../config/component/common/ShowFileUploadFile/ShowFileUploadFile";
import SubmitFormBtn from "../../../../../../../config/component/Button/SubmitFormBtn";

const PersonalDocuments = ({
  type,
  handleSubmitProfile,
  initialValues,
}: any) => {
  const [showError, setShowError] = useState(false);

  return (
    <Formik
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
      {({ handleSubmit, isSubmitting, setFieldValue, values }) => {
        return(
        <Form onSubmit={handleSubmit}>
          <Box p={4} borderRadius="lg" boxShadow="md">
            <Grid>
              <Heading color="#002058" fontSize="xl" mb={4}>
                Documents:-
              </Heading>
              <Divider />
              {Object.keys(initialValues).map((documentKey) => {
                return(
                <Flex key={documentKey} mt={4}>
                  {values[documentKey]?.file === null ? (
                    <CustomInput
                      type="file-drag"
                      name={documentKey}
                      value={values[documentKey]}
                      isMulti={false}
                      accept="image/*"
                      showError={showError}
                      onChange={(e: any) => {
                        setFieldValue(documentKey, {
                          ...values[documentKey],
                          file: e.target.files,
                          isAdd: 1,
                        });
                      }}
                    />
                  ) : (
                    <Box width="100%">
                      <ShowFileUploadFile
                        isFileDeleted={values[documentKey].isDeleted}
                        edit={type === "edit"}
                        files={values[documentKey].file ? values[documentKey].file[0] : []}
                        removeFile={() => {
                          setFieldValue(documentKey, {
                            ...values[documentKey],
                            file: null,
                            isDeleted: 1,
                            isAdd: 0,
                          });
                        }}
                      />
                    </Box>
                  )}
                </Flex>
              )})}
            </Grid>
              <SubmitFormBtn loading={isSubmitting} onClick={() => {
                setShowError(true)
              }}/>
          </Box>
        </Form>
      )}}
    </Formik>
  );
};

export default PersonalDocuments;
