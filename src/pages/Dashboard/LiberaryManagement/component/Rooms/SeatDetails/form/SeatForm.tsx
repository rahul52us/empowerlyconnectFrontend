import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Text,
  Divider,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import store from "../../../../../../../store/store";
import { getStatusType } from "../../../../../../../config/constant/statusCode";
import CustomInput from "../../../../../../../config/component/CustomInput/CustomInput";

// Define TypeScript interfaces for form values
interface FormValues {
  generationType: string;
  startValue: string;
  seatCount: number;
  room: string;
  section: string;
}

interface Seat {
  seatNumber: string | number;
  room: string;
  section: string;
}

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  generationType: Yup.string().required("Generation type is required"),
  startValue: Yup.string().required("Start value is required"),
  seatCount: Yup.number()
    .required("Seat count is required")
    .min(1, "Must generate at least 1 seat"),
  room: Yup.string().required("Room is required"),
  section: Yup.string().required("Section is required"),
});

interface SeatFormProps {
  data: any;
}

const SeatForm: React.FC<SeatFormProps> = ({ data }) => {
  const {
    bookLiberary: { createRoomSeat },
    auth: { openNotification },
  } = store;
  const [showError, setShowError] = useState(false)
  const [seats, setSeats] = useState<Seat[]>([]);
  const [submitLoading, setSubmittingLoading] = useState(false);

  // Initialize initialValues with room and section from props
  const [initialValues, setInitialValues] = useState<FormValues>({
    generationType: "numeric",
    startValue: "",
    seatCount: 10,
    room: data.title || "",
    section: data.section || "",
  });

  useEffect(() => {
    setInitialValues((prevValues) => ({
      ...prevValues,
      room: data.title,
      section: data.section,
    }));
  }, [data.title, data.section]);

  const handleGenerateSeats = (values: FormValues) => {
    const { generationType, startValue, seatCount, room, section } = values;
    const generatedSeats: Seat[] = [];

    if (generationType === "numeric") {
      for (let i = 0; i < seatCount; i++) {
        generatedSeats.push({
          seatNumber: parseInt(startValue, 10) + i,
          room,
          section,
        });
      }
    } else if (generationType === "alphabetic") {
      const generateAlphabeticSequence = (
        start: string,
        count: number
      ): string[] => {
        const result: string[] = [];
        let current = start;

        for (let i = 0; i < count; i++) {
          result.push(current);
          current = incrementAlphabetic(current);
        }

        return result;
      };

      const incrementAlphabetic = (str: string): string => {
        let arr = str.split("");
        let i = arr.length - 1;

        while (i >= 0) {
          if (arr[i] === "Z") {
            arr[i] = "A";
            i--;
          } else {
            arr[i] = String.fromCharCode(arr[i].charCodeAt(0) + 1);
            break;
          }
        }

        if (i < 0) arr.unshift("A");

        return arr.join("");
      };

      const alphabeticSeats = generateAlphabeticSequence(startValue, seatCount);

      for (const seat of alphabeticSeats) {
        generatedSeats.push({
          seatNumber: seat,
          room,
          section,
        });
      }
    }

    setSeats(generatedSeats);
  };

  const handleCreateSeats = () => {
    setSubmittingLoading(true);
    createRoomSeat({
      room: data._id,
      seats: seats.map((seat: any) => ({ seatNumber: seat.seatNumber })),
    })
      .then((response) => {
        openNotification({
          title: "Successfully Created",
          message: response.message,
          type: "success",
        });
        setShowError(false)
      })
      .catch((error: any) => {
        openNotification({
          title: "Create Failed",
          message: error?.data?.message || "An error occurred",
          type: getStatusType(error.status),
        });
      })
      .finally(() => {
        setSubmittingLoading(false);
      });
  };

  return (
    <Box mt={2} p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values) => handleGenerateSeats(values)}
      >
        {({ values, errors , handleChange}: { values: FormValues, errors : any, handleChange:any }) => (
          <Form>
            <VStack spacing={6} align="stretch">
              <FormControl id="generationType">
                <FormLabel fontWeight="semibold">
                  Seat Generation Type
                </FormLabel>
                <Field
                  as={Select}
                  name="generationType"
                  variant="filled"
                  size="lg"
                >
                  <option value="numeric">Numeric</option>
                  <option value="alphabetic">Alphabetic</option>
                </Field>
                <ErrorMessage name="generationType" component="div" />
              </FormControl>

              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={6}
                align="center"
              >
                <CustomInput
                  type="text"
                  name="startValue"
                  value={values.startValue}
                  onChange={handleChange}
                  placeholder={
                    values.generationType === "numeric" ? "e.g. 1" : "e.g. A"
                  }
                  label={`Start
                    ${
                      values.generationType === "numeric" ? "Number" : "Letter"
                    }`}
                    error={errors.startValue}
                    showError={showError}
                />

                <FormControl id="seatCount" isRequired>
                  <FormLabel fontWeight="semibold">Number of Seats</FormLabel>
                  <Field
                    as={Input}
                    type="number"
                    name="seatCount"
                    placeholder="e.g. 10"
                    variant="filled"
                  />
                  <ErrorMessage name="seatCount" component="div" />
                </FormControl>
              </Stack>

              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={6}
                align="center"
              >
                <FormControl id="room" isRequired>
                  <FormLabel fontWeight="semibold">Room</FormLabel>
                  <Field
                    as={Input}
                    type="text"
                    name="room"
                    placeholder="e.g. Room A"
                    value={values.room}
                    readOnly
                    variant="filled"
                  />
                  <ErrorMessage name="room" component="div" />
                </FormControl>

                <FormControl id="section" isRequired>
                  <FormLabel fontWeight="semibold">Section</FormLabel>
                  <Field
                    as={Input}
                    type="text"
                    name="section"
                    placeholder="e.g. Section 1"
                    variant="filled"
                  />
                  <ErrorMessage name="section" component="div" />
                </FormControl>
              </Stack>

              <Button colorScheme="teal" size="lg" type="submit">
                Generate Seats
              </Button>

              {seats.length > 0 && (
                <>
                  <Divider my={6} />
                  <Text fontWeight="bold" fontSize="lg" textAlign="center">
                    Preview Generated Seats
                  </Text>
                  <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    spacing={{ base: 4, md: 6 }}
                  >
                    {seats.map((seat, index) => (
                      <Box
                        key={index}
                        p={4}
                        borderWidth={1}
                        borderRadius="md"
                        textAlign="center"
                        bg="white"
                        borderColor="gray.200"
                        boxShadow="md"
                        transition="transform 0.2s, box-shadow 0.2s"
                        _hover={{
                          transform: "scale(1.05)",
                          boxShadow: "lg",
                        }}
                      >
                        <Text fontSize="lg" fontWeight="bold" color="teal.600">
                          {seat.seatNumber}
                        </Text>
                        <Text fontSize="md" color="gray.600" mt={2}>
                          {seat.room}/{seat.section}
                        </Text>
                      </Box>
                    ))}
                  </SimpleGrid>

                  <Button
                    colorScheme="blue"
                    size="lg"
                    onClick={handleCreateSeats}
                    mt={6}
                    isLoading={submitLoading}
                  >
                    Create Seats
                  </Button>
                </>
              )}
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SeatForm;
