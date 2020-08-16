import React, { useState, useEffect } from "react";
import { View, Text, Linking, TouchableOpacity } from "react-native";

export default ({ darkMode, line, lineMutedColor, lineLinkColor, Link }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setAlerts([]);
    fetch(
      `https://api-v3.mbta.com/alerts?filter[route]=${line}&sort=lifecycle&api_key=e9cca8f8775749b9b79e4bed57f6216c`
    )
      .then((data) => data.json())
      .then((data) => {
        let currentAlerts = JSON.parse(JSON.stringify(alerts));

        for (const alert of data.data) {
          const effect = alert.attributes.effect;
          let effectWords = effect.split("_");
          let finalEffectWords = [];
          for (let word of effectWords) {
            word = word.toLowerCase();
            word = word.substr(0, 1).toUpperCase() + word.substr(1);
            finalEffectWords.push(word);
          }
          let finalEffect = "";
          for (let i = 0; i < finalEffectWords.length; i++) {
            finalEffect += finalEffectWords[i];
            if (i < finalEffectWords.length - 1) {
              finalEffect += " ";
            }
          }

          currentAlerts.push({
            title: finalEffect,
            body: alert.attributes.url
              ? `${alert.attributes.header} ${alert.attributes.url}`
              : alert.attributes.header,
            id: alert.id,
            link: alert.attributes.url,
          });
        }

        setAlerts(currentAlerts);
      });
  }, []);


  if (alerts.length > 0) {
    return (
      <View>
        {alerts.map((a) => {
          return a.link ? (
            <TouchableOpacity
              key={a.id}
              style={{
                backgroundColor: lineMutedColor,
                borderRadius: 15,
                minHeight: 65,
                marginTop: 20,
                paddingLeft: 18,
                paddingRight: 18,
                paddingTop: 10,
                paddingBottom: 10,
              }}
              onPress={() => Linking.openURL(a.link)}
            >
              <View
                style={{
                  height: "100%",
                  flex: 1,
                  alignItems: "stretch",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Text
                  style={{
                    fontSize: 36,
                    fontWeight: "900",
                    color: "#1A202C"
                  }}
                >
                  {a.title}
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "600",
                    color: "#1A202C"
                  }}
                >
                  {a.body}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View
              key={a.id}
              style={{
                backgroundColor: lineMutedColor,
                borderRadius: 15,
                minHeight: 65,
                marginTop: 20,
                paddingLeft: 18,
                paddingRight: 18,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <View
                style={{
                  height: "100%",
                  flex: 1,
                  alignItems: "stretch",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Text
                  style={{
                    fontSize: 36,
                    fontWeight: "900",
                    color: "#1A202C"
                  }}
                >
                  {a.title}
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "600",
                    color: "#1A202C"
                  }}
                >
                  {a.body}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  } else {
    return (
      <Text
        style={{
          fontSize: 22,
          fontWeight: "600",
          marginTop: 10,
          color: darkMode ? "#F7FAFC" : "#1A202C"
        }}
      >
        No alerts.
      </Text>
    );
  }
};
