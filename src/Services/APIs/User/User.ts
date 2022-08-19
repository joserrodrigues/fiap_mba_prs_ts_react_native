import IUserInfo from "../../../Interfaces/iUserInfo";
import api from "../Common/api";

const getLogin = (url:string, data:any) => api.post(url + "storeProducts/login", data);
type IParamGetLogin = {
  email: string;
  password: string;
};

export { getLogin, IParamGetLogin};