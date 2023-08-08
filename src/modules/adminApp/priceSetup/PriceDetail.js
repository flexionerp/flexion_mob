import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Picker, TextInput } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import DropDownPicker from "react-native-dropdown-picker";

export const PriceDetail = ({ navigation, route }) => {
  const { unitID, unitCode } = route.params;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "SQFT", value: "SQFT" },
    { label: "SQMT", value: "SQMT" },
    { label: "LUMPSUM", value: "LUMPSUM" },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (text) => {
    setInputValue(text);
  };
  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label="Price Listing" />

      <View style={{ marginTop: RFPercentage(3), width: "90%", justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
        <Text style={{ fontSize: RFPercentage(2.6), color: "#06143b", fontWeight: "bold" }}>{unitCode}</Text>
      </View>

      <View style={{ width: "90%", marginTop: RFPercentage(4.5), alignSelf: "center" }}>
        <TextInput placeholderTextColor={COLORS.normalText} placeholder="Price" style={styles.textInput} onChangeText={handleInputChange} value={inputValue} />
        {/* <Text>Value to pass to API: {inputValue}</Text> */}
      </View>

      {/* Dropdown */}
      <View style={{ width: "90%", marginTop: RFPercentage(4), alignSelf: "center" }}>
        <DropDownPicker
          placeholder="Price Type"
          placeholderStyle={{ color: COLORS.normalText }}
          style={{ borderColor: COLORS.borderColor, borderWidth: RFPercentage(0.1) }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          labelStyle={{
            fontWeight: "600",
            color: COLORS.dark,
          }}
        />
      </View>
      {/* <Text>Value from dropdown : {value}</Text> */}

      <View style={{ position: "absolute", bottom: RFPercentage(15), alignSelf: "center", width: "90%", justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: "#0873af",
            width: RFPercentage(22),
            height: RFPercentage(7),
            borderRadius: RFPercentage(2),
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#ffff", fontWeight: "bold", fontSize: RFPercentage(2.2) }}>Save</Text>
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
  textInput: {
    borderColor: "#CDA349",
    borderWidth: 1,
    padding: RFPercentage(1.7),
    borderRadius: RFPercentage(1),
    fontSize: 16,
  },
});
