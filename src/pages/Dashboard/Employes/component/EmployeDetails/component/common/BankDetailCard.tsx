import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import React from "react";

interface BankDetailsCardProps {
  bankDetails: {
    _id: string;
    accountNo: string;
    name: string;
    branch: string;
    ifsc: string;
  }[];
  cardBgColor?: string;
  borderColor?: string;
  shadow?: string;
}

const BankDetailsCard: React.FC<BankDetailsCardProps> = ({ bankDetails }) => {
  return (
    <Box>
      <Box pb={2}>
        <Heading size="md" color={"blue.600"}>
          Bank Details
        </Heading>
      </Box>
      <Box pt={2}>
        {bankDetails?.map((bank) => (
          <Grid key={bank?._id} gap={6} templateColumns={"1fr 1fr"}>
            <Box>
              <Text fontWeight="bold">Account Number:</Text>
              <Text>{bank?.accountNo}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Bank Name:</Text>
              <Text>{bank.name}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Branch:</Text>
              <Text>{bank.branch}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">IFSC Code:</Text>
              <Text>{bank.ifsc}</Text>
            </Box>
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default BankDetailsCard;
