import Category from "./domain"
import { CategoryActions, CategoryActionType } from "../../actions/Category"

const initState: Array<Category> = []

export function categoryReducer(
  state = initState,
  action: CategoryActions
): Array<Category> {
  switch(action.type) {
    case CategoryActionType.GET_CATEGOIRES:
      return action.payload;
    default:
      return state;
  }
}
