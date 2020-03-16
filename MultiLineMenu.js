import React from "react";
import { View, ScrollView, Text } from "react-native";
import LineButton from "./components/LineButton";

export default ({ route, navigation }) => {
  const { lineFullName } = route.params;
  const { lineMutedColor } = route.params;
  const { lineHighlightedMutedColor } = route.params;
  const { subLines } = route.params;
  const { subLineTitles } = route.params;
  const { lineColor } = route.params;

  return (
    <ScrollView
      style={{
        height: "100%",
        backgroundColor: "#F7FAFC",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15
      }}
    >
      <Text style={headerStyles}>{lineFullName}</Text>
      {subLines.map((l, i) => {
        return(
          <LineButton
          color={lineMutedColor}
          text={subLineTitles[i]}
          key={l}
          whenPressed={() => navigation.navigate("Line Menu", {
            line: l,
            lineFullName: subLineTitles[i],
            lineColor: lineColor,
            lineMutedColor: lineMutedColor,
            lineHighlightedMutedColor: lineHighlightedMutedColor
          })}
        />
        )
      })}
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

const headerStyles = {
  fontSize: 48,
  fontWeight: "900",
  color: "#1A202C"
}
