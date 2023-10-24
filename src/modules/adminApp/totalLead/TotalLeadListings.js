import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { COLORS, FONTS } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Url } from "../../../constants";

// components
import InputField from "../../../common/InputField";

export const TotalLeadListings = ({ navigation, route }) => {
  const { token } = useSelector((state) => state.user);
  const [firstObject, setFirstObject] = useState(null); // Initialize with null

  const [apiResponse, setApiResponse] = useState([]);

  const [coldCount, setColdCount] = useState(0);
  const [warmCount, setWarmCount] = useState(0);
  const [junkCount, setJunkCount] = useState(0);
  const [assignedCount, setAssignedCount] = useState(0);
  const [dealCount, setDealCount] = useState(0);
  const [lostCount, setLostCount] = useState(0);
  const [hotCount, setHotCount] = useState(0);

  const [totalLeadCount, setTotalLeadCount] = useState(0); // Initialize with 0

  const makeApiRequest = async () => {
    try {
      const response = await axios.get(`${Url}leads_list_api?userid=${token}`);
      // console.log("From Cold Screen", response.data.data);

      const firstObject = response.data.data[0];
      const leadCount = firstObject ? firstObject.length : 0;
      // console.log("Latest count cold screen", leadCount);

      // Initialize counts for each lead status
      let coldCount = 0;
      let warmCount = 0;
      let junkCount = 0;
      let assignedCount = 0;
      let dealCount = 0;
      let lostCount = 0;
      let hotCount = 0;

      if (firstObject) {
        firstObject.forEach((lead) => {
          switch (lead.LEAD_STATUS) {
            case "COLD":
              coldCount++;
              break;
            case "WARM":
              warmCount++;
              break;
            case "JUNK":
              junkCount++;
              break;
            case "ASSIGNED":
              assignedCount++;
              break;
            case "DEAL":
              dealCount++;
              break;
            case "LOST":
              lostCount++;
              break;
            case "HOT":
              hotCount++;
              break;
            // Add more cases for other lead statuses as needed
          }
        });
      }

      // Set the total lead count in state
      setTotalLeadCount(leadCount);

      // Set the counts for each lead status in state
      setColdCount(coldCount);
      setWarmCount(warmCount);
      setJunkCount(junkCount);
      setAssignedCount(assignedCount);
      setDealCount(dealCount);
      setLostCount(lostCount);
      setHotCount(hotCount);
      setFirstObject(firstObject);

      setApiResponse(response.data.data[0]);
    } catch (error) {
      console.error("API Error :", error);
    }
  };
  useEffect(() => {
    makeApiRequest();
  }, []);

  const [inputField, setInputField] = useState([
    {
      placeholder: "Search Leads",
      value: "",
    },
  ]);

  const categories = [
    { name: "COLD", color: "#87CEEB", count: coldCount },
    { name: "WARM", color: "#FF7F50", count: warmCount },
    { name: "HOT", color: "#ff533f", count: hotCount },
    { name: "LOST", color: "grey", count: lostCount },
    { name: "ASSIGNED", color: "lightgrey", count: assignedCount },
    { name: "DEAL", color: "#68C668", count: dealCount },
    { name: "JUNK", color: "#BC8F8F", count: junkCount },
  ];

  function chunkArray(array, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArray.push(array.slice(i, i + chunkSize));
    }
    return chunkedArray;
  }

  const chunkedCategories = chunkArray(categories, 3);
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
              handleFeild={(text) => setInputField([{ ...item, value: text }])}
              value={item.value}
              width={"92%"}
            />
          </View>
        ))}
      </View>

      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
        <View style={{ marginTop: RFPercentage(1), justifyContent: "center", alignItems: "center", width: "100%" }}>
          {chunkedCategories.map((row, rowIndex) => (
            <View key={rowIndex} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "90%", alignSelf: "center", marginTop: RFPercentage(1) }}>
              {row.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    const filteredLeads = firstObject.filter((lead) => lead.LEAD_STATUS === category.name.toUpperCase());
                    navigation.navigate("TotalLeadMainListings", { category: category.name, leads: filteredLeads });
                  }}
                  activeOpacity={0.9}
                  style={{
                    // flex: 1,
                    width: RFPercentage(14.5),
                    height: RFPercentage(14.5),
                    marginHorizontal: RFPercentage(0.5),
                    borderRadius: RFPercentage(1.5),
                    backgroundColor: category.color,
                    height: RFPercentage(11),
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    padding: RFPercentage(1),
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: RFPercentage(1.8), fontFamily: FONTS.Medium }}>{category.name}</Text>
                  <Text style={{ position: "absolute", bottom: RFPercentage(1), right: RFPercentage(1), color: "#fff", fontSize: RFPercentage(3), fontFamily: FONTS.Bold }}>{category.count}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}

          {/* Large Boxes */}
          <View activeOpacity={0.8} style={{ marginTop: RFPercentage(3), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
            <Text style={{ fontSize: RFPercentage(2.2), color: "#06143b", fontFamily: FONTS.SemiBold }}>Labels</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              const filteredLeads = apiResponse.filter((lead) => lead.IS_READ === "0");
              navigation.navigate("TotalLeadMainListings", { unreadOnly: true, leads: filteredLeads });
            }}
            activeOpacity={0.8}
            style={{ marginTop: RFPercentage(2), backgroundColor: "#B0C4DE", width: "90%", height: RFPercentage(8), borderRadius: RFPercentage(2), justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "#fff", fontSize: RFPercentage(2.2), fontFamily: FONTS.Medium }}>Unread Lead</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LabelWise", { apiResponse: apiResponse });
            }}
            activeOpacity={0.8}
            style={{ marginTop: RFPercentage(2), backgroundColor: "lightgrey", width: "90%", height: RFPercentage(8), borderRadius: RFPercentage(2), justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "#fff", fontSize: RFPercentage(2.2), fontFamily: FONTS.Medium }}>Label Wise</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AgentWise", { apiResponse: apiResponse });
            }}
            activeOpacity={0.8}
            style={{ marginTop: RFPercentage(2), backgroundColor: "#BC8F8F", width: "90%", height: RFPercentage(8), borderRadius: RFPercentage(2), justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "#fff", fontSize: RFPercentage(2.2), fontFamily: FONTS.Medium }}>Agent Wise</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const filteredLeads = apiResponse.filter((lead) => lead.IS_EMAIL_SENT_AGENT === "1");
              navigation.navigate("TotalLeadMainListings", { leads: filteredLeads, noAction: true });
            }}
            activeOpacity={0.8}
            style={{ marginTop: RFPercentage(2), backgroundColor: "lightgreen", width: "90%", height: RFPercentage(8), borderRadius: RFPercentage(2), justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "#fff", fontSize: RFPercentage(2.2), fontFamily: FONTS.Medium }}>30 Min No Action</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const filteredLeads = apiResponse.filter((lead) => lead.IS_EMAIL_SENT === "1");
              navigation.navigate("TotalLeadMainListings", { leads: filteredLeads, hours: true });
            }}
            activeOpacity={0.8}
            style={{ marginTop: RFPercentage(2), backgroundColor: "#F4A460", width: "90%", height: RFPercentage(8), borderRadius: RFPercentage(2), justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "#fff", fontSize: RFPercentage(2.2), fontFamily: FONTS.Medium }}>48 Hours No Action</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: RFPercentage(14) }} />
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
