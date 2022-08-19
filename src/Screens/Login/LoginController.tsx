import React, { useState } from "react";
import LoginView from "./LoginView";

import useAPI from "../../Services/APIs/Common/useAPI";
import { getLogin, IParamGetLogin } from "../../Services/APIs/User/User";
import IUserInfo from "../../Interfaces/iUserInfo";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/login/LoginSlice";

const LoginController = () => {
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const getLoginAPI = useAPI(getLogin);

  const oldUserName = useAppSelector((state) => state.login.user);

  const dispatch = useAppDispatch();

  const makeLogin = (userName: string, password: string) => {
    console.log("Loading School - " + userName + " - " + password);

    let info: IParamGetLogin = {
      email: userName,
      password: password,
    };
    setIsLoadingAuth(true);

    getLoginAPI
      .requestPromise("", info)
      .then((user: IUserInfo) => {
        console.log("After Login");        
        console.log(user);
        console.log(user.token);
        dispatch(setUser({ user }));
        setIsLoadingAuth(false);
      })
      .catch((error: any) => {
        console.log("Retornou erro");
        console.log(error);
        setIsLoadingAuth(false);
      });
  };

  const submitForm = () => {
    makeLogin("rubens@schoolguardian.app", "123456");
  };

  console.log("oldUserName");
  console.log(oldUserName);
  return <LoginView submitForm={submitForm} />;
};

export default LoginController;
