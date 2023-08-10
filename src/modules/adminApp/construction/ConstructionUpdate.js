import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLORS, ICONS, FONTS, SCREEN_WIDTH } from "../../../constants";
import { ProgressBarCustom } from "../../../common/progressBarCustom";
import { WebView } from "react-native-webview";

const ConstructionUpdate = () => {
  return (
    <SafeAreaView style={{ flex: 1, width: "100%" }}>
      <View style={{ width: "100%", height: "95%" }}>
        <WebView source={{ uri: "https://fakhruddinproperties.com/en/construction" }} startInLoadingState={true} />
      </View>
    </SafeAreaView>
  );
};

export default ConstructionUpdate;

const styles = StyleSheet.create({});
