import { ColleagueInfo } from "../../../component/ColleagueInfo";
import {
  colleagueV2Login,
  //userDetailsLogin,
  userV2Login,
} from "../../../component/fetch";
import { ServiceResponse } from "../../../component/Message";
import { ServiceResponses } from "../../../component/ServiceResponses";
import {
  GET_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
} from "./Type";

export const loginUser = (idToken: any) => (dispatch: any) => {
  console.log("starting");
  dispatch(loginUserRequest());
  userV2Login(idToken)
    .then(result => {
      const { data } = result;
      if ("refresh_token" in data) {
        localStorage.setItem("_GresponseV2", JSON.stringify(data));
        // dispatch(getUser(data && data.empId))
        const accesToken = data && data.access_token;
        // const employeeID = data && data.empId;
        console.log(accesToken);
        colleagueV2Login(accesToken).then(response => {
          const dataone = response;
          localStorage.setItem("_Colresponse", JSON.stringify(dataone));
          console.log(dataone);
          dispatch(getUserRequest(dataone));
        });
        // userDetailsLogin(accesToken, employeeID).then(response => {
        //   const userdata = response;
        //   localStorage.setItem("_userDetails", JSON.stringify(userdata));
        // });
      } else {
        throw new Error("Invalid Login");
      }
      dispatch(loginUserSuccess(data));
    })
    .catch(error => {
      if (error && error.response && error.response.status === 500) {
        dispatch({
          type: LOGIN_USER_FAILURE,
          payload: ServiceResponse.getMessage("login", "serviceUnavailable"),
        });
      } else {
        dispatch({
          type: LOGIN_USER_FAILURE,
          payload: ServiceResponse.getMessage("login", "userNotExist"),
        });
      }
    });
};

const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST,
  };
};
export const getUserRequest = (dataone: any) => {
  return {
    type: GET_USER_REQUEST,
    payload: dataone,
  };
};

export const logOutUserRequest = () => {
  return {
    type: LOGOUT_USER_REQUEST,
  };
};

export const loginUserSuccess = (data: any) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data,
  };
};
