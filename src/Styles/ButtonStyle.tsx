import styled from "styled-components/native";
import { Button } from "react-native-elements";
import Colors from './Colors'

export const StyledButton = styled(Button).attrs({
  buttonStyle: {
    backgroundColor: Colors.PrimaryDark,
    borderRadius: 10,
  },
  containerStyle: {
    width: "35%",
    marginHorizontal: 20,
    marginVertical: 10,
  },
})``;
