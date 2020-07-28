import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "./HomeScreen.js";
import LineMenu from "./LineMenu.js";
import StationScreen from "./StationScreen.js";
import MultiLineMenu from "./MultiLineMenu.js";
import BusMenu from "./BusMenu.js";
import FavoritesMenu from "./FavoritesMenu.js";
import PredictionScreen from "./PredictionScreen.js";
import AboutScreen from "./AboutScreen.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#2D3748"
            },
            headerTitleStyle: {
              fontSize: 21,
              color: "#F7FAFC"
            }
          }}
        />
        <Stack.Screen
          name="Line Menu"
          component={LineMenu}
          options={
            ({ route }) => ({ 
              title: route.params.lineFullName + " Menu",
              headerStyle: {
                backgroundColor: route.params.lineColor
              },
              headerTitleStyle: {
                fontSize: 21,
                color: "#F7FAFC"
              },
              headerTintColor: "#F7FAFC",
              headerBackTitle: "Home",
              headerBackTitleVisible: !((route.params.lineFullName + " Menu").length > 20)
            })
            
          }
        />
        <Stack.Screen
          name="Multi-Line Menu"
          component={MultiLineMenu}
          options={
            ({ route }) => ({ 
              title: route.params.lineFullName + " Menu",
              headerStyle: {
                backgroundColor: route.params.lineColor
              },
              headerTitleStyle: {
                fontSize: 21,
                color: "#F7FAFC"
              },
              headerTintColor: "#F7FAFC",
              headerBackTitle: "Home"
            })
          }
        />
        <Stack.Screen
          name="Bus Menu"
          component={BusMenu}
          options={
            ({ route }) => ({ 
              title: "Bus Menu",
              headerStyle: {
                backgroundColor: "#FFC72C"
              },
              headerTitleStyle: {
                fontSize: 21,
                color: "#F7FAFC"
              },
              headerTintColor: "#F7FAFC",
              headerBackTitle: "Home"
            })
          }
        />
        <Stack.Screen
          name="Favorites Menu"
          component={FavoritesMenu}
          options={
            ({ route }) => ({ 
              title: "My Favorites",
              headerStyle: {
                backgroundColor: "#4A5568"
              },
              headerTitleStyle: {
                fontSize: 21,
                color: "#F7FAFC"
              },
              headerTintColor: "#F7FAFC",
              headerBackTitle: "Home"
            })
          }
        />
        <Stack.Screen
          name="Station Screen"
          component={StationScreen}
          options={
            ({ route }) => ({ 
              title: route.params.stationName,
              headerStyle: {
                backgroundColor: route.params.lineColor
              },
              headerTitleStyle: {
                fontSize: 21,
                color: "#F7FAFC"
              },
              headerTintColor: "#F7FAFC",
              headerBackTitle: route.params.menuTitle
            })
            
          }
        />
        <Stack.Screen
          name="Prediction Screen"
          component={PredictionScreen}
          options={
            ({ route }) => ({ 
              title: route.params.predictionTitle,
              headerStyle: {
                backgroundColor: route.params.lineColor
              },
              headerTitleStyle: {
                fontSize: 21,
                color: "#F7FAFC"
              },
              headerTintColor: "#F7FAFC",
              headerBackTitle: route.params.menuTitle
            })
          }
        />
        <Stack.Screen
          name="About Screen"
          component={AboutScreen}
          options={
            ({ route }) => ({ 
              title: "About",
              headerStyle: {
                backgroundColor: "#2D3748"
              },
              headerTitleStyle: {
                fontSize: 21,
                color: "#F7FAFC"
              },
              headerTintColor: "#F7FAFC",
              headerBackTitle: "Home"
            })
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
