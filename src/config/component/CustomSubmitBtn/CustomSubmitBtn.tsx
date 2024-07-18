import { Button, Flex } from "@chakra-ui/react";

interface CustomBtnI {
  loading: boolean;
  onClick?: any;
  buttonText?:string;
  cancelFunctionality?: any;
  rest?:any;
  type?:string
}

const CustomSubmitBtn = ({
  loading,
  onClick,
  buttonText,
  cancelFunctionality,
  type,
  rest
}: CustomBtnI) => {
  return (
    <Flex mt={3} gap={4}>

      <Button
        type={type ? type : "submit"}
        isLoading={loading}
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
        colorScheme="blue"
        {...rest}
      >
        {buttonText ? buttonText : 'Submit'}
      </Button>
      {
        cancelFunctionality && cancelFunctionality.show &&
      <Button
        onClick={() => {
          if (cancelFunctionality.onClick) {
            cancelFunctionality.onClick();
          }
        }}
        {...cancelFunctionality.rest}
      >
        {cancelFunctionality.text ?  cancelFunctionality.text : 'Cancel'}
      </Button>}
    </Flex>
  );
};

export default CustomSubmitBtn;
