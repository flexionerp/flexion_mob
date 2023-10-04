import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground, ScrollView } from "react-native";
import { COLORS, FONTS } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// components
import InputField from "../../../common/InputField";

export const TotalLeadMainListings = ({ navigation, route }) => {
  const leads = route.params?.leads;
  const dataToRender = leads || [];

  const [inputField, setInputField] = useState([
    {
      placeholder: "Search Leads",
      value: "",
    },
  ]);
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const handleViewButton = (leadData) => {
    navigation.navigate("TotalLeadDetails", {
      leadData: {
        LAST_NAME: leadData.LAST_NAME,
        ID: leadData.ID,
        MOBILE: leadData.MOBILE?.toString() || "",
        EMAIL: leadData.EMAIL,
        BUDGET: leadData.BUDGET,
        COUNTRY: leadData.COUNTRY,
        CITY: leadData.CITY,
        ADDRESS: leadData.ADDRESS,
        LEAD_STATUS: leadData.LEAD_STATUS,
        LEAD_SOURCE: leadData.LEAD_SOURCE,
        COMPANY: leadData.COMPANY,
        BROKER: leadData.BROKER,
        POBOX: leadData.POBOX,
        FIRST_NAME: leadData.FIRST_NAME,
        BUDGET_MAX: leadData.BUDGET_MAX,
      },
    });
  };

  const renderItem = () => {
    //  Filter
    const filteredData = dataToRender.filter((item) => {
      const firstNameMatch = item.FIRST_NAME && item.FIRST_NAME.toLowerCase().includes(searchText.toLowerCase());
      const agentMatch = item.AGENT && item.AGENT.toLowerCase().includes(searchText.toLowerCase());
      const leadStatus = item.LEAD_STATUS && item.LEAD_STATUS.toLowerCase().includes(searchText.toLowerCase());
      return firstNameMatch || agentMatch || leadStatus;
    });

    const handleTimeLineButton = (leadId, userName, createDate) => {
      navigation.navigate("TimeLine", { leadId, userName, createDate });
    };
    return filteredData.map((item, index) => (
      <ImageBackground key={index} source={require("../../../assets/images/unitBG.png")} style={[styles.backgroundCartImage, { marginTop: index == 0 ? RFPercentage(2) : RFPercentage(2) }]}>
        <View style={styles.subContainerCart}>
          <View style={styles.cartDetailsView}>
            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%", alignSelf: "center" }}>
              <Text style={styles.unitCodeStyle}>
                {item.FIRST_NAME && item.FIRST_NAME.length > 0 ? (item.FIRST_NAME.length > 16 ? item.FIRST_NAME.substring(0, 16) + "..." : item.FIRST_NAME) : "Null"}
              </Text>
              <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", position: "absolute", right: 0 }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => handleTimeLineButton(item.ID, item.USER_NAME, item.CREATE_DATE)}>
                  <MaterialCommunityIcons name="timeline-text-outline" style={{ fontSize: RFPercentage(3.2), marginRight: 5 }} color={"#06143b"} />
                </TouchableOpacity>
                <Text style={{ marginLeft: RFPercentage(1), fontSize: RFPercentage(1.7), color: "#06143b", fontWeight: "bold" }}>
                  {item.LEAD_AGE === null ? `${item.DIFF / 60} Hours ${item.DIFF % 60} Minutes` : `${item.LEAD_AGE} day(s)`}
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: RFPercentage(1.8), color: "#06143b", fontFamily: FONTS.Medium, marginTop: RFPercentage(2) }}>{item.AGENT || "Null"}</Text>
            <Text style={{ fontSize: RFPercentage(1.8), color: "#06143b", fontFamily: FONTS.Medium, marginTop: RFPercentage(1) }}>{item.LEAD_TYPE || "Null"}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ marginTop: RFPercentage(1), flexDirection: "row", justifyContent: "center", alignItems: "center" }}
              onPress={() => {
                if (item.LEAD_STATUS !== "JUNK") {
                  navigation.navigate("LeadStatusChange", { currentStatus: item.LEAD_STATUS });
                }
              }}
            >
              <MaterialCommunityIcons name="label-multiple-outline" style={{ fontSize: RFPercentage(3.2), marginRight: 3 }} color={"#06143b"} />
              <Text style={{ fontSize: RFPercentage(1.8), color: "#06143b", fontFamily: FONTS.Medium }}>{item.LEAD_STATUS}</Text>
            </TouchableOpacity>

            <View style={styles.priceListingButtonContainer}>
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                {item.LEAD_SOURCE === "Email" ? (
                  <TouchableOpacity activeOpacity={0.8}>
                    <MaterialCommunityIcons name="email-outline" style={{ fontSize: RFPercentage(2.5), marginRight: 5 }} color={"#06143b"} />
                  </TouchableOpacity>
                ) : item.LEAD_SOURCE === "Whatsapp" ? (
                  <TouchableOpacity activeOpacity={0.8}>
                    <MaterialCommunityIcons name="whatsapp" style={{ fontSize: RFPercentage(2.5), marginRight: 5 }} color={"#06143b"} />
                  </TouchableOpacity>
                ) : (
                  <Text style={{ fontSize: RFPercentage(1.8), color: "#06143b", fontFamily: FONTS.Medium }}>{item.LEAD_SOURCE}</Text>
                )}
              </View>
              <TouchableOpacity onPress={() => handleViewButton(item)} activeOpacity={0.5} style={styles.priceListingButton}>
                <MaterialCommunityIcons name="label-multiple" style={{ fontSize: RFPercentage(2.2), marginRight: 5 }} color={"#06143b"} />
                <Text style={styles.priceListingTextStyle}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label="Total Assign Leads" />
      {/* Input field */}
      <View style={{ marginTop: RFPercentage(1), justifyContent: "center", alignItems: "center", width: "100%" }}>
        {inputField.map((item, i) => (
          <View key={i} style={{ marginTop: i === 0 ? 0 : RFPercentage(1.5) }}>
            <InputField
              placeholder={item.placeholder}
              placeholderColor={"#c0c0c2"}
              height={RFPercentage(6)}
              backgroundColor={"#ffff"}
              borderWidth={RFPercentage(0.1)}
              borderColor={COLORS.borderColor}
              borderRadius={RFPercentage(1.8)}
              fontSize={RFPercentage(2)}
              handleFeild={(text) => {
                setInputField([{ ...item, value: text }]);
                handleSearchChange(text);
              }}
              value={item.value}
              width={"92%"}
            />
          </View>
        ))}
      </View>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
        <View style={{ marginTop: RFPercentage(1), justifyContent: "center", alignItems: "center", width: "100%" }}>
          {/* Data Carts */}
          <View style={{ width: "100%", alignSelf: "center", justifyContent: "center", alignItems: "center" }}>{renderItem()}</View>
        </View>
        <View style={{ marginBottom: RFPercentage(12) }} />
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
    marginTop: RFPercentage(3.4),
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  unitCodeStyle: {
    fontSize: RFPercentage(2.4),
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
