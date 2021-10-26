import { httpStatus } from 'constants/httpStatus'
import { CURRENT_HTTP_STATUS } from 'redux/types/httpStatusType'

const initialState = {
   status: httpStatus.OK
}

export default function httpStatusReducer(state = initialState, { type, payload }){
   switch (type) {
   case CURRENT_HTTP_STATUS:
      return { status: payload }
   default:
      return state
   }
}