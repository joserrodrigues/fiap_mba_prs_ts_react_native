import React, { FC, useState, useEffect } from "react";
import * as Location from "expo-location";
import MyPositionView from "./MyPositionView";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";
import { LocationObject, LocationSubscription } from "expo-location";
import { LatLng, MapEvent } from "react-native-maps";

type IProps = StackScreenProps<RootStackParamList, "MyInfo">;

const MyPositionController: FC<IProps> = ({ navigation }) => {
  let watchLocation:LocationSubscription;

  //Criando os states para buscar a informação
  const [position, setPosition] = useState<LatLng>({ latitude: 0, longitude: 0});
  const [statusPosition, setStatusPosition] = useState<number>(0);

  useEffect(() => {
    return () => {
      watchLocation?.remove();
    };
  }, []);

  const startGetGeoLocation = (type: number) => {
    setStatusPosition(1);
    setTimeout(async () => {
      //Verifica se o usuário já deu a permissão e, caso não tenha, solicita a permissão
      let { status } = await Location.requestForegroundPermissionsAsync();

      //Retorna o erro
      if (status !== "granted") {
        setStatusPosition(-1);
        return;
      }

      //Com o permissão em ordem, busca a posição do usuário assincronamente
      let currentPosition: LocationObject | null;
      if (type === 0) {
        currentPosition = await Location.getCurrentPositionAsync({});
      } else {
        currentPosition = await Location.getLastKnownPositionAsync({});
      }

      setPosition({
        latitude: currentPosition?.coords.latitude ?? 0,
        longitude: currentPosition?.coords.longitude ?? 0,
      });
      setStatusPosition(2);
    }, 1000);
  };

  const startToWatchLocation = async () => {
    
    watchLocation?.remove();    

    let currentPosition = await Location.getLastKnownPositionAsync({});
    setPosition({
        latitude: currentPosition?.coords.latitude ?? 0,
        longitude: currentPosition?.coords.longitude ?? 0,
    });
    setStatusPosition(2);

    watchLocation = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 200,
        mayShowUserSettingsDialog: true,
        timeInterval: 60,
      },
      (location) => {
        console.log(location);
        setPosition({
            latitude: location?.coords.latitude ?? 0,
            longitude: location?.coords.longitude ?? 0,
        })
        setStatusPosition(2);
      }
    );
  };

  const cleanInfo = () => {
    setStatusPosition(0);
  };

  const updatePosition = (coords: LatLng) => {
    setPosition({
        latitude: coords.latitude,
        longitude: coords.longitude,
    });

    // setPosition(coords)
    console.log(coords);
    
  };

  //Mostra o status/resultado na tela
  return (
    <MyPositionView
      position={position}
      statusPosition={statusPosition}
      startGetGeoLocation={startGetGeoLocation}
      startToWatchLocation={startToWatchLocation}
      cleanInfo={cleanInfo}
      updatePosition={updatePosition}
    />
  );
};

export default MyPositionController;
