import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default ({ sta, staFullName }) => {
  const [predictions, setPredictions] = useState([
    {
      line: "No predictions",
      displayLine: "No predictions",
      lineColor: "transparent",
      show: true,
      destinations: [
        {
          destination: "",
          times: [],
          tripIDs: []
        }
      ]
    }
  ]);

  const [rawPredictions, setRawPredictions] = useState([]);
  const [routesAdded, setRoutesAdded] = useState(false);
  const [destsAdded, setDestsAdded] = useState(false);

  useEffect(() => {
    if(predictions.length > 1){
      setPredictions([
        {
          line: "No predictions",
          displayLine: "No predictions",
          lineColor: "transparent",
          show: true,
          destinations: []
        }
      ]);
    }

    fetch(
      `https://api-v3.mbta.com/predictions?filter[stop]=${sta}&sort=time&api_key=e9cca8f8775749b9b79e4bed57f6216c`
    )
      .then(data => data.json())
      .then(data => setRawPredictions(data?.data));
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
        let lineColor;

        if(route.indexOf("CR-") !== -1){
          lineColor = "#80276C";
        } else if(route === "Red" || route === "Mattapan"){
          lineColor = "#DA291C";
        } else if(route === "Orange"){
          lineColor = "#ED8B00";
        } else if(route === "Blue"){
          lineColor = "#003DA5";
        } else if(route.indexOf("Green-") !== -1){
          lineColor = "#00843D";
        } else if(["741", "742", "743", "751", "749", "746"].indexOf(route) !== -1){
          lineColor = "#7C878E";
        } else{
          lineColor = "#FFC72C";
        }

        let displayLine = route;
        if(route.indexOf("CR-") !== -1){
          switch(route){
            case "CR-Worcester": displayLine = "Framingham/Worcester Line"; break;
            case "CR-Franklin": displayLine = "Franklin Line/Foxboro Pilot"; break;
            case "CR-Kingston": displayLine = "Kingston/Plymouth Line"; break;
            case "CR-Middleborough": displayLine = "Middleborough/Lakeville Line"; break;
            case "CR-Newburyport": displayLine = "Newburyport/Rockport Line"; break;
            case "CR-Providence": displayLine = "Providence/Stoughton Line"; break;
            default: displayLine = route.substr(3) + " Line";
          }
        } else if(route.indexOf("Green-") !== -1){
          displayLine = `Green Line ${route.substr(6)} Branch`
        } else if(["Red", "Blue", "Orange", "Mattapan"].indexOf(route) !== -1){
          displayLine = route + " Line";
        } else if(route === "741"){
          displayLine = "SL1";
        } else if(route === "742"){
          displayLine = "SL2";
        } else if(route === "743"){
          displayLine = "SL3";
        } else if(route === "751"){
          displayLine = "SL4";
        } else if(route === "749"){
          displayLine = "SL5";
        } else if(route === "746"){
          displayLine = "SL Shuttle";
        } else if(route === "747"){
          displayLine = "CT2";
        } else if(route === "708"){
          displayLine = "CT3";
        } else{
          displayLine = `Route ${route}`
        }

        predictionsNow.push({
          line: route,
          displayLine: displayLine,
          show: true,
          lineColor: lineColor,
          destinations: []
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
    if (routesAdded) {
      let predictionsNow = JSON.parse(JSON.stringify(predictions));
      for (const pred of rawPredictions) {
        const route = pred.relationships.route.data.id;
        let destination = "";
        fetch(
          `https://api-v3.mbta.com/trips/${pred.relationships.trip.data.id}?api_key=e9cca8f8775749b9b79e4bed57f6216c`
        )
          .then(data => data.json())
          .then(data => {
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
                    tripIDs: []
                  });
                }
              }
            }
            if(destination.indexOf(staFullName) === -1){
              for (let i = 0; i < predictionsNow.length; i++) {
                if (predictionsNow[i].line === route) {
                  for(let j = 0; j < predictionsNow[i].destinations.length; j++){
                    if(destination === predictionsNow[i].destinations[j].destination){
                      predictionsNow[i].destinations[j].tripIDs.push(pred.relationships.trip.data.id);
                    }
                  }
                }
              }
            }
            if (pred === rawPredictions[rawPredictions.length - 1]) {
              setPredictions(predictionsNow);
              setDestsAdded(true);
            }
          });
      }
    }
  }, [routesAdded]);

  function prettyTime(t, type){
    let time = new Date(t);
    let now = new Date();
    let secondsUntil = (time - now) / 1000;

    if(type === "a" && secondsUntil < 45){
      return "Arriving";
    } else if(type === "d" && secondsUntil < 30){
      return "Boarding";
    }

    let minutesUntil = parseInt((secondsUntil / 60) + 0.5);

    if(minutesUntil < 60){
      return (minutesUntil + " min");
    }

    let hoursUntil = parseInt(minutesUntil / 60);
    minutesUntil %= 60;

    let returnStr = `${hoursUntil} hour${(hoursUntil === 1) ? "" : "s"}`;
    if(minutesUntil != 0){
      returnStr += ", " + minutesUntil + " min";
    }

    return returnStr;

  }

  useEffect(() => {
    if(destsAdded){
      let predictionsNow = JSON.parse(JSON.stringify(predictions));

      for(const pred of rawPredictions){
        let time = null;
        const arrivalTime = pred?.attributes?.arrival_time;
        const departureTime = pred?.attributes?.departure_time;
        const status = pred?.attributes?.status;

        if(status && status != null){
          time = status;
        } else if(arrivalTime && departureTime){
          time = prettyTime(arrivalTime, "a");
        } else if(departureTime && !arrivalTime){
          time = prettyTime(departureTime, "d");
        }

        if(time === null){
          continue;
        }

        for(let i = 0; i < predictionsNow.length; i++){
          for(let j = 0; j < predictionsNow[i].destinations.length; j++){
            for(let k = 0; k < predictionsNow[i].destinations[j].tripIDs.length; k++){
              if(predictionsNow[i].destinations[j].tripIDs[k] === pred.relationships.trip.data.id){
                if(predictionsNow[i].destinations[j].times.indexOf(time) === -1){
                  predictionsNow[i].destinations[j].times.push(time);
                }
                continue;
              }
            }
          }
        }
        
      }

      setPredictions(predictionsNow);
    }
  }, [destsAdded]);

  return (
    <View
      style={{
        minHeight: 40
      }}
    >
      {predictions.map(e => {
        return (
          <View
            key={e.line}
            style={{
              width: "100%",
              display: (e.show && e.destinations.length > 0) ? "" : "none"
            }}
          >
            <View
              style={{
                borderBottomColor: e.lineColor,
                borderBottomWidth: 3,
                paddingTop: 10
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "700"
                }}
              >
                {(e.destinations.length > 0) ? e.displayLine : ""}
              </Text>
            </View>
            {e.destinations.map(d => {
              return (
                <View
                  key={d.destination}
                  style={{
                    width: "100%",
                    marginTop: 5,
                    flex: 1,
                    flexDirection: "row"
                  }}
                >
                  <View
                    style={{
                      width: "50%",
                      minHeight: 20
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "700"
                      }}
                    >
                      {d.destination}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "50%",
                      minHeight: 20
                    }}
                  >
                    {d.times.map(t => {
                      return (
                        <View key={d.destination + "-" + t + "-" + Math.random()}>
                          <Text
                            style={{
                              textAlign: "right",
                              fontSize: 18,
                              fontWeight: t === d.times[0] ? "700" : "400"
                            }}
                          >
                            {t}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};
