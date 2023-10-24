import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { COLORS, FONTS, Url } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";

export const InboxMessagesScreen = ({ navigation, route }) => {
  const leadData = route.params?.leadData;

  const { title, heading, Lead_Email, Lead_ID, type } = route.params;
  const [menu, setMenu] = useState(false);
  const [inboxData, setInboxData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 6;

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * messagesPerPage;
  const endIndex = startIndex + messagesPerPage;

  const toggleMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    // Define the API URL
    const apiUrl = `${Url}mailbox_api?type=${type}&rid=0&E=${Lead_Email}&LEAD_ID=${Lead_ID}`;
    setLoading(true);

    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Set the inbox data in state
        setInboxData(data);
        // Log the result to the console
        setLoading(false);

        console.log("Mail API Response", data);
      })
      .catch((error) => {
        setLoading(false);

        console.error("Error fetching inbox data:", error);
      });
  }, []);

  const getRandomColor = () => {
    const colors = ["green", "#FF69B4", "#8A2BE2", "orange", "grey"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  // Render the inbox messages

  const renderInboxMessages = () => {
    if (loading) {
      // Render a loader while loading
      return (
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: RFPercentage(4) }}>
          <ActivityIndicator size="large" color={COLORS.boldText} />
        </View>
      );
    }
    if (inboxData.length === 0) {
      // If the inboxData is empty, display a message
      return (
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: RFPercentage(4) }}>
          <Text style={{ fontSize: 16, color: "grey" }}>No Data To Show</Text>
        </View>
      );
    }
    const messagesToRender = inboxData.slice(startIndex, endIndex);

    return messagesToRender.map((message, index) => {
      const { subject, receivedDateTime, sender, toRecipients } = message;
      const toRecipientAddress = toRecipients[0]?.emailAddress?.address || "";
      const formattedDateTime = moment(receivedDateTime).format("DD-MM-YYYY hh:mm A");
      const boxColor = getRandomColor();

      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate("MessagesBody", {
              title: title,
              senderName: message.sender.emailAddress.name,
              senderAddress: message.sender.emailAddress.address,
              dateTime: formattedDateTime,
              body: message.body.content,
              subject: subject,
            })
          }
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "90%",
            marginTop: 25,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: boxColor,
            }}
          >
            {title == "Inbox" ? <Text style={{ color: "white", fontSize: 16 }}>IB</Text> : <Text style={{ color: "white", fontSize: 16 }}>SD</Text>}
          </View>
          <View
            style={{
              marginLeft: 10,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "85%",
            }}
          >
            <Text style={{ color: "black", fontSize: 14, fontFamily: FONTS.SemiBold }}>{subject}</Text>
            <Text style={{ color: "black", fontSize: 16, fontFamily: FONTS.Regular, marginTop: RFPercentage(0.5) }}>{toRecipientAddress}</Text>
            <Text style={{ color: "grey", fontSize: 14, fontFamily: FONTS.Light, marginTop: RFPercentage(0.5) }}>{formattedDateTime}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  const handlePagination = (direction) => {
    if (direction === "next" && endIndex < inboxData.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label="Lead Details" />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
          {/* Buttons */}
          <View style={{ marginTop: RFPercentage(3), width: "90%", justifyContent: "flex-start", alignItems: "flex-start", alignSelf: "center" }}>
            <TouchableOpacity
              // onPress={() => navigation.navigate("ComposeMail")}
              activeOpacity={0.8}
              style={{ borderRadius: RFPercentage(1.5), justifyContent: "center", alignItems: "center", width: RFPercentage(14), height: RFPercentage(5), backgroundColor: "grey" }}
            >
              <Text style={{ color: "#fff", fontFamily: FONTS.Medium }}>Compose</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => [
                navigation.navigate("SentMessagesScreen", {
                  title: "Send",
                  heading: "Recent Messages",
                  Lead_Email: Lead_Email,
                  Lead_ID: Lead_ID,
                  type: "send",
                }),
              ]}
              style={{
                marginTop: RFPercentage(2),
                borderRadius: RFPercentage(1.5),
                justifyContent: "center",
                alignItems: "center",
                width: RFPercentage(14),
                height: RFPercentage(5),
                backgroundColor: "grey",
                flexDirection: "row",
              }}
            >
              <FontAwesome name="send-o" style={{ fontSize: RFPercentage(2.2) }} color={"#fff"} />

              <Text style={{ marginLeft: RFPercentage(0.5), color: "#fff", fontFamily: FONTS.Medium }}>Sent</Text>
            </TouchableOpacity>
          </View>

          {/* Recent */}
          <View style={{ flexDirection: "row", marginTop: RFPercentage(4), width: "86%", justifyContent: "flex-start", alignItems: "center" }}>
            <Text style={{ fontSize: RFPercentage(2), fontFamily: FONTS.Medium, color: "grey" }}>{title}</Text>
            <MaterialCommunityIcons name="email-multiple-outline" style={{ marginLeft: RFPercentage(1), fontSize: RFPercentage(2.9) }} color={"grey"} />
          </View>
          {/* Messages Cart */}
          {renderInboxMessages()}
          <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", justifyContent: "center", marginTop: RFPercentage(5) }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => handlePagination("prev")} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Ionicons name="chevron-back" style={{ marginLeft: RFPercentage(1), fontSize: RFPercentage(2.9) }} color={"grey"} />
              <Text style={{ fontSize: 16, color: "grey" }}>Previous</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 16, color: "grey", marginLeft: RFPercentage(2) }}>{currentPage}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handlePagination("next")}
              style={{ marginLeft: RFPercentage(2), flexDirection: "row", justifyContent: "center", alignItems: "center" }}
            >
              <Text style={{ fontSize: 16, color: "grey" }}>Next</Text>
              <MaterialIcons name="navigate-next" style={{ fontSize: RFPercentage(2.9) }} color={"grey"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginBottom: RFPercentage(15) }} />
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
