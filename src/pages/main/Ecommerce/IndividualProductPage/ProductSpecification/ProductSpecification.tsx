import { Box, Text, Grid, GridItem, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

const ProductSpecification = ({ productSpecifications }: any) => {
  const midIndex = Math.ceil(productSpecifications?.length / 2);
  const leftColumn = productSpecifications?.slice(0, midIndex);
  const rightColumn = productSpecifications?.slice(midIndex);

  return (
    <Box p={6} borderWidth={1} shadow={'base'}  rounded={12} w={'100%'}>
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Specifications
      </Text>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <VStack align="start" spacing={4}>
            {leftColumn?.map((spec: any, index: number) => (
              <Box key={index}>
                <Text fontWeight="semibold">{spec?.label}</Text>
                <Text color={"gray"} whiteSpace="pre-wrap">
                  {spec?.value}
                </Text>
              </Box>
            ))}
          </VStack>
        </GridItem>

        <GridItem>
          <VStack align="start" spacing={4}>
            {rightColumn?.map((spec: any, index: number) => (
              <Box key={index}>
                <Text fontWeight="semibold">{spec?.label}</Text>
                <Text color={"gray"} whiteSpace="pre-wrap">
                  {spec?.value}
                </Text>
              </Box>
            ))}
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default observer(ProductSpecification);
