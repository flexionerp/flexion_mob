import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { COLORS, FONTS } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { Url } from "../../../constants";
import moment from "moment";

export const TimeLine = ({ navigation, route }) => {
  const [leadHistory, setLeadHistory] = useState(null);
  const { leadId, userName, createDate } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${Url}get_lead_history_api?lead_id=${leadId}`)
      .then((response) => {
        setLeadHistory(response.data);
        setIsLoading(false);
        console.log("\n\n\n\n\n\nHostory Data", response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("\n\n\n\n\nError fetching data:", error);
      });
  }, []);

  const filteredHistory = leadHistory?.filter((historyItem) => historyItem.AGENT_NAME !== null);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label="Timeline" />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
        {/* Body */}
        {isLoading ? (
          <View style={{ marginTop: RFPercentage(2), flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color={"#06143b"} />
          </View>
        ) : leadHistory === null ? (
          <View style={{ justifyContent: "center", alignItems: "center", width: "100%", marginTop: RFPercentage(3) }}>
            <Text style={{ fontSize: RFPercentage(2.2) }}>No History</Text>
          </View>
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center", width: "100%", marginTop: RFPercentage(3) }}>
            <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
              {leadHistory.map(
                (historyItem) =>
                  // Check if LEAD_TYPE_NAME is not empty
                  historyItem.LEAD_TYPE_NAME && (
                    <View
                      key={historyItem.HISTORY_ID}
                      style={{
                        left: RFPercentage(0.4),
                        alignSelf: "center",
                        width: "90%",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        flexDirection: "row",
                      }}
                    >
                      <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <MaterialCommunityIcons name="tag-outline" style={{ fontSize: RFPercentage(3.8) }} color={"#06143b"} />
                        <View style={{ width: RFPercentage(0.2), height: RFPercentage(11), backgroundColor: "lightgrey" }} />
                      </View>

                      <View style={{ marginLeft: RFPercentage(1), justifyContent: "center", alignItems: "flex-start", width: "90%" }}>
                        <Text style={{ fontSize: RFPercentage(1.8), fontFamily: FONTS.Regular, color: "black" }}>{`Lead Tag Changed from RealEstate to ${historyItem.LEAD_TYPE_NAME}`}</Text>
                        <Text style={{ marginTop: RFPercentage(0.5), fontSize: RFPercentage(1.8), fontFamily: FONTS.Regular, color: "grey" }}>
                          {`by ${historyItem.CREATED_BY} ${moment(historyItem.CREATED_ON).format("DD-MM-YYYY hh:mm A")}`}
                        </Text>
                      </View>
                    </View>
                  ),
              )}
            </View>

            {/* <View
              style={{
                left: RFPercentage(0.4),
                alignSelf: "center",
                width: "90%",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "row",
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Foundation name="page-edit" style={{ fontSize: RFPercentage(3.5) }} color={"#06143b"} />
                <View style={{ width: RFPercentage(0.2), height: RFPercentage(11), backgroundColor: "lightgrey" }} />
              </View>

              <View style={{ marginLeft: RFPercentage(1), justifyContent: "center", alignItems: "flex-start" }}>
                <Text style={{ fontSize: RFPercentage(1.8), fontFamily: FONTS.Regular, color: "black" }}>Notes Added</Text>
                <Text style={{ marginTop: RFPercentage(0.5), fontSize: RFPercentage(1.8), fontFamily: FONTS.Regular, color: "grey" }}>by Aldrin 19-Sep-2023 5:16 PM</Text>
              </View>
            </View> */}
            {/* <View
              style={{
                left: RFPercentage(0.4),
                alignSelf: "center",
                width: "90%",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "row",
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <MaterialCommunityIcons name="email" style={{ fontSize: RFPercentage(3.5) }} color={"#06143b"} />
                <View style={{ width: RFPercentage(0.2), height: RFPercentage(11), backgroundColor: "lightgrey" }} />
              </View>

              <View style={{ marginLeft: RFPercentage(1), justifyContent: "center", alignItems: "flex-start" }}>
                <Text style={{ fontSize: RFPercentage(1.8), fontFamily: FONTS.Regular, color: "black" }}>Email Sent</Text>
                <Text style={{ marginTop: RFPercentage(0.5), fontSize: RFPercentage(1.8), fontFamily: FONTS.Regular, color: "grey" }}>by Aldrin 19-Sep-2023 5:16 PM</Text>
              </View>
            </View> */}
            {filteredHistory.length > 0 && (
              <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                <View
                  key={filteredHistory[0].HISTORY_ID}
                  style={{
                    left: RFPercentage(0.4),
                    alignSelf: "center",
                    width: "90%",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <MaterialCommunityIcons name="label-multiple-outline" style={{ fontSize: RFPercentage(3.8) }} color={"#06143b"} />
                    <View style={{ width: RFPercentage(0.2), height: RFPercentage(11), backgroundColor: "lightgrey" }} />
                  </View>

                  <View style={{ marginLeft: RFPercentage(1), justifyContent: "center", alignItems: "flex-start", width: "90%" }}>
                    <Text style={{ fontSize: RFPercentage(1.8), fontFamily: FONTS.Regular, color: "black" }}>
                      {`Agent Reassigned from ${filteredHistory[0].AGENT_NAME} to agent ${filteredHistory[filteredHistory.length - 1].AGENT_NAME}`}
                    </Text>
                    <Text style={{ marginTop: RFPercentage(0.5), fontSize: RFPercentage(1.8), fontFamily: FONTS.Regular, color: "grey" }}>
                      {`by ${filteredHistory[filteredHistory.length - 1].CREATED_BY} ${moment(filteredHistory[filteredHistory.length - 1].CREATED_ON).format("DD-MM-YYYY hh:mm A")}`}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {leadHistory.length > 0 && leadHistory[0].CALL != null ? (
              <View
                style={{
                  left: RFPercentage(0.4),
                  alignSelf: "center",
                  width: "90%",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexDirection: "row",
                }}
              >
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Feather name="phone-call" style={{ fontSize: RFPercentage(3.5) }} color={"#06143b"} />
                  <View style={{ width: RFPercentage(0.2), height: RFPercentage(11), backgroundColor: "lightgrey" }} />
                </View>

                <View style={{ marginLeft: RFPercentage(1), justifyContent: "center", alignItems: "flex-start" }}>
                  <Text style={{ fontSize: RFPercentage(1.8), fontFamily: FONTS.Regular, color: "black" }}>Called ({leadHistory[0].CALL})</Text>
                  <Text style={{ marginTop: RFPercentage(0.5), fontSize: RFPercentage(1.8), fontFamily: FONTS.Regular, color: "grey" }}>
                    {`by ${leadHistory[0].CREATED_BY} ${moment(leadHistory[0].CREATED_ON).format("DD-MM-YYYY hh:mm A")}`}
                  </Text>
                </View>
              </View>
            ) : null}

            {leadHistory.length > 0 && leadHistory[0].AGENT_NAME != null ? (
              <View
                style={{
                  left: RFPercentage(0.4),
                  alignSelf: "center",
                  width: "90%",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexDirection: "row",
                }}
              >
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Feather name="check-square" style={{ fontSize: RFPercentage(3.5) }} color={"#06143b"} />
                  <View style={{ width: RFPercentage(0.2), height: RFPercentage(11), backgroundColor: "lightgrey" }} />
                </View>

                <View style={{ marginLeft: RFPercentage(1), justifyContent: "center", alignItems: "flex-start" }}>
                  <Text style={{ fontSize: RFPercentage(1.8), fontFamily: FONTS.Regular, color: "black" }}>Assigned agent {leadHistory[0].AGENT_NAME}</Text>
                  <Text style={{ marginTop: RFPercentage(0.5), fontSize: RFPercentage(1.8), fontFamily: FONTS.Regular, color: "grey" }}>
                    {`by ${leadHistory[0].CREATED_BY} ${moment(leadHistory[0].CREATED_ON).format("DD-MM-YYYY hh:mm A")}`}
                  </Text>
                </View>
              </View>
            ) : null}
            <View
              style={{
                left: RFPercentage(0.4),
                alignSelf: "center",
                width: "90%",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "row",
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <MaterialCommunityIcons name="pencil-box-multiple-outline" style={{ fontSize: RFPercentage(3.5) }} color={"#06143b"} />
              </View>

              <View style={{ marginLeft: RFPercentage(1), justifyContent: "center", alignItems: "flex-start" }}>
                <Text style={{ fontSize: RFPercentage(1.8), fontFamily: FONTS.Regular, color: "black" }}>Lead Created</Text>
                <Text style={{ marginTop: RFPercentage(0.5), fontSize: RFPercentage(1.8), fontFamily: FONTS.Regular, color: "grey" }}>
                  by {userName} {moment(createDate).format("DD-MM-YYYY hh:mm A")}
                </Text>
              </View>
            </View>
          </View>
        )}

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
    fontSize: RFPercentage(1.6),
    color: "#06143b",
    fontWeight: "bold",
  },
  backgroundCartImage: {
    alignItems: "center",
    width: RFPercentage(45),
    height: RFPercentage(24),
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
    marginTop: RFPercentage(3),
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
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    position: "absolute",
    bottom: RFPercentage(4),
  },
  priceListingButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 30,
    backgroundColor: "#87CEEB",
    borderRadius: 10,
    position: "absolute",
    right: 0,
  },
  categoriesContainer: {
    backgroundColor: "#ffffff",
    marginTop: RFPercentage(1),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  categoryButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: RFPercentage(1.2),
    padding: RFPercentage(1),
    margin: RFPercentage(1),
    width: RFPercentage(12),
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCategory: {
    backgroundColor: "#87CEEB",
  },
  categoryText: {
    color: "#06143b",
    fontWeight: "bold",
    fontSize: RFPercentage(2),
  },
  selectedCategoryText: {
    color: "#ffffff",
  },
  dropDownView: {
    width: "90%",
    marginTop: RFPercentage(3),
    alignSelf: "center",
  },
});
