import { ClientErrorType, PostType } from "../../global.types";
import { AppActionTypes } from "../actions/action.types";

const initialState: PostsState = {
  post: undefined,
  posts: [],
  all_posts: [],
  my_posts: [],
  loading: true,
  error: {},
};

const postsReducer = (
  state: PostsState = initialState,
  action: AppActionTypes
): PostsState => {
  switch (action.type) {

    case "GET_ALL_POSTS":
      return { ...state, loading: false, all_posts: action.payload };

    case "GET_MY_POSTS":
      return { ...state, loading: false, my_posts: action.payload };

    default:
      return state;
  }
};

export default postsReducer;

export interface PostsState {
  post?: PostType;
  posts: PostType[];
  all_posts: Object[];
  my_posts: Object[];
  loading: boolean;
  error: ClientErrorType | {};
}
