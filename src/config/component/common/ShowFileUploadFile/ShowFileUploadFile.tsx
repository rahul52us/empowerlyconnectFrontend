import {
  Box,
  Text,
  IconButton,
  Tooltip,
  Flex,
  Image,
  Button,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { MdDelete } from "react-icons/md";
import { FaFilePdf, FaFileImage } from "react-icons/fa";
import { useState } from "react";
import { readFileAsBase64 } from "../../../constant/function";
import FileViewer from "../../FilesViewer/FileViewer";
import CustomDrawer from "../../Drawer/CustomDrawer";

const ShowFileUploadFile = observer(({ files, removeFile, edit }: any) => {
  const [selectedFile, setSelectedFile] = useState<any>({
    type: null,
    file: null,
  });

  const setSelectedFileFun = async (item: any) => {
    if (edit) {
      if (item.url) {
        setSelectedFile({
          type: item.type,
          file: item.file || item.url,
        });
      } else {
        let file: any = await readFileAsBase64(item);
        if (file) {
          if (item.name.endsWith(".pdf")) {
            setSelectedFile({ type: "pdf", file: file });
          } else {
            setSelectedFile({ type: "image", file: file });
          }
          setSelectedFile({
            type: item.type,
            file: file,
          });
        }
      }
    } else {
      let file: any = await readFileAsBase64(item);
      if (file) {
        if (item.name.endsWith(".pdf")) {
          setSelectedFile({ type: "pdf", file: file });
        } else {
          setSelectedFile({ type: "image", file: file });
        }
      }
    }
  };

  const renderFileComponent = (type: string, url: any) => {
    if (type === "pdf" || type?.startsWith("application/pfd")) {
      return <FileViewer url={url} />;
    }
    if (type === "image" || type?.startsWith("image/")) {
      return <Image src={url} />;
    }
    return null;
  };

  const checkFilesType = () => {
    if (Array.isArray(files)) return files;
    return [files];
  };

  return (
    <>
      <Box mt={5}>
        {checkFilesType().map((item: any, index: number) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bg="gray.100"
            p={3}
            borderRadius="md"
            boxShadow="md"
            mt={2}
            transition="box-shadow 0.3s"
            _hover={{ boxShadow: "lg" }}
          >
            <Flex cursor="pointer" onClick={() => setSelectedFileFun(item)}>
              {item?.name &&
                (item.name.endsWith(".pdf") ? (
                  <FaFilePdf size={24} color="red" />
                ) : (
                  <FaFileImage size={24} color="blue" />
                ))}
              <Text
                fontSize="md"
                fontWeight="semibold"
                color="gray.800"
                ml={3}
                wordBreak={"break-word"}
              >
                {item?.name}
              </Text>
            </Flex>
            {removeFile && (
              <Tooltip label="Delete" hasArrow placement="top">
                <IconButton
                  icon={<MdDelete />}
                  colorScheme="red"
                  aria-label="Delete"
                  size="sm"
                  onClick={() => {
                    removeFile(item, index);
                    setSelectedFile({ type: null, file: null });
                  }}
                />
              </Tooltip>
            )}
          </Box>
        ))}
      </Box>
      <CustomDrawer
        open={selectedFile?.type ? true : false}
        close={() => setSelectedFile({ type: null, file: null })}
      >
        {selectedFile.file &&
          renderFileComponent(selectedFile.type, selectedFile.file)}
        <Flex justifyContent="end">
          <Box mt={5}>
            <Button
              color="white"
              bgColor="red"
              _hover={{ bgColor: "red", color: "black" }}
              onClick={() => setSelectedFile({ type: null, file: null })}
            >
              Close
            </Button>
          </Box>
        </Flex>
      </CustomDrawer>
    </>
  );
});

export default ShowFileUploadFile;