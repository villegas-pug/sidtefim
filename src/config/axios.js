import axios from 'axios'

import { ENDPOINT_BASE } from 'constants/endpointBase'

export const api = axios.create({
   baseURL: ENDPOINT_BASE,
   headers: {
      'Content-Type': 'application/json',
   },
   timeout: 10000
})