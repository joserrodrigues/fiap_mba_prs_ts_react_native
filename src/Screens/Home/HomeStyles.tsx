import styled from "styled-components/native";
import { Image } from "react-native-elements";
import Colors from '../../Styles/Colors';

export const MainSafeAreaView = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`;

export const StyledActivityIndicator = styled.ActivityIndicator`
  margin-top: 30px;
`;

export const ContainerItem = styled.TouchableHighlight`
  margin-bottom: 10px;
`;

export const TextsView = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 2px;
`;

export const TextNameStyle = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;
export const TextTitle = styled.Text`
  font-size: 18px;
`;
export const TextDetail = styled.Text`
  font-size: 12px;
`;

export const Separator = styled.Text`
  flex: 1;
  height: 2px;
  background-color: ${Colors.NeutralMedium};
  margin-left: 10px;
  margin-right: 10px;
`;

export const StyledImage = styled(Image).attrs({
  containerStyle: {
    width: 50,
    height: 50,
    margin: 10,
  },
})``;

