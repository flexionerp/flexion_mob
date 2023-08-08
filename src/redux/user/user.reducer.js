import ActionsType from "./../utils/actions.type"
const INITIAL_STATE = {
  userDetail: null,
  token: null,
  orgID: null,
  isCustomer: false,

  error: {},
  response: {}
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {



    case ActionsType.SET_IS_CUSTOMER:
      return {
        ...state,
        isCustomer: action.payload
      }

    case ActionsType.SET_ORG_ID:
      return {
        ...state,
        orgID: action.payload
      }

    case ActionsType.SET_USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload
      }
    case ActionsType.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case ActionsType.API_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case ActionsType.API_SUCCESS:
      return {
        ...state,
        response: action.payload
      }
    default:
      return state
  }
}

export default userReducer
