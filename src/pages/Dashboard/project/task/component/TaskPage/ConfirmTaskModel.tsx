import { observer } from "mobx-react-lite";
import SubmitFormBtn from "../../../../../../config/component/Button/SubmitFormBtn";
import { Text, useColorModeValue, VStack } from "@chakra-ui/react";
import FormModel from "../../../../../../config/component/common/FormModel/FormModel";

const ConfirmTaskModel = observer(
  ({ openConfirmModel, setOpenConfirmModel }: any) => {
    const handleSubmit = () => {
      if (openConfirmModel.data) {
        //   updateTaskStatus(
        //     openConfirmModel.data._id,
        //     openConfirmModel.destinationColumn
        //   );
        setOpenConfirmModel({
          data: null,
          open: false,
          sourceColumn: "",
          destinationColumn: "",
        });
      }
    };

    return (
      <FormModel
        title="Confirm Status Change"
        isCentered
        open={openConfirmModel.open}
        close={() =>
          setOpenConfirmModel({
            data: null,
            open: false,
            sourceColumn: "",
            destinationColumn: "",
          })
        }
      >
        <VStack
          spacing={4}
          align="stretch"
          p={4}
          bg={useColorModeValue("white", "gray.700")}
          borderRadius="md"
        >
          <Text
            fontSize="lg"
            fontWeight="semibold"
            textAlign="center"
            color={useColorModeValue("black", "white")}
          >
            Are you sure you want to move task
            <Text
              as="span"
              fontWeight="bold"
              color={useColorModeValue("blue.500", "blue.300")}
            >
              {` "${openConfirmModel.data?.title}"`}
            </Text>{" "}
            from
            <Text
              as="span"
              fontWeight="bold"
              color={useColorModeValue("blue.500", "blue.300")}
            >
              {` "${openConfirmModel.sourceColumn}"`}
            </Text>{" "}
            to
            <Text
              as="span"
              fontWeight="bold"
              color={useColorModeValue("blue.500", "blue.300")}
            >
              {` "${openConfirmModel.destinationColumn}"`}
            </Text>
            ?
          </Text>
          <SubmitFormBtn
            loading={false}
            onClick={() => handleSubmit()}
            buttonText="Confirm"
            cancelFunctionality={{
              show: true,
              onClick: () =>
                setOpenConfirmModel({
                  data: null,
                  open: false,
                  sourceColumn: "",
                  destinationColumn: "",
                }),
            }}
          />
        </VStack>
      </FormModel>
    );
  }
);

export default ConfirmTaskModel;
