import { Box, Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import CustomInput from "../../../../../../../config/component/CustomInput/CustomInput";
import DrawerFormHeightContainer from "../../../../../../../config/component/Drawer/DrawerFormHeightContainer";
import ShowFileUploadFile from "../../../../../../../config/component/common/ShowFileUploadFile/ShowFileUploadFile";
import { removeDataByIndex } from "../../../../../../../config/constant/function";
import { BookCategoryValidationSchema } from "../../utils/validation";

const BookCategoryForm = observer(
  ({
    initialValues,
    showError,
    setShowError,
    close,
    handleSubmit,
    isEdit,
  }: any) => {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={BookCategoryValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit({ values, setSubmitting, resetForm });
        }}
      >
        {({ handleChange, values, errors, isSubmitting, setFieldValue }) => {
          console.log(errors)
          return (
            <Form>
              <DrawerFormHeightContainer>
                <Flex>
                  {values?.coverImage?.file?.length === 0 ? (
                    <CustomInput
                      type="file-drag"
                      name="coverImage"
                      value={values.coverImage}
                      isMulti={true}
                      accept="image/*"
                      onChange={(e: any) => {
                        setFieldValue("coverImage", {
                          ...values.coverImage,
                          file: e.target.files[0],
                          isAdd: 1,
                        });
                      }}
                      showError={showError}
                      error={errors.coverImage}
                    />
                  ) : (
                    <Box mt={-5} width="100%">
                      <ShowFileUploadFile
                        files={values.coverImage?.file}
                        removeFile={(_: any) => {
                          setFieldValue("coverImage", {
                            ...values.coverImage,
                            file: removeDataByIndex(values.coverImage, 0),
                            isDeleted: 1,
                          });
                        }}
                        edit={isEdit}
                      />
                    </Box>
                  )}
                </Flex>
                <Grid gridTemplateColumns={"1fr"} gap={4}>
                  <CustomInput
                    name="title"
                    placeholder="Enter the Title"
                    label="Title"
                    required={true}
                    onChange={handleChange}
                    value={values.title}
                    error={errors.title}
                    showError={showError}
                  />
                  <GridItem>
                    <CustomInput
                      type="textarea"
                      name="description"
                      placeholder="Description"
                      label="Description"
                      onChange={handleChange}
                      value={values.description}
                      error={errors.description}
                      showError={showError}
                    />
                  </GridItem>
                </Grid>
              </DrawerFormHeightContainer>
              <Flex
                justifyContent="flex-end"
                p={2}
                columnGap={4}
                alignItems="center"
              >
                <Button variant="outline" onClick={close} colorScheme="gray">
                  Cancel
                </Button>
                <Button
                  isLoading={isSubmitting}
                  colorScheme="blue"
                  type="submit"
                  onClick={() => setShowError(true)}
                >
                  Submit
                </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    );
  }
);

export default BookCategoryForm;
