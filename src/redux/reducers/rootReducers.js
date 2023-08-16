import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducers";
import { userReducer } from "./userReducer";
import { postReducer } from "./postReducer";

export const rootReducer = combineReducers({
    category: categoryReducer,
    user: userReducer,
    post: postReducer
})