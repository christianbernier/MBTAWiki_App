import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Alert, TouchableOpacity } from "react-native";
import LineButton from "./components/LineButton";
import { DeviceMotion } from "expo-sensors";
import AsyncStorage from "@react-native-community/async-storage";

export default ({ navigation }) => {
  let sinceLastShakeCheck = 0;

  DeviceMotion.addListener(({ acceleration }) => {
    const totalAcceleration =
      Math.abs(acceleration.x) +
      Math.abs(acceleration.y) +
      Math.abs(acceleration.z);
    sinceLastShakeCheck++;

    if (totalAcceleration > 50 && sinceLastShakeCheck > 20) {
      DeviceMotion.removeAllListeners();
      sinceLastShakeCheck = 0;
      Alert.alert(
        "Surprise!",
        "You've discovered a secret! Would you like to toggle dark mode?",
        [
          {
            text: "No",
            onPress: () => {
              setUpdate(Math.random());
            },
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
              try {
                await AsyncStorage.setItem(
                  "user_dark_mode_preferred",
                  JSON.stringify(!darkMode)
                );
              } catch (e) {
                console.log("Error saving dark mode.");
                console.error(e);
              }
              setDarkMode(!darkMode);
            },
            style: "confirm",
          },
        ]
      );
    }
  });

  useEffect(() => {
    const getUserDarkMode = async () => {
      try {
        const darkModePreferenceFromStorage = await AsyncStorage.getItem(
          "user_dark_mode_preferred"
        );
        if (darkModePreferenceFromStorage !== null) {
          setDarkMode(JSON.parse(darkModePreferenceFromStorage));
        } else {
          setDarkMode(false);
        }
      } catch (e) {
        console.log("Error fetching dark mode");
        console.error(e);
      }
    };

    getUserDarkMode();
  }, []);

  const [darkMode, setDarkMode] = useState(false);
  const [update, setUpdate] = useState(0);

  return (
    <ScrollView
      style={{
        height: "100%",
        backgroundColor: darkMode ? "#1A202C" : "#F7FAFC",
        paddingLeft: 20,
        paddingTop: 15,
      }}
    >
      <Text
        style={{
          fontSize: 48,
          fontWeight: "900",
          color: darkMode ? "#F7FAFC" : "#1A202C",
        }}
      >
        MBTA Wiki
      </Text>
      <View
        style={{
          marginRight: 20,
          height: "100%",
        }}
      >
        <LineButton
          color="#CBD5E0"
          text="My Favorites"
          image={require("./assets/TrainGlyphs/FavoritesGlyph.png")}
          whenPressed={() =>
            navigation.navigate("Favorites Menu", {
              darkMode: darkMode,
            })
          }
        />
        <LineButton
          color="#FFC7C7"
          text="Red Line"
          image={require("./assets/TrainGlyphs/RedLineTrainGlyph.png")}
          whenPressed={() =>
            navigation.navigate("Line Menu", {
              line: "Red",
              lineFullName: "Red Line",
              lineColor: "#DA291C",
              lineMutedColor: "#FFC7C7",
              lineHighlightedMutedColor: "#FF9D9D",
              darkMode: darkMode,
            })
          }
        />
        <LineButton
          color="#AFEAC7"
          text="Green Line"
          image={require("./assets/TrainGlyphs/GreenLineTrainGlyph.png")}
          whenPressed={() =>
            navigation.navigate("Multi-Line Menu", {
              line: "Green",
              lineFullName: "Green Line",
              lineColor: "#00843D",
              lineMutedColor: "#AFEAC7",
              lineHighlightedMutedColor: "#4FD785",
              subLines: ["Green-B", "Green-C", "Green-D", "Green-E"],
              subLineTitles: ["B Branch", "C Branch", "D Branch", "E Branch"],
              darkMode: darkMode,
            })
          }
        />
        <LineButton
          color="#FFDCA7"
          text="Orange Line"
          image={require("./assets/TrainGlyphs/OrangeLineTrainGlyph.png")}
          whenPressed={() =>
            navigation.navigate("Line Menu", {
              line: "Orange",
              lineFullName: "Orange Line",
              lineColor: "#ED8B00",
              lineMutedColor: "#FFDCA7",
              lineHighlightedMutedColor: "#FEC36A",
              darkMode: darkMode,
            })
          }
        />
        <LineButton
          color="#B1DAFF"
          text="Blue Line"
          image={require("./assets/TrainGlyphs/BlueLineTrainGlyph.png")}
          whenPressed={() =>
            navigation.navigate("Line Menu", {
              line: "Blue",
              lineFullName: "Blue Line",
              lineColor: "#003DA5",
              lineMutedColor: "#B1DAFF",
              lineHighlightedMutedColor: "#57AEFF",
              darkMode: darkMode,
            })
          }
        />
        <LineButton
          color="#FFC7C7"
          text="Mattapan Line"
          image={require("./assets/TrainGlyphs/MattapanTrolleyGlyph.png")}
          whenPressed={() =>
            navigation.navigate("Line Menu", {
              line: "Mattapan",
              lineFullName: "Mattapan Line",
              lineColor: "#DA291C",
              lineMutedColor: "#FFC7C7",
              lineHighlightedMutedColor: "#FF9D9D",
              darkMode: darkMode,
            })
          }
        />
        <LineButton
          color="#D4D7DA"
          text="Silver Line"
          image={require("./assets/TrainGlyphs/SilverLineBus.png")}
          whenPressed={() =>
            navigation.navigate("Multi-Line Menu", {
              line: "Silver",
              lineFullName: "Silver Line",
              lineColor: "#7C878E",
              lineMutedColor: "#D4D7DA",
              lineHighlightedMutedColor: "#BCBEC0",
              subLines: ["741", "742", "743", "751", "749"],
              subLineTitles: ["SL1", "SL2", "SL3", "SL4", "SL5"],
              darkMode: darkMode,
            })
          }
        />
        <LineButton
          color="#F5B6FF"
          text="Commuter Rail"
          image={require("./assets/TrainGlyphs/CommuterRailTrainGlyph.png")}
          whenPressed={() =>
            navigation.navigate("Multi-Line Menu", {
              line: "Commuter Rail",
              lineFullName: "Commuter Rail",
              lineColor: "#80276C",
              lineMutedColor: "#F5B6FF",
              lineHighlightedMutedColor: "#E55FFB",
              subLines: [
                "CR-Fairmount",
                "CR-Fitchburg",
                "CR-Worcester",
                "CR-Franklin",
                "CR-Greenbush",
                "CR-Haverhill",
                "CR-Kingston",
                "CR-Lowell",
                "CR-Middleborough",
                "CR-Needham",
                "CR-Newburyport",
                "CR-Providence",
              ],
              subLineTitles: [
                "Fairmount Line",
                "Fitchburg Line",
                "Framingham/Worcester Line",
                "Franklin Line/Foxboro Pilot",
                "Greenbush Line",
                "Haverhill Line",
                "Kingston/Plymouth Line",
                "Lowell Line",
                "Middleborough/Lakeville Line",
                "Needham Line",
                "Newburyport/Rockport Line",
                "Providence/Stoughton Line",
              ],
              darkMode: darkMode,
            })
          }
        />
        <LineButton
          color="#FFEAB6"
          text="Bus"
          image={require("./assets/TrainGlyphs/BusGlyph.png")}
          whenPressed={() =>
            navigation.navigate("Bus Menu", {
              darkMode: darkMode,
            })
          }
        />
        <View style={{ height: 20 }} />
        <TouchableOpacity
          onPress={() => navigation.navigate("About Screen", {
            darkMode: darkMode
          })}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#A0AEC0",
            }}
          >
            MBTA Wiki App v.0.2.3 — Created by Christian Bernier ©2020
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};
