import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";

export default ({ lat, lon, color }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color,
        borderRadius: 15,
        height: 50,
        marginTop: 10
      }}
      onPress={() => Linking.openURL(`https://maps.apple.com/?ll=${lat},${lon}&z=18`)}
    >
      <View
        style={{
          height: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row"
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "900",
            color: "#F7FAFC"
          }}
        >
          Open in Maps
        </Text>
      </View>
    </TouchableOpacity>
  );
};
