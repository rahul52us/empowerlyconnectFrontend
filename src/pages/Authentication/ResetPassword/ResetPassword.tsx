import { useState } from "react";
import {
  Box,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import CustomInput from "../../../config/component/CustomInput/CustomInput";
import { Form, Formik } from "formik";
import { ResetPasswordValidation } from "../utils/validation";
import { authentication } from "../../../config/constant/routes";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../store/store";
import { observer } from "mobx-react-lite";

const ResetPassword = observer(() => {
  const { token } = useParams();
  const {
    auth: { openNotification, resetPasswordStore },
  } = store;
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  return (
    <Box bg={useColorModeValue("", "gray.800")}>
      <Stack align={"center"} mb={10}>
        <Heading fontSize={"4xl"}>Reset Password</Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={ResetPasswordValidation}
          onSubmit={(values, { setSubmitting }) => {
            resetPasswordStore({ password: values.password, token: token })
              .then((data) => {
                openNotification({
                  title: "Password has been changed successfully",
                  message: data.message,
                  type: "success",
                });
                navigate(authentication.login);
              })
              .catch((err: any) => {
                openNotification({
                  title: "Requested Failed",
                  message: err.message,
                  type: "error",
                });
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ values, handleSubmit, handleChange, isSubmitting, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <CustomInput
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter the Password"
                  required={true}
                  value={values.password}
                  onChange={handleChange}
                  error={errors.password}
                  showError={showError}
                />
                <CustomInput
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Enter the Confirm Password"
                  required={true}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  showError={showError}
                />
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Link
                      color={"blue.400"}
                      onClick={() => navigate(authentication.login)}
                    >
                      Sign in?
                    </Link>
                  </Stack>
                  <Button
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={() => setShowError(true)}
                    isLoading={isSubmitting}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
});

export default ResetPassword;