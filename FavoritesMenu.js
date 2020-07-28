import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import StationButton from "./components/StationButton";
import AsyncStorage from "@react-native-community/async-storage";

export default ({ route, navigation }) => {
  const { darkMode } = route.params;

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFromStorage = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("user_favorites");
        if (storedFavorites !== null) {
          setFavorites(JSON.parse(storedFavorites));
        } else {
          setFavorites([]);
        }
      } catch (e) {
        console.log("Error fetching favorites");
        console.error(e);
      }
    };

    fetchFromStorage();
  }, []);

  async function removeAllFavorites() {
    Alert.alert(
      "Confirm deletion",
      "Are you sure you'd like to delete all your favorites?",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("cancelled");
          },
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            console.log("deleting...");
            try {
              await AsyncStorage.setItem("user_favorites", JSON.stringify([]));
              setFavorites([]);
            } catch (e) {
              console.log("Error resetting favorites");
              console.error(e);
            }
          },
          style: "destructive",
        },
      ]
    );
  }

  return (
    <ScrollView
      style={{
        height: "100%",
        backgroundColor: (darkMode) ? "#1A202C" : "#F7FAFC",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
      }}
    >

      {favorites.map((favorite) => {
        return (
          <StationButton
            key={favorite.name}
            color={favorite.lineMutedColor}
            text={favorite.name}
            whenPressed={() =>
              navigation.navigate("Station Screen", {
                stationName: favorite.name,
                stationId: favorite.id,
                lineColor: favorite.lineColor,
                lineMutedColor: favorite.lineMutedColor,
                menuTitle: "My Favorites",
                darkMode: darkMode
              })
            }
          />
        );
      })}
      {favorites.length > 0 ? (
        <>
          <View style={{ height: 20 }} />
          <StationButton
            key="remove_all_favorites"
            color="#CBD5E0"
            text="Delete all favorites"
            whenPressed={() => removeAllFavorites()}
          />
        </>
      ) : (
        <Text
          style={{
            fontSize: 24,
            marginTop: 10,
            fontWeight: "600",
            color: (darkMode) ? "#F7FAFC" : "#1A202C"
          }}
        >
          You don't have any favorites. Visit station pages to save your favorites.
        </Text>
      )}
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};
