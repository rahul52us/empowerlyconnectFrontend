import { Box, Button, Grid, IconButton, Text } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { FieldArray, Form, Formik } from "formik";
import CustomInput from "../../../../config/component/CustomInput/CustomInput";
import { timeOptions, weekOptions } from "./utils/constant";
import { workTimingSchema } from "./utils/validation";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import store from "../../../../store/store";
import { getStatusType } from "../../../../config/constant/statusCode";

const WorkTiming = observer(() => {
  const {
    company: { updateWorkTiming },
    auth: { openNotification },
  } = store;
  const [showError, setShowError] = useState(false);
  return (
    <Box p={4}>
      <Formik
        initialValues={{
          workTiming: [{ startTime: "", endTime: "", daysOfWeek: [] }],
        }}
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
                title: "Create Successfully",
                message: data?.message,
                type: "success",
              });
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
                <>
                  {values.workTiming.map((_: any, index: number) => (
                    <Grid
                      key={index}
                      justifyContent="space-between"
                      alignItems="center"
                      gridTemplateColumns={"1fr 0.05fr"}
                      columnGap={3}
                      rowGap={3}
                    >
                      <Grid gridTemplateColumns={"1fr 1fr 1fr"} columnGap={4}>
                        <CustomInput
                          type="select"
                          label="Start Time"
                          name={`workTiming.${index}.startTime`}
                          options={timeOptions}
                          onChange={(event) =>
                            setFieldValue(
                              `workTiming.${index}.startTime`,
                              event
                            )
                          }
                          error={
                            errors.workTiming &&
                            errors.workTiming[index]?.startTime
                          }
                          showError={showError}
                        />
                        <CustomInput
                          type="select"
                          label="End Time"
                          name={`workTiming.${index}.endTime`}
                          options={timeOptions}
                          onChange={(event) =>
                            setFieldValue(`workTiming.${index}.endTime`, event)
                          }
                          error={
                            errors.workTiming &&
                            errors.workTiming[index]?.endTime
                          }
                          showError={showError}
                        />
                        <CustomInput
                          isMulti
                          type="select"
                          label="Days of Week"
                          options={weekOptions}
                          name={`workTiming.${index}.daysOfWeek`}
                          onChange={(e) =>
                            setFieldValue(`workTiming.${index}.daysOfWeek`, e)
                          }
                          error={
                            errors.workTiming &&
                            errors.workTiming[index]?.daysOfWeek
                          }
                          showError={showError}
                        />
                      </Grid>
                      <Box>
                        <Text fontSize="sm" mb={2} color="transparent">
                          Remove
                        </Text>
                        <IconButton
                          aria-label="Remove timing"
                          icon={<MinusIcon />}
                          onClick={() => remove(index)}
                        />
                      </Box>
                    </Grid>
                  ))}
                  <Button
                    onClick={() =>
                      push({ startTime: "", endTime: "", daysOfWeek: [] })
                    }
                    leftIcon={<AddIcon />}
                    colorScheme="blue"
                  >
                    Add Timing
                  </Button>
                </>
              )}
            </FieldArray>
            <Button
              type="submit"
              colorScheme="blue"
              mt={4}
              isLoading={isSubmitting}
              onClick={() => setShowError(true)}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
});

export default WorkTiming;
