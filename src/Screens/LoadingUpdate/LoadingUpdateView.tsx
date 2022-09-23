import React from "react";
import { FrontImageBackground, LoginBox, MainContainer, StyledActivityIndicator, StyledImageBackground, TextInfo } from "./LoadingUpdateStyle";
import Colors from "../../Styles/Colors";

const LoadingUpdateView = () => {
  return (
    <MainContainer>
      <StyledImageBackground
        source={{
          uri: "https://previews.123rf.com/images/chagin/chagin1501/chagin150100001/35151812-business-people-working-together.jpg",
        }}
        resizeMode="cover"
      />
      <FrontImageBackground>
        <LoginBox>
          <TextInfo>Loading Update</TextInfo>
          <StyledActivityIndicator color={Colors.PrimaryDark} />
        </LoginBox>
      </FrontImageBackground>      
    </MainContainer>
  );
};

export default LoadingUpdateView;
