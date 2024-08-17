import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import CustomInput from "../../../../../../../config/component/CustomInput/CustomInput";
import DrawerFormHeightContainer from "../../../../../../../config/component/Drawer/DrawerFormHeightContainer";
import ShowFileUploadFile from "../../../../../../../config/component/common/ShowFileUploadFile/ShowFileUploadFile";
import { removeDataByIndex } from "../../../../../../../config/constant/function";
import { BookValidationSchema } from "../../utils/validation";
import { languages } from "../../utils/constant";
import CustomSubmitBtn from "../../../../../../../config/component/CustomSubmitBtn/CustomSubmitBtn";

const BookForm = observer(
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
        validationSchema={BookValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit({ values, setSubmitting, resetForm });
        }}
      >
        {({ handleChange, values, errors, isSubmitting, setFieldValue }) => {
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
                <Grid
                  gridTemplateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                  }}
                  gap={4}
                >
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
                  <CustomInput
                    name="author"
                    placeholder="Author"
                    label="Author"
                    onChange={handleChange}
                    value={values.author}
                    error={errors.author}
                    showError={showError}
                  />
                  <CustomInput
                    name="categories"
                    placeholder="Category"
                    label="Category"
                    type="select"
                    options={[]}
                    onChange={(e) => setFieldValue("categories", e)}
                    value={values.categories}
                    isMulti={true}
                    error={errors.categories}
                    showError={showError}
                  />
                  <CustomInput
                    name="publisher"
                    placeholder="Publisher"
                    label="Publisher"
                    onChange={handleChange}
                    value={values.publisher}
                    error={errors.publisher}
                    showError={showError}
                  />
                  <CustomInput
                    name="isbn"
                    placeholder="Isbn"
                    label="ISBN"
                    onChange={handleChange}
                    value={values.isbn}
                    error={errors.isbn}
                    showError={showError}
                  />
                  <CustomInput
                    name="publishedDate"
                    placeholder="Published Date"
                    label="Published Date"
                    type="date"
                    onChange={(e) => setFieldValue("publishedDate", e)}
                    value={values.publishedDate || undefined}
                    error={errors.publishedDate}
                    showError={showError}
                  />
                  <CustomInput
                    type="number"
                    name="numberOfPages"
                    placeholder="Enter the number of pages"
                    label="Number Of Pages"
                    onChange={handleChange}
                    value={values.numberOfPages}
                    error={errors.numberOfPages}
                    showError={showError}
                  />
                  <CustomInput
                    name="availableCopies"
                    placeholder="Available Copies"
                    label="Available Copies"
                    onChange={handleChange}
                    value={values.availableCopies}
                    error={errors.availableCopies}
                    showError={showError}
                  />
                  <CustomInput
                    name="totalCopies"
                    placeholder="Total Number Of Copies"
                    label="Total Number Of Copies"
                    onChange={handleChange}
                    value={values.totalCopies}
                    error={errors.totalCopies}
                    showError={showError}
                  />
                  <CustomInput
                    name="language"
                    placeholder="Language"
                    label="Language"
                    type="select"
                    options={languages}
                    onChange={(e) => setFieldValue("language", e)}
                    value={values.language}
                    isMulti={true}
                    error={errors.language}
                    showError={showError}
                  />
                  <CustomInput
                    name="edition"
                    placeholder="Edition"
                    label="Edition"
                    onChange={handleChange}
                    value={values.edition}
                    error={errors.edition}
                    showError={showError}
                  />
                  <CustomInput
                    name="ratings"
                    placeholder="Ratings"
                    label="Ratings"
                    type="number"
                    onChange={handleChange}
                    value={values.ratings}
                    error={errors.ratings}
                    showError={showError}
                  />
                  <CustomInput
                    type="tags"
                    name="tags"
                    placeholder="Tags"
                    label="Tags"
                    onChange={(e) => setFieldValue("tags", e)}
                    value={values.tags}
                    error={errors.tags}
                    showError={showError}
                  />
                  <GridItem colSpan={{ base: 1, md: 3 }}>
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
              <CustomSubmitBtn
                onClick={() => setShowError(true)}
                buttonText="Submit"
                loading={isSubmitting}
                cancelFunctionality={{
                  show: true,
                  text: "Cancel",
                  onClick: close
                }}
              />
            </Form>
          );
        }}
      </Formik>
    );
  }
);

export default BookForm;
