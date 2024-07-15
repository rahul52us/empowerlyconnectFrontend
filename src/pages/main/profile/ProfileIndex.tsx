import { observer } from "mobx-react-lite"
import store from "../../../store/store"
import { useEffect, useState } from "react"
import SpinnerLoader from "../../../config/component/Loader/SpinnerLoader"

const ProfileIndex = observer(() => {
  const [loading,setLoading] = useState(false)
  const [userDetails,setUserDetails] = useState(null)
  const {Employe : {getEmployesDetailsById}, auth : {user}} = store

  useEffect(() => {
    if(user){
      setLoading(true)
      getEmployesDetailsById(user._id).then((data) => {
        setUserDetails(data)
      }).catch(() => {
      }).finally(() => {
        setLoading(false)
      })
    }
  },[getEmployesDetailsById,user])

  console.log('the user details', userDetails)

  return (
    loading ?
    <SpinnerLoader /> :
    <div>ProfileIndex</div>
  )
})

export default ProfileIndex