import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Grid,
  GridItem,
  VStack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import CustomInput from "../../../../config/component/CustomInput/CustomInput";

// Define TypeScript interfaces for the form fields
interface SalaryComponent {
  head: string;
  monthlyValue: number;
  yearlyValue: number;
  frequency: "Monthly" | "Yearly";
}

interface SalaryFormValues {
  effectiveFrom: string;
  disbursementFrom: string;
  salaryComponents: SalaryComponent[];
  benefits: SalaryComponent[];
  grossSalary: {
    monthly: number;
    yearly: number;
  };
  ctc: {
    monthly: number;
    yearly: number;
  };
  inHandSalary: number;
  remarks: string;
}

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  effectiveFrom: Yup.string().required("Required"),
  disbursementFrom: Yup.string().required("Required"),
  salaryComponents: Yup.array().of(
    Yup.object().shape({
      head: Yup.string().required("Required"),
      monthlyValue: Yup.number().required("Required"),
      yearlyValue: Yup.number().required("Required"),
      frequency: Yup.string().oneOf(["Monthly", "Yearly"]).required("Required"),
    })
  ),
  benefits: Yup.array().of(
    Yup.object().shape({
      head: Yup.string().required("Required"),
      monthlyValue: Yup.number().required("Required"),
      yearlyValue: Yup.number().required("Required"),
      frequency: Yup.string().oneOf(["Monthly", "Yearly"]).required("Required"),
    })
  ),
  grossSalary: Yup.object().shape({
    monthly: Yup.number().required("Required"),
    yearly: Yup.number().required("Required"),
  }),
  ctc: Yup.object().shape({
    monthly: Yup.number().required("Required"),
    yearly: Yup.number().required("Required"),
  }),
  inHandSalary: Yup.number().required("Required"),
  remarks: Yup.string(),
});

