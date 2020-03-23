import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import SlideSelector from "./components/SlideSelector.js";
import StationButton from "./components/StationButton.js";

export default ({ route, navigation }) => {
  //Parameters
  const { line } = route.params;
  const { lineFullName } = route.params;
  const { lineMutedColor } = route.params;
  const { lineHighlightedMutedColor } = route.params;

  //Variables for each line
  const [directions, setDirections] = useState(["a", "b"]);
  const [selectedDirection, setSelectedDirection] = useState("");
  const [branches, setBranches] = useState(["a", "b"]);
  const [destinations, setDestinations] = useState(["a", "b"]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [termini, setTermini] = useState([]);
  const [stations, setStations] = useState([]);
  const [stationInfo, setStationInfo] = useState([]);

  //Fetching line data from MBTA API
  useEffect(() => {
    fetch(
      `https://api-v3.mbta.com/stops?filter[route]=${line}&api_key=e9cca8f8775749b9b79e4bed57f6216c`
    )
      .then(data => data.json())
      .then(data => data?.data)
      .then(data => {
        let staInfo = [];
        for (let sta of data) {
          staInfo.push({
            id: sta.id,
            name: sta?.attributes?.name
          });
        }
        setStationInfo(staInfo);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api-v3.mbta.com/routes/${line}?api_key=e9cca8f8775749b9b79e4bed57f6216c`
    )
      .then(data => data.json())
      .then(data => data?.data?.attributes)
      .then(data => {
        setDirections(data?.direction_names);
        setSelectedDirection(data?.direction_names[0]);
        return data;
      })
      .then(data => {
        const branchesText = data?.direction_destinations;
        setDestinations(branchesText);
        let apiBranches = [];
        for (const dest of branchesText) {
          if (
            (dest.indexOf("/") != -1 || dest.indexOf(" or ") != -1) &&
            dest.indexOf("Forge Park/495") === -1 &&
            dest.indexOf("Middleborough/Lakeville") === -1
          ) {
            //Branches are split by '/' character
            apiBranches = dest.split("/");
            if (apiBranches.length === 1) {
              apiBranches = dest.split(" or ");
            }
          }
        }
        setBranches(apiBranches);
        setSelectedBranch(apiBranches[0]);
      });
  }, []);

  useEffect(() => {
    let terminus1, terminus2;
    let terminiNow = [];
    if (branches.length > 1) {
      if (
        (destinations[0].indexOf("/") != -1 ||
          destinations[0].indexOf(" or ") != -1) &&
        destinations[0].indexOf(selectedBranch) != -1
      ) {
        terminus1 = selectedBranch;
        terminus2 = destinations[1];
      } else {
        terminus1 = destinations[0];
        terminus2 = selectedBranch;
      }

      if (selectedDirection == directions[1]) {
        terminiNow.push(terminus1);
        terminiNow.push(terminus2);
        setTermini(terminiNow);
      } else {
        terminiNow.push(terminus2);
        terminiNow.push(terminus1);
        setTermini(terminiNow);
      }
    } else {
      if (selectedDirection == directions[1]) {
        setTermini(destinations);
      } else {
        const newTerms = [];
        newTerms.push(destinations[1]);
        newTerms.push(destinations[0]);
        setTermini(newTerms);
      }
    }
  }, [selectedBranch, selectedDirection]);

  useEffect(() => {
    let routeStr = `${termini[0]} - ${termini[1]}`;
    fetch(`https://api-v3.mbta.com/shapes?filter%5Broute%5D=${line}`)
      .then(data => data.json())
      .then(data => {
        let updatedStations = false;
        for (const shape of data?.data) {
          let shapeRouteName = shape?.attributes?.name;
          const indexOfVia = shapeRouteName.indexOf("via");
          if (indexOfVia !== -1) {
            shapeRouteName = shapeRouteName.substr(0, indexOfVia - 1);
          }

          if (
            (shapeRouteName.indexOf(
              routeStr
                .replace("Avenue", "Ave")
                .replace(" or Foxboro", "")
                .replace("Kingston or ", "")
            ) !== -1 ||
              shapeRouteName.indexOf(
                routeStr
                  .replace("Avenue", "Ave")
                  .replace("Fairmount", "Readville")
                  .replace(" or Foxboro", "")
              ) !== -1) &&
            shape?.attributes?.priority > 0
          ) {
            setStations(shape?.relationships?.stops?.data);
            updatedStations = true;
          }
        }

        if (!updatedStations) {
          for (const shape of data?.data) {
            let shapeRouteName = shape?.attributes?.name;
            const indexOfVia = shapeRouteName.indexOf("via");
            if (indexOfVia !== -1) {
              shapeRouteName = shapeRouteName.substr(0, indexOfVia - 1);
            }

            let firstPartFromAPI = shapeRouteName.split(" - ")[0];
            let firstPartFromSelection = routeStr.split(" - ")[0];

            if (firstPartFromAPI === firstPartFromSelection) {
              setStations(shape?.relationships?.stops?.data);
              updatedStations = true;
            }
          }
        }

        if (!updatedStations) {
          for (const shape of data?.data) {
            let shapeRouteName = shape?.attributes?.name;
            const indexOfVia = shapeRouteName.indexOf("via");
            if (indexOfVia !== -1) {
              shapeRouteName = shapeRouteName.substr(0, indexOfVia - 1);
            }

            let lastPartFromAPI = shapeRouteName.split(" - ")[1];
            let lastPartFromSelection = routeStr.split(" - ")[1];

            if (lastPartFromAPI === lastPartFromSelection) {
              setStations(shape?.relationships?.stops?.data);
              updatedStations = true;
            }
          }
        }
      });
  }, [termini]);

  function getStaNameFromId(s) {
    for (const sta of stationInfo) {
      if (sta.id === s.id) {
        return sta.name;
      }
    }
    return "NO NAME";
  }

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
      <View style={{ height: 10 }} />
      <Text style={subHeaderStyles}>Direction</Text>
      <SlideSelector
        bgColor={lineMutedColor}
        hlColor={lineHighlightedMutedColor}
        values={directions}
        selectedValue={selectedDirection}
        changeSelectedValue={setSelectedDirection}
      />
      {branches.length == 2 ? (
        <>
          <Text style={subHeaderStyles}>Branch</Text>
          <SlideSelector
            bgColor={lineMutedColor}
            hlColor={lineHighlightedMutedColor}
            values={branches}
            selectedValue={selectedBranch}
            changeSelectedValue={setSelectedBranch}
          />
          <View style={{ height: 10 }} />
        </>
      ) : (
        <></>
      )}

      <Text style={headerStyles}>Station Stops</Text>
      {stations.map(s => {
        if (getStaNameFromId(s) !== "NO NAME") {
          return (
            <StationButton
              key={s.id}
              color={lineMutedColor}
              text={getStaNameFromId(s)}
              whenPressed={() =>
                navigation.navigate("Station Screen", {
                  stationName: getStaNameFromId(s),
                  stationId: s.id,
                  lineColor: route.params.lineColor,
                  menuTitle: lineFullName
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
