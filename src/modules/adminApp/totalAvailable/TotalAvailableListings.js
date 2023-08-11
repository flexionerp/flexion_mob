import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from "react-native";
import { COLORS, FONTS, ICONS, SCREEN_WIDTH } from "../../../constants";
import { RFPercentage } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";
import { BackButton } from "../../../common/backButton";
import { useSelector } from "react-redux";
import { Url } from "../../../constants";
import axios from "axios";

export const TotalAvailableListings = ({ navigation, route }) => {
  const { userDetail } = useSelector((state) => state.user);
  const { unitID } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
        <BackButton navigation={navigation} label="Total Available Listings" />
        <Text>{unitID}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.secondry,
  },
});
