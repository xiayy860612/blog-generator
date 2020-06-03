import axios from "axios";
import { BaseAction } from "..";
import Category from "../../reducers/Category/Category";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../../reducers";


export enum CategoryActionType {
  GET_CATEGOIRES = "GET_CATEGOIRES"
}

interface GetCategoriesAction extends BaseAction<CategoryActionType, Array<Category>> { }

export type CategoryActions = GetCategoriesAction;

export const dispatchGetCategoriesAction = (): ThunkAction<void, AppState, null, GetCategoriesAction> => {
  return async (dispatch, state) => {
    const response = await axios.get(process.env.PUBLIC_URL + "/categoryArticles.json");
    const action: GetCategoriesAction = {
      type: CategoryActionType.GET_CATEGOIRES,
      payload: Object.values(response.data)
    }
    dispatch(action)
  }
} 
