import formUrlencoded from 'form-urlencoded'

import axios from 'axios'

const axiosFactory = (baseURL, params = {}) =>
  axios.create({
    baseURL,
    timeout: 30000,
    ...params,
  })

const coreAxios = axiosFactory('https://core.holaluz.com/api')
const sharerAxios = axiosFactory('https://sharer.holaluz.com')

export default {
  createCallMeNow(params) {
    return coreAxios.post(
      '/support/call-me-now',
      formUrlencoded(params, {
        ignorenull: true,
      })
    )
  },

  createCorePhoneLead: ({ phone }) => {
    return coreAxios.post(
      `/leads/phone/${phone}`,
      formUrlencoded({
        source: 'web',
        businessUnit: 'electricity',
        phone,
        tags: ['call-me-back'],
      })
    )
  },

  isWorkTime() {
    return sharerAxios.get('/is-work-time')
  },
}
