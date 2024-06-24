import { observer } from "mobx-react-lite";
import {
  Form,
  Formik,
  FieldArray,
  FormikHelpers,
  FormikProps,
  Field,
  ErrorMessage,
} from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Select,
} from "@chakra-ui/react";
import * as yup from "yup";
import CustomInput from "../../../../config/component/CustomInput/CustomInput";
import React from "react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

// Define the shape of form values
interface FormValues {
  title: string;
  benefits: string[];
  description: string;
  category: string;
  level: string;
  price: string;
  prerequisites: string;
  short_desc: string;
  language: string;
}

// Define the props for the form component
interface CourseFormProps {
  initialValues: FormValues;
  showError: boolean;
  setShowError: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void;
}

// Validation schema for the form
const courseDetailsSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(26, "Title must be less than 26 characters"),
  benefits: yup
    .array()
    .of(
      yup
        .string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters")
        .max(200, "Description must be less than 200 characters")
    )
    .required("At least one description is required"),
});

// The CourseForm component
const CourseForm: React.FC<CourseFormProps> = observer(
  ({ initialValues, showError, setShowError, handleSubmit }) => {
    const customStyle = {
      // width: "100%",
      background: "white",
      border: "none",
      padding: "15px 20px",
      borderRadius: "20px",
      boxShadow: "#0001 2px 8px 8px -5px",

      // border-inline: 2px solid transparent;
    };
    return (
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={courseDetailsSchema}
          onSubmit={(values, formikHelpers) => {
            // console.log("Form Values on Submit:", values);
            handleSubmit(values, formikHelpers);
          }}
        >
          {({
            handleChange,
            values,
            errors,
            isSubmitting,
            touched,
          }: FormikProps<FormValues>) => (
            <Form>
              <Grid templateColumns={"1fr 1fr"} gap={6}>
                <CustomInput
                  name="title"
                  placeholder="Enter the Title"
                  label="Title"
                  required
                  style={customStyle}
                  onChange={handleChange}
                  value={values.title}
                  error={errors.title}
                  showError={showError}
                />
                <CustomInput
                  name="short_desc"
                  placeholder="Give a short description"
                  label="Short Description"
                  required
                  onChange={handleChange}
                  value={values.short_desc}
                  error={errors.short_desc}
                  showError={showError}
                />
                <FormControl>
                  <FormLabel>Level</FormLabel>
                  <Field
                    as={Select}
                    name="language"
                    placeholder="Select Language"
                  >
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="marathi">Marathi</option>
                  </Field>
                  <ErrorMessage name="level" component="div" />
                </FormControl>
                <CustomInput
                  name="description"
                  placeholder="Enter the description"
                  label="Description"
                  type="textarea"
                  style={customStyle}
                  required
                  onChange={handleChange}
                  value={values.description}
                  error={errors.description}
                  showError={showError}
                />
                <CustomInput
                  name="prerequisites"
                  placeholder="Prerequisites for the course"
                  label="Prerequisites"
                  type="textarea"
                  required
                  onChange={handleChange}
                  value={values.prerequisites}
                  error={errors.prerequisites}
                  showError={showError}
                />

                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Field
                    as={Select}
                    name="category"
                    placeholder="Select category"
                  >
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    {/* Add more categories as needed */}
                  </Field>
                  <ErrorMessage name="category" component="div" />
                </FormControl>

                <FormControl>
                  <FormLabel>Level</FormLabel>
                  <Field as={Select} name="level" placeholder="Select level">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </Field>
                  <ErrorMessage name="level" component="div" />
                </FormControl>

                <FieldArray name="benefits">
                  {({ push, remove }) => (
                    <Box>
                      {values.benefits.length > 0 &&
                        values.benefits.map((benefit, index) => (
                          <React.Fragment key={index}>
                            <Flex align="end" gap={4} mb={2}>
                              <CustomInput
                                name={`benefits[${index}]`}
                                placeholder="Enter a Benefit"
                                label={`Benefit ${index + 1}`}
                                required
                                onChange={handleChange}
                                value={benefit}
                                error={
                                  errors.benefits && touched.benefits
                                    ? (errors.benefits as string[])[index]
                                    : undefined
                                }
                                showError={showError}
                              />
                              {index !== 0 && (
                                <IconButton
                                  aria-label="remove"
                                  icon={<DeleteIcon />}
                                  onClick={() => remove(index)}
                                  colorScheme="red"
                                />
                              )}
                            </Flex>
                          </React.Fragment>
                        ))}
                      <Flex justify={"end"}>
                        <IconButton
                          aria-label="add"
                          icon={<AddIcon />}
                          onClick={() => push("")}
                          colorScheme="green"
                        />
                      </Flex>
                    </Box>
                  )}
                </FieldArray>

                <CustomInput
                  name="price"
                  placeholder="Enter the Price"
                  label="Price"
                  type="text"
                  required
                  onChange={handleChange}
                  value={values.price}
                  error={errors.price}
                  showError={showError}
                />
              </Grid>

              <Button
                colorScheme="green"
                isLoading={isSubmitting}
                type="submit"
                onClick={() => {
                  if (typeof setShowError === "function") {
                    setShowError(true);
                  } else {
                    console.error("setShowError is not a function");
                  }
                }}
                mt={4}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    );
  }
);

export default CourseForm;
