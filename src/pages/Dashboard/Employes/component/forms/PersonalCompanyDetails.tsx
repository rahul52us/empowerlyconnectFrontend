import { Box, Divider, Grid, Heading } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

const PersonalCompanyDetails = observer(({ type }: any) => {
  console.log(type);
  return (
    <div>
      <Box p={4} borderRadius="lg" boxShadow="md">
        <Grid>
          <Heading color="#002058" fontSize="xl" mb={4}>
            Company Details :-
          </Heading>
          <Divider />
        </Grid>
      </Box>
    </div>
  );
});

export default PersonalCompanyDetails;
