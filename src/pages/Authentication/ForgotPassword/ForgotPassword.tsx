import {
  Stack,
  Link,
  Button,
  useColorModeValue,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import CustomInput from "../../../config/component/CustomInput/CustomInput";
import { Form, Formik } from "formik";
import { ForgotEmailValidation } from "../utils/validation";
import { authentication } from "../../../config/constant/routes";
import { useNavigate } from "react-router-dom";
import store from "../../../store/store";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const ForgotPassword = observer(() => {
  const [showError, setShowError] = useState(false);
  const {
    auth: { openNotification, forgotPasswordStore },
  } = store;
  const navigate = useNavigate();

  return (
    <Flex flexDir="column" justifyContent={"center"}>
      {/* Left Section with Image (Optional) */}
      {/* Right Section with Form */}
      <Flex
        rounded={"lg"}
        flexDir={"column"}
        justifyContent={"center"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
        maxW={'xl'}
      >
        <Stack align={"center"} mb={10}>
          <Heading fontSize={"4xl"} mb={2}>Forgot Your Password</Heading>
          <Text fontSize={"md"}>
          No worries! Just enter your email address below, and we'll send you instructions to reset your password.          </Text>
        </Stack>
        <Formik
          initialValues={{ username: "" }}
          validationSchema={ForgotEmailValidation}
          onSubmit={(values, { setSubmitting }) => {
            forgotPasswordStore(values)
              .then((data) => {
                openNotification({
                  title: "Mail has been sent Successfully",
                  message: data,
                  type: "success",
                });
                navigate("/");
              })
              .catch((err: any) => {
                openNotification({
                  title: "Request Failed",
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
                  type="text"
                  name="username"
                  label="Email"
                  placeholder="Enter your email address"
                  required={true}
                  value={values.username}
                  onChange={handleChange}
                  error={errors.username}
                  showError={showError}
                />
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"end"}
                  >
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
                    isLoading={isSubmitting}
                    onClick={() => setShowError(true)}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
});

export default ForgotPassword;