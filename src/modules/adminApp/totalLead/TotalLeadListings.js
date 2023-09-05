import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground, ScrollView } from "react-native";
import { COLORS } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

// components
import InputField from "../../../common/InputField";

export const TotalLeadListings = ({ navigation, route }) => {
  const [inputField, setInputField] = useState([
    {
      placeholder: "Search Leads",
      value: "",
    },
  ]);

  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = ["Cold", "Warm", "Hot"];

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const renderItem = () => (
    <>
      <ImageBackground source={require("../../../assets/images/unitBG.png")} style={styles.backgroundCartImage}>
        <View style={styles.subContainerCart}>
          <View style={styles.cartDetailsView}>
            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%", alignSelf: "center" }}>
              <Text style={styles.unitCodeStyle}>Sample Name</Text>
              <Text style={{ fontSize: RFPercentage(1.7), color: "#06143b", fontWeight: "bold", position: "absolute", right: 0 }}>2 Hours</Text>
            </View>
            <Text style={styles.floorIdText}>Agent</Text>
            <Text style={styles.floorIdText}>Tag</Text>

            <View style={styles.priceListingButtonContainer}>
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity activeOpacity={0.8}>
                  <MaterialCommunityIcons name="email-outline" style={{ fontSize: RFPercentage(2.5), marginRight: 5 }} color={"#06143b"} />
                </TouchableOpacity>
                <Text>/ </Text>
                <TouchableOpacity activeOpacity={0.8}>
                  <MaterialCommunityIcons name="whatsapp" style={{ fontSize: RFPercentage(2.5), marginRight: 5 }} color={"#06143b"} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handlePriceListingButton()} activeOpacity={0.5} style={styles.priceListingButton}>
                <MaterialCommunityIcons name="label-multiple" style={{ fontSize: RFPercentage(2.2), marginRight: 5 }} color={"#06143b"} />
                <Text style={styles.priceListingTextStyle}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
      <ImageBackground source={require("../../../assets/images/unitBG.png")} style={styles.backgroundCartImage}>
        <View style={styles.subContainerCart}>
          <View style={styles.cartDetailsView}>
            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%", alignSelf: "center" }}>
              <Text style={styles.unitCodeStyle}>Sample Name</Text>
              <Text style={{ fontSize: RFPercentage(1.7), color: "#06143b", fontWeight: "bold", position: "absolute", right: 0 }}>1 Day</Text>
            </View>
            <Text style={styles.floorIdText}>Agent</Text>
            <Text style={styles.floorIdText}>Tag</Text>

            <View style={styles.priceListingButtonContainer}>
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity activeOpacity={0.8}>
                  <MaterialCommunityIcons name="email-outline" style={{ fontSize: RFPercentage(2.5), marginRight: 5 }} color={"#06143b"} />
                </TouchableOpacity>
                <Text>/ </Text>
                <TouchableOpacity activeOpacity={0.8}>
                  <MaterialCommunityIcons name="whatsapp" style={{ fontSize: RFPercentage(2.5), marginRight: 5 }} color={"#06143b"} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handlePriceListingButton()} activeOpacity={0.5} style={styles.priceListingButton}>
                <MaterialCommunityIcons name="label-multiple" style={{ fontSize: RFPercentage(2.2), marginRight: 5 }} color={"#06143b"} />
                <Text style={styles.priceListingTextStyle}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  );

  const handlePriceListingButton = () => {
    navigation.navigate("TotalLeadDetails");
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
              handleFeild={(text) => setInputField([{ ...item, value: text }])}
              value={item.value}
              width={"92%"}
            />
          </View>
        ))}
      </View>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
        <View style={{ marginTop: RFPercentage(1), justifyContent: "center", alignItems: "center", width: "100%" }}>
          {/* Filter */}
          <View style={{ marginTop: RFPercentage(1), justifyContent: "center", alignItems: "flex-end", width: "90%" }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setShowCategories(!showCategories)}>
              <AntDesign name="filter" style={{ fontSize: RFPercentage(4), marginRight: 5 }} color={"#06143b"} />
            </TouchableOpacity>
          </View>
          {/* Display Categories */}
          {showCategories && (
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <TouchableOpacity key={category} onPress={() => toggleCategory(category)} style={[styles.categoryButton, selectedCategories.includes(category) && styles.selectedCategory]}>
                  <Text style={[styles.categoryText, selectedCategories.includes(category) && styles.selectedCategoryText]}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {/* Data Carts */}
          <View style={{ width: "100%", alignSelf: "center", justifyContent: "center", alignItems: "center" }}>{renderItem()}</View>
        </View>
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
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    position: "absolute",
    bottom: RFPercentage(5),
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
});
