const SET_CALL_ME_NOW_STATUS = (state, status) => {
  state.callMeNowStatus = status
}

const SET_IS_WORK_TIME = (state, isWorkTime) => {
  state.isWorkTime = isWorkTime
}

const SET_LOADING = (state, loadingStatus) => {
  state.loading = loadingStatus
}

export default {
  SET_CALL_ME_NOW_STATUS,
  SET_IS_WORK_TIME,
  SET_LOADING,
}
