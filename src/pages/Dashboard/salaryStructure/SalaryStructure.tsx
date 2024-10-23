import React from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Text, Divider, useColorModeValue, Icon
} from '@chakra-ui/react';
import { FaRupeeSign, FaCalendarAlt } from 'react-icons/fa';
import SalaryStructureForm from './component/SalaryStructureForm';

interface SalaryData {
  head: string;
  monthlyValue: number;
  yearlyValue: number;
  frequency: string;
}

const salaryStructure = [
  { head: "Basic", monthlyValue: 22788.83, yearlyValue: 273466.00, frequency: "Monthly" },
  { head: "H.R.A.", monthlyValue: 11394.42, yearlyValue: 136733.00, frequency: "Monthly" },
  { head: "Other Allowance", monthlyValue: 9794.42, yearlyValue: 117533.00, frequency: "Monthly" },
  { head: "Conveyance", monthlyValue: 1600.00, yearlyValue: 19200.00, frequency: "Monthly" },
];

const benefits = [
  { head: "Medical Insurance", monthlyValue: 583.33, yearlyValue: 7000.00, frequency: "Monthly" },
  { head: "Incentive Pay", monthlyValue: 5129.00, yearlyValue: 61548.00, frequency: "Monthly" },
];

const SalaryStructureView: React.FC = () => {
  // Define dynamic color schemes for light and dark modes
  const tableHeaderBg = useColorModeValue('orange.400', 'orange.600');
  const tableHeaderText = useColorModeValue('white', 'gray.100');
  const tableBgHover = useColorModeValue('orange.100', 'orange.700');
  const benefitTableHeaderBg = useColorModeValue('teal.400', 'teal.600');
  const benefitTableBgHover = useColorModeValue('teal.100', 'teal.700');
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('blue.600', 'blue.300');
  const inHandColor = useColorModeValue('green.600', 'green.400');

  return (
    <>
    <Box p={8} border="1px solid #e2e8f0" borderRadius="md" boxShadow="lg" maxWidth="850px" mx="auto" bg={useColorModeValue("white", "gray.800")}>
      {/* Header */}
      <Text fontSize="3xl" fontWeight="bold" mb={2} textAlign="center" color={useColorModeValue('gray.700', 'gray.100')}>
        <Icon as={FaRupeeSign} mr={2}/> Salary Structure
      </Text>
      <Text fontSize="lg" mb={5} textAlign="center">
        Effective From: <Text as="span" color={textColor} fontWeight="bold">June 2024</Text> &nbsp;
        Disbursement From: <Text as="span" color={textColor} fontWeight="bold">June 2024</Text>
      </Text>
      <Divider mb={4} />

      {/* Salary Structure Table */}
      <Table variant="striped" colorScheme="orange" border="1px solid #e2e8f0">
        <Thead bg={tableHeaderBg}>
          <Tr>
            <Th color={tableHeaderText}>Heads</Th>
            <Th color={tableHeaderText}>Monthly Value</Th>
            <Th color={tableHeaderText}>Yearly Value</Th>
            <Th color={tableHeaderText}>Frequency</Th>
          </Tr>
        </Thead>
        <Tbody>
          {salaryStructure.map((item: SalaryData, index) => (
            <Tr key={index} _hover={{ bg: tableBgHover }}>
              <Td>{item.head}</Td>
              <Td>{item.monthlyValue.toFixed(2)}</Td>
              <Td>{item.yearlyValue.toFixed(2)}</Td>
              <Td>{item.frequency}</Td>
            </Tr>
          ))}
          <Tr fontWeight="bold" bg={useColorModeValue('gray.100', 'gray.600')}>
            <Td>GROSS</Td>
            <Td>45,577.67</Td>
            <Td>546,932.00</Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table>

      {/* Benefits Table */}
      <Table variant="striped" colorScheme="teal" border="1px solid #e2e8f0" mt={8}>
        <Thead bg={benefitTableHeaderBg}>
          <Tr>
            <Th color={tableHeaderText}>Heads</Th>
            <Th color={tableHeaderText}>Monthly Value</Th>
            <Th color={tableHeaderText}>Yearly Value</Th>
            <Th color={tableHeaderText}>Frequency</Th>
          </Tr>
        </Thead>
        <Tbody>
          {benefits.map((item: SalaryData, index) => (
            <Tr key={index} _hover={{ bg: benefitTableBgHover }}>
              <Td>{item.head}</Td>
              <Td>{item.monthlyValue.toFixed(2)}</Td>
              <Td>{item.yearlyValue.toFixed(2)}</Td>
              <Td>{item.frequency}</Td>
            </Tr>
          ))}
          <Tr fontWeight="bold" bg={useColorModeValue('gray.100', 'gray.600')}>
            <Td>CTC</Td>
            <Td>51,290.00</Td>
            <Td>615,480.00</Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table>

      {/* Remarks Section */}
      <Box mt={6} p={6} bg={cardBg} borderRadius="md" boxShadow="inner">
        <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.300')}>Note: Excluding TDS</Text>
        <Text fontWeight="bold" fontSize="xl" mt={2}>
          In Hand Salary: <Text as="span" color={inHandColor}>₹45,577.67</Text>
        </Text>
        <Text fontSize="md" mt={2}>
          <Icon as={FaCalendarAlt} mr={1}/> Remark: <Text as="span" color={textColor}>Increment - June 2024</Text>
        </Text>
      </Box>
    </Box>
    <SalaryStructureForm />
    </>
  );
};

export default SalaryStructureView;
