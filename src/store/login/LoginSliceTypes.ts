import IUserInfo from "../../Interfaces/iUserInfo";

export interface UserState {
  user: IUserInfo | null;
}

export interface ISetUserInfo {
  user: IUserInfo | null;
}
export interface ISetUserPayload {
  payload: ISetUserInfo | null;
}
