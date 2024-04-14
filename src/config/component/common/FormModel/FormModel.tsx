import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  useColorMode,
  Flex,
  Text,
  ModalOverlay, // Import ModalOverlay component
} from "@chakra-ui/react";

function FormModel({ open, close, isCentered, title, children }: any) {
  const { colorMode } = useColorMode();

  const headerBgColor = colorMode === "dark" ? "blue.900" : "blue.500";
  const headerTextColor = colorMode === "dark" ? "white" : "white";

  return (
    <>
      <Modal isCentered={isCentered} size={"2xl"} isOpen={open} onClose={close}>
        <ModalOverlay style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }} />{" "}
        {/* Increase opacity */}
        <ModalContent>
          {title && (
            <Flex
              justify="space-between"
              align="center"
              p={4}
              bg={headerBgColor}
              color={headerTextColor}
            >
              <Text fontSize="xl">{title}</Text>
              <ModalCloseButton
                color={headerTextColor}
                bg="transparent"
                _hover={{ bg: "transparent" }}
                size="lg"
                mt={1}
              />
            </Flex>
          )}
          <ModalBody p={-5}>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FormModel;
