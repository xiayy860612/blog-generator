import UserInfo from "./domain"
import { UserInfoActions, UserInfoActionType } from "../../actions/UserInfo"

const initState: UserInfo = {
  username: "Tester",
  motto: "Hello World",
  avatar: process.env.PUBLIC_URL + "/avatar.png",
  blog: "",
  email: "",
  github: ""
}

export function userInfoReducer(
  state = initState,
  action: UserInfoActions
): UserInfo {
  switch(action.type) {
    case UserInfoActionType.GET_USER_INFO:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}