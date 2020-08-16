import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";

export default ({ lat, lon, color }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color,
        borderRadius: 15,
        minHeight: 65,
        marginTop: 10,
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 10,
        paddingBottom: 10
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
            fontSize: 36,
            fontWeight: "900",
            color: "#1A202C"
          }}
        >
          Open in Maps
        </Text>
      </View>
    </TouchableOpacity>
  );
};
