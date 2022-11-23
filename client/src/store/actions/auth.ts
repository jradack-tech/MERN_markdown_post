import { Dispatch } from "redux";
import {
  LogoutType,
  UserNotLoadedType,
  UserLoadedType,
  AuthErrorType,
  UserLoginedType
} from "./action.types";
import { UserType } from "../../global.types";
import axiosInstance from "../../axios.config";
import { CallHistoryMethodAction, push } from "connected-react-router";

export const loadUser = () => async (
  dispatch: Dispatch<UserLoadedType | AuthErrorType | UserNotLoadedType>
) => {
  const token = localStorage.getItem("token");
  if (!token) return dispatch({ type: "USER_NOT_LOADED" });
  try {
    const response = await axiosInstance.get<UserType>("/api/auth");
    const user = response.data;

    dispatch({
      type: "USER_LOADED",
      payload: user,
    } as UserLoadedType);
  } catch (error) {
    console.log(error);
    dispatch({
      type: "AUTH_ERROR",
    } as AuthErrorType);
  }
};

export const setGithubUser = (username: string) => async (
  dispatch: Dispatch<UserLoginedType | AuthErrorType | UserNotLoadedType>
) => {
  try {
    dispatch({
      type: "USER_LOGINED",
      payload: username,
    } as UserLoginedType);
  } catch (error) {
    console.log(error);
    dispatch({
      type: "AUTH_ERROR",
    } as AuthErrorType);
  }
};


export const logout = () => (
  dispatch: Dispatch<LogoutType | CallHistoryMethodAction>
) => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  dispatch(push("/"));
  dispatch({
    type: "LOGOUT",
  } as LogoutType);
};
