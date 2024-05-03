import { Box, Image } from "@chakra-ui/react"
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { dashboard } from "../../../../constant/routes";

const SidebarLogo = observer(() => {
  const navigate = useNavigate()
  return (
    <Box bgGradient='linear-gradient(to right, #ff9d01, #ffaa01)' p={2} mb={3} cursor="pointer">
        <Image src="https://themefisher.com/images/logo/logo.svg" alt="" mb={3} onClick={() => navigate(dashboard.home)}/>
    </Box>
  )
})

export default SidebarLogo;