import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, ImageBackground, Image } from "react-native";
import React, { useState, useEffect } from "react";
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
    const apiUrl = "http://tvh.flexion.ae:9091/get_pricesetup_units_API";
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
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  };

  useEffect(() => {
    // Filter the data based on the entered text
    const searchTerm = inputField[0].value.toLowerCase();
    const filteredData = data.filter((item) => {
      return item.UNIT_CODE.toLowerCase().includes(searchTerm) || item.UNIT_NAME.toLowerCase().includes(searchTerm);
    });

    setFilteredData(filteredData);
  }, [inputField[0].value, data]);

  const renderItem = ({ item }) => (
    <ImageBackground
      source={require("../../../assets/images/unitBG.png")}
      style={{
        alignItems: "center",
        marginTop: RFPercentage(2),
        width: RFPercentage(45),
        height: RFPercentage(28),
        borderRadius: RFPercentage(1.8),
        borderColor: COLORS.borderColor,
        borderWidth: RFPercentage(0.1),
        overflow: "hidden",
      }}
    >
      <View style={{ width: "90%", flexDirection: "row", justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
        <View style={{ marginTop: RFPercentage(-12), width: "56%", justifyContent: "flex-start", alignItems: "flex-start" }}>
          <Text style={{ fontSize: RFPercentage(2.6), color: "#06143b", fontWeight: "bold" }}>{item.UNIT_CODE}</Text>
          <Text style={{ fontSize: RFPercentage(2), color: "#06143b", fontWeight: "bold", marginTop: RFPercentage(0.5) }}>{item.FLOOR_ID}</Text>

          <View style={{ marginTop: RFPercentage(2) }}>
            <Text style={{ fontSize: RFPercentage(1.7), color: "#455866", fontWeight: "bold" }}>Price Type - {item.PRICE_TYPE}</Text>
          </View>
        </View>
        <View style={{ marginTop: RFPercentage(5), width: "40%", justifyContent: "flex-end", alignItems: "flex-end", marginLeft: RFPercentage(2) }}>
          <ImageBackground style={{ width: RFPercentage(16), height: RFPercentage(16), justifyContent: "center", alignItems: "center" }} source={require("../../../assets/images/progressBar.png")}>
            <Text style={{ color: COLORS.green, fontSize: RFPercentage(1.8), fontWeight: "bold" }}>Price</Text>
            <Text style={{ color: COLORS.green, fontSize: RFPercentage(1.6), fontWeight: "bold" }}>{Math.round(item.PRICE_VALUE)}</Text>
          </ImageBackground>
          <View style={{ marginTop: RFPercentage(3.2), right: RFPercentage(2), width: "100%", justifyContent: "flex-end", alignItems: "flex-end" }}>
            <TouchableOpacity onPress={() => handleViewDetail(item)} activeOpacity={0.8} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: RFPercentage(1.5), color: "#06143b", fontWeight: "bold" }}>Price Listing</Text>
              <Ionicons name="arrow-forward" style={{ fontSize: RFPercentage(2) }} color={"#06143b"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );

  const handleViewDetail = (item) => {
    navigation.navigate("PriceDetail", {
      unitID: item.UNIT_ID,
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
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.UNIT_ID.toString()}
          contentContainerStyle={{ justifyContent: "center", alignItems: "center", width: "100%" }}
        />
      </View>

      <View style={{ marginBottom: RFPercentage(20) }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.secondry,
  },
});
