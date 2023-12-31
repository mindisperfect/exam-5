const initialState = {
  users: [],
  loading: false,
  totalUsers: 0,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "USER_LOADING":
      return { ...state, loading: true };
    case "GET_USERS":
      return {
        loading: false,
        users: payload.data.map((user) => ({
                    ...user,
                    key: user.id,
                  })),
        totalUsers: payload.pagination.total,
      };
  }
  return state;
};

// const initialState = {
//   users: [],
//   loading: false,
//   totalUsers: 0,
// };

// export const userReducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case "USER_LOADING":
//       return { ...state, loading: true };
//     case "GET_USER":
//       return {
//         loading: false,
//         users: payload.data.map((user) => ({
//           ...user,
//           key: user.id,
//         })),
//         totalUsers: payload.pagination.total,
//       };
//   }
//   return state;
// };