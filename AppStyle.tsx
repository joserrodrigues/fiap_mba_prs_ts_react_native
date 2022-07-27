import { FC } from "react";
import styled from "styled-components/native";
import { Button } from "react-native-elements";

export const Container = styled.View`
  flex: 1;
  margin-top: 40px;
  background-color: #eee;
`;

export const Box = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 22px;
  line-height: 60px;
  color: #ff0000;
`;

export const StyledButton = styled(Button).attrs({
  style: {
    margin: 10,
  },
  containerStyle: {
    width: 300,
    marginHorizontal: 0,
    marginVertical: 20,
  },
})``;

type CustomBoxType = {
  color: string;
};

const Box2 = styled(Box)`
  text-align: center;
  width: 200px;
  height: 60px;
  background-color: ${(props: CustomBoxType) => props.color || "#00ffff"};
`;

export const CustomBox: FC<CustomBoxType> = ({ color }) => {
  return (
    <Box2 color={color}>
      <Title>Teste</Title>
    </Box2>
  );
};
