import React, {FC} from "react";
import {
  FlatList,
  View,
} from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";
import DrawerMenu from "../../Components/DrawerMenu/DrawerMenu";
import Colors from "../../Styles/Colors";
import IPerson from "../../Interfaces/IPerson";

import {
  ContainerItem,
  MainSafeAreaView,
  StyledActivityIndicator,
  TextNameStyle,
  TextsView,
  TextTitle,
  TextDetail,
  Separator,
  StyledImage,
} from "./HomeStyles";

type iProps = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
  dataConnection: IPerson[];
  isLoading: boolean;
  goToDetail: (item: IPerson) => void;
};

const HomeView:FC<iProps> = ({ navigation, dataConnection, isLoading, goToDetail }) => {
  const RenderItem = ({item}: {item: IPerson}) => {
    console.log(item)
    return (
      <ContainerItem
        onPress={() => goToDetail(item)}
      >
        <>
          <TextsView>
            <View>
              <StyledImage
                source={{ uri: item.image }}
              />
            </View>
            <View>
              <TextNameStyle>
                <TextTitle>
                  {item.firstName} {item.lastName}
                </TextTitle>
              </TextNameStyle>
              <TextNameStyle>
                <TextDetail>
                  {item.address} - {item.state} - {item.zipCode}
                </TextDetail>
              </TextNameStyle>
              <TextNameStyle>
                <TextDetail>{item.jobTitle}</TextDetail>
              </TextNameStyle>
            </View>
          </TextsView>
          <Separator />
        </>
      </ContainerItem>
    );
  };

  let loadingBox = null;
  if (isLoading) {
    loadingBox = (
      <StyledActivityIndicator
        size="large"
        color={Colors.PrimaryDark}
      />
    );
  }
  return (
    <MainSafeAreaView>
      <DrawerMenu />
      {loadingBox}
      <FlatList
        data={dataConnection}
        renderItem={({item}: { item: IPerson}) => <RenderItem item={item} />}
        keyExtractor={(item: IPerson) => item.CPF.toString()}
      />
    </MainSafeAreaView>
  );
};

export default HomeView;
