import { Flex, Avatar, Text, Badge, Tooltip, IconButton, useColorModeValue } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useClipboard } from "@chakra-ui/react";

const TeamMember = ({ member }: { member: any }) => {
  const { onCopy } = useClipboard(member?.user?.username || "");

  // Use color mode values for theme adaptability
  const cardBgColor = useColorModeValue("gray.50", "gray.700");
  const cardHoverBgColor = useColorModeValue("gray.100", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Flex
      alignItems="center"
      bg={cardBgColor}
      p={3}
      borderRadius="md"
      boxShadow="sm"
      w="full"
      _hover={{ boxShadow: "md", bg: cardHoverBgColor }}
    >
      <Avatar size="sm" src={member?.user?.pic?.url} name={member.user?.username} />
      <Flex ml={3} direction="column" flex="1">
        <Text fontWeight="medium" color={textColor} isTruncated>
          {member?.user?.name}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {member?.user?.code}
        </Text>
      </Flex>
      <Tooltip label="Copy Username" aria-label="Copy Username">
        <IconButton
          icon={<CopyIcon />}
          size="sm"
          variant="ghost"
          aria-label="Copy Username"
          onClick={onCopy}
          ml={2}
        />
      </Tooltip>
      <Badge ml={2} colorScheme={member?.isActive ? "green" : "red"}>
        {member.isActive ? "Active" : "Inactive"}
      </Badge>
    </Flex>
  );
};

export default TeamMember;
