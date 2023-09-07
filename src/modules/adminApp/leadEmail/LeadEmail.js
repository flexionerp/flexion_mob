import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground, ScrollView, TextInput, Button } from "react-native";
import { COLORS, FONTS } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export const LeadEmail = ({ navigation, route }) => {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label="Email Details" />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
          {/*Lead Name */}
          <TouchableOpacity activeOpacity={0.8} style={{ marginTop: RFPercentage(3), width: "90%", justifyContent: "center", alignItems: "center", flexDirection: "row", alignSelf: "center" }}>
            <Text style={{ fontSize: RFPercentage(2.5), color: "#06143b", fontWeight: "bold" }}>Lead Name</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={{ marginTop: RFPercentage(1.5), width: "90%", justifyContent: "center", alignItems: "center", flexDirection: "row", alignSelf: "center" }}>
            <Text style={{ fontSize: RFPercentage(2.5), color: "#06143b", fontWeight: "bold" }}>Lead Email</Text>
          </TouchableOpacity>

          {/* Compose Button */}
          <View style={{ marginTop: RFPercentage(5), width: "90%", justifyContent: "flex-start", alignItems: "flex-start", alignSelf: "center" }}>
            <TouchableOpacity
              onPress={() => toggleMenu()}
              activeOpacity={0.8}
              style={{ borderRadius: RFPercentage(1.5), backgroundColor: "#e0e0e0", width: RFPercentage(20), height: RFPercentage(5.5), justifyContent: "center", alignItems: "center" }}
            >
              <Text style={{ color: "#06143b", fontFamily: FONTS.Medium, fontSize: RFPercentage(1.8) }}>Compose</Text>
            </TouchableOpacity>
          </View>
          {/* Menu */}
          {menu ? (
            <View style={{ marginTop: RFPercentage(5), width: "80%", justifyContent: "flex-start", alignItems: "flex-start", alignSelf: "center" }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  flexDirection: "row",
                  borderRadius: RFPercentage(1.5),
                  borderColor: "#adadad",
                  borderWidth: RFPercentage(0.1),
                  width: RFPercentage(20),
                  height: RFPercentage(5.5),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="move-to-inbox" style={{ fontSize: RFPercentage(3.2) }} color={"#06143b"} />

                <Text style={{ marginLeft: RFPercentage(1.2), color: "#06143b", fontFamily: FONTS.Medium, fontSize: RFPercentage(1.8) }}>Inbox</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  flexDirection: "row",
                  borderRadius: RFPercentage(1.5),
                  borderColor: "#adadad",
                  borderWidth: RFPercentage(0.1),
                  width: RFPercentage(20),
                  height: RFPercentage(5.5),
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: RFPercentage(3),
                }}
              >
                <FontAwesome name="send-o" style={{ fontSize: RFPercentage(3) }} color={"#06143b"} />

                <Text style={{ marginLeft: RFPercentage(1.2), color: "#06143b", fontFamily: FONTS.Medium, fontSize: RFPercentage(1.8) }}>Sent</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View style={{ marginBottom: RFPercentage(20) }} />
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
  priceListingTextStyle: {
    fontSize: RFPercentage(1.5),
    color: "#06143b",
    fontWeight: "bold",
  },
  backgroundCartImage: {
    alignItems: "center",
    marginTop: RFPercentage(3),
    width: RFPercentage(45),
    height: RFPercentage(28),
    borderRadius: RFPercentage(1.8),
    borderColor: COLORS.borderColor,
    borderWidth: RFPercentage(0.1),
    overflow: "hidden",
  },
  subContainerCart: {
    width: "90%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  cartDetailsView: {
    marginTop: RFPercentage(4),
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  unitCodeStyle: {
    fontSize: RFPercentage(2.6),
    color: "#06143b",
    fontWeight: "bold",
  },
  floorIdText: {
    fontSize: RFPercentage(2),
    color: "#06143b",
    fontWeight: "bold",
    marginTop: RFPercentage(2),
  },
  priceTypeText: {
    fontSize: RFPercentage(1.7),
    color: "#455866",
    fontWeight: "bold",
  },
  priceAndUnitSpecsText: {
    fontSize: RFPercentage(1.7),
    color: "#455866",
    fontWeight: "bold",
    marginTop: RFPercentage(1.2),
  },
  priceListingButtonContainer: {
    position: "absolute",
    bottom: RFPercentage(4),
    right: RFPercentage(2),
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  priceListingButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 30,
    backgroundColor: "#87CEEB",
    borderRadius: 10,
  },
  dropDownView: {},
});
