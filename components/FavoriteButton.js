import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default ({ color, inFavorites, onClick }) => {
  return (
    <TouchableOpacity
    style={{
      backgroundColor: color,
      borderRadius: 15,
      minHeight: 85,
      marginTop: 20,
      paddingRight: 18,
      paddingTop: 10,
      paddingBottom: 10
    }}
    onPress={() => onClick()}
  >
    <View
      style={{
        height: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "stretch",
        flexDirection: "row"
      }}
    >
      <Image
          style={{
            width: 50,
            height: 55,
            resizeMode: "contain",
            marginLeft: 18,
            marginRight: 15
          }}
          source={require("./../assets/TrainGlyphs/FavoritesGlyph.png")}
        />
      

      <Text
        style={{
          fontSize: 36,
          fontWeight: "900",
          width: "80%",
          color: "black",
        }}
      >
        {(inFavorites) ? "Remove from favorites" : "Add to favorites"}
      </Text>
    </View>
  </TouchableOpacity>
  );
};
