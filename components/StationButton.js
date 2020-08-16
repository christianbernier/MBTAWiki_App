import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default ({ color, text, whenPressed }) => {

  return (
    <TouchableOpacity
      style={{
        backgroundColor: color,
        borderRadius: 15,
        minHeight: 65,
        marginTop: 20,
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 10,
        paddingBottom: 10
      }}
      onPress={() => whenPressed()}
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
        <Text
          style={{
            fontSize: 36,
            fontWeight: "900",
            color: "#1A202C"
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
