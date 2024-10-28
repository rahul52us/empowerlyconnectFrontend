import React, { useState } from "react";
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import ColorPickerComponent from "../../../../config/component/ColorPicker/ColorPickerComponent";

interface ColorSettings {
  heading: { light: string; dark: string };
  subheading: { light: string; dark: string };
  button: { light: string; dark: string };
  buttonHover: { light: string; dark: string };
  icon: { light: string; dark: string };
}

const ColorSettingsForm: React.FC = () => {
  const [colors, setColors] = useState<ColorSettings>({
    heading: { light: "#000000", dark: "#FFFFFF" },
    subheading: { light: "#333333", dark: "#DDDDDD" },
    button: { light: "#FF5733", dark: "#FF8D6E" },
    buttonHover: { light: "#FF8D6E", dark: "#FF5733" },
    icon: { light: "#1A202C", dark: "#FFFFFF" },
  });

  const handleColorChange = (field: keyof ColorSettings) => (color: { light: string; dark: string }) => {
    setColors((prevColors) => ({ ...prevColors, [field]: color }));
  };

  const handleSave = () => {
    console.log("Saved Colors:", colors);
    // Implement logic to persist colors (API call, context update, etc.)
  };

  return (
    <Box p={4} bg="gray.50" borderRadius="md" boxShadow="md">
      <Text fontSize="xl" mb={4}>
        Color Settings
      </Text>
      <VStack spacing={4} align="start">
        <ColorPickerComponent
          label="Heading Color"
          color={colors.heading}
          onChangeComplete={handleColorChange("heading")}
        />
        <ColorPickerComponent
          label="Subheading Color"
          color={colors.subheading}
          onChangeComplete={handleColorChange("subheading")}
        />
        <ColorPickerComponent
          label="Button Color"
          color={colors.button}
          onChangeComplete={handleColorChange("button")}
        />
        <ColorPickerComponent
          label="Button Hover Color"
          color={colors.buttonHover}
          onChangeComplete={handleColorChange("buttonHover")}
        />
        <ColorPickerComponent
          label="Icon Color"
          color={colors.icon}
          onChangeComplete={handleColorChange("icon")}
        />
      </VStack>
      <Button colorScheme="blue" mt={4} onClick={handleSave}>
        Save Colors
      </Button>
    </Box>
  );
};

export default ColorSettingsForm;
