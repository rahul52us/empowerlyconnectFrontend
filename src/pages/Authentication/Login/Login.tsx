import {
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Formik, Form, Field } from "formik";
import CustomInput from "../../../config/component/CustomInput/CustomInput";
import { LoginValidation } from "../utils/validation";
import store from "../../../store/store";
import { authentication, main } from "../../../config/constant/routes";
import { useState } from "react";

const Login = observer(() => {
  const [showError, setShowError] = useState(false);
  const {
    auth: { openNotification, login },
  } = store;
  const navigate = useNavigate();

  return (
    <Flex flexDir="column" justifyContent={"center"}>
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
          <Heading fontSize={"4xl"} mb={2}>
            Sign In
          </Heading>
          <Text fontSize={"lg"} >
              Sign in to access all your personalized features and continue where you left off ✌️.
          </Text>
        </Stack>
        <Formik
          initialValues={{
            username: "",
            password: "",
            remember_me: false,
          }}
          validationSchema={LoginValidation}
          onSubmit={(values, { setSubmitting }) => {
            login({...values,loginType : 'username'})
              .then((data: any) => {
                openNotification({
                  title: "Login Success",
                  message: data.message,
                  type: "success",
                });
                navigate(main.home);
              })
              .catch((error: Error) => {
                openNotification({
                  title: "Login Failed",
                  message: error.message,
                  type: "error",
                });
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ handleSubmit, handleChange, errors, values, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <CustomInput
                  type="text"
                  name="username"
                  label="Email"
                  placeholder="Enter the email"
                  required={true}
                  error={errors.username}
                  onChange={handleChange}
                  value={values.username}
                  showError={showError}
                />
                <CustomInput
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter the password"
                  error={errors.password}
                  onChange={handleChange}
                  value={values.password}
                  required={true}
                  showError={showError}
                />
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Field as={Checkbox} name="remember_me">
                      Remember me
                    </Field>
                    <Link
                      color={"blue.400"}
                      onClick={() => navigate(authentication.forgotPassword)}
                    >
                      Forgot password?
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
                    onClick={() => {
                      setShowError(true);
                    }}
                  >
                    Sign in
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

export default Login;
