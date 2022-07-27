import React from "react";
import { View, Text } from "react-native";
import {
  BottomButton,
  BottomScreen,
  MainContainer,
  StyledButton,
  StyledImage,
  TextBlock,
  TextBoxContainer,
  TitlePage,
  TopScreen,
} from "./HomeStyles";

const HomeView = () => {
  return (
    <MainContainer>
      <TopScreen>
        <View>
          <TitlePage> Título da Página</TitlePage>
        </View>
        <StyledImage
          source={{
            uri: "https://thecatapi.com/api/images/get?format=src&type=jpg",
          }}
        />
      </TopScreen>
      <BottomScreen>
        <TextBoxContainer>
          <TextBlock>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae
              semper quis lectus nulla at volutpat diam. Malesuada bibendum arcu
              vitae elementum curabitur vitae nunc. Nibh sit amet commodo nulla.
              Massa sed elementum tempus egestas sed sed. Eget sit amet tellus
              cras. Magna ac placerat vestibulum lectus. Sit amet venenatis urna
              cursus. Est placerat in egestas erat imperdiet sed euismod nisi.
              Duis at tellus at urna condimentum mattis. Non blandit massa enim
              nec. Vestibulum lectus mauris ultrices eros in cursus. Consequat
              id porta nibh venenatis cras sed felis eget. Nunc mi ipsum
              faucibus vitae aliquet nec. Sapien nec sagittis aliquam malesuada
              bibendum arcu. Tristique sollicitudin nibh sit amet. Rhoncus
              mattis rhoncus urna neque viverra justo nec ultrices. Cursus
              mattis molestie a iaculis at erat pellentesque adipiscing. Neque
              ornare aenean euismod elementum nisi quis eleifend quam
              adipiscing.
            </Text>
          </TextBlock>
        </TextBoxContainer>
        <BottomButton>
          <StyledButton title="Anterior" />
          <StyledButton title="Próximo" />
        </BottomButton>
      </BottomScreen>
    </MainContainer>
  );
};

export default HomeView;
