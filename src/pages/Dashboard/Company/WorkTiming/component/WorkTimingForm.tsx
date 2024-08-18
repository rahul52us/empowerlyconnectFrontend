import { Box, Button, Flex, Grid, IconButton, VStack, Heading, Divider } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { FieldArray, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import store from "../../../../../store/store";
import { getStatusType } from "../../../../../config/constant/statusCode";
import { getInitialWorkTimingValues } from "../utils/functions";
import { workTimingSchema } from "../utils/validation";
import CustomInput from "../../../../../config/component/CustomInput/CustomInput";
import SubmitFormBtn from "../../../../../config/component/Button/SubmitFormBtn";
import { timeOptions, weekOptions } from "../utils/constant";

const WorkTimingForm = observer(({ setFormData }: any) => {
  const {
    company: { updateWorkTiming, workTiming, getWorkTiming },
    auth: { openNotification },
  } = store;

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    getWorkTiming({})
      .then(() => {})
      .catch((err: any) => {
        openNotification({
          type: getStatusType(err.status),
          title: "Failed to get Timing",
          message: err?.data?.message,
        });
      });
  }, [getWorkTiming, openNotification]);

  return (
    <Box p={6} maxW="100%">
      <Heading size="lg" mb={6} textAlign="center" color="teal.500">
        Work Timing Form
      </Heading>
      <Divider mb={6} />
      <Formik
        initialValues={{
          workTiming: getInitialWorkTimingValues(workTiming.data),
        }}
        enableReinitialize={true}
        validationSchema={workTimingSchema}
        onSubmit={(values, { setSubmitting }) => {
          const formattedValues = values.workTiming.map((timing: any) => ({
            startTime: timing.startTime.value,
            endTime: timing.endTime.value,
            daysOfWeek: timing.daysOfWeek.map((day: any) => day.value),
          }));
          updateWorkTiming({ workTiming: formattedValues })
            .then((data: any) => {
              openNotification({
                title: "Updated Successfully",
                message: data?.message,
                type: "success",
              });
              if (setFormData) {
                setFormData({ open: false });
              }
              getWorkTiming({});
            })
            .catch((err: any) => {
              openNotification({
                title: "Create Failed",
                message: err?.data?.message,
                type: getStatusType(err.status),
              });
            })
            .finally(() => {
              setSubmitting(false);
              setShowError(false);
            });
        }}
      >
        {({ values, errors, setFieldValue, isSubmitting }: any) => (
          <Form>
            <FieldArray name="workTiming">
              {({ push, remove }) => (
                <VStack spacing={6} align="stretch">
                  {values.workTiming.map((item: any, index: number) => (
                    <Box key={index} p={4} boxShadow="md" borderRadius="md">
                      <Grid templateColumns="repeat(3, 1fr) auto" gap={4} alignItems="center">
                        <CustomInput
                          type="select"
                          label="Start Time"
                          name={`workTiming.${index}.startTime`}
                          options={timeOptions}
                          value={item.startTime}
                          onChange={(event) =>
                            setFieldValue(`workTiming.${index}.startTime`, event)
                          }
                          error={errors.workTiming && errors.workTiming[index]?.startTime}
                          showError={showError}
                        />
                        <CustomInput
                          type="select"
                          label="End Time"
                          name={`workTiming.${index}.endTime`}
                          options={timeOptions}
                          value={item.endTime}
                          onChange={(event) =>
                            setFieldValue(`workTiming.${index}.endTime`, event)
                          }
                          error={errors.workTiming && errors.workTiming[index]?.endTime}
                          showError={showError}
                        />
                        <CustomInput
                          isMulti
                          type="select"
                          label="Days of Week"
                          value={item.daysOfWeek}
                          options={weekOptions}
                          name={`workTiming.${index}.daysOfWeek`}
                          onChange={(e) =>
                            setFieldValue(`workTiming.${index}.daysOfWeek`, e)
                          }
                          error={errors.workTiming && errors.workTiming[index]?.daysOfWeek}
                          showError={showError}
                        />
                        <IconButton
                          aria-label="Remove timing"
                          icon={<MinusIcon />}
                          onClick={() => remove(index)}
                          colorScheme="red"
                          alignSelf="flex-start"
                          mt={9}
                        />
                      </Grid>
                    </Box>
                  ))}
                  <Button
                    onClick={() => push({ startTime: "", endTime: "", daysOfWeek: [] })}
                    leftIcon={<AddIcon />}
                    colorScheme="teal"
                    width="full"
                    variant="outline"
                  >
                    Add Timing
                  </Button>
                </VStack>
              )}
            </FieldArray>
            <Flex justifyContent="flex-end" mt={6}>
              <SubmitFormBtn
                loading={isSubmitting}
                onClick={() => setShowError(true)}
              />
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
});

export default WorkTimingForm;
