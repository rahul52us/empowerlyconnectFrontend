import { Button } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { web } from "../../../config/constant/routes";

const WebsiteCustomisationIndex = observer(() => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(web.websiteCustomisation.create)}>
      CREATE DOMAIN
    </Button>
  );
});

export default WebsiteCustomisationIndex;
