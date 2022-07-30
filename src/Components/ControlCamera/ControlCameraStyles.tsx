import Colors from "../../Styles/Colors";
import styled from "styled-components/native";

export const ViewCameraButton = styled.TouchableOpacity`
  flex-direction: column;
  flex: 1;
  height: 200px;
  justify-content: center;
  align-items: center;
`;
export const CameraButton = styled.View`
  justify-content: center;
  border-radius: 50px;
  width: 100px;
  height: 100px;
  background-color: ${Colors.PrimaryDark};
`;

export const TextChangeCamera = styled.Text`
    margin-top: 10px;
    font-size: 12px;
`;

export const StyledImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
`;


