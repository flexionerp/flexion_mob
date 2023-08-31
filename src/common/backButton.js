import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS, FONTS, ICONS, SCREEN_WIDTH } from "../constants";

export function BackButton({ navigation, label }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={ICONS.backios} style={{ width: 16, height: 16, marginTop: 5 }} resizeMode={"contain"} />
      </TouchableOpacity>
      <Text style={styles.labelStyle}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "88%",
    height: 30,
    flexDirection: "row",
    alignSelf: "center",
  },
  labelStyle: {
    color: COLORS.boldText,
    fontSize: SCREEN_WIDTH * 0.043,
    fontFamily: FONTS.SemiBold,
    marginLeft: 8,
  },
});
