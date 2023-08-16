import { PER_PAGE } from "../../const";
import { request } from "../../server/request";

export const fetchPosts = (page = 1) => {
  return async (dispatch) => {
    dispatch({ type: "POSTS_LOADING" });
    let { data } = await request.get("post", {
      params: { limit: PER_PAGE, page },
    });
    console.log(data);
    dispatch({ type: "GET_POSTS", payload: data });
  };
};

export const deleteCategoryAction = (id) => {
  return async (dispatch) => {
    await request.delete(`post/${id}`);
    dispatch(fetchPosts());
  };
};