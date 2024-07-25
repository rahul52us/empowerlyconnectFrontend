import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import store from "../../../store/store"
import MyProfile from "./MyProfile/MyProfile"
// import SpinnerLoader from "../../../config/component/Loader/SpinnerLoader"

const ProfileIndex = observer(() => {
  const [loading,setLoading] = useState(false)
  const [userDetails,setUserDetails] = useState(null)
  const {User : {getUsersDetailsById}, auth : {user}} = store

  useEffect(() => {
    if(user){
      setLoading(true)
      getUsersDetailsById(user._id).then((data) => {
        setUserDetails(data)
      }).catch(() => {
      }).finally(() => {
        setLoading(false)
      })
    }
  },[getUsersDetailsById,user])

  console.log('the user details', userDetails,loading)

  // return (
  //   loading ?
  //   <SpinnerLoader /> :
  //   <div>ProfileIndex</div>
  // )
  return(
    <>
    {userDetails && user && (

      <MyProfile userDetails={userDetails} user={user}/>
    )}
    </>

  )
})

export default ProfileIndex