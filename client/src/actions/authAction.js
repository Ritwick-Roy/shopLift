import axios from "axios";
import {
  SET_CURRENT_USER,
  SUCCESFUL_REGISTER,
  FAILURE_REGISTER,
  ERRORS,
  AUTH_ERROR,
} from "./types";
import { getServer } from "../util";
import { setAuthToken } from "../util/setAuthToken";

export const setCurrentUser = (user) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${getServer}/api/auth`);
    dispatch({
      type: SET_CURRENT_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = (userData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${getServer}/api/users`, userData, config);
    dispatch({
      type: SUCCESFUL_REGISTER,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data.errors;
    if (error) {
      dispatch({
        type: ERRORS,
        payload: error,
      });
    } else {
      dispatch({
        type: FAILURE_REGISTER,
      });
    }
  }
};
