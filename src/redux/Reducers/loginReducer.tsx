import {
  GET_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
} from "../Actions/Login/Type";

const initLoginState = {
  error: false,
  isLoading: false,
  //isPrivilegesLoading: false,
  user: undefined,
  errorMessage: "",
  userDetail: undefined,
  isTokenExpired: false,
};

const loginReducer = (state = initLoginState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        user: undefined,
        errorMessage: "",
        isTokenExpired: false,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: payload,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload,
      };
    case GET_USER_REQUEST:
      return {
        ...state,
        isLoading: false,
        userDetail: payload,
      };
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        user: undefined,
        error: false,
      };
    default:
      return state;
  }
};

//export { loginReducer }
export default loginReducer;
