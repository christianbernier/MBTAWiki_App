import React from "react";
import { Image, View } from "react-native";

export default ({ type }) => {
  switch (type) {
    case "bus":
      return (
        <Image
          source={require(`./../assets/TrainGlyphs/BusGlyph.png`)}
          style={{
            width: 20,
            height: 22,
            marginBottom: 10,
            marginLeft: 5,
          }}
        />
      );
    case "red":
      return (
        <Image
          source={require(`./../assets/TrainGlyphs/RedLineTrainGlyph.png`)}
          style={{
            width: 23.5,
            height: 22,
            marginBottom: 10,
            marginLeft: 5,
          }}
        />
      );
    case "blue":
      return (
        <Image
          source={require(`./../assets/TrainGlyphs/BlueLineTrainGlyph.png`)}
          style={{
            width: 23.5,
            height: 22,
            marginBottom: 10,
            marginLeft: 5,
          }}
        />
      );
    case "green":
      return (
        <Image
          source={require(`./../assets/TrainGlyphs/GreenLineTrainGlyph.png`)}
          style={{
            width: 16,
            height: 22,
            marginBottom: 10,
            marginLeft: 5,
          }}
        />
      );
    case "orange":
      return (
        <Image
          source={require(`./../assets/TrainGlyphs/OrangeLineTrainGlyph.png`)}
          style={{
            width: 22,
            height: 22,
            marginBottom: 10,
            marginLeft: 5,
          }}
        />
      );
    case "silver":
      return (
        <Image
          source={require(`./../assets/TrainGlyphs/SilverLineBus.png`)}
          style={{
            width: 19,
            height: 22,
            marginBottom: 10,
            marginLeft: 5,
          }}
        />
      );
    case "mattapan":
      return (
        <Image
          source={require(`./../assets/TrainGlyphs/MattapanTrolleyGlyph.png`)}
          style={{
            width: 20,
            height: 22,
            marginBottom: 10,
            marginLeft: 5,
          }}
        />
      );
    case "cr":
      return (
        <Image
          source={require(`./../assets/TrainGlyphs/CommuterRailTrainGlyph.png`)}
          style={{
            width: 20,
            height: 22,
            marginBottom: 10,
            marginLeft: 5,
          }}
        />
      );
    case "crowding-1":
      return (
        <Image
          source={require(`./../assets/Crowding/crowding_1.png`)}
          style={{
            width: 24,
            height: 21,
            marginBottom: 10,
            marginLeft: 5,
          }}
        />
      );

    case "crowding-2":
      return (
        <Image
          source={require(`./../assets/Crowding/crowding_2.png`)}
          style={{
            width: 24,
            height: 21,
            marginBottom: 10,
            marginLeft: 5,
          }}
        />
      );

    case "crowding-3":
      return (
        <Image
          source={require(`./../assets/Crowding/crowding_3.png`)}
          style={{
            width: 24,
            height: 21,
            marginBottom: 10,
            marginLeft: 5,
          }}
        />
      );

    case "live-light":
      return (
        <Image
          source={require("./../assets/Live/live_light.png")}
          style={{
            width: 61.3125,
            height: 24.15,
            marginTop: 8,
          }}
        />
      );

    case "live-dark":
      return (
        <Image
          source={require("./../assets/Live/live_dark.png")}
          style={{
            width: 61.3125,
            height: 24.15,
            marginTop: 8,
          }}
        />
      );
    default:
      return (
        <View
          style={{
            height: 21,
            marginBottom: 10,
            marginLeft: 5,
          }}
        />
      );
  }
};
