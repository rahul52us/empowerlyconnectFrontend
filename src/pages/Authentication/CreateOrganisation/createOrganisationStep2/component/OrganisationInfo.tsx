import { Grid } from "@chakra-ui/react";
import CustomInput from "../../../../../config/component/CustomInput/CustomInput";

const OrganisationInfo = ({ values, handleChange, errors, showError }: any) => {
  return (
    <Grid gap={2} gridTemplateColumns={{base : '1fr', md : '1fr 1fr'}}>
      <CustomInput
        type="text"
        name="facebookLink"
        label="Facebook Link"
        placeholder="Facebook Link"
        required={true}
        error={errors.facebookLink}
        onChange={handleChange}
        value={values.facebookLink}
        showError={showError}
      />
      <CustomInput
        type="text"
        name="instagramLink"
        label="Instagram Link"
        placeholder="Instagram Link"
        required={true}
        error={errors.instagramLink}
        onChange={handleChange}
        value={values.instagramLink}
        showError={showError}
      />
      <CustomInput
        type="text"
        name="twitterLink"
        label="Twitter Link"
        placeholder="Twitter Link"
        required={true}
        error={errors.twitterLink}
        onChange={handleChange}
        value={values.twitterLink}
        showError={showError}
      />
      <CustomInput
        type="text"
        name="githubLink"
        label="Github Link"
        placeholder="Github Link"
        required={true}
        error={errors.githubLink}
        onChange={handleChange}
        value={values.githubLink}
        showError={showError}
      />
      <CustomInput
        type="text"
        name="telegramLink"
        label="Telegram Link"
        placeholder="Telegram Link"
        required={true}
        error={errors.telegramLink}
        onChange={handleChange}
        value={values.telegramLink}
        showError={showError}
      />
      <CustomInput
        type="text"
        name="linkedInLink"
        label="LinkedIn Link"
        placeholder="LinkedIn Link"
        required={true}
        error={errors.linkedInLink}
        onChange={handleChange}
        value={values.linkedInLink}
        showError={showError}
      />
    </Grid>
  );
};

export default OrganisationInfo;
