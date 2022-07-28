import React, { FC } from "react";
import DetailView from "./DetailView";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";
import IPerson from "../../Interfaces/IPerson";

type iProps = StackScreenProps<RootStackParamList, "Details">;

const DetailController:FC<iProps> = ({ navigation, route }) => {

  let objectItem = null;
  if (route && route.params) {
    const { info } = route.params;
    objectItem = JSON.parse(info) as IPerson;
  }
  
  return <DetailView navigation={navigation} objectItem={objectItem} />;
};

export default DetailController;
