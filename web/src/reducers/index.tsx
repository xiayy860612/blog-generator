import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { userInfoReducer } from "./UserInfo";
import { categoryReducer } from "./Category";
import articlesReducer from "./Article";


const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  categories: categoryReducer,
  articles: articlesReducer
})

export type AppState = ReturnType<typeof rootReducer>
export default function configStore() {
  const middlewares = [thunkMiddleware]
  const enhancer = applyMiddleware(...middlewares)
  const store = createStore(rootReducer, enhancer)
  return store;
}