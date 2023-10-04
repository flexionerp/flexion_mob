import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { COLORS, FONTS } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";

export const AgentWise = ({ navigation, route }) => {
  const { apiResponse } = route.params;
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isNavigating, setIsNavigating] = useState(false); // Navigation state

  const getCategoryColor = (agentName) => {
    switch (agentName) {
      case "Dion":
        return "#87CEEB";
      case "Sakina":
        return "#FF7F50";
      case "Anthony":
        return "#CA7383";
      case "bahaa":
        return "#B0C4DE";
      case "Anastasia":
        return "#68C668";
      case "oldleads":
        return "#CA7383";
      case "Aldrin":
        return "#F4A460";
      default:
        return "lightgrey"; // Default color for unknown agents
    }
  };

  const agentCounts = {};
  if (apiResponse) {
    apiResponse.forEach((lead) => {
      const agentName = lead.AGENT || "None"; // Assuming "None" if AGENT is falsy
      agentCounts[agentName] = (agentCounts[agentName] || 0) + 1;
    });
  }

  delete agentCounts["None"];

  // Convert agentCounts object to an array of objects for rendering
  const categories = Object.entries(agentCounts).map(([agentName, count]) => ({
    name: agentName,
    count: count,
    color: getCategoryColor(agentName), // Define a function to map agent names to colors
  }));

  // Function to chunk an array into rows
  function chunkArray(array, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArray.push(array.slice(i, i + chunkSize));
    }
    return chunkedArray;
  }
  // Function to filter leads for a specific agent
  const getLeadsForAgent = (agentName) => {
    return apiResponse.filter((lead) => lead.AGENT === agentName);
  };

  const chunkedCategories = chunkArray(categories, 3);

  const fetchAgentLeadsData = () => {
    // Simulate an API request delay (Remove this in your actual code)
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after fetching data (simulated delay)
    }, 2000); // Simulated delay of 2 seconds (adjust as needed)
  };

  useEffect(() => {
    // Fetch agent leads data when the component mounts
    fetchAgentLeadsData();
  }, []); // Empty dependency array ensures this runs only once

  const handleAgentCategoryPress = (agentName) => {
    setIsNavigating(true); // Set isNavigating to true when navigating
    navigation.navigate("TotalLeadMainListings", { category: agentName, leads: getLeadsForAgent(agentName) });

    // Set isNavigating back to false when navigation is complete
    setTimeout(() => {
      setIsNavigating(false);
    }, 500); // You can adjust the delay as needed
  };
  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label="Agent Wise" />

      {isLoading ? ( // Show loader while loading
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={"#06143b"} />
          <Text style={{ marginTop: RFPercentage(1), color: "#06143b", fontFamily: FONTS.Medium }}>Loading...</Text>
        </View>
      ) : (
        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
          <View style={{ marginTop: RFPercentage(1), justifyContent: "center", alignItems: "center", width: "100%" }}>
            {chunkedCategories.map((row, rowIndex) => (
              <View key={rowIndex} style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "90%", alignSelf: "center", marginTop: RFPercentage(1) }}>
                {row.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleAgentCategoryPress(category.name)}
                    activeOpacity={0.9}
                    style={{
                      marginHorizontal: RFPercentage(0.5),
                      width: RFPercentage(14.5),
                      borderRadius: RFPercentage(1.5),
                      backgroundColor: category.color,
                      height: RFPercentage(10),
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      padding: RFPercentage(1),
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: RFPercentage(1.7), fontFamily: FONTS.Medium }}>{category.name}</Text>
                    <Text style={{ position: "absolute", bottom: RFPercentage(0.2), right: RFPercentage(1), color: "#fff", fontSize: RFPercentage(2.5), fontFamily: FONTS.Bold }}>
                      {category.count}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
          <View style={{ marginBottom: RFPercentage(14) }} />
        </ScrollView>
      )}

      {isNavigating && (
        <View style={{ justifyContent: "center", alignItems: "center", marginBottom: RFPercentage(45) }}>
          <ActivityIndicator size="large" color={"#06143b"} />
          <Text style={{ marginTop: RFPercentage(1), color: "#06143b", fontFamily: FONTS.Medium }}>Navigating...</Text>
        </View>
      )}
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
