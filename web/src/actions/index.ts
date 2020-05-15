
export interface BaseAction<T, PT> {
  type: T,
  payload: PT
}