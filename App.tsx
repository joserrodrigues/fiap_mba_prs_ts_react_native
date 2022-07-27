import { FC } from "react";
import { View } from "react-native";
import { AirbnbRating, Button, Avatar, Badge } from "react-native-elements";
import styles from "./AppStyle";

const App: FC = () => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.viewBox,
          {
            marginBottom: 30,
          },
        ]}
      >
        <AirbnbRating
          count={10}
          reviews={[
            "Terrible",
            "Bad",
            "Meh",
            "OK",
            "Good",
            "Hmm...",
            "Very Good",
            "Wow",
            "Amazing",
            "Unbelievable",
          ]}
          defaultRating={10}
          size={20}
        />
        <View>
          <Avatar
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/41.jpg" }}
            size={124}
          />
          <Badge
            value="99+"
            status="error"
            containerStyle={{ position: "absolute", top: 5, left: 0 }}
          />
        </View>
        <Button
          title={"React Native Elements"}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
        />
      </View>
    </View>
  );
};

export default App;