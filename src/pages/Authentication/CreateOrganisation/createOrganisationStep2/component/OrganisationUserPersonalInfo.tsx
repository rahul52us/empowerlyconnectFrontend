import { Grid } from "@chakra-ui/react";
import CustomInput from "../../../../../config/component/CustomInput/CustomInput";

const OrganisationUserPersonalInfo = ({ values, handleChange, errors, showError, handleSearchChange, organisationError }: any) => {
  return (
    <Grid gridTemplateColumns={{ base: "1fr", md: "1fr" }} gap={2}>
                <CustomInput
                  type="text"
                  name="first_name"
                  label="First Name"
                  placeholder="Enter the First Name"
                  required={true}
                  error={errors.first_name}
                  onChange={handleChange}
                  value={values.first_name}
                  showError={showError}
                />
                <CustomInput
                  type="text"
                  name="last_name"
                  label="Last Name"
                  placeholder="Enter the Last Name"
                  required={true}
                  error={errors.last_name}
                  onChange={handleChange}
                  value={values.last_name}
                  showError={showError}
                />
                <CustomInput
                  type="text"
                  name="company_name"
                  label="Organisation Name"
                  placeholder="Enter the Organisation Name"
                  required={true}
                  error={errors.company_name || organisationError}
                  onChange={(e: any) => {
                    handleSearchChange(e);
                    handleChange(e);
                  }}
                  value={values.company_name}
                  showError={showError}
                />
                <CustomInput
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter the password"
                  error={errors.password}
                  onChange={handleChange}
                  value={values.password}
                  showError={showError}
                />
              </Grid>
  )
}

export default OrganisationUserPersonalInfo