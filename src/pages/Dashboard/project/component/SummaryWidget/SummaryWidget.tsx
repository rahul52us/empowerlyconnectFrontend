// SummaryWidget.tsx
import {
  Box,
  Flex,
  HStack,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

interface SummaryWidgetProps {
  label: string;
  value: number;
  icon: IconType;
  colorScheme: string;
  description: string;
  change?: number;
}

const SummaryWidget: React.FC<SummaryWidgetProps> = ({
  label,
  value,
  icon,
  colorScheme,
  description,
}) => {
  const bgColor = useColorModeValue("gray.50", "blackAlpha.300");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const itemShadow = useColorModeValue('md', 'dark-lg');


  return (
    <Box
      bg={bgColor}
      borderWidth={2}
      boxShadow={itemShadow}
      rounded={14}
      p={4}
      transition="all 0.3s"
    >
      <HStack spacing={6}>
        <Flex
          alignItems="center"
          justifyContent="center"
          bgGradient={`linear(to-r, ${colorScheme}.500, ${colorScheme}.400)`}
          borderRadius="full"
          boxSize="14"
          p={3}
          transition="all 0.3s"
          _hover={{
            bgGradient: `linear(to-r, ${colorScheme}.600, ${colorScheme}.500)`,
          }}
        >
          <Icon as={icon} boxSize={7} color="white" />
        </Flex>
        <Box>
          <Stat>
            <StatLabel fontSize="lg" fontWeight={700} color={textColor}>
              {label}
            </StatLabel>
            <StatNumber fontSize="3xl" fontWeight="bold" color={textColor}>
              {value}
            </StatNumber>
          </Stat>
          <Text fontSize={"sm"} color={"gray"} fontWeight={500} mt={1}>
            {description}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default SummaryWidget;
