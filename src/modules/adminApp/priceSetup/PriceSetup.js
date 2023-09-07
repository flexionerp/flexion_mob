import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, ImageBackground, Image } from "react-native";
import { COLORS, FONTS } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

//components
import InputField from "../../../common/InputField";

export const PriceSetup = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [inputField, setInputField] = useState([
    {
      placeholder: "Search Units",
      value: "",
    },
  ]);

  // API Call
  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const fetchDataFromApi = async () => {
    const apiUrl = "http://tvh.flexion.ae:9095/get_pricesetup_units_API";
    const queryParams = {
      prop_code: "",
      org: "33",
      floor_code: "",
      unit_code: "",
      unit_desc: "",
    };

    try {
      const response = await axios.get(apiUrl, { params: queryParams });
      setData(response.data);
      setIsLoading(false);
      console.log("Price Setup APi Returned Data :", response.data);
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  useEffect(() => {
    // Filtering
    const searchTerm = inputField[0].value.toLowerCase();
    const filteredData = data.filter((item) => {
      return item.UNIT_CODE.toLowerCase().includes(searchTerm) || item.UNIT_NAME.toLowerCase().includes(searchTerm);
    });

    setFilteredData(filteredData);
  }, [inputField[0].value, data]);

  // Rendring of Carts
  const renderItem = ({ item }) => (
    <ImageBackground source={require("../../../assets/images/unitBG.png")} style={styles.backgroundCartImage}>
      <View style={styles.subContainerCart}>
        <View style={styles.cartDetailsView}>
          <Text style={styles.unitCodeStyle}>{item.UNIT_CODE}</Text>
          <Text style={styles.floorIdText}>{item.FLOOR_ID}</Text>

          <View style={{ marginTop: RFPercentage(2) }}>
            <Text style={styles.priceTypeText}>Price Type - {item.PRICE_TYPE}</Text>
            <Text style={styles.priceAndUnitSpecsText}>Price - {item.PRICE_VALUE}</Text>
            <Text style={styles.priceAndUnitSpecsText}>Unit Specs Name - {item.UNIT_SPECS_NAME}</Text>
          </View>

          <View style={styles.priceListingButtonContainer}>
            <TouchableOpacity onPress={() => handlePriceListingButton(item)} activeOpacity={0.8} style={styles.priceListingButton}>
              <Text style={styles.priceListingTextStyle}>Price Listing</Text>
              <Ionicons name="arrow-forward" style={{ fontSize: RFPercentage(2) }} color={"#06143b"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );

  const handlePriceListingButton = (item) => {
    navigation.navigate("PriceDetail", {
      unitID: item.UNIT_ID,
      unitCode: item.UNIT_CODE,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label="Price Setup" />

      {/* Input field */}
      <View style={{ marginTop: RFPercentage(1), justifyContent: "center", alignItems: "center", width: "100%" }}>
        {inputField.map((item, i) => (
          <View key={i} style={{ marginTop: i == 0 ? 0 : RFPercentage(1.5) }}>
            <InputField
              placeholder={item.placeholder}
              placeholderColor={"#c0c0c2"}
              height={RFPercentage(6)}
              backgroundColor={"#ffff"}
              borderWidth={RFPercentage(0.1)}
              borderColor={COLORS.borderColor}
              secure={item.secure}
              borderRadius={RFPercentage(1.8)}
              fontSize={RFPercentage(2)}
              handleFeild={(text) => setInputField([{ ...item, value: text }])}
              value={item.value}
              width={"92%"}
            />
          </View>
        ))}
      </View>

      {/* Data Carts */}
      <View style={{ width: "100%" }}>
        {isLoading ? (
          <Text style={{ fontSize: RFPercentage(2), textAlign: "center", marginTop: RFPercentage(2), color: "#06143b", fontWeight: "bold" }}>Loading...</Text>
        ) : (
          <View style={styles.containerF}>
            <FlatList data={filteredData} renderItem={renderItem} keyExtractor={(item) => item.UNIT_ID.toString()} contentContainerStyle={styles.contentContainerStyle} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerF: {
    // bottom: RFPercentage(20), // Adjust the padding as needed
  },
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
    marginTop: RFPercentage(2),
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
    marginTop: RFPercentage(0.5),
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
  },
  contentContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
