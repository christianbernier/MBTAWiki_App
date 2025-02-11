import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default ({ bgColor, hlColor, values, selectedValue, changeSelectedValue }) => {
  return (
    <View
      style={{
        backgroundColor: bgColor,
        width: "auto",
        height: 35,
        minHeight: 35,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 15
      }}
    >
      {values.map(v => {
        return (
          <TouchableOpacity 
            key={v}
            style={{
              backgroundColor: (v === selectedValue) ? hlColor : bgColor,
              width: "50%",
              height: "100%",
              paddingTop: 5,
              paddingBottom: 5,
              justifyContent: "center",
              borderRadius: 10,
              alignItems: "center",
            }}
            onPress={() => changeSelectedValue(v)}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "800",
                color: "#1A202C"
              }}
            >{v}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
