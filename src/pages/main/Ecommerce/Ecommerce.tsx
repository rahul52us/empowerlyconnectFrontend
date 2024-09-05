import { Box } from '@chakra-ui/react'
import EcomHomePage from './Ecom_Home/EcomHomePage'
import { observer } from 'mobx-react-lite'

const Ecommerce = () => {
  return (
    <Box>
        
        <EcomHomePage/>
      
    </Box>
  )
}

export default observer(Ecommerce)
