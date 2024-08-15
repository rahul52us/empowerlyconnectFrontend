import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// Define the schema for validation
const validationSchema = Yup.object({
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().required('End date is required'),
  startTime: Yup.string()
    .test('time-required', 'Start time is required', function (value) {
      const { fullDay } = this.parent;
      if (!fullDay && !value) {
        return false;
      }
      return true;
    })
    .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format')
    .notRequired(),
  endTime: Yup.string()
    .test('time-required', 'End time is required', function (value) {
      const { fullDay } = this.parent;
      if (!fullDay && !value) {
        return false;
      }
      return true;
    })
    .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format')
    .notRequired(),
  fullDay: Yup.boolean(),
  status: Yup.string().oneOf(['active', 'cancelled']).required('Status is required'),
});

// Define initial values
const initialValues = {
  user: '',
  company: '',
  seat: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  fullDay: false,
  status: 'active',
};

// Define the submit handler
const handleSubmit = (values: typeof initialValues, { setSubmitting }: FormikHelpers<typeof initialValues>) => {
  const { startDate, endDate, startTime, endTime, fullDay } = values;

  let startDateTime, endDateTime;

  if (fullDay) {
    startDateTime = new Date(startDate);
    endDateTime = new Date(endDate);
  } else {
    startDateTime = new Date(`${startDate}T${startTime}:00Z`);
    endDateTime = new Date(`${endDate}T${endTime}:00Z`);
  }

  const payload = {
    ...values,
    startDate: startDateTime.toISOString(),
    endDate: endDateTime.toISOString(),
    startTime: fullDay ? null : startDateTime.toISOString(),
    endTime: fullDay ? null : endDateTime.toISOString(),
  };

  console.log(payload);
  // Send the payload to your backend
  setSubmitting(false);
};

const ReserveSeatForm = () => {
  const formWidth = useBreakpointValue({ base: '100%', md: '60%', lg: '40%' });

  return (
    <Container maxW="container.lg" py={8}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched, isSubmitting }) => (
          <Form>
            <Box
              p={6}
              borderWidth={1}
              borderRadius="md"
              boxShadow="md"
              width={formWidth}
              mx="auto"
            >
              <Stack spacing={4}>
                <FormControl isInvalid={!!errors.startDate && touched.startDate}>
                  <FormLabel htmlFor="startDate">Start Date</FormLabel>
                  <Field as={Input} type="date" id="startDate" name="startDate" />
                  <ErrorMessage name="startDate" component={FormErrorMessage} />
                </FormControl>

                <FormControl isInvalid={!!errors.endDate && touched.endDate}>
                  <FormLabel htmlFor="endDate">End Date</FormLabel>
                  <Field as={Input} type="date" id="endDate" name="endDate" />
                  <ErrorMessage name="endDate" component={FormErrorMessage} />
                </FormControl>

                {!values.fullDay && (
                  <>
                    <FormControl isInvalid={!!errors.startTime && touched.startTime}>
                      <FormLabel htmlFor="startTime">Start Time</FormLabel>
                      <Field as={Input} type="time" id="startTime" name="startTime" />
                      <ErrorMessage name="startTime" component={FormErrorMessage} />
                    </FormControl>

                    <FormControl isInvalid={!!errors.endTime && touched.endTime}>
                      <FormLabel htmlFor="endTime">End Time</FormLabel>
                      <Field as={Input} type="time" id="endTime" name="endTime" />
                      <ErrorMessage name="endTime" component={FormErrorMessage} />
                    </FormControl>
                  </>
                )}

                <FormControl>
                  <Checkbox
                    id="fullDay"
                    name="fullDay"
                    isChecked={values.fullDay}
                    onChange={(e) => setFieldValue('fullDay', e.target.checked)}
                  >
                    Full Day
                  </Checkbox>
                </FormControl>

                <FormControl isInvalid={!!errors.status && touched.status}>
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <Field as={Select} id="status" name="status">
                    <option value="active">Active</option>
                    <option value="cancelled">Cancelled</option>
                  </Field>
                  <ErrorMessage name="status" component={FormErrorMessage} />
                </FormControl>

                <Button type="submit" colorScheme="blue" width="full" isLoading={isSubmitting}>
                  Submit
                </Button>
              </Stack>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ReserveSeatForm;
