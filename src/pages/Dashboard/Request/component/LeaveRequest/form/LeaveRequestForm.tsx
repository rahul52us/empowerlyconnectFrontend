import { Box, Divider, Flex, Grid } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import CustomInput from "../../../../../../config/component/CustomInput/CustomInput";
import store from "../../../../../../store/store";
import { useEffect, useState } from "react";
import CustomSubmitBtn from "../../../../../../config/component/CustomSubmitBtn/CustomSubmitBtn";
import { LeaveRequestValidation } from "../utils/validation";
import { LeaveRequestI } from "../utils/interface";

const LeaveRequestForm = observer(
  ({ initialValues, showError, setShowError, close, handleSubmit }: any) => {
    const [numberOfDays, setNumberOfDays] = useState<number | null>(null);

    const {
      auth: { user, openNotification },
      Employe: { getAllEmployes, employes },
    } = store;

    useEffect(() => {
      getAllEmployes({ page: 1, limit: 15 })
        .then(() => {})
        .catch((err: any) => {
          openNotification({
            type: "error",
            title: "Failed to get users",
            message: err?.message,
          });
        });
    }, [getAllEmployes, openNotification]);

    const employesOptions = employes.data.map((item: any) => ({
      value: item.userData?._id,
      label: item.userData?.username,
    }));

    const WorkLocations =
      user?.companyDetail?.company?.policy?.workLocations?.map(
        (option: any) => ({
          label: option.locationName,
          value: option._id,
        })
      );

    // const calculateNumberOfDays = (startDate: string, endDate: string) => {
    //   const start = new Date(startDate);
    //   const end = new Date(endDate);
    //   const differenceInTime = end.getTime() - start.getTime();
    //   const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    //   setNumberOfDays(Math.floor(differenceInDays)  );
    // };

    const calculateNumberOfDays = (startDate: string, endDate: string) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      // Adding 1 to the difference in days to consider the start date as day 1
      const differenceInTime = end.getTime() - start.getTime() + (24 * 60 * 60 * 1000);
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      setNumberOfDays(Math.floor(differenceInDays));
  };



    return (
      <Box p={4}>
        <Formik<LeaveRequestI>
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmit({ values, setSubmitting, resetForm });
          }}
          validationSchema={LeaveRequestValidation}
        >
          {({ handleChange, values, errors, isSubmitting, setFieldValue }) => {
            return (
              <Form>
                <Grid
                  gap={2}
                  gridTemplateColumns={{ sm: "1fr", md: "1fr 1fr" }}
                  flexDirection={"column"}
                >
                  <CustomInput
                    name="workingLocation"
                    type="select"
                    placeholder="Select The Work Location"
                    label="Work Location"
                    value={values.workingLocation}
                    error={errors.workingLocation}
                    onChange={(e) => {
                      setFieldValue("workingLocation", e);
                    }}
                    options={WorkLocations}
                    showError={showError}
                    required={true}
                    isMulti={true}
                  />
                  <CustomInput
                    name="managers"
                    type="select"
                    placeholder="Select The managers"
                    label="Managers"
                    value={values.managers}
                    error={errors.managers}
                    isMulti={true}
                    onChange={(e) => {
                      setFieldValue("managers", e);
                    }}
                    options={employesOptions}
                    showError={showError}
                    required={true}
                  />
                  <CustomInput
                    type="date"
                    name="startDate"
                    placeholder="Select the Start Date"
                    label="Start Date"
                    required={true}
                    onChange={(e) => {
                      setFieldValue("startDate", e);
                      if (values.endDate) {
                        calculateNumberOfDays(e, values.endDate);
                      }
                    }}
                    value={values.startDate}
                    error={errors.startDate}
                    showError={showError}
                  />
                  <CustomInput
                    type="date"
                    name="endDate"
                    placeholder="Select the End Date"
                    label="End Date"
                    // minDate={values.startDate}
                    required={true}
                    onChange={(e) => {
                      setFieldValue("endDate", e);
                      if (values.startDate) {
                        calculateNumberOfDays(values.startDate,e);
                      }
                    }}
                    value={values.endDate}
                    error={errors.endDate}
                    showError={showError}
                  />
                </Grid>
                <CustomInput name="noOfDays" disabled={true} readOnly label="No of Days" value={numberOfDays || 0} type="number" onChange={() => {}}/>
                <CustomInput
                  type="textarea"
                  name="reason"
                  placeholder="Reason"
                  label="Reason"
                  required={true}
                  onChange={handleChange}
                  value={values.reason}
                  error={errors.reason}
                  showError={showError}
                />
                <Divider />
                <Flex
                  justifyContent="flex-end"
                  p={4}
                  columnGap={3}
                  alignItems="center"
                >
                  <CustomSubmitBtn
                    cancelFunctionality={{ show: true, onClick: () => close() }}
                    loading={isSubmitting}
                    type="submit"
                    onClick={() => setShowError(true)}
                  />
                </Flex>
              </Form>
            );
          }}
        </Formik>
      </Box>
    );
  }
);

export default LeaveRequestForm;
