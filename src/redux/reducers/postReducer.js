const initialState = {
    posts: [],
    loading: false,
    totalPosts: 0,
  };
  
  export const postReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case "CATEGORY_LOADING":
        return { ...state, loading: true };
      case "GET_CATEGORIES":
        return {
          loading: false,
          posts: payload.data.map((post) => ({
            ...post,
            key: post._id,
          })),
          totalPosts: payload.pagination.total,
        };
    }
    return state;
  };