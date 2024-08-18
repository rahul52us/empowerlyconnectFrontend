import { observer } from "mobx-react-lite"

const EditTask = observer(({projectId} : any) => {
  return (
    <div>{projectId}</div>
  )
})

export default EditTask