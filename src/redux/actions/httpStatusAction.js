import { CURRENT_HTTP_STATUS } from 'redux/types/httpStatusType'

export const currentHttpStatus = (payload) => ({ type: CURRENT_HTTP_STATUS, payload })