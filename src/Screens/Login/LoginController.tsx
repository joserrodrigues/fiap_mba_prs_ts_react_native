import React, { useState } from "react";
import LoginView from "./LoginView";

import useAPI from "../../Services/APIs/Common/useAPI";
import { getLogin, IParamGetLogin } from "../../Services/APIs/User/User";
import IUserInfo from "../../Interfaces/iUserInfo";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/login/LoginSlice";

import * as Yup from "yup";
import { FormikHelpers } from "formik";
import { AssertsShape, ObjectShape, TypeOfShape } from "yup/lib/object";
import { ObjectSchema } from "yup";
import { AnyObject } from "yup/lib/types";
import { i18n } from "../../Services/Language/ManageStrings";

export type FormDataType = {
  email: string;
  password: string;  
};

const LoginController = () => {
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const [messageErrorConnection, setMessageErrorConnection] = useState("")
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
        if (user.message) {
          setMessageErrorConnection(user.message);
        } else {
          console.log("After Login");
          console.log(user);
          console.log(user.token);
          setMessageErrorConnection("Login com Sucesso");
          dispatch(setUser({ user }));
        }
        setIsLoadingAuth(false);
      })
      .catch((error: any) => {
        console.log("Retornou erro");
        console.log(error);
        setIsLoadingAuth(false);
      });
  };

  const signInSchema: ObjectSchema<
    ObjectShape,
    AnyObject,
    TypeOfShape<ObjectShape>,
    AssertsShape<ObjectShape>
  > = Yup.object().shape({
    email: Yup.string()
      .email(i18n.t("invalidEmail"))
      .required(i18n.t("requiredEmail")),

    password: Yup.string()
      .required(i18n.t("requiredPassword"))
      .min(4, i18n.t("shortPassword")),
  });

  const submitForm = (
    values: FormDataType,
    formikHelpers: FormikHelpers<FormDataType>
  ) => {
    console.log(values);
    setIsLoadingAuth(true);
    makeLogin(values.email, values.password);
  };
 

  console.log("oldUserName");
  console.log(oldUserName);
  return (
    <LoginView
      submitForm={submitForm}
      isLoadingAuth={isLoadingAuth}
      messageConnection={messageErrorConnection}
      signInSchema={signInSchema}
    />
  );
};

export default LoginController;
