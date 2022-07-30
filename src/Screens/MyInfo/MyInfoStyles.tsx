import styled from "styled-components/native";

export const MainContainer = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`;

export const KeyboardAvoidingViewContainer = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`;

export const ViewContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`;

export const ViewInfo = styled.View`
  flex: 2;
`;

export const FabStyle = styled.View`
    position: absolute;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    bottom: 30px;
    right: 30px;
`;