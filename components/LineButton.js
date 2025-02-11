import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default ({ color, text, image, whenPressed, textColor }) => {

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
        {(image) ? 
        (
          <Image
            style={{
              width: 50,
              height: 55,
              resizeMode: "contain",
              marginLeft: 18,
              marginRight: 15
            }}
            source={image}
          />
        ) : (
          <View
            style={{
              width: 25
            }}
          />
        )}
        

        <Text
          style={{
            fontSize: 36,
            fontWeight: "900",
            width: (image) ? "80%" : "95%",
            color: (textColor || "#1A202C"),
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
