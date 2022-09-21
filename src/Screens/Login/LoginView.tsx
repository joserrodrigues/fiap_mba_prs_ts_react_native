import React, { useRef } from "react";

import Colors from "../../Styles/Colors";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import {
  BottomButton,
  BottomScreen,
  FrontImageBackground,
  LoginBox,
  LogoDiv,
  MainContainer,
  StyledButton,
  StyledImageBackground,
  TopScreen,
  MessageErrorBox,
  MessageError,
} from "./LoginStyles";
import { FormDataType } from "./LoginController";
import { FormikHelpers } from "formik";
import CommonForm, {
  FormCommonRefs,
  FormListInfo,
} from "../../Components/CommonForm/CommonForm";
import { AssertsShape, ObjectShape, TypeOfShape } from "yup/lib/object";
import { ObjectSchema } from "yup";
import { AnyObject } from "yup/lib/types";
import { Platform } from "react-native";

type IProps = {
  isLoadingAuth: boolean;
  messageConnection: string;
  submitForm: (
    values: FormDataType,
    formikHelpers: FormikHelpers<FormDataType>
  ) => void | Promise<any>;
  signInSchema: ObjectSchema<
    ObjectShape,
    AnyObject,
    TypeOfShape<ObjectShape>,
    AssertsShape<ObjectShape>
  >;
};
const LoginView = ({
  isLoadingAuth,
  submitForm,
  messageConnection,
  signInSchema,
}: IProps) => {

  const commonForm = useRef<FormCommonRefs>(null);
  let buttonBox = null;
  let messageError = null;

  console.log(isLoadingAuth);
  if (isLoadingAuth) {
    buttonBox = <ActivityIndicator color={Colors.PrimaryDark} />;
  } else {
    buttonBox = (
      <StyledButton
        title="Login"
        testID="loginButton"
        onPress={() => commonForm.current!.submitForm()}
      />
    );
    if (messageConnection !== "") {
      messageError = (
        <MessageErrorBox >
          <MessageError>{messageConnection}</MessageError>
        </MessageErrorBox>
      );
    }
  }

  let formListInfo: FormListInfo[] = [
    {
      name: "email",
      label: "E-mail",
      placeholder: "E-mail",
      icon: "envelope",
      secure: false,
      type: "email",
    },
    {
      name: "password",
      label: "Senha",
      placeholder: "Senha",
      icon: "lock",
      secure: true,
      type: "password",
    },
  ];

  return (
    <MainContainer>
      <StyledImageBackground
        source={{
          uri: "https://previews.123rf.com/images/chagin/chagin1501/chagin150100001/35151812-business-people-working-together.jpg",
        }}
        resizeMode="cover"
      >
        <FrontImageBackground>
          <TopScreen>
            <LogoDiv>RH App</LogoDiv>
          </TopScreen>
          <BottomScreen>
            <LoginBox>
              <CommonForm
                ref={commonForm}
                listInfo={formListInfo}
                signInSchema={signInSchema}
                onSubmit={submitForm}
                hideBottomSpace={true}
              />
              {buttonBox}
              {messageError}
            </LoginBox>
          </BottomScreen>
        </FrontImageBackground>
      </StyledImageBackground>
    </MainContainer>
  );
};

export default LoginView;
