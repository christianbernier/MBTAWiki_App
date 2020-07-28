import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import LineButton from "./components/LineButton.js";
import SearchBar from "./components/SearchBar.js";

export default ({ route, navigation }) => {
  const {darkMode} = route.params;

  const [busRoutes, setBusRoutes] = useState(["1", "2", "3"]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(`https://api-v3.mbta.com/routes?api_key=e9cca8f8775749b9b79e4bed57f6216c`)
    .then(data => data.json())
    .then(data => data?.data)
    .then(data => {
      let routesFromAPI = [];
      for(const route of data){
        if(["Red", "Mattapan", "Orange", "Blue", "741", "742", "743", "751", "749"].indexOf(route.id) !== -1){
          continue;
        } else if(route.id.indexOf("Green-") !== -1){
          continue;
        } else if(route.id.indexOf("CR-") !== -1){
          continue;
        } else if(route.id.indexOf("Boat-") !== -1){
          continue;
        }
        routesFromAPI.push(route.id);
      }
      setBusRoutes(routesFromAPI);
    })
  }, []);

  function betterName(r){
    switch(r){
      case "747": return "CT2";
      case "708": return "CT3";
      default: return `Route ${r}`;
    }
  }

  return (
    <ScrollView
      style={{
        height: "100%",
        backgroundColor: darkMode ? "#1A202C" : "#F7FAFC",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15
      }}
    >
      <View style={{ height: 20 }} />
      <SearchBar
        backgroundColor="#F9CA51"
        placeholderText="Search Routes"
        onChange={setQuery}
      />
      <View style={{ height: 30 }} />
      {busRoutes.map(r => {
        if(betterName(r).toLowerCase().indexOf(query.toLowerCase()) !== -1){
          return (
            <LineButton
              key={r}
              color="#FFEAB6"
              text={betterName(r)}
              whenPressed={() =>
                navigation.navigate("Line Menu", {
                  line: r,
                  lineFullName: betterName(r),
                  lineColor: "#FFC72C",
                  lineMutedColor: "#FFEAB6",
                  lineHighlightedMutedColor: "#F9CA51",
                  darkMode: darkMode
                })
              }
            />
          );
        }
      })}
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};
