import HomeService from '../_api/home.api'

const createCallMeBack = async ({ commit }, phone) => {
  commit('callMeBackStore/SET_LEAD_ID', null)

  const {
    data: { lead },
  } = await HomeService.createCorePhoneLead({ phone })

  commit('callMeBackStore/SET_LEAD_ID', lead.id)
}

const createCallMeNow = async ({ commit }, phone) => {
  try {
    await HomeService.createCallMeNow({ phone })

    commit('SET_CALL_ME_NOW_STATUS', 'success')
  } catch (error) {
    commit('SET_CALL_ME_NOW_STATUS', 'error')
  }
}

const setIsWorkTime = async ({ commit }) => {
  try {
    const { data: isWorkTime } = await HomeService.isWorkTime()
    commit('SET_IS_WORK_TIME', isWorkTime)
  } catch (e) {
    commit('SET_IS_WORK_TIME', false)
  }
}

export default {
  createCallMeBack,
  createCallMeNow,
  setIsWorkTime,
}
