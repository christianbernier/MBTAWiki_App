import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import MapButton from "./components/MapButton.js";
import FavoriteButton from "./components/FavoriteButton.js";
import Predictions from "./components/Predictions.js";
import AsyncStorage from "@react-native-community/async-storage";

export default ({ route, navigation }) => {
  const {
    stationId,
    stationName,
    lineColor,
    lineMutedColor,
    darkMode,
  } = route.params;

  const [stationInfo, setStationInfo] = useState({});
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [inFavorites, setInFavorites] = useState(false);

  useEffect(() => {
    fetch(
      `https://api-v3.mbta.com/stops/${stationId}?api_key=e9cca8f8775749b9b79e4bed57f6216c`
    )
      .then((data) => data.json())
      .then((data) => setStationInfo(data?.data));
  }, []);

  useEffect(() => {
    const checkIfInFavorites = async () => {
      let storedFavorites = await AsyncStorage.getItem("user_favorites");
      if (storedFavorites) {
        let found = false;
        for (const fav of JSON.parse(storedFavorites)) {
          if (fav.id === stationId) {
            found = true;
          }
        }

        setInFavorites(found);
      }
    };

    checkIfInFavorites();
  }, []);

  useEffect(() => {
    const data = JSON.parse(JSON.stringify(stationInfo));
    setLat(data?.attributes?.latitude);
    setLon(data?.attributes?.longitude);
  }, [stationInfo?.attributes]);

  const addToFavorites = async () => {
    if (inFavorites) {
      let storedFavorites = await AsyncStorage.getItem("user_favorites");
      let favObj = JSON.parse(storedFavorites);
      let indexOf = -1;
      for (let i = 0; i < favObj.length; i++) {
        if (favObj[i].id === stationId) {
          indexOf = i;
        }
      }

      if (indexOf !== -1) {
        favObj.splice(indexOf, 1);
        await AsyncStorage.setItem("user_favorites", JSON.stringify(favObj));
        setInFavorites(false);
      }
    } else {
      try {
        let storedFavorites = await AsyncStorage.getItem("user_favorites");
        if (storedFavorites !== null) {
          let currentFavorites = JSON.parse(storedFavorites);
          currentFavorites.push({
            type: "station",
            name: stationName,
            id: stationId,
            lineColor: lineColor,
            lineMutedColor: lineMutedColor,
          });
          await AsyncStorage.setItem(
            "user_favorites",
            JSON.stringify(currentFavorites)
          );
          setInFavorites(true);
        } else {
          await AsyncStorage.setItem(
            "user_favorites",
            JSON.stringify([
              {
                type: "station",
                name: stationName,
                id: stationId,
                lineColor: lineColor,
                lineMutedColor: lineMutedColor,
              },
            ])
          );
          setInFavorites(true);
        }
      } catch (e) {
        console.log("Error fetching favorites");
        console.error(e);
      }
    }
  };

  return (
    <ScrollView
      style={{
        height: "100%",
        backgroundColor: darkMode ? "#1A202C" : "#F7FAFC",
        paddingLeft: 20,
        paddingRight: 20,
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
        {stationName}
      </Text>
      <View style={{ height: 10 }} />
      <MapButton color="#718096" lat={lat} lon={lon} />
      <FavoriteButton
        color={lineMutedColor}
        inFavorites={inFavorites}
        onClick={() => addToFavorites()}
      />
      <View style={{ height: 10 }} />
      <Text
        style={{
          fontSize: 32,
          fontWeight: "900",
          color: darkMode ? "#F7FAFC" : "#1A202C",
        }}
      >
        Departures
      </Text>
      <Predictions
        sta={stationId}
        staFullName={stationName}
        lineColor={lineColor}
        lineMutedColor={lineMutedColor}
        menuTitle={stationName}
        navigation={navigation}
        darkMode={darkMode}
      />

      <View style={{ height: 50 }} />
    </ScrollView>
  );
};
