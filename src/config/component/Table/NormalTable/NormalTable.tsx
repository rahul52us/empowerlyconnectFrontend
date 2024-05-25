import { Box, Flex, Heading, Input, Spinner, Table, Tbody, Td, Th, Thead, Tr, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";

interface NormalTableProps {
  data: any[];
  title?: string;
  loading?: boolean;
}

const NormalTable: React.FC<NormalTableProps> = ({ data, title, loading }: any) => {
  const columnWidth = useBreakpointValue({ base: "100%", sm: "25%", md: "15%", lg: "12.5%" });
  const cellHeight = "40px";
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const headerColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("1px solid lightgray", "1px solid darkgray");

  // Extracting columns from the first object in the data array
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <Box border={borderColor} mt={5} overflowX="auto">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        borderBottom={borderColor}
        p={2}
        height={50}
        bg={headerColor} // Header color
      >
        <Heading fontSize="md" color={textColor}>
          {title ? title : 'Recent Users'}
        </Heading>
        <Box>
          <Input placeholder="Search" fontSize="sm" />
        </Box>
      </Flex>
      <Box p={3} height={{sm : "320px"}} overflowY="auto" maxWidth="100%">
        <Table variant="simple" width="100%" border={borderColor} size="sm">
          <Thead>
            <Tr bg={headerColor} height={cellHeight}>
              {columns.map((column, index) => (
                <Th key={index} width={columnWidth} color={textColor} border={borderColor} textAlign="center">
                  {column}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Tr>
                <Td colSpan={columns.length} textAlign="center">
                  <Spinner />
                </Td>
              </Tr>
            ) : (
              data.map((row: any, rowIndex: number) => (
                <Tr key={rowIndex} bg={rowIndex % 2 === 0 ? bgColor : "white"} height={cellHeight}>
                  {columns.map((column, colIndex) => (
                    <Td key={colIndex} width={columnWidth} color={textColor} border={borderColor} textAlign="center" minW={110}>
                      {row[column]}
                    </Td>
                  ))}
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p={2}
        height={cellHeight}
        borderTop={borderColor}
        bg={headerColor} // Footer color
      >
        <Heading fontSize="md" color={textColor}>Footer</Heading>
      </Flex>
    </Box>
  );
};

export default NormalTable;
