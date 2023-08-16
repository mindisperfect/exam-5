// import { request } from "../../server/request";

// export const fetchUsers = () => {
//   return async (dispatch) => {
//     dispatch({ type: "USER_LOADING" });
//     let { data } = await request.get("user");
//     dispatch({ type: "GET_USERS", payload: data });
//   };
// }
import { PER_PAGE } from "../../const";
import { request } from "../../server/request";

export const fetchUsers = (page = 1) => {
  return async (dispatch) => {
    dispatch({ type: "USER_LOADING" });
    let { data } = await request.get("user", {
      params: { limit: PER_PAGE, page },
    });
    console.log(data);
    dispatch({ type: "GET_USERS", payload: data });
  };
};

export const deleteUserAction = (id) => {
  return async (dispatch) => {
    await request.delete(`user/${id}`);
    dispatch(fetchUsers());
  };
};


