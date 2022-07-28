import React, { FC } from "react";
import { ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";
import DrawerMenu from "../../Components/DrawerMenu/DrawerMenu";

import {
  MainContainer,
  TextName,
  TextTitle,
  TextDetail,
  TextNoInfo,
  StyledImage,
} from "./DetailStyles";
import Person from "../../Interfaces/IPerson";

type iProps = {
  navigation: StackNavigationProp<RootStackParamList, "Details">;
  objectItem: Person | null;
};
const DetailView: FC<iProps> = ({ objectItem }) => {
  if (!objectItem) {
    return (
      <>
        <DrawerMenu />
        <TextNoInfo>Sem informações</TextNoInfo>
      </>
    );
  }
  return (
    <MainContainer>
      <ScrollView>
        <StyledImage source={{ uri: objectItem.image }} />
        <TextName>
          {objectItem.firstName} {objectItem.lastName}
        </TextName>
        <TextTitle>Endereço</TextTitle>
        <TextDetail>
          {objectItem.firstName} {objectItem.lastName}
        </TextDetail>
        <TextTitle>Ocupação</TextTitle>
        <TextDetail>{objectItem.jobTitle}</TextDetail>
        <TextTitle>Tipo</TextTitle>
        <TextDetail>
          {objectItem.jobType} / {objectItem.jobArea}
        </TextDetail>
        <TextTitle>Endereço</TextTitle>
        <TextDetail>{objectItem.address}</TextDetail>
        <TextDetail>{objectItem.zipCode}</TextDetail>
        <TextDetail>
          {objectItem.city} / {objectItem.state} / {objectItem.coutry}
        </TextDetail>
        <TextTitle>Telefone</TextTitle>
        <TextDetail>{objectItem.phone}</TextDetail>
      </ScrollView>
    </MainContainer>
  );
};

export default DetailView;
