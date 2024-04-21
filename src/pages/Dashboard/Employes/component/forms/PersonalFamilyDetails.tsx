import { Formik, Form, FieldArray } from "formik";
import { useState } from "react";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Box,
  Heading,
  Divider,
} from "@chakra-ui/react";
import CustomInput from "../../../../../config/component/CustomInput/CustomInput";

const FamilyDetails = ({
  handleSubmitProfile,
  initialValues,
  validations,
}: any) => {
  const [showError, setShowError] = useState(false);
  return (
    <Box p={4} borderRadius="lg" boxShadow="md">
    <Heading color="#002058" fontSize="xl" mb={4}>
        Family Details :-
      </Heading>
      <Divider />
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
        {({ values, errors, handleChange, isSubmitting }: any) => (
          <Form>
            <FieldArray name="relations">
              {({ push, remove }) => (
                <Box overflowX="auto" w="70vw">
                  <Table variant="striped" colorScheme="teal" size="md" w="100%">
                    <Thead>
                      <Tr>
                        <Th minW="150px">Name</Th>
                        <Th minW="150px">Relation</Th>
                        <Th minW="150px">Date of Birth</Th>
                        <Th minW="150px">Contact Number</Th>
                        <Th minW="150px">Aadhar Number</Th>
                        <Th minW="150px">Occupation</Th>
                        <Th minW="150px">PF Nomination</Th>
                        <Th minW="150px">Gratuity Nomination</Th>
                        <Th minW="150px">ESIC Nomination</Th>
                        <Th minW="150px">Covered ESIC</Th>
                        <Th minW="150px">Covered Mediclaim</Th>
                        <Th minW="150px">Address</Th>
                        <Th minW="150px">Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {values.relations.map((_: any, index: number) => (
                        <Tr key={index}>
                          <Td>
                            <CustomInput
                              name={`relations[${index}].name`}
                              type="text"
                              placeholder="Name"
                              value={values.relations[index].name}
                              error={
                                errors.relations &&
                                errors.relations[index] &&
                                errors.relations[index].name
                              }
                              showError={showError}
                              onChange={handleChange}
                            />
                          </Td>
                          <Td>
                            <CustomInput
                              name={`relations[${index}].relation`}
                              type="text"
                              placeholder="Relation"
                              value={values.relations[index].relation}
                              error={
                                errors.relations &&
                                errors.relations[index] &&
                                errors.relations[index].relation
                              }
                              showError={showError}
                              onChange={handleChange}
                            />
                          </Td>
                          <Td>
                            <CustomInput
                              name={`relations[${index}].dob`}
                              type="text"
                              placeholder="Date of Birth"
                              value={values.relations[index].dob}
                              error={
                                errors.relations &&
                                errors.relations[index] &&
                                errors.relations[index].dob
                              }
                              showError={showError}
                              onChange={handleChange}
                            />
                          </Td>
                          <Td>
                            <CustomInput
                              name={`relations[${index}].contactNo`}
                              type="text"
                              placeholder="Contact Number"
                              value={values.relations[index].contactNo}
                              error={
                                errors.relations &&
                                errors.relations[index] &&
                                errors.relations[index].contactNo
                              }
                              showError={showError}
                              onChange={handleChange}
                            />
                          </Td>
                          <Td>
                            <CustomInput
                              name={`relations[${index}].aadharNo`}
                              type="text"
                              placeholder="Aadhar Number"
                              value={values.relations[index].aadharNo}
                              error={
                                errors.relations &&
                                errors.relations[index] &&
                                errors.relations[index].aadharNo
                              }
                              showError={showError}
                              onChange={handleChange}
                            />
                          </Td>
                          <Td>
                            <CustomInput
                              name={`relations[${index}].occupation`}
                              type="text"
                              placeholder="Occupation"
                              value={values.relations[index].occupation}
                              error={
                                errors.relations &&
                                errors.relations[index] &&
                                errors.relations[index].occupation
                              }
                              showError={showError}
                              onChange={handleChange}
                            />
                          </Td>
                          <Td>
                            <CustomInput
                              name={`relations[${index}].pf_nomination`}
                              type="text"
                              placeholder="PF Nomination"
                              value={values.relations[index].pf_nomination}
                              error={
                                errors.relations &&
                                errors.relations[index] &&
                                errors.relations[index].pf_nomination
                              }
                              showError={showError}
                              onChange={handleChange}
                            />
                          </Td>
                          <Td>
                            <CustomInput
                              name={`relations[${index}].gratuity_nomination`}
                              type="text"
                              placeholder="Gratuity Nomination"
                              value={
                                values.relations[index].gratuity_nomination
                              }
                              error={
                                errors.relations &&
                                errors.relations[index] &&
                                errors.relations[index].gratuity_nomination
                              }
                              showError={showError}
                              onChange={handleChange}
                            />
                          </Td>
                          <Td>
                            <CustomInput
                              name={`relations[${index}].esic_nomination`}
                              type="text"
                              placeholder="ESIC Nomination"
                              value={values.relations[index].esic_nomination}
                              error={
                                errors.relations &&
                                errors.relations[index] &&
                                errors.relations[index].esic_nomination
                              }
                              showError={showError}
                              onChange={handleChange}
                            />
                          </Td>
                          <Td>
                            <CustomInput
                              name={`relations[${index}].coveredEsic`}
                              type="text"
                              placeholder="Covered ESIC"
                              value={values.relations[index].coveredEsic}
                              error={
                                errors.relations &&
                                errors.relations[index] &&
                                errors.relations[index].coveredEsic
                              }
                              showError={showError}
                              onChange={handleChange}
                            />
                          </Td>
                          <Td>
                            <CustomInput
                              name={`relations[${index}].coveredMediclaim`}
                              type="text"
                              placeholder="Covered Mediclaim"
                              value={values.relations[index].coveredMediclaim}
                              error={
                                errors.relations &&
                                errors.relations[index] &&
                                errors.relations[index].coveredMediclaim
                              }
                              showError={showError}
                              onChange={handleChange}
                            />
                          </Td>
                          <Td>
                            <CustomInput
                              name={`relations[${index}].address`}
                              type="text"
                              placeholder="Address"
                              value={values.relations[index].address}
                              error={
                                errors.relations &&
                                errors.relations[index] &&
                                errors.relations[index].address
                              }
                              showError={showError}
                              onChange={handleChange}
                            />
                          </Td>
                          <Td>
                            <Button
                              colorScheme="red"
                              variant="solid"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    variant="solid"
                    onClick={() => push({})}
                  >
                    Add Relation
                  </Button>
                </Box>
              )}
            </FieldArray>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FamilyDetails;
