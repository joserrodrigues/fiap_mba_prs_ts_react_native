import Colors from "../../Styles/Colors";
import styled from "styled-components/native";

export const BottomSheetItemText = styled.Text`
  font-size: 18px;
  color: ${Colors.NeutralDark};
`;

export const BottomSheetCancelItemText = styled(BottomSheetItemText)`
  color: ${Colors.PrimaryDark};
`;