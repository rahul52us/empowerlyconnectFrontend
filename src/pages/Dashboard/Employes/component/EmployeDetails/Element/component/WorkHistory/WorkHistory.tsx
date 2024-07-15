import {
  Box,
  Grid,
  Heading,
  Step,
  StepDescription,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
} from "@chakra-ui/react";
import ShowData from "../../../component/ShowData";

const WorkHistory = ({ workHistory }: any) => {
  return (
    <Box p={5}>
      <Heading mb={4} size={"md"}>
        Employee Work History
      </Heading>
      <Stepper size="lg" index={0} orientation="vertical" colorScheme="teal">
        {workHistory?.map((history: any) => (
          <Step key={history?._id}>
            <StepIndicator alignItems={"center"} borderWidth={4}>
              <StepStatus
                complete={<StepNumber />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box
              ml={4}
              shadow={"md"}
              borderWidth={1}
              rounded={14}
              p={{ base: 2, md: 5 }}
            >
              <StepDescription>
                <Grid
                  templateColumns={{ md: "1fr 1fr" }}
                  gap={{ base: 2, md: 4 }}
                  columnGap={{ md: 12 }}
                >
                  <ShowData label="Department" value={history?.department} />
                  <ShowData
                    label="Work Location"
                    value={history?.workingLocation}
                  />
                  <ShowData label="Designation" value={history?.designation} />
                  <ShowData label="Description" value={history?.description} />
                  <ShowData
                    label="Date of Joining"
                    value={new Date(history?.doj).toLocaleDateString()}
                  />
                  <ShowData
                    label="Confirmation Date"
                    value={new Date(
                      history?.confirmationDate
                    ).toLocaleDateString()}
                  />
                </Grid>
              </StepDescription>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default WorkHistory;
