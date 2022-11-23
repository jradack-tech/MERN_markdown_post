import { CallHistoryMethodAction } from "connected-react-router";
import {
  AlertType,
  ClientErrorType,
  CommentType,
  GithubRepoType,
  PostType,
  ProfileType,
  UserType,
} from "../../global.types";


export interface UserLoadedType {
  type: "USER_LOADED";
  payload: UserType;
}
export interface UserNotLoadedType {
  type: "USER_NOT_LOADED";
}
export interface AuthErrorType {
  type: "AUTH_ERROR";
}
export interface LoginSuccessType {
  type: "LOGIN_SUCCESS";
  payload: {
    token: string;
  };
}
export interface LoginFailType {
  type: "LOGIN_FAIL";
}
export interface LogoutType {
  type: "LOGOUT";
}

export interface DeleteAccountType {
  type: "DELETE_ACCOUT";
}
export interface GetGithubReposType {
  type: "GET_GITHUB_REPOS";
  payload: GithubRepoType[];
}

export interface GetMyPostsType {
  type: "GET_MY_POSTS";
  payload: Object[];
}
export interface GetAllPostsType {
  type: "GET_ALL_POSTS";
  payload: Object[];
}
export interface PostErrorType {
  type: "POST_ERROR";
  payload: ClientErrorType;
}

export interface UserLoginedType {
  type: "USER_LOGINED";
  payload: string;
}

export type AppActionTypes =
  | CallHistoryMethodAction //for router bindings
  | UserLoadedType
  | UserNotLoadedType
  | AuthErrorType
  | LoginSuccessType
  | LoginFailType
  | LogoutType
  | DeleteAccountType
  | GetGithubReposType
  | UserLoginedType
  | GetMyPostsType
  | GetAllPostsType;
