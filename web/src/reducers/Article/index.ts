import { CategoryArticles } from "./domain";
import { ArticleActions, ArticleActionType } from "../../actions/Article";
import { combineReducers } from "redux";

const initState: Array<CategoryArticles> = []

export default function articlesReducer(
  state = initState, 
  action: ArticleActions
): Array<CategoryArticles> {
  switch(action.type) {
    case ArticleActionType.GET_ALL_ARTICLES:
      return action.payload
    default:
      return state
  }
}
