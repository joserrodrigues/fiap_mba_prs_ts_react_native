import styled from "styled-components/native";
import { ImageBackground } from "react-native";
import Colors from "../../Styles/Colors";

export const MainContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`;
export const StyledImageBackground = styled.ImageBackground`
  position: absolute;
  width: 100%;
  height: 100%;
`;
export const FrontImageBackground = styled.View`
    flex: 1;
    padding-top: 40px;
    padding-bottom: 30px;
    background-color: rgba(0,0,0,0.6);
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
export const LoginBox = styled.View`
    background-color: rgba(255,255,255,0.8);
    margin: 35px;
    border-radius: 15px;
    border-width: 1px;
    border-color: ${Colors.PrimaryDark};
    padding: 20px;
    width: 80%;
`;
export const TextInfo = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin: 5px;
    margin-top: 30px;
    margin-bottom: 30px;
`;
export const StyledActivityIndicator = styled.ActivityIndicator`
  margin-bottom: 20px;
`;
