import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SET_ALERT,
  CLEAR_ALERT,
  SET_TOAST,
  CLEAR_TOAST,
  SET_CURRENCY,
  ADD_COUNTRIES,
  SET_REDIRECTION,
  CLEAR_REDIRECTION
} from '../constants/actionTypes';

function loginSuccess(data) {
   return {
      type: LOGIN_SUCCESS,
      payload: data
   }
}

function loginFailure(data) {
   return {
      type: LOGIN_FAILURE,
      payload: data
   }
}

function logoutSuccess() {
   return {
      type: LOGOUT_SUCCESS
   }
}

function logoutFailure(data) {
   return {
      type: LOGOUT_FAILURE,
      payload: data
   }
}

export function setRedirectionPath(data) {
   return {
      type: SET_REDIRECTION,
      payload: data
   }
}

export function clearRedirectionPath() {
   return {
      type: CLEAR_REDIRECTION
   }
}

export function handleLoginResponse(response) {
   const { data } = response;
   if (data.success) {
      return loginSuccess(data);
   } else {
      return loginFailure({
         message: data.message
      });
   }
}

export function handleLogoutResponse(response) {
   const {data} = response;
   if (data.success) {
      return logoutSuccess();
   } else {
      return logoutFailure({
         message: data.message
      });
   }
}

export function setAlert(data) {
   return {
      type: SET_ALERT,
      payload: data
   }
}

export function clearAlert(data) {
   return {
      type: CLEAR_ALERT
   }
}

export function setToast(data) {
   return {
      type: SET_TOAST,
      payload: data
   }
}

export function clearToast() {
   return {
      type: CLEAR_TOAST
   }
}

export function setUserCurrency(data) {
   return {
      type: SET_CURRENCY,
      payload: data
   }
}

export function handleCountriesResponse(response) {
   const {data} = response;
   if (data.success) {
      return {
         type: ADD_COUNTRIES,
         payload: data.data
      };
   }
}