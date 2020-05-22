import axios from "axios";
import { BaseAction } from "..";
import { CategoryArticles } from "../../reducers/Article/domain";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../../reducers";


export enum ArticleActionType {
  GET_ALL_ARTICLES
}

interface GetAllArticlesAction extends BaseAction<ArticleActionType, Array<CategoryArticles>> { }

export type ArticleActions = GetAllArticlesAction;

export const dispatchGetAllArticlesAction = (): ThunkAction<void, AppState, null, GetAllArticlesAction> => {
  return async (dispatch, state) => {
    const response = await axios.get(process.env.PUBLIC_URL + "/articles.json");
    const categoryArticles: Array<CategoryArticles> = Object.keys(response.data)
    .map<CategoryArticles>(key => {
      return {
        categoryKey: key,
        articles: response.data[key]
      }
    })
    const action: GetAllArticlesAction = {
      type: ArticleActionType.GET_ALL_ARTICLES,
      payload: categoryArticles
    }
    dispatch(action)
  }
} 