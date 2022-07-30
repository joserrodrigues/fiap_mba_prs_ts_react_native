import React, { FC, useRef } from "react";
import Colors from "../../Styles/Colors";
import {
  MainContainer,
  ViewInfo,
  KeyboardAvoidingViewContainer,
  ViewContainer,
  FabStyle,
} from "./MyInfoStyles";
import {
  ScrollView,
  Platform,
} from "react-native";
import { FAB } from "react-native-elements";

import DrawerMenu from "../../Components/DrawerMenu/DrawerMenu";
import ControlCamera from "../../Components/ControlCamera/ControlCamera";
import CustomBottomMenu, {
  ListOption,
} from "../../Components/CustomBottomMenu/CustomBottomMenu";
import CommonForm, { FormCommonRefs, FormListInfo} from "../../Components/CommonForm/CommonForm";
import { FormDataType } from "./MyInfoController";
import { FormikHelpers } from "formik";
import { AssertsShape, ObjectShape, TypeOfShape } from "yup/lib/object";
import { ObjectSchema } from "yup";
import { AnyObject } from "yup/lib/types";

type IProps = {
  pickImage: (type: number) => Promise<void>;
  image: string | null;
  showPhotoOptions: boolean;
  toggleCameraOptions: () => void;
  onSubmit: (
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

const MyInfoView: FC<IProps> = ({
  pickImage,
  image,
  showPhotoOptions,
  toggleCameraOptions,
  signInSchema,
  onSubmit,
}) => {
  const commonForm = useRef<FormCommonRefs>(null);
  let bottomMenuItems: ListOption[] = [
    {
      title: "Biblioteca",
      icon: "camera",
      return: 1,
    },
    {
      title: "Câmera",
      icon: "photo",
      return: 2,
    },
  ];

  let formListInfo: FormListInfo[] = [
    {
      name: "name",
      label: "Nome",
      placeholder: "Nome",
      icon: "user",
      secure: false,
      type: "name",
    },
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
    {
      name: "confirmPassword",
      label: "Confirmar Senha",
      placeholder: "Confirmar Senha",
      icon: "lock",
      secure: true,
      type: "password",
    },
  ];

  let behavior: 'height' | 'position' | 'padding' | undefined;
  if (Platform.OS === "ios") {
    behavior = "padding";
  }

  return (
    <MainContainer>
      <DrawerMenu />
      <KeyboardAvoidingViewContainer behavior={behavior}>
        <ScrollView>
          <ViewContainer>
            <ControlCamera
              image={image}
              toggleCameraOptions={toggleCameraOptions}
            />
            <ViewInfo>
              <CommonForm
                ref={commonForm}
                listInfo={formListInfo}
                signInSchema={signInSchema}
                onSubmit={onSubmit}
              />
            </ViewInfo>
            <CustomBottomMenu
              pickImage={pickImage}
              showPhotoOptions={showPhotoOptions}
              toggleCameraOptions={toggleCameraOptions}
              listItems={bottomMenuItems}
            />
          </ViewContainer>
        </ScrollView>
      </KeyboardAvoidingViewContainer>
      <FabStyle>
        <FAB
          loading={false}
          icon={{ name: "add", color: Colors.White }}
          color={Colors.PrimaryDark}
          onPress={() => commonForm.current!.submitForm()}
        />
      </FabStyle>
    </MainContainer>
  );
};

export default MyInfoView;
