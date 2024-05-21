import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import decodeJWT from "./utils/jwt";
import instance from "./utils/instance";

const initialState = {
  loading: Boolean,
  userInfo: null,
  profileInfo: {},
  users: [],
  loggedInUser: "",
  headerPost: {},
  postById: {},
  comments: [],
  posts: [],
  categories: [],
  featuredPost: {},
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "loading/start":
      return {
        ...state,
        loading: true,
      };
    case "loading/end":
      return {
        ...state,
        loading: false,
      };
    case "like/add":
      return {
        ...state,
        postById: action.payload,
      };

    case "auth/getUser":
      return {
        ...state,
        isAuthenticated: true,
        userInfo: action.payload,
      };
    case "featuredPost/fetch":
      return { ...state, featuredPost: action.payload };
    case "posts/fetch":
      return { ...state, posts: action.payload };
    case "postsByCategoryId/fetch":
      return { ...state, posts: action.payload };
    case "categories/fetch":
      return { ...state, categories: action.payload };
    case "comment/add":
      return { ...state, comments: [...state.comments, action.payload] };
    case "comments/fetch":
      return { ...state, comments: action.payload };
    case "users/fetch":
      return { ...state, users: action.payload };
    case "users/add":
      return { ...state, users: [...state.users, action.payload] };
    case "user/logIn":
      return { ...state, loggedInUser: action.payload };
    case "headerPost/get":
      return { ...state, headerPost: action.payload };
    case "postById/get":
      return { ...state, postById: action.payload };
    case "userById/get":
      return { ...state, profileInfo: action.payload };
    case "postByUser/get":
      return { ...state, posts: action.payload };
    default:
      break;
  }

  return state;
};
export const checkForToken = (receivedToken) => {
  if (receivedToken) {
    instance.defaults.headers.common.Authorization = `Bearer ${receivedToken}`;
    localStorage.setItem("token", receivedToken);
    const decodedToken = decodeJWT(receivedToken);

    return decodedToken;
  }
};

export const startLoading = () => ({
  type: "loading/start",
});

export const endLoading = () => ({
  type: "loading/end",
});
export const getPostsByUser = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const res = await instance.get(`/post/${id}`);
      const data = await res.data;
      dispatch({ type: "postByUser/get", payload: data });
      dispatch(endLoading());
    } catch (error) {
      console.error("Error fetching postByUser:", error);
      dispatch(endLoading());
    }
  };
};
export const getFeaturedPost = () => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const res = await instance.get(`/post/featuredpost`);
      const data = await res.data;
      dispatch({ type: "featuredPost/fetch", payload: data });
      dispatch(endLoading());
    } catch (error) {
      console.error("Error fetching featuredPost:", error);
      dispatch(endLoading());
    }
  };
};

export const addLike = (id, token) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const response = await instance.post(
        `/like/${id}`,
        {}, // No request body, since like is just an action, not sending data
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: "like/add", payload: response.data });
      dispatch(endLoading());
    } catch (error) {
      console.error("Error adding like:", error);
      dispatch(endLoading());
    }
  };
};

export const addComment = (id, text, token) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const response = await instance.post(
        `/comment/${id}`,
        { text } // Send comment data in the request body
      );

      dispatch({ type: "comment/add", payload: response.data });
      dispatch(endLoading());
    } catch (error) {
      console.error("Error adding comment:", error);
      dispatch(endLoading());
    }
  };
};

export const getPostsByCategoryId = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const res = await instance.get(`/post/category/${id}`);
      const data = await res.data;
      dispatch({ type: "postsByCategoryId/fetch", payload: data });
      dispatch(endLoading());
    } catch (error) {
      console.error("Error fetching all posts:", error);
      dispatch(endLoading());
    }
  };
};
export const getPosts = () => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const res = await instance.get(`/post/`);
      const data = await res.data;
      dispatch({ type: "posts/fetch", payload: data });
      dispatch(endLoading());
    } catch (error) {
      console.error("Error fetching all posts:", error);
      dispatch(endLoading());
    }
  };
};
export const getCategories = () => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const res = await instance.get(`/categories/`);
      const data = await res.data;
      dispatch({ type: "categories/fetch", payload: data });
      dispatch(endLoading());
    } catch (error) {
      console.error("Error fetching all categories:", error);
      dispatch(endLoading());
    }
  };
};
export const getComments = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const res = await instance.get(`/comment/${id}`);
      const data = await res.data;
      dispatch({ type: "comments/fetch", payload: data });
      dispatch(endLoading());
    } catch (error) {
      console.error("Error fetching all comments:", error);
      dispatch(endLoading());
    }
  };
};
export const getPostById = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const res = await instance.get(`/post/single/${id}`);
      const data = await res.data;
      dispatch({ type: "postById/get", payload: data });
      dispatch(endLoading());
    } catch (error) {
      console.error("Error fetching post by id:", error);
      dispatch(endLoading());
    }
  };
};
export const getUserById = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const res = await instance.get(`/user/${id}`);
      const data = await res.data;
      dispatch({ type: "userById/get", payload: data });
      dispatch(endLoading());
    } catch (error) {
      console.error("Error fetching user by id:", error);
      dispatch(endLoading());
    }
  };
};
export const getHeaderPost = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const res = await instance.get(`/post/headerpost`);
      const data = await res.data;
      dispatch({ type: "headerPost/get", payload: data });
      dispatch(endLoading());
    } catch (error) {
      console.error("Error fetching header post:", error);
      dispatch(endLoading());
    }
  };
};

export const signUp = (formData) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const response = await instance.post(
        `/user/signup`,

        formData
      );

      dispatch({ type: "users/add", payload: response.data });
      dispatch(endLoading());
    } catch (error) {
      console.error("Error add user:", error);
      dispatch(endLoading());
    }
  };
};
export const logIn = (logInAccount) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const response = await instance.post(
        `/user/login`,

        { logInAccount }
      );

      checkForToken(JSON.stringify(response.data));
      dispatch({ type: "user/logIn", payload: response.data });
      dispatch(endLoading());
    } catch (error) {
      console.error("Error logged in :", error);
      dispatch(endLoading());
    }
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const res = await instance.get(`/user/`);
      const data = await res.data;
      dispatch({ type: "users/fetch", payload: data });
      dispatch(endLoading());
    } catch (error) {
      console.error("Error fetching users:", error);
      dispatch(endLoading());
    }
  };
};
const store = createStore(blogReducer, applyMiddleware(thunk));

export default store;
