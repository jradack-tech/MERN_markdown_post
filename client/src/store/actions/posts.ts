import { Dispatch } from "redux";
import axiosInstance from "../../axios.config";
import { PostType } from "../../global.types";
import {
	PostErrorType,
} from "./action.types";
import { toast } from 'react-toastify';


export const getAllPosts = () => async (
	dispatch: Dispatch<any>
) => {
	try {
		const response = await axiosInstance.get<Object[]>("/api/post/get-all-posts");
		dispatch({ type: "GET_ALL_POSTS", payload: response.data });
	} catch (error) {
		dispatch({
			type: "POST_ERROR",
			payload: {
				status: error.response.status,
				statusText: error.response.statusText,
			},
		});
	}
};

export const getMyPosts = (userId: Object) => async (
	dispatch: Dispatch<any>
) => {
	try {
		const response = await axiosInstance.post<Object[]>("/api/post/get-my-posts", userId);
		dispatch({ type: "GET_MY_POSTS", payload: response.data });
	} catch (error) {
		dispatch({
			type: "POST_ERROR",
			payload: {
				status: error.response.status,
				statusText: error.response.statusText,
			},
		});
	}
};

export const createPostAction = (post: Object) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const response = await axiosInstance.post("/api/post/create-post", post);
		toast.success("Success!");
  } catch (error) {
		toast.error("Fail!");
    console.log(error);
  }
};

export const toggleVisibility = (change: Object) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const response = await axiosInstance.post("/api/post/toggle-visibility", change);
		toast.success("Success!");
  } catch (error) {
    console.log(error);
		toast.error("Fail!");
  }
};
