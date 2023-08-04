import { Box, Spinner } from "@chakra-ui/react";
import { useState } from "react";

const FileViewer = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleFileLoad = () => {
    setIsLoading(false);
  };

  return (
    <Box h={"85vh"} position="relative">
      {isLoading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgColor="rgba(255, 255, 255, 0.8)"
        >
          <Spinner size="xl" color="blue.500" />
        </Box>
      )}
      <embed
        width="100%"
        height="100%"
        className="customScrollBar"
        src={"http://localhost:8080/notes/file-1690226408570-941033796.pdf"}
        type="application/pdf"
        onLoad={handleFileLoad}
      ></embed>
    </Box>
  );
};

export default FileViewer;
