import React, { useLayoutEffect, FC } from "react";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import Colors from "../../Styles/Colors";
import { RootDrawerParamList } from "../../Routes/RouteController";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

const DrawerMenu: FC = () => {

  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList,"Main">>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{ padding: 5 }}
        >
          <Icon
            name="bars"
            type="font-awesome"
            size={20}
            tvParallaxProperties={undefined}
            color={Colors.HeaderTintColor}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return null;
};

export default DrawerMenu;
