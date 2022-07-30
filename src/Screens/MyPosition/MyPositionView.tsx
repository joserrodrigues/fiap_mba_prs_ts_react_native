import React, { FC } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { AllScreenStyledButton } from "../../Styles/ButtonStyle";
import Colors from "../../Styles/Colors";
import {
  MainContainer,
  ItemsInfo,
  TitleText,
  DetailText,
  ActivityIndicatorStyled,
  ContainerMap,
} from "./MyPositionStyles";
import DrawerMenu from "../../Components/DrawerMenu/DrawerMenu";
import { LocationObject } from "expo-location";
import MapView, { LatLng, MapEvent, Marker } from "react-native-maps";

type IProps = {
  position: LatLng;
  statusPosition: number;
  startGetGeoLocation: (type: number) => void;
  startToWatchLocation: () => Promise<void>;
  cleanInfo: () => void;
  updatePosition: (coords: LatLng) => void;
};
const MyPositionView: FC<IProps> = ({
  position,
  statusPosition,
  startGetGeoLocation,
  startToWatchLocation,
  cleanInfo,
  updatePosition,
}) => {
  let infoBox = null;

  //Organiza o texto se está buscando
  if (statusPosition === 0) {
    infoBox = (
      <>
        <AllScreenStyledButton
          title="Verificar Posição"
          onPress={() => startGetGeoLocation(0)}
        />
        <AllScreenStyledButton
          title="Verificar Ultima Posição"
          onPress={() => startGetGeoLocation(1)}
        />
        <AllScreenStyledButton
          title="Monitorar Posição"
          onPress={startToWatchLocation}
        />
      </>
    );
  } else if (statusPosition === 1) {
    infoBox = (
      <ActivityIndicatorStyled size="large" color={Colors.PrimaryDark} />
    );
  } else if (statusPosition === 2) {
    let info = "";
    if (position) {
      info =
        "Latitude = " +
            position.latitude +
        " - Longitude = " +
            position.longitude;
    }
    infoBox = (
      <>
        <ItemsInfo>
          <TitleText>Latitude: </TitleText>
          <DetailText>{position.latitude}</DetailText>
        </ItemsInfo>
        <ItemsInfo>
          <TitleText>Longitude: </TitleText>
          <DetailText>{position.longitude}</DetailText>
        </ItemsInfo>
        <AllScreenStyledButton title="Recarregar" onPress={cleanInfo} />
        <ContainerMap>
          <MapView
            style={{flex: 1 }}
            initialRegion={{
              latitude: position.latitude,
              longitude: position.longitude,
              latitudeDelta: 0.0092,
              longitudeDelta: 0.0091,
            }}
          >
            <Marker
              draggable
              coordinate={{
                latitude: position.latitude,
                longitude: position.longitude,
              }}
              title={"Posição Atual"}
              description={"Descrição da Posição"}
              onDragEnd={(e) => updatePosition(e.nativeEvent.coordinate)}
            />
          </MapView>
        </ContainerMap>
      </>
    );
  } else {
    let info = "";
    if (position) {
      info =
        "Latitude = " +
        position.latitude +
        " - Longitude = " +
        position.longitude
    }
    infoBox = (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 25, color: "red" }}>{info}</Text>
      </View>
    );
  }

  return (
    <MainContainer>
      <DrawerMenu />
      {infoBox}
    </MainContainer>
  );
};

export default MyPositionView;
