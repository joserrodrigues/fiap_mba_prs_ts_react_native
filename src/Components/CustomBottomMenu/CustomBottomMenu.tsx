import React, { FC } from "react";
import Colors from "../../Styles/Colors";
import { Text, BottomSheet, ListItem, Icon } from "react-native-elements";
import {
  BottomSheetItemText,
  BottomSheetCancelItemText,
} from "./CustomBottomMenuStyles";
import { View } from "react-native";

export type ListOption = {
  title: string;
  icon: string;
  return: number;
};

type IProps = {
  pickImage: (type: number) => Promise<void>;
  showPhotoOptions: boolean;
  toggleCameraOptions: () => void;
  listItems: ListOption[];
};

const CustomBottomMenu: FC<IProps> = ({
  pickImage,
  showPhotoOptions,
  toggleCameraOptions,
  listItems,
}) => {
  let arrayItems: React.ReactNode[] = [];
  let ind = 0;
  listItems.forEach((item) => {
    let itemBox = (
      <ListItem
        key={ind}
        tvParallaxProperties={undefined}
        hasTVPreferredFocus={false}
        onPress={() => pickImage(item.return)}
      >
        <Icon
          name={item.icon}
          type="font-awesome"
          color={Colors.NeutralDark}
          size={20}
          tvParallaxProperties={undefined}
        />
        <ListItem.Content>
          <ListItem.Title>
            <BottomSheetItemText>{item.title}</BottomSheetItemText>
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
    arrayItems.push(itemBox);
    ind++;
  });
  return (
    <BottomSheet modalProps={{}} isVisible={showPhotoOptions}>
      {arrayItems}
      <ListItem
        tvParallaxProperties={undefined}
        hasTVPreferredFocus={false}
        onPress={toggleCameraOptions}
      >
        <Icon
          name="times"
          type="font-awesome"
          color={Colors.PrimaryDark}
          size={20}
          tvParallaxProperties={undefined}
        />
        <ListItem.Content>
          <ListItem.Title>
            <BottomSheetCancelItemText>Cancelar</BottomSheetCancelItemText>
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </BottomSheet>
  );
};

export default CustomBottomMenu;
