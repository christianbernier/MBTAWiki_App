import React, { useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";

export default ({ route, navigation }) => {
  const { darkMode, lineName, destinationName, nextTripID } = route.params;

  const [status, setStatus] = useState("");
  const [station, setStation] = useState("");
  const [stationName, setStationName] = useState("");
  const [crowdingData, setCrowdingData] = useState("");
  const [trainNumber, setTrainNumber] = useState(0);

  useEffect(() => {
    const getVehicle = async () => {
      fetch(
        `https://api-v3.mbta.com/vehicles?filter[trip]=${nextTripID}&api_key=e9cca8f8775749b9b79e4bed57f6216c`
      )
        .then((data) => data.json())
        .then((data) => {
          if (data.data.length > 0) {
            let statusString = data.data[0].attributes.current_status;
            let statusWords = statusString.split("_");
            let newStatusString = "";
            for (let i = 0; i < statusWords.length; i++) {
              newStatusString += statusWords[i].toLowerCase();
              if (i !== statusWords.length - 1) {
                newStatusString += " ";
              }
            }

            if (data.data[0].attributes.occupancy_status) {
              let crowding = "";

              switch (data.data[0].attributes.occupancy_status) {
                case "MANY_SEATS_AVAILABLE":
                  crowding = " is not crowded.";
                  break;
                case "FEW_SEATS_AVAILABLE":
                  crowding = " is somewhat crowded.";
                  break;
                case "FULL":
                  crowding = " is crowded.";
                  break;
                default:
                  crowding = "'s occupancy cannot be determined.";
              }

              setCrowdingData(crowding);
            }

            setStatus(newStatusString);
            setTrainNumber(data.data[0].attributes.label);
            setStation(data.data[0].relationships.stop.data.id);
          }
        });
    };

    getVehicle();
  }, []);

  useEffect(() => {
    const getStation = async () => {
      fetch(
        `https://api-v3.mbta.com/stops/${station}?api_key=e9cca8f8775749b9b79e4bed57f6216c`
      )
        .then((data) => data.json())
        .then((data) => {
          console.log(data.data.attributes.name);
          setStationName(data.data.attributes.name);
        });
    };

    getStation();
  }, [station]);

  function sentence() {
    if (trainNumber && stationName && status) {
      return `Vehicle #${trainNumber} is currently ${status} ${stationName}.`;
    } else if (stationName && status) {
      return `The next vehicle is currently ${status} ${stationName}.`;
    } else {
      return `Unable to get information about this trip. Please try again later.`;
    }
  }

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
        {lineName} to {destinationName}
      </Text>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "900",
          marginTop: 30,
          color: darkMode ? "#F7FAFC" : "#1A202C",
        }}
      >
        {sentence()}
      </Text>
      {crowdingData ? (
        <Text
          style={{
            fontSize: 32,
            fontWeight: "900",
            marginTop: 30,
            color: darkMode ? "#F7FAFC" : "#1A202C",
          }}
        >
          According to the MBTA, this vehicle{crowdingData}
        </Text>
      ) : (
        <Text
          style={{
            fontSize: 32,
            fontWeight: "900",
            marginTop: 30,
            color: darkMode ? "#F7FAFC" : "#1A202C",
          }}
        >
          The occupancy status of this vehicle is not currently being reported by the MBTA.
        </Text>
      )}
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};
