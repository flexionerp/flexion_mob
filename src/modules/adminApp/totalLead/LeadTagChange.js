import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity } from "react-native";
import { COLORS, FONTS, Url } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import AntDesign from "react-native-vector-icons/AntDesign";
import DropDownPicker from "react-native-dropdown-picker";
import { useSelector } from "react-redux";
import Axios from "axios";

export const LeadTagChange = ({ navigation, route }) => {
  const currentTag = route.params?.currentTag;
  const { token } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await Axios.get(`${Url}leads_list_api?userid=${token}`);
      const loginNames = response.data.data[1].map((item) => ({ label: item.LOGIN_NAME, value: item.LOGIN_NAME }));
      console.log("\n\n\n\n\n\n\nLogin Names", loginNames);
      const filteredItems = loginNames.filter((item) => item.value !== currentTag);

      setItems(filteredItems);
      setLoading(false);
    } catch (error) {
      console.error("API Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label="Lead Listing" />
      <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
        {/* Heading */}
        <View style={{ marginTop: RFPercentage(2.5), width: "90%", justifyContent: "center", alignItems: "center", alignSelf: "center", flexDirection: "row" }}>
          <Text style={{ fontSize: RFPercentage(2.4), color: "#06143b", fontFamily: FONTS.Medium }}>Lead Tag Edit</Text>
          <AntDesign name="edit" style={{ marginLeft: RFPercentage(0.5), fontSize: RFPercentage(3.2) }} color={"#06143b"} />
        </View>

        {/* Picker to change status */}
        <View style={{ marginTop: RFPercentage(4), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
          <Text style={{ fontSize: RFPercentage(2), color: "#06143b", fontFamily: FONTS.Medium }}>Current Tag: {currentTag}</Text>
        </View>

        {/* Dropdown */}
        {loading ? (
          <ActivityIndicator style={{ marginTop: RFPercentage(4) }} size="large" color={"#06143b"} />
        ) : (
          // Render the dropdown when loading is false
          <View style={{ width: "90%", marginTop: RFPercentage(4), alignSelf: "center" }}>
            <DropDownPicker
              placeholder="Tag Selection"
              placeholderStyle={{ color: COLORS.normalText }}
              style={{ borderColor: COLORS.borderColor, borderWidth: RFPercentage(0.1) }}
              dropDownContainerStyle={{ backgroundColor: "#0000", borderColor: COLORS.borderColor, borderWidth: RFPercentage(0.1) }}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              key={value}
              setValue={setValue}
              setItems={setItems}
              labelStyle={{
                fontWeight: "600",
                color: COLORS.dark,
              }}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                marginTop: open ? RFPercentage(30) : RFPercentage(6),
                width: RFPercentage(17),
                height: RFPercentage(7),
                backgroundColor: COLORS.primary,
                borderRadius: RFPercentage(1.8),
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text style={{ color: COLORS.secondry, fontFamily: FONTS.Bold, fontSize: RFPercentage(2.1) }}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
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

  checkButton: {
    flexDirection: "row",
    marginRight: 8,
  },
  innerCircle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  container1: {
    width: "90%",
    height: RFPercentage(6),
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#CDA349",
    borderWidth: 1,
    marginTop: RFPercentage(1.6),
    borderRadius: RFPercentage(0.8),
    alignSelf: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  inputText: {
    fontSize: 16,
  },
  placeholderText: {
    color: "#C4C4C4",
  },
  selectedText: {
    color: "black",
  },
  clearButton: {
    padding: 8,
  },
  datePickerContainer: {
    backgroundColor: "red",
  },
});
