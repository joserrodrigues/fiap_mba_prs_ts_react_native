import { FC } from "react";
import { AirbnbRating, Avatar, Badge } from "react-native-elements";
import { Container, Box, Title, CustomBox, StyledButton } from "./AppStyle";

const App: FC = () => {
  return (
    <Container>
      <Box>
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
        <Title>Teste Título</Title>
        <Box>
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
        </Box>
        <StyledButton
          title={"React Native Elements"}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
        />
        <CustomBox color="#f2c8f2" />
      </Box>
    </Container>
  );
};

export default App;
