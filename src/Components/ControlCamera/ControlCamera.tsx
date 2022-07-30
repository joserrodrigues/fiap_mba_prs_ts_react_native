import React, { FC } from "react";
import Colors from "../../Styles/Colors";
import { Icon } from "react-native-elements";
import {
  ViewCameraButton,
  CameraButton,
  TextChangeCamera,
  StyledImage,
} from "./ControlCameraStyles";

type IProps = {
  image: string | null;
  toggleCameraOptions: () => void;
};

const ControlCamera:FC<IProps> = ({ image, toggleCameraOptions }) => {
  let imageInfo = null;
  if (image) {
    imageInfo = (
      <StyledImage source={{ uri: image }}  />
    );
  } else {
    imageInfo = (
      <Icon
        name="camera"
        type="font-awesome"
        color={Colors.HeaderTintColor}
        tvParallaxProperties={undefined}
      />
    );
  }

  return (
    <>
      <ViewCameraButton onPress={toggleCameraOptions}>
        <CameraButton>{imageInfo}</CameraButton>
        <TextChangeCamera>Alterar Foto</TextChangeCamera>
      </ViewCameraButton>
    </>
  );
};


export default ControlCamera;
