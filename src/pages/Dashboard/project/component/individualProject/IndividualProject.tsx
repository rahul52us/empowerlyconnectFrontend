import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import store from "../../../../../store/store"
import { getStatusType } from "../../../../../config/constant/statusCode"

const IndividualProject = observer(() => {
  const {Project : {getIndividualProject},auth : {openNotification, hasComponentAccess,user}} =  store
  const {projectId} = useParams()

  useEffect(() => {
    const query : any = {projectId}
    if(!hasComponentAccess()){
        query['userId'] = user._id
    }

    getIndividualProject(query).then(() => {
    }).catch((err : any) => {
        openNotification({
            title : 'Failed to Fetch',
            message : err?.data?.message,
            type : getStatusType(err?.data?.statusCode)
        })
    })
  },[getIndividualProject,openNotification,projectId,user,hasComponentAccess])

  return (
    <div>{projectId}</div>
  )
})

export default IndividualProject