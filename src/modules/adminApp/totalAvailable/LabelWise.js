import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { COLORS, FONTS } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";

export const LabelWise = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  const { apiResponse } = route.params;

  const getCategoryColor = (labelType) => {
    // Define colors based on label types
    switch (labelType) {
      case "Lead":
        return "#87CEEB";
      case "Project Info Shared":
        return "#FF7F50";
      case "Broker Already Registered":
        return "#CA7383";
      case "Budget Differs":
        return "#B0C4DE";
      case "Busy":
        return "#68C668";
      case "Called No Answer":
        return "#87CEEB";
      case "Follow up":
        return "#F4A460";
      case "Broker Company":
        return "#ff533f";
      case "Invalid Number":
        return "#68C668";
      case "Leasing":
        return "#ff533f";
      case "Not Interested":
        return "#FF7F50";
      case "Ready to move in":
        return "#87CEEB";
      case "Requested Call Back":
        return "#CA7383";
      case "Incorrect Number":
        return "#F4A460";
      case "Warm":
        return "#68C668";
      case "Wrong Number":
        return "#68C668";
      case "Voice Mail":
        return "#87CEEB";
      case "Registered by Mistake":
        return "#FF7F50";
      case "Interested for Viewing":
        return "#B0C4DE";
      // Add more cases as needed
      default:
        return "lightgrey";
    }
  };

  const labelCounts = {};
  if (apiResponse) {
    apiResponse.forEach((lead) => {
      const labelType = lead.LEAD_TYPE || "None";
      labelCounts[labelType] = (labelCounts[labelType] || 0) + 1;
    });
  }

  delete labelCounts["None"];

  const categories = Object.entries(labelCounts).map(([labelType, count]) => ({
    name: labelType,
    count: count,
    color: getCategoryColor(labelType),
  }));

  function chunkArray(array, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArray.push(array.slice(i, i + chunkSize));
    }
    return chunkedArray;
  }

  const chunkedCategories = chunkArray(categories, 3);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleLabelCategoryPress = (labelType) => {
    setIsNavigating(true);
    navigation.navigate("TotalLeadMainListings", {
      category: labelType,
      leads: apiResponse.filter((lead) => lead.LEAD_TYPE === labelType),
    });

    setTimeout(() => {
      setIsNavigating(false);
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label="Label Wise" />

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={"#06143b"} />
          <Text style={{ marginTop: RFPercentage(1), color: "#06143b", fontFamily: FONTS.Medium }}>Loading...</Text>
        </View>
      ) : (
        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
          <View style={{ marginTop: RFPercentage(1), justifyContent: "center", alignItems: "center", width: "100%" }}>
            {chunkedCategories.map((row, rowIndex) => (
              <View key={rowIndex} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "90%", alignSelf: "center", marginTop: RFPercentage(1) }}>
                {row.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleLabelCategoryPress(category.name)}
                    activeOpacity={0.9}
                    style={{
                      marginHorizontal: RFPercentage(0.5),
                      width: RFPercentage(14.5),
                      borderRadius: RFPercentage(1.5),
                      backgroundColor: category.color,
                      height: RFPercentage(11),
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
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
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
