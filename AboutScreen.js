import React, { useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";

export default ({ route, navigation }) => {
  const { darkMode } = route.params;

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
        MBTA Wiki App
      </Text>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "400",
          marginTop: 5,
          color: darkMode ? "#F7FAFC" : "#1A202C",
        }}
      >
        Version 0.2.3
      </Text>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "800",
          marginTop: 30,
          color: darkMode ? "#F7FAFC" : "#1A202C",
        }}
      >
        About this app
      </Text>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "500",
          marginTop: 10,
          color: darkMode ? "#F7FAFC" : "#1A202C",
        }}
      >
        This app was created by Christian Bernier and has been in development since March 2020. The purpose of this app is to be a mobile version of the MBTA Wiki website, accessible at mbtawiki.com.
        This app has information about every line and station on the MBTA network. Use station pages to find information on when trains and buses will arrive and save your favorites for easy access.
      </Text>

      <Text
        style={{
          fontSize: 32,
          fontWeight: "800",
          marginTop: 30,
          color: darkMode ? "#F7FAFC" : "#1A202C",
        }}
      >
        What's new in 0.2.2/0.2.3?
      </Text>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "500",
          marginTop: 10,
          color: darkMode ? "#F7FAFC" : "#1A202C",
        }}
      >
        0.2.2 adds icons for lines in prediction lists, adds capacity icons for supported bus routes, and updates predictions live, every second. 0.2.3 fixed a small bug with positioning the capacity icons.
      </Text>

      <Text
        style={{
          fontSize: 32,
          fontWeight: "800",
          marginTop: 30,
          color: darkMode ? "#F7FAFC" : "#1A202C",
        }}
      >
        Suggest an idea/Contact
      </Text>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "500",
          marginTop: 10,
          color: darkMode ? "#F7FAFC" : "#1A202C",
        }}
      >
        I would love to hear your ideas for this app! If you have any features you'd like me to add, please email me at christian@cbernier.com and I will try my best to get back to you as soon as possible.
      </Text>

      <Text
        style={{
          fontSize: 32,
          fontWeight: "800",
          marginTop: 30,
          color: darkMode ? "#F7FAFC" : "#1A202C",
        }}
      >
        Report a bug
      </Text>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "500",
          marginTop: 10,
          color: darkMode ? "#F7FAFC" : "#1A202C",
        }}
      >
        This app has grown into quite a large project, making checking every page impossible for me to do every version update. If you find what you believe to be a bug, please report it by emailng bug@cbernier.com.
      </Text>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
};
