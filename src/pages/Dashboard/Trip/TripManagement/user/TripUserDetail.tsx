import { Box } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
// import TripUserChartContainer from "./component/TripUserChart/TripUserChartContainer"
import TripUserWidget from "./component/TripUserWidget/TripUserWidget"

const TripUserDetail = observer(({userId} : any) => {
  return (
    <Box>
      <TripUserWidget userId={userId}/>
      {/* <TripUserChartContainer userId={userId}/> */}
      </Box>
  )
})

export default TripUserDetail