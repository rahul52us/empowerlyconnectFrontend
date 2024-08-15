import { Formik, Form, FieldArray } from "formik";
import { useState } from "react";
import {
  Box,
  Heading,
  Divider,
  Button,
  Flex,
  useDisclosure,
  Grid,
  Collapse,
} from "@chakra-ui/react";
import CustomInput from "../../../../../../../config/component/CustomInput/CustomInput";
import CustomSubmitBtn from "../../../../../../../config/component/CustomSubmitBtn/CustomSubmitBtn";
import FormModel from "../../../../../../../config/component/common/FormModel/FormModel";

const FamilyDetails = ({
  handleSubmitProfile,
  initialValues,
  validations,
}: any) => {
  const [showError, setShowError] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [collapsedIndex, setCollapsedIndex] = useState<number | null>(null);

  return (
    <Box p={6} borderRadius="lg" boxShadow="md">
      <Heading color="#002058" fontSize="3xl" mb={8} textAlign="center">
        Family Details
      </Heading>
      <Divider mb={8} />
      <Formik
        validationSchema={validations}
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
          handleSubmitProfile({
            values,
            setSubmitting,
            resetForm,
            setErrors,
            setShowError,
          });
        }}
      >
        {({ values, isSubmitting }: any) => (
          <Form>
            <FieldArray name="relations">
              {({ push, remove }) => (
                <>
                  <Box mb={8}>
                    {values.relations.map((relation: any, index: number) => (
                      <Box
                        key={index}
                        mb={6}
                        borderWidth="1px"
                        borderRadius="md"
                        boxShadow="sm"
                        transition="background 0.3s ease"
                      >
                        <Flex
                          alignItems="center"
                          justifyContent="space-between"
                          // mb={4}
                          p={4}
                          flexDirection={{base : 'column', md : 'row'}}
                          rowGap={4}
                          maxW="80vw"
                        >
                          <Box fontSize="lg" fontWeight="bold">
                            Family Member {index + 1}
                          </Box>
                          <Flex columnGap={4}>
                            <Button
                              colorScheme="teal"
                              variant="outline"
                              borderRadius="full"
                              p={3}
                              _hover={{ bg: "teal.100" }}
                              onClick={() => {
                                setEditIndex(index);
                                onOpen();
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              colorScheme="red"
                              variant="outline"
                              borderRadius="full"
                              p={3}
                              _hover={{ bg: "red.100" }}
                              onClick={() => remove(index)}
                            >
                              Remove
                            </Button>
                            <Button
                              borderRadius="full"
                              p={3}
                              _hover={{ bg: "blue.100" }}
                              onClick={() =>
                                setCollapsedIndex(
                                  collapsedIndex === index ? null : index
                                )
                              }
                            >
                              {collapsedIndex === index ? "Hide Details" : "Show Details"}
                            </Button>
                          </Flex>
                        </Flex>
                        <Collapse in={collapsedIndex === index}>
                          <Box mt={4} p={2}>
                            <Grid
                              gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
                              gap={4}
                            >
                              {Object.entries(relation).map(([field, value]) => (
                                <CustomInput
                                  key={field}
                                  name={`relations.${index}.${field}`}
                                  label={capitalize(field.replace("_", " "))}
                                  type="text"
                                  placeholder={capitalize(field.replace("_", " "))}
                                  value={value}
                                  showError={showError}
                                />
                              ))}
                            </Grid>
                          </Box>
                        </Collapse>
                      </Box>
                    ))}
                    <Button
                      mt={6}
                      colorScheme="teal"
                      variant="solid"
                      borderRadius="full"
                      p={4}
                      _hover={{ bg: "teal.600" }}
                      onClick={() => {
                        setEditIndex(null);
                        onOpen();
                      }}
                    >
                      Add Relation
                    </Button>
                  </Box>
                  <FormModel
                    footer={false}
                    isOpen={isOpen}
                    close={onClose}
                    title={editIndex !== null ? "Edit Relation" : "Add Relation"}
                  >
                    <Formik
                      initialValues={
                        editIndex !== null
                          ? values.relations[editIndex]
                          : {
                              name: "",
                              relation: "",
                              dob: "",
                              contactNo: "",
                              aadharNo: "",
                              occupation: "",
                              pf_nomination: "",
                              gratuity_nomination: "",
                              esic_nomination: "",
                              coveredEsic: "",
                              coveredMediclaim: "",
                              address: "",
                            }
                      }
                      validationSchema={validations}
                      onSubmit={(formValues, { setSubmitting }) => {
                        if (editIndex !== null) {
                          values.relations[editIndex] = formValues;
                        } else {
                          push(formValues);
                        }
                        onClose();
                        setSubmitting(false);
                      }}
                    >
                      {({ values, errors, handleChange, isSubmitting }) => (
                        <Form>
                          <Box mb={4} p={4}>
                            <Grid
                              gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
                              gap={4}
                            >
                              {[
                                "name",
                                "relation",
                                "dob",
                                "contactNo",
                                "aadharNo",
                                "occupation",
                                "pf_nomination",
                                "gratuity_nomination",
                                "esic_nomination",
                                "coveredEsic",
                                "coveredMediclaim",
                                "address",
                              ].map((field) => (
                                <CustomInput
                                  key={field}
                                  name={field}
                                  label={capitalize(field.replace("_", " "))}
                                  type="text"
                                  placeholder={capitalize(field.replace("_", " "))}
                                  value={values[field]}
                                  error={errors[field]}
                                  showError={showError}
                                  onChange={handleChange}
                                />
                              ))}
                            </Grid>
                            <Flex justifyContent="end" mt={6}>
                              <Button
                                colorScheme="teal"
                                variant="solid"
                                borderRadius="full"
                                p={4}
                                _hover={{ bg: "teal.600" }}
                                type="submit"
                                isLoading={isSubmitting}
                              >
                                Save
                              </Button>
                            </Flex>
                          </Box>
                        </Form>
                      )}
                    </Formik>
                  </FormModel>
                </>
              )}
            </FieldArray>
            <Flex justifyContent="flex-end" mt={8}>
              <CustomSubmitBtn
                loading={isSubmitting}
                onClick={() => setShowError(true)}
              />
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default FamilyDetails;
