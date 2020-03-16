import React from "react";
import {TextInput} from "react-native";

export default ({backgroundColor, placeholderText, onChange}) => {
  return(
    <TextInput
      style={{
        width: "100%",
        height: 65,
        borderRadius: 15,
        backgroundColor: backgroundColor,
        color: "#F7FAFC",
        fontSize: 24,
        paddingLeft: 18,
        paddingRight: 18,
        fontWeight: "700"
      }}
      placeholder={placeholderText}
      placeholderTextColor="#FFEAB6"
      onChangeText={text => onChange(text)}
    />
  )
}