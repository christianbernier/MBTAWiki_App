import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MiniImage from "./MiniImage";

export default ({
  sta,
  staFullName,
  lineColor,
  lineMutedColor,
  menuTitle,
  navigation,
  darkMode,
}) => {
  const [predictions, setPredictions] = useState([
    {
      line: "No predictions",
      type: "",
      displayLine: "No predictions",
      lineColor: "transparent",
      show: true,
      destinations: [
        {
          destination: "",
          times: [],
          timesTypes: [],
          tripIDs: [],
          capacities: [],
        },
      ],
    },
  ]);

  const [rawPredictions, setRawPredictions] = useState([]);
  const [routesAdded, setRoutesAdded] = useState(false);
  const [destsAdded, setDestsAdded] = useState(false);
  const [dispsAdded, setDispsAdded] = useState(false);
  const [addCapacities, setAddCapacities] = useState(false);
  const [updateTimes, setUpdateTimes] = useState(0);
  const [loadingDepartures, setLoadingDepartures] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setUpdateTimes(Math.random());
    }, 1000);
  }, []);

  let tripsAdded = [];

  useEffect(() => {
    if (predictions.length > 1) {
      setPredictions([
        {
          line: "No predictions",
          type: "",
          displayLine: "No predictions",
          lineColor: "transparent",
          show: true,
          destinations: [],
        },
      ]);
    }

    fetch(
      `https://api-v3.mbta.com/predictions?filter[stop]=${sta}&sort=time&api_key=e9cca8f8775749b9b79e4bed57f6216c`
    )
      .then((data) => data.json())
      .then((data) => setRawPredictions(data?.data));
  }, []);

  useEffect(() => {
    let predictionsNow = JSON.parse(JSON.stringify(predictions));
    for (const prediction of rawPredictions) {
      const route = prediction?.relationships?.route?.data?.id;
      let routeAdded = false;
      for (const pred of predictionsNow) {
        if (pred.line === route) {
          routeAdded = true;
        }
      }

      if (!routeAdded) {
        let lineColor, type;

        if (route.indexOf("CR-") !== -1) {
          lineColor = "#80276C";
          type = "cr";
        } else if (route === "Red") {
          lineColor = "#DA291C";
          type = "red";
        } else if (route == "Mattapan") {
          lineColor = "#DA291C";
          type = "mattapan";
        } else if (route === "Orange") {
          lineColor = "#ED8B00";
          type = "orange";
        } else if (route === "Blue") {
          lineColor = "#003DA5";
          type = "blue";
        } else if (route.indexOf("Green-") !== -1) {
          lineColor = "#00843D";
          type = "green";
        } else if (
          ["741", "742", "743", "751", "749", "746"].indexOf(route) !== -1
        ) {
          lineColor = "#7C878E";
          type = "silver";
        } else {
          lineColor = "#FFC72C";
          type = "bus";
        }

        predictionsNow.push({
          line: route,
          type: type,
          displayLine: "",
          show: true,
          lineColor: lineColor,
          destinations: [],
        });
      }
    }

    if (predictionsNow.length > 1) {
      predictionsNow[0].line = "";
      predictionsNow[0].show = false;
    }

    setPredictions([]);
    setPredictions(predictionsNow);
    setTimeout(() => setRoutesAdded(true), 500);
  }, [rawPredictions]);

  useEffect(() => {
    const fetchRouteName = async () => {
      if (routesAdded) {
        let predictionsNow = JSON.parse(JSON.stringify(predictions));
        for (let pred of predictionsNow) {
          if (pred.line) {
            await fetch(
              `https://api-v3.mbta.com/routes/${pred.line}?api_key=e9cca8f8775749b9b79e4bed57f6216c`
            )
              .then((data) => data.json())
              .then((data) => {
                if (data.data.attributes.short_name) {
                  if (
                    data.data.attributes.short_name ==
                    parseInt(data.data.attributes.short_name)
                  ) {
                    pred.displayLine =
                      "Route " + data.data.attributes.short_name;
                  } else {
                    pred.displayLine = data.data.attributes.short_name;
                    if (["B", "C", "D", "E"].indexOf(pred.displayLine) !== -1) {
                      pred.displayLine = `Green Line ${pred.displayLine} Branch`;
                    }
                  }
                } else {
                  pred.displayLine = data.data.attributes.long_name;
                }
              });
          }
        }
        setPredictions([]);
        setPredictions(predictionsNow);
        setTimeout(() => setDispsAdded(true), 500);
      }
    };

    fetchRouteName();
  }, [routesAdded]);

  useEffect(() => {
    if (dispsAdded) {
      let predictionsNow = JSON.parse(JSON.stringify(predictions));
      for (const pred of rawPredictions) {
        const route = pred.relationships.route.data.id;
        let destination = "";
        fetch(
          `https://api-v3.mbta.com/trips/${pred.relationships.trip.data.id}?api_key=e9cca8f8775749b9b79e4bed57f6216c`
        )
          .then((data) => data.json())
          .then((data) => {
            if (!data.errors) {
              destination = data?.data?.attributes?.headsign;
              let destExists = false;
              for (const prediction of predictionsNow) {
                if (prediction.line === route) {
                  for (const dest of prediction.destinations) {
                    if (dest.destination === destination) {
                      destExists = true;
                    }
                  }
                }
              }
              if (!destExists && destination.indexOf(staFullName) === -1) {
                for (let i = 0; i < predictionsNow.length; i++) {
                  if (predictionsNow[i].line === route) {
                    predictionsNow[i].destinations.push({
                      destination: destination,
                      times: [],
                      timesTypes: [],
                      tripIDs: [],
                      capacities: [],
                    });
                  }
                }
              }
              if (destination.indexOf(staFullName) === -1) {
                for (let i = 0; i < predictionsNow.length; i++) {
                  if (predictionsNow[i].line === route) {
                    for (
                      let j = 0;
                      j < predictionsNow[i].destinations.length;
                      j++
                    ) {
                      if (
                        destination ===
                        predictionsNow[i].destinations[j].destination
                      ) {
                        predictionsNow[i].destinations[j].tripIDs.push(
                          pred.relationships.trip.data.id
                        );
                        predictionsNow[i].destinations[j].capacities.push(0);
                      }
                    }
                  }
                }
              }
              if (pred === rawPredictions[rawPredictions.length - 1]) {
                setPredictions(predictionsNow);
                setDestsAdded(true);
              }
            }
          });
      }
    }
  }, [dispsAdded]);

  function prettyTime(t, type) {
    if (type === "s") {
      return t;
    }

    let time = new Date(t);
    let now = new Date();
    let secondsUntil = (time - now) / 1000;

    if (type === "a" && secondsUntil < 45) {
      return "Arriving";
    } else if (type === "d" && secondsUntil < 30) {
      return "Boarding";
    }

    let minutesUntil = parseInt(secondsUntil / 60 + 0.5);

    if (minutesUntil < 60) {
      return minutesUntil + " min";
    }

    let hoursUntil = parseInt(minutesUntil / 60);
    minutesUntil %= 60;

    let returnStr = `${hoursUntil} hour${hoursUntil === 1 ? "" : "s"}`;
    if (minutesUntil != 0) {
      returnStr += ", " + minutesUntil + " min";
    }

    return returnStr;
  }

  useEffect(() => {
    if (destsAdded) {
      let predictionsNow = JSON.parse(JSON.stringify(predictions));

      for (const pred of rawPredictions) {
        let time = null;
        let timeType = "";
        const arrivalTime = pred?.attributes?.arrival_time;
        const departureTime = pred?.attributes?.departure_time;
        const status = pred?.attributes?.status;

        if (status && status != null) {
          time = status;
          timeType = "s";
        } else if (arrivalTime && departureTime) {
          // time = prettyTime(arrivalTime, "a");
          time = arrivalTime;
          timeType = "a";
        } else if (departureTime && !arrivalTime) {
          // time = prettyTime(departureTime, "d");
          time = departureTime;
          timeType = "d";
        }

        if (time === null) {
          continue;
        }

        for (let i = 0; i < predictionsNow.length; i++) {
          for (let j = 0; j < predictionsNow[i].destinations.length; j++) {
            for (
              let k = 0;
              k < predictionsNow[i].destinations[j].tripIDs.length;
              k++
            ) {
              if (
                predictionsNow[i].destinations[j].tripIDs[k] ===
                pred.relationships.trip.data.id
              ) {
                if (
                  predictionsNow[i].destinations[j].times.indexOf(time) ===
                    -1 &&
                  tripsAdded.indexOf(pred.relationships.trip.data.id) === -1
                ) {
                  predictionsNow[i].destinations[j].times.push(time);
                  predictionsNow[i].destinations[j].timesTypes.push(timeType);
                  tripsAdded.push(pred.relationships.trip.data.id);
                  break;
                }
              }
            }
          }
        }

        let shouldShow = false;
        for (let i = 0; i < predictionsNow.length; i++) {
          for (let j = 0; j < predictionsNow[i].destinations.length; j++) {
            if (predictionsNow[i].destinations[j].times.length !== 0) {
              shouldShow = true;
            }
          }
          predictionsNow[i].show = shouldShow;
          shouldShow = false;
        }
      }

      setPredictions(predictionsNow);
      setLoadingDepartures(predictionsNow.length === 1);
      setAddCapacities(true);
    }
  }, [destsAdded]);

  useEffect(() => {
    const getVehicle = async () => {
      let predictionsNow = JSON.parse(JSON.stringify(predictions));
      for (let i = 0; i < predictionsNow.length; i++) {
        for (
          let j = 0;
          j < predictionsNow[i].destinations[0].tripIDs.length;
          j++
        ) {
          const thisTripID = predictionsNow[i].destinations[0].tripIDs[j];
          await fetch(
            `https://api-v3.mbta.com/vehicles?filter[trip]=${thisTripID}&api_key=e9cca8f8775749b9b79e4bed57f6216c`
          )
            .then((data) => data.json())
            .then((data) => {
              if (data.data.length > 0) {
                if (data.data[0].attributes.occupancy_status) {
                  let crowding = "";

                  switch (data.data[0].attributes.occupancy_status) {
                    case "MANY_SEATS_AVAILABLE":
                      crowding = 1;
                      break;
                    case "FEW_SEATS_AVAILABLE":
                      crowding = 2;
                      break;
                    case "FULL":
                      crowding = 3;
                      break;
                    default:
                      crowding = 0;
                  }

                  predictionsNow[i].destinations[0].capacities[j] = crowding;
                }
              }
            });
        }
      }

      setPredictions(predictionsNow);
      
    };

    getVehicle();
  }, [addCapacities]);

  function fixBusRouteName(route) {
    if (route == parseInt(route)) {
      return "Route " + route;
    }
    return route;
  }

  return (
    <View
      style={{
        minHeight: 40,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          color: darkMode ? "#F7FAFC" : "#1A202C",
        }}
      >
        {loadingDepartures ? "Loading predictions..." : ""}
      </Text>
      {predictions.map((e) => {
        return (
          <View
            key={e.line}
            style={{
              width: "100%",
              display: e.show && e.destinations.length > 0 ? "" : "none",
            }}
          >
            <View
              style={{
                borderBottomColor: e.lineColor,
                borderBottomWidth: 3,
                paddingTop: 10,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "700",
                  color: darkMode ? "#F7FAFC" : "#1A202C",
                }}
              >
                {e.destinations.length > 0
                  ? fixBusRouteName(e.displayLine)
                  : ""}
              </Text>
              <MiniImage type={e.type} />
            </View>
            {e.destinations.map((d) => {
              return (
                <View
                  key={d.destination}
                  style={{
                    width: "100%",
                    marginTop: 5,
                    flex: 1,
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: "200%",
                    }}
                    onPress={() =>
                      navigation.navigate("Prediction Screen", {
                        predictionTitle: "Prediction",
                        lineColor: e.lineColor,
                        lineMutedColor: lineMutedColor,
                        menuTitle: d.destination,
                        lineName: e.displayLine,
                        destinationName: d.destination,
                        nextTripID: d.tripIDs[0],
                        darkMode: darkMode,
                      })
                    }
                  >
                    <View
                      style={{
                        width: "50%",
                        minHeight: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "700",
                          color: darkMode ? "#F7FAFC" : "#1A202C",
                        }}
                      >
                        {d.destination}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        minHeight: 20,
                      }}
                    >
                      {d.times.map((t, predictionIndex) => {
                        return (
                          <View
                            key={d.destination + "-" + t + "-" + Math.random()}
                            style={{
                              display: "flex",
                              flexDirection: "row-reverse",
                              alignItems: "flex-end",
                              height: 21,
                            }}
                          >
                            <MiniImage
                              type={`crowding-${d.capacities[predictionIndex]}`}
                            />

                            <Text
                              style={{
                                fontSize: 18,
                                fontWeight: t === d.times[0] ? "700" : "400",
                                color: darkMode ? "#F7FAFC" : "#1A202C",
                                height: "140%",
                              }}
                            >
                              {prettyTime(t, d.timesTypes[predictionIndex])}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};
