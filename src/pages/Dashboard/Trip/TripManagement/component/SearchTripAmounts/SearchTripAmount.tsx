import { observer } from "mobx-react-lite"
import FormModel from "../../../../../../config/component/common/FormModel/FormModel"
import store from "../../../../../../store/store"

const SearchTripAmount = observer(() => {
  const {tripStore : {searchModel, setOpenSearchTrip}} = store
  return (
    <FormModel open={searchModel.open} close={() => setOpenSearchTrip({open : false})}>SearchTripAmount</FormModel>
  )
})

export default SearchTripAmount