const SalaryStructureForm: React.FC = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const formControlBorderColor = useColorModeValue("teal.300", "teal.600");
  const headingColor = useColorModeValue("teal.500", "teal.200");

  const initialValues: SalaryFormValues = {
    effectiveFrom: "",
    disbursementFrom: "",
    salaryComponents: [
      { head: "", monthlyValue: 0, yearlyValue: 0, frequency: "Monthly" },
    ],
    benefits: [
      { head: "", monthlyValue: 0, yearlyValue: 0, frequency: "Monthly" },
    ],
    grossSalary: { monthly: 0, yearly: 0 },
    ctc: { monthly: 0, yearly: 0 },
    inHandSalary: 0,
    remarks: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, handleChange, setFieldValue }) => {
        console.log("the values are", values);
        return (
          <Form>
            <Box bg={bgColor} p={8} rounded="md" shadow="lg" mx="auto">
              <Heading
                as="h3"
                size="lg"
                mb={6}
                textAlign="center"
                color={headingColor}
              >
                Salary Structure Form
              </Heading>

              <VStack spacing={6} align="stretch">
                {/* Effective Date Fields */}
                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                  gap={6}
                >
                  <GridItem>
                    <FormControl>
                      <FormLabel>Effective From</FormLabel>
                      <Input
                        type="date"
                        name="effectiveFrom"
                        onChange={handleChange}
                        value={values.effectiveFrom}
                        bg="gray.50"
                        borderColor={formControlBorderColor}
                        _focus={{ borderColor: "teal.500" }}
                      />
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl>
                      <FormLabel>Disbursement From</FormLabel>
                      <Input
                        type="date"
                        name="disbursementFrom"
                        onChange={handleChange}
                        value={values.disbursementFrom}
                        bg="gray.50"
                        borderColor={formControlBorderColor}
                        _focus={{ borderColor: "teal.500" }}
                      />
                    </FormControl>
                  </GridItem>
                </Grid>

                {/* Salary Components Section */}
                <FieldArray name="salaryComponents">
                  {({ push, remove }) => (
                    <Box>
                      <FormLabel fontWeight="bold">Salary Details</FormLabel>
                      {values.salaryComponents.map((item: any, index) => (
                        <Grid
                          templateColumns={{
                            base: "1fr",
                            md: "repeat(5, 1fr)",
                          }}
                          gap={4}
                          mb={4}
                          key={index}
                        >
                          <GridItem>
                            <CustomInput
                              name={`salaryComponents.${index}.head`}
                              value={item.head}
                              placeholder="Title"
                              onChange={(e) =>
                                setFieldValue(
                                  `salaryComponents.${index}.head`,
                                  e.target.value
                                )
                              }
                            />
                          </GridItem>
                          <GridItem>
                            <CustomInput
                              type="number"
                              name={`salaryComponents.${index}.monthlyValue`}
                              value={item.monthlyValue}
                              placeholder="Monthly Value"
                              onChange={(e) =>
                                setFieldValue(
                                  `salaryComponents.${index}.monthlyValue`,
                                  e.target.value
                                )
                              }
                            />
                          </GridItem>
                          <GridItem>
                            <CustomInput
                              type="number"
                              name={`salaryComponents.${index}.yearlyValue`}
                              value={item.yearlyValue}
                              placeholder="Yearly Value"
                              onChange={(e) =>
                                setFieldValue(
                                  `salaryComponents.${index}.yearlyValue`,
                                  e.target.value
                                )
                              }
                            />
                          </GridItem>
                          <GridItem mt={2}>
                            <Field
                              name={`salaryComponents.${index}.frequency`}
                              as={Select}
                              bg="gray.50"
                              borderColor={formControlBorderColor}
                              _focus={{ borderColor: "teal.500" }}
                            >
                              <option value="Monthly">Monthly</option>
                              <option value="Yearly">Yearly</option>
                            </Field>
                          </GridItem>
                          <GridItem mt={2}>
                            <Button
                              onClick={() => remove(index)}
                              colorScheme="red"
                              variant="outline"
                            >
                              Remove
                            </Button>
                          </GridItem>
                        </Grid>
                      ))}
                      <Button
                        mt={2}
                        onClick={() =>
                          push({
                            head: "",
                            monthlyValue: 0,
                            yearlyValue: 0,
                            frequency: "Monthly",
                          })
                        }
                        colorScheme="teal"
                        variant="outline"
                      >
                        Add Salary Details
                      </Button>
                    </Box>
                  )}
                </FieldArray>

                {/* Benefits Section */}
                <FieldArray name="benefits">
                  {({ push, remove }) => (
                    <Box>
                      <FormLabel fontWeight="bold">Benefits</FormLabel>
                      {values.benefits.map((benefit: any, index) => (
                        <Grid
                          templateColumns={{
                            base: "1fr",
                            md: "repeat(5, 1fr)",
                          }}
                          gap={4}
                          mb={4}
                          key={index}
                        >
                          <GridItem>
                            <CustomInput
                              placeholder="Title"
                              value={benefit?.head}
                              name={`benefits.${index}.head`}
                              onChange={(e) =>
                                setFieldValue(
                                  `benefits.${index}.head`,
                                  e.target.value
                                )
                              }
                            />
                          </GridItem>
                          <GridItem>
                            <CustomInput
                              placeholder="Monthly Value"
                              value={benefit?.head}
                              name={`benefits.${index}.monthlyValue`}
                              onChange={(e) =>
                                setFieldValue(
                                  `benefits.${index}.monthlyValue`,
                                  e.target.value
                                )
                              }
                            />
                          </GridItem>
                          <GridItem>
                            <CustomInput
                              placeholder="Yearly Value"
                              value={benefit?.head}
                              name={`benefits.${index}.yearlyValue`}
                              onChange={(e) =>
                                setFieldValue(
                                  `benefits.${index}.yearlyValue`,
                                  e.target.value
                                )
                              }
                            />
                          </GridItem>
                          <GridItem mt={2}>
                            <Field
                              name={`benefits.${index}.frequency`}
                              as={Select}
                              bg="gray.50"
                              borderColor={formControlBorderColor}
                              _focus={{ borderColor: "teal.500" }}
                            >
                              <option value="Monthly">Monthly</option>
                              <option value="Yearly">Yearly</option>
                            </Field>
                          </GridItem>
                          <GridItem mt={2}>
                            <Button
                              onClick={() => remove(index)}
                              colorScheme="red"
                              variant="outline"
                            >
                              Remove
                            </Button>
                          </GridItem>
                        </Grid>
                      ))}
                      <Button
                        mt={2}
                        onClick={() =>
                          push({
                            head: "",
                            monthlyValue: 0,
                            yearlyValue: 0,
                            frequency: "Monthly",
                          })
                        }
                        colorScheme="teal"
                        variant="outline"
                      >
                        Add Benefit
                      </Button>
                    </Box>
                  )}
                </FieldArray>

                {/* Additional Fields */}
                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                  gap={6}
                >
                  <GridItem>
                    <CustomInput
                      name="grossSalary.monthly"
                      onChange={handleChange}
                      value={values.grossSalary.monthly}
                      placeholder="Gross Salary - Monthly"
                      label="Gross Salary - Monthly"
                    />
                  </GridItem>
                  <GridItem>
                    <CustomInput
                      name="grossSalary.yearly"
                      onChange={handleChange}
                      value={values.grossSalary.yearly}
                      placeholder="Gross Salary - Yearly"
                      label="Gross Salary - Yearly"
                    />
                  </GridItem>
                </Grid>

                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                  gap={4}
                >
                  <GridItem>
                    <CustomInput
                      name="ctc.monthly"
                      onChange={handleChange}
                      value={values.ctc.monthly}
                      placeholder="CTC - Monthly"
                      label="CTC - Monthly"
                    />
                  </GridItem>
                  <GridItem>
                    <CustomInput
                      name="ctc.yearly"
                      onChange={handleChange}
                      value={values.ctc.yearly}
                      placeholder="CTC - Yearly"
                      label="CTC - Yearly"
                    />
                  </GridItem>
                </Grid>

                <GridItem>
                  <CustomInput
                    name="inHandSalary"
                    onChange={handleChange}
                    value={values.inHandSalary}
                    placeholder="In Hand Salary"
                    label="InHand Salary"
                  />
                </GridItem>

                <GridItem>
                  <CustomInput
                    type="textarea"
                    name="remarks"
                    onChange={handleChange}
                    value={values.remarks}
                    placeholder="Remark"
                    label="Remark"
                  />
                </GridItem>

                {/* Submit Button */}
                <Button
                  type="submit"
                  colorScheme="teal"
                  variant="solid"
                  mt={6}
                  width="full"
                >
                  Submit
                </Button>
              </VStack>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SalaryStructureForm;
