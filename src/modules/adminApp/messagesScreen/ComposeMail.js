import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Modal, Image, Alert, ActivityIndicator } from "react-native";
import { COLORS, FONTS, Url } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import PDFView from "react-native-pdf";

export const ComposeMail = ({ navigation, route }) => {
  const lead_email = route.params?.lead_email;
  const lead_id = route.params?.lead_id;
  const [isLoading, setIsLoading] = useState(false);

  const [showButton, setShowButton] = useState(false);
  const toggleShowButton = () => {
    setShowButton(!showButton);
  };

  // Menu
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const [isMenuVisible2, setIsMenuVisible2] = useState(false);
  const toggleMenu2 = () => {
    setIsMenuVisible2(!isMenuVisible2);
  };

  const [isMenuVisible3, setIsMenuVisible3] = useState(false);
  const toggleMenu3 = () => {
    setIsMenuVisible3(!isMenuVisible3);
  };

  // Email Main Body Message
  const [message, setMessage] = useState("");

  const handleMessageChange = (text) => {
    setMessage(text);
  };

  const [cc, setCC] = useState("");
  const [subject, setSubject] = useState("");

  // Send Email
  const sendEmail = async () => {
    if (!subject || !message) {
      Alert.alert("Error", "Kindly Fill Both Subject and Message Body", [{ text: "OK", onPress: () => console.log("OK Pressed") }]);
      return;
    }
    try {
      setIsLoading(true);

      const apiUrl = `${Url}send_lead_email_api`;
      const to = lead_email;
      const ccParam = cc || "";
      const subjectParam = encodeURIComponent(subject);
      const lead_idParam = lead_id;
      const mailbodyParam = encodeURIComponent(message);

      const url = `${apiUrl}?to=${to}&cc=${ccParam}&subject=${subjectParam}&lead_id=${lead_idParam}&mailbody=${mailbodyParam}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);

      if (response.ok) {
        console.log("Email sent successfully");
        Alert.alert("Success", "Email sent successfully", [{ text: "OK", onPress: () => navigation.goBack() }]);
      } else {
        const errorMessage = `Error sending email. Status Code: ${response.status}`;
        console.error(errorMessage);

        Alert.alert("Error", errorMessage, [{ text: "OK", onPress: () => console.log("OK Pressed") }]);

        const responseText = await response.text();
        console.error("Response Body:", responseText);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while sending the email", [{ text: "OK", onPress: () => console.log("OK Pressed") }]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label="Lead Details" />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <View style={styles.menuContainer2}>
            {/*Lead Name */}
            <View style={{ marginTop: RFPercentage(1), width: "90%", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row" }}>
              <TouchableOpacity activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "flex-start" }}>
                <Text style={{ fontSize: RFPercentage(2.1), color: "#06143b", fontFamily: FONTS.Medium }}>From</Text>
                <Text style={{ fontSize: RFPercentage(1.8), color: "grey", fontFamily: FONTS.Medium }}>info@fakhruddinproperties.com</Text>
              </TouchableOpacity>
            </View>
            {/* Saperation */}
            <View style={{ marginTop: RFPercentage(2), width: "100%", height: RFPercentage(0.1), backgroundColor: "lightgrey" }} />
            <View style={{ marginTop: RFPercentage(2), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
              <Text style={{ fontSize: RFPercentage(1.8), color: "grey", fontFamily: FONTS.Medium }}>To:</Text>
              {/* <TextInput placeholder="" style={{ fontFamily: FONTS.Regular, color: "black", marginLeft: RFPercentage(1), width: "100%" }} /> */}
              <Text style={{ fontSize: RFPercentage(1.8), color: "black", fontFamily: FONTS.Medium }}> {lead_email ? lead_email : "No email added"}</Text>
            </View>
            <View style={{ marginTop: RFPercentage(2), width: "100%", height: RFPercentage(0.1), backgroundColor: "lightgrey" }} />
            <View style={{ marginTop: RFPercentage(2), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
              <Text style={{ fontSize: RFPercentage(1.8), color: "grey", fontFamily: FONTS.Medium }}>Cc (Optional):</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                value={cc}
                onChangeText={(text) => setCC(text)}
                style={{ fontFamily: FONTS.Regular, color: "black", marginLeft: RFPercentage(1), width: "100%" }}
              />
            </View>
            <View style={{ marginTop: RFPercentage(2), width: "100%", height: RFPercentage(0.1), backgroundColor: "lightgrey" }} />
            {/* Subject */}
            <View style={{ marginTop: RFPercentage(2), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
              <Text style={{ fontSize: RFPercentage(1.8), color: "grey", fontFamily: FONTS.Medium }}>Subject:</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                value={subject}
                onChangeText={(text) => setSubject(text)}
                style={{ fontFamily: FONTS.Regular, color: "black", marginLeft: RFPercentage(1), width: "100%" }}
              />
            </View>
            {/* Saperation */}
            <View style={{ marginTop: RFPercentage(2), width: "100%", height: RFPercentage(0.1), backgroundColor: "lightgrey" }} />
            <View
              style={{
                marginTop: RFPercentage(2),
                width: "90%",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TextInput
                placeholder="Message"
                autoCapitalize="none"
                autoCorrect={false}
                multiline={true}
                style={{
                  fontFamily: FONTS.Regular,
                  color: "black",
                  width: "100%",
                }}
                value={message}
                onChangeText={handleMessageChange}
              />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: RFPercentage(18) }} />
      </ScrollView>

      {/* Bottom Actions */}
      <View style={{ width: "86%", position: "absolute", bottom: RFPercentage(16), justifyContent: "center", alignItems: "center", flexDirection: "row", alignSelf: "center" }}>
        {/* <TouchableOpacity activeOpacity={0.8}>
          <Entypo name="attachment" style={{ fontSize: RFPercentage(3.4) }} color={"#06143b"} />
        </TouchableOpacity> */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setMessage("");
          }}
          style={{
            position: "absolute",
            left: 0,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: RFPercentage(16),
            height: RFPercentage(6),
            borderRadius: RFPercentage(2),
            backgroundColor: COLORS.primary,
          }}
        >
          <MaterialCommunityIcons name="delete-sweep-outline" style={{ fontSize: RFPercentage(3.5) }} color={"white"} />
          <Text style={{ marginLeft: RFPercentage(0.5), fontSize: RFPercentage(2), color: "white", fontFamily: FONTS.Medium }}>Discard</Text>
        </TouchableOpacity>
        {isLoading && <ActivityIndicator size="large" color="#06143b" />}
        <TouchableOpacity
          onPress={sendEmail}
          activeOpacity={0.8}
          style={{
            position: "absolute",
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: RFPercentage(14),
            height: RFPercentage(6),
            borderRadius: RFPercentage(2),
            backgroundColor: COLORS.primary,
          }}
        >
          <FontAwesome name="send-o" style={{ fontSize: RFPercentage(2.6) }} color={"white"} />
          <Text style={{ marginLeft: RFPercentage(1), fontSize: RFPercentage(2), color: "white", fontFamily: FONTS.Medium }}>Send</Text>
        </TouchableOpacity>
      </View>
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
  menuContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "78%",
    height: "100%",
    backgroundColor: "white",
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  menuContainer2: {
    width: "100%",
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopLeftRadius: RFPercentage(3),
    borderTopRightRadius: RFPercentage(3),
  },

  dropDownView: {},
});
