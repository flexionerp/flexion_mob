import ActionsType from "./../utils/actions.type"
import axios from 'axios'
import { SCREENS, Url } from "../../constants";
import { setLoader } from "../loader/loader.action";


export const setIsCustomer = (flage) => ({
  type: ActionsType.SET_IS_CUSTOMER,
  payload: flage
});

//User Data
export const setUserDetail = (user) => ({
  type: ActionsType.SET_USER_DETAIL,
  payload: user
});

//User Id
export const setAuthToken = (token) => ({
  type: ActionsType.SET_TOKEN,
  payload: token
});

//ORG ID
export const setOrgID = (id) => ({
  type: ActionsType.SET_ORG_ID,
  payload: id
});


export const userLogin = (data, navigation, methodCall) => {
  return dispatch => {

    let { username, password } = data;
    let headers = {
      'Content-Type': 'application/json'
    };
    axios.get(`${Url}get_login_api?login=${username}&password=${password}`,
      { headers: headers })
      .then(response => {
        const user = response.data;
        if (user.data == 'Please Enter Correct Login Details.') {
          alert("Wrong email or password")
        } else {
          dispatch(setUserDetail(user.data[0][0]))
          dispatch(setAuthToken(user.data[0][0].USER_INFO_ID))
          dispatch(setIsCustomer(user.data[0][0].CUSTOMERID == null ? false : true))
          dispatch(setOrgID(user.data[1][0].ORG_ID))
          navigation.navigate(SCREENS.MAINROUTES)
          methodCall()
        }

        dispatch(setLoader(false))
      }).catch(error => {
        const err = error
        console.log("Login Api Error ", err)
        if (err.response) {
          // alert(err.response.data.message)
        }
        dispatch(setLoader(false))
      });
  };
}

export const userSignup = (data, navigation, methodCall) => {
  return dispatch => {
    let { email } = data;
    let headers = {
      'Content-Type': 'application/json'
    };
    axios.get(`${Url}signup_api?email=${email}`,
      { headers: headers })
      .then(response => {
        const user = response.data;
        alert(user.result)
        navigation.navigate(SCREENS.LOGINSCREEN)
        methodCall()
        dispatch(setLoader(false))
      }).catch(error => {
        const err = error
        console.log("Login Api Error ", err)
        if (err.response) {
          // alert(err.response.data.message)
        }
        dispatch(setLoader(false))
      });
  };
}

export const ForgotPasswordApi = (data, navigation) => {
  return dispatch => {
    let { email } = data;
    let headers = {
      'Content-Type': 'application/json'
    };
    axios.get(`${Url}resetPassword_api?email=${email}`,
      { headers: headers })
      .then(response => {
        alert("Email has sent on your email to reset the password")
        navigation.navigate(SCREENS.LOGINSCREEN)
        dispatch(setLoader(false))
      }).catch(error => {
        const err = error
        if (err.response) {
          alert(err.response.data.message)
        }
        dispatch(setLoader(false))
      });
  };
}

export const ResetPasswordApi = (data) => {
  return dispatch => {
    let { email, temp_password, new_password } = data;
    let headers = {
      'Content-Type': 'application/json'
    };
    axios.get(`${Url}updateResetPassword_API?temp_password=${temp_password}&new_password=${new_password}&email=${email}`,
      { headers: headers })
      .then(response => {
        const res = response.data;
        console.log(res)
        alert("Password reset successfully!")
        dispatch(setLoader(false))
      }).catch(error => {
        const err = error
        console.log("ResetPasswordApi Api Error ", err)
        if (err.response) {
          // alert(err.response.data.message)
        }
        dispatch(setLoader(false))
      });
  };
}













