import { combineReducers } from "redux";
import feedReducer from "./reducers/feedReducer";
import userReducer from "./reducers/userReducer";

const myReducer = combineReducers({ user: userReducer, feeds: feedReducer });

export default myReducer;
