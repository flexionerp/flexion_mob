import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Dimensions, Image } from "react-native";
import { COLORS, FONTS, Url } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HTML from "react-native-render-html";

export const MessagesBody = ({ navigation, route }) => {
  const { title, senderName, senderAddress, dateTime, body, subject } = route.params;
  const handleLinkPress = (event, href) => {
    if (href.startsWith("cid:")) {
      // Handle the "cid" reference here
      // You can load the image from your data source or take any custom action
      // Example: If you have a mapping of cid references to image data
      const cidReference = href.substring(4); // Remove "cid:" prefix
      const imageData = getImageDataForCidReference(cidReference); // Replace with your logic
      if (imageData) {
        // Handle the image data as needed
        // You can display it, save it, or perform any other action
        // For example, if you want to display the image, you can render it as an Image component
        return (
          <Image
            source={{ uri: `data:image/png;base64,${imageData}` }} // Adjust the image data format and type as needed
            style={{ width: 20, height: 20 }}
          />
        );
      }
    }

    // Handle other types of links here if needed
    // For regular URLs, you can open them in a browser or perform custom actions
    return null;
  };

  // Replace this with your logic to fetch image data based on the cid reference
  const getImageDataForCidReference = (cidReference) => {
    // Implement logic to retrieve image data based on the cid reference
    // This can involve querying your data source or other methods
    // Return the image data or null if not found
    return null; // Replace with your implementation
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label={title} />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
          <View style={{ flexDirection: "row", marginTop: RFPercentage(3), width: "90%", justifyContent: "flex-start", alignItems: "center" }}>
            <Text style={{ fontSize: RFPercentage(2), fontFamily: FONTS.Medium, color: "grey" }}>Detailed</Text>
            <MaterialCommunityIcons name="email-multiple-outline" style={{ marginLeft: RFPercentage(1), fontSize: RFPercentage(2.9) }} color={"grey"} />
          </View>
          <View style={{ width: "90%", marginTop: RFPercentage(3) }}>
            <Text style={{ fontSize: RFPercentage(2.1), color: "black", fontFamily: FONTS.Medium, lineHeight: RFPercentage(2.8) }}>{subject}</Text>
            <Text style={{ marginTop: RFPercentage(2), fontSize: RFPercentage(1.9), color: "grey", fontFamily: FONTS.Regular, lineHeight: RFPercentage(2.8) }}>
              {senderName}-({senderAddress}) - {dateTime}
            </Text>
          </View>

          {/* Saperation */}
          <View style={{ marginTop: RFPercentage(3), width: "90%", height: RFPercentage(0.1), backgroundColor: "lightgrey" }} />

          {/* Body Of Email */}
          <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row", marginTop: RFPercentage(3) }}>
            <View style={{ width: "90%", alignSelf: "flex-start", alignItems: "flex-start" }}>
              <HTML source={{ html: body }} contentWidth={Dimensions.get("window").width} onLinkPress={handleLinkPress} />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: RFPercentage(10) }} />
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
