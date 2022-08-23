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

        if(user.message){
          setMessageErrorConnection(user.message)
        } else {
          console.log("After Login");
          console.log(user);
          console.log(user.token);
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
      .email("E-mail não válido")
      .required("E-mail é obrigatório"),

    password: Yup.string()
      .required("Senha é obrigatório")
      .min(4, "Senha é curta - deveria ter ao menos 4 caracteres"),
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
