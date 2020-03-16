import React, {useState, useEffect} from "react";
import { View, Text, ScrollView, Image } from "react-native";
import MapButton from "./components/MapButton.js";
import Predictions from "./components/Predictions.js";

export default ({ route, navigation }) => {
  const { stationId, stationName } = route.params;

  const[stationInfo, setStationInfo] = useState({});
  const[lat, setLat] = useState(0);
  const[lon, setLon] = useState(0);

  useEffect(() => {
    fetch(`https://api-v3.mbta.com/stops/${stationId}?api_key=e9cca8f8775749b9b79e4bed57f6216c`)
    .then(data => data.json())
    .then(data => setStationInfo(data?.data))
  }, []);

  useEffect(() => {
    const data = JSON.parse(JSON.stringify(stationInfo));
    setLat(data?.attributes?.latitude);
    setLon(data?.attributes?.longitude);
  }, [stationInfo?.attributes])

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
      <Text style={headerStyles}>{stationName}</Text>
      <View style={{ height: 10 }} />
      <MapButton
        color="#718096"
        lat={lat}
        lon={lon}
      />
      <View style={{ height: 10 }} />
      <Text style={subHeaderStyles}>Departures</Text>
      <Predictions
        sta={stationId}
        staFullName={stationName}
      />
      {/* <Text style={subHeaderStyles}>Station Information</Text> */}
      
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

const headerStyles = {
  fontSize: 48,
  fontWeight: "900",
  color: "#1A202C"
};

const subHeaderStyles = {
  fontSize: 32,
  fontWeight: "900",
  color: "#1A202C"
};
