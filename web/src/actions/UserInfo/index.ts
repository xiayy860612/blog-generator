import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { BaseAction } from "..";
import UserInfo from "../../reducers/UserInfo/domain";
import { AppState } from "../../reducers";


export enum UserInfoActionType {
  GET_USER_INFO= "GET_USER_INFO"
}

interface GetUserInfoAction extends BaseAction<UserInfoActionType, UserInfo> {
}

export type UserInfoActions = GetUserInfoAction;

export const dispatchGetUserInfoAction = (): ThunkAction<void, AppState, null, GetUserInfoAction> => {
  return async (dispatch, state) => {
    const userInfo = await axios.get(process.env.PUBLIC_URL + "/userinfo.json");
    const action: GetUserInfoAction = {
      type: UserInfoActionType.GET_USER_INFO,
      payload: {
        ...state().userInfo,
        ...userInfo.data
      }
    }
    dispatch(action)
  }
}

