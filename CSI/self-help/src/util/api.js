import { createAlova, invalidateCache } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import VueHook from 'alova/vue'
import { isDev, isLocalDev } from './utils'

const apiBaseURL = import.meta.env.VITE_BASE_URL

// create an alova instance with json parser on response object
const apiInstanceJson = createAlova({
  baseURL: apiBaseURL,

  // VueHook is used to create ref status, including request status loading, response data data, request error object error, etc.
  statesHook: VueHook,

  beforeRequest(method) {
    if (isLocalDev()) {
      method.config.headers['X-Forwarded-Host'] = 'tenant1' //'tst-sh.csi.it'
    }

    method.config.redirect = 'manual'
  },

  // request adapter, it is recommended to use the fetch request adapter
  requestAdapter: GlobalFetch(),

  // adapter GlobalFetch will return a Response instance
  // you can set a global response interception to return actual json data
  responded: (response) => {
    if (response.type === 'opaqueredirect' && !isDev()) {
      location.reload()
      return
    }

    if (response.status > 400) {
      throw new Error(`Request failed with status code ${response.status}`)
    }

    return response.json()
  }
})

export { apiInstanceJson }
