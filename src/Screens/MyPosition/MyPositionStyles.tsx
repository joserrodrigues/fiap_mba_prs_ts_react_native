import styled from "styled-components/native";
import Colors from "../../Styles/Colors";

export const MainContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`;

export const ItemsInfo = styled.View`
  flex-direction: row;
  margin: 18px;
`;

export const TitleText = styled.Text`
    font-weight: bold;
    font-size: 18px;
`;

export const DetailText = styled.Text`
  font-size: 18px;
`;

export const ContainerInfo = styled.View`
  background-color: green;
`;

export const ContainerMap = styled.View`
    flex: 1;
    background-color: gray;
`;

export const ActivityIndicatorStyled = styled.ActivityIndicator`
  margin-top: 20px;
`;
