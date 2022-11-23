import { AppActionTypes } from "../actions/action.types";
import { UserType } from "../../global.types";

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: localStorage.getItem("username") ? true : false,
  user: null,
  github_user: localStorage.getItem("username") ? String(localStorage.getItem("username")): "",
  loading: true,
};

const authReducer = (
  state: AuthState = initialState,
  action: AppActionTypes
): AuthState => {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case "USER_LOGINED":
      localStorage.setItem("username", action.payload);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        github_user: action.payload,
      };

    case "USER_NOT_LOADED":
      return {
        ...state,
        loading: false,
        user: null,
      };

    case "LOGIN_SUCCESS":
      const token = action.payload.token;
      localStorage.setItem("token", token);
      return {
        ...state,
        token,
        loading: false,
      };

    case "LOGIN_FAIL":
    case "AUTH_ERROR":
    case "LOGOUT":
    case "DELETE_ACCOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        isAuthenticated: false,
        github_user: "",
      };
    default:
      return state;
  }
};

export default authReducer;

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: UserType | null;
  loading: boolean;
  github_user: string;
}
