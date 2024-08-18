import { Button } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"

const Qualification = observer(({setSelectedTab} : any) => {
  return (
    <div>Qualification
                <Button onClick={() => setSelectedTab({open : true, type : "qualification-details"})}>Edit</Button>

    </div>
  )
})

export default Qualification