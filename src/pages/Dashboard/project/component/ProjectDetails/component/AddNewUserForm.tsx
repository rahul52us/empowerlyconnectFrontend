import { Box, Button, Divider, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import CustomInput from "../../../../../../config/component/CustomInput/CustomInput";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  user: Yup.string()
    .required("Please select a user from the list")
    .min(1, "Please select a user from the list"),
    isActive: Yup.boolean(),
});

const AddNewUserForm = observer(
  ({ initialValues, showError, setShowError, close, handleSubmit }: any) => {
    return (
      <Box p={4}>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmit({ values, setSubmitting, resetForm });
            setShowError(false);
          }}
        >
          {({ values, errors, isSubmitting, setFieldValue } : any) => {
            return(
            <Form>
              <Flex gap={2} flexDirection={"column"}>
                <CustomInput
                  type="real-time-search"
                  name="user"
                  placeholder="Add New User"
                  label="Add New User"
                  required={true}
                  onChange={(e) => setFieldValue("user", e)}
                  value={values.user}
                  error={errors.user}
                  showError={showError}
                />
                <CustomInput
                  value={values.isActive}
                  type="checkbox"
                  name="isActive"
                  label="Send Invitation Mail"
                  onChange={(e) => setFieldValue("isActive", e.target.checked)}
                />
              </Flex>
              <Divider />
              <Flex
                justifyContent="flex-end"
                p={4}
                columnGap={3}
                alignItems="center"
              >
                <Button variant="outline" onClick={close} colorScheme="gray">
                  Cancel
                </Button>
                <Button
                  isLoading={isSubmitting}
                  colorScheme="blue"
                  type="submit"
                >
                  Submit
                </Button>
              </Flex>
            </Form>
          )}}
        </Formik>
      </Box>
    );
  }
);

export default AddNewUserForm;
