import React from "react";
import { Text, View, ScrollView } from "react-native";
import LineButton from "./components/LineButton";

export default ({navigation}) => {
  return (
    <ScrollView
      style={{
        height: "100%",
        backgroundColor: "#F7FAFC",
        paddingLeft: 20,
        paddingTop: 15
      }}
    >
      <Text style={headerStyles}>MBTA Wiki</Text>
      <View
        style={{
          marginRight: 20,
          height: "100%"
        }}
      >
        <LineButton
          color="#FFC7C7"
          text="Red Line"
          image={require("./assets/TrainGlyphs/RedLineTrainGlyph.png")}
          whenPressed={() => navigation.navigate("Line Menu", {
            line: "Red",
            lineFullName: "Red Line",
            lineColor: "#DA291C",
            lineMutedColor: "#FFC7C7",
            lineHighlightedMutedColor: "#FF9D9D"
          })}
        />
        <LineButton
          color="#AFEAC7"
          text="Green Line"
          image={require("./assets/TrainGlyphs/GreenLineTrainGlyph.png")}
          whenPressed={() => navigation.navigate("Multi-Line Menu", {
            line: "Green",
            lineFullName: "Green Line",
            lineColor: "#00843D",
            lineMutedColor: "#AFEAC7",
            lineHighlightedMutedColor: "#4FD785",
            subLines: ["Green-B", "Green-C", "Green-D", "Green-E"],
            subLineTitles: ["B Branch", "C Branch", "D Branch", "E Branch"]
          })}
        />
        <LineButton
          color="#FFDCA7"
          text="Orange Line"
          image={require("./assets/TrainGlyphs/OrangeLineTrainGlyph.png")}
          whenPressed={() => navigation.navigate("Line Menu", {
            line: "Orange",
            lineFullName: "Orange Line",
            lineColor: "#ED8B00",
            lineMutedColor: "#FFDCA7",
            lineHighlightedMutedColor: "#FEC36A"
          })}
        />
        <LineButton
          color="#B1DAFF"
          text="Blue Line"
          image={require("./assets/TrainGlyphs/BlueLineTrainGlyph.png")}
          whenPressed={() => navigation.navigate("Line Menu", {
            line: "Blue",
            lineFullName: "Blue Line",
            lineColor: "#003DA5",
            lineMutedColor: "#B1DAFF",
            lineHighlightedMutedColor: "#57AEFF"
          })}
        />
        <LineButton
          color="#FFC7C7"
          text="Mattapan Line"
          image={require("./assets/TrainGlyphs/MattapanTrolleyGlyph.png")}
          whenPressed={() => navigation.navigate("Line Menu", {
            line: "Mattapan",
            lineFullName: "Mattapan Line",
            lineColor: "#DA291C",
            lineMutedColor: "#FFC7C7",
            lineHighlightedMutedColor: "#FF9D9D"
          })}
        />
        <LineButton
          color="#D4D7DA"
          text="Silver Line"
          image={require("./assets/TrainGlyphs/SilverLineBus.png")}
          whenPressed={() => navigation.navigate("Multi-Line Menu", {
            line: "Silver",
            lineFullName: "Silver Line",
            lineColor: "#7C878E",
            lineMutedColor: "#D4D7DA",
            lineHighlightedMutedColor: "#BCBEC0",
            subLines: ["741", "742", "743", "751", "749"],
            subLineTitles: ["SL1", "SL2", "SL3", "SL4", "SL5"]
          })}
        />
        <LineButton
          color="#F5B6FF"
          text="Commuter Rail"
          image={require("./assets/TrainGlyphs/CommuterRailTrainGlyph.png")}
          whenPressed={() => navigation.navigate("Multi-Line Menu", {
            line: "Commuter Rail",
            lineFullName: "Commuter Rail",
            lineColor: "#80276C",
            lineMutedColor: "#F5B6FF",
            lineHighlightedMutedColor: "#E55FFB",
            subLines: ["CR-Fairmount", "CR-Fitchburg", "CR-Worcester", "CR-Franklin", "CR-Greenbush", "CR-Haverhill", "CR-Kingston", "CR-Lowell", "CR-Middleborough", "CR-Needham", "CR-Newburyport", "CR-Providence"],
            subLineTitles: ["Fairmount Line", "Fitchburg Line", "Framingham/Worcester Line", "Franklin Line/Foxboro Pilot", "Greenbush Line", "Haverhill Line", "Kingston/Plymouth Line", "Lowell Line", "Middleborough/Lakeville Line", "Needham Line", "Newburyport/Rockport Line", "Providence/Stoughton Line"]
          })}
        />
        <LineButton
          color="#FFEAB6"
          text="Bus"
          image={require("./assets/TrainGlyphs/BusGlyph.png")}
          whenPressed={() => navigation.navigate("Bus Menu")}
        />
        {/* <LineButton
          color="#4A5568"
          text="More"
          textColor="#F7FAFC"
          image={require("./assets/TrainGlyphs/MoreGlyph.png")}
          whenPressed={() => navigation.navigate("More Menu")}
        /> */}
        <Text
          style={{
            fontSize: 16,
            marginTop: 10,
            fontWeight: "600",
            color: "#A0AEC0"
          }}
        >
          MBTA Wiki App v.0.1.5 — Created by Christian Bernier ©2020
        </Text>
      </View>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

const headerStyles = {
  fontSize: 48,
  fontWeight: "900",
  color: "#1A202C"
};
