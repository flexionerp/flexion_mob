import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from "react-native";
import { COLORS, FONTS, ICONS, SCREEN_WIDTH } from "../../../constants";
import { RFPercentage } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";
import { BackButton } from "../../../common/backButton";
import { useSelector } from "react-redux";
import { Url } from "../../../constants";
import axios from "axios";

export const TotalAvailable = ({ navigation, route }) => {
  const { userDetail } = useSelector((state) => state.user);

  // Dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "T1", value: "T1" },
    { label: "T2", value: "T2" },
    { label: "All Towers", value: null },
  ]);

  // API
  const [apiData, setApiData] = useState([]);
  const apiUrl = `${Url}get_reservation_grid_api?user_info_id=${userDetail.USER_INFO_ID}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setApiData(response.data.data);
        console.log("Response Data of the API:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filtering for tower selection
  const filteredApiData = apiData.filter((item) => {
    const unitCode = item.UNIT_CODE;
    if (!unitCode) {
      return false; // Skip items with null UNIT_CODE
    }
    if (value === "T1") {
      return unitCode.includes("MG1");
    } else if (value === "T2") {
      return unitCode.includes("MG2");
    }
    return true;
  });

  const countUnits = (unitName) => {
    return filteredApiData.filter((item) => item.UNIT_SPECS_NAME === unitName).length;
  };

  const handlePriceListingButton = (item) => {
    navigation.navigate("PriceDetail", {
      unitID: item.UNIT_ID,
      unitCode: item.UNIT_CODE,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
        <BackButton navigation={navigation} label="Total Available" />

        {/* Dropdown */}
        <View style={styles.dropDownView}>
          <DropDownPicker
            placeholder="All Towers"
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

        <View style={[styles.allTowersContainer, { marginTop: open ? RFPercentage(18) : RFPercentage(6) }]}>
          <View style={styles.subAllTowersContainer}>
            {!value ? <Text style={styles.allTowersText}>All Towers </Text> : <Text style={styles.allTowersText}>In Tower {value}</Text>}

            {/* 1 BHK */}
            <TouchableOpacity activeOpacity={0.7} onPress={() => handlePriceListingButton(item)} style={styles.totalBhkTextView}>
              <View style={{ width: "90%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignSelf: "center" }}>
                <Text style={{ color: "#204866", fontFamily: FONTS.Bold, fontSize: 24 }}>{countUnits("1 BHK")}</Text>
                <Text style={{ width: "75%", marginHorizontal: 12, color: "#204866", fontFamily: FONTS.Medium, fontSize: 15 }}>Total 1 BHK</Text>
                <View activeOpacity={0.8} style={styles.iconContainer}>
                  <Image source={ICONS.nextArrow} style={{ width: 20, height: 20 }} resizeMode="contain" />
                </View>
              </View>
            </TouchableOpacity>

            {/* 2 BHK */}
            <TouchableOpacity activeOpacity={0.7} style={styles.totalBhkTextView}>
              <View style={{ width: "90%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignSelf: "center" }}>
                <Text style={{ color: "#204866", fontFamily: FONTS.Bold, fontSize: 24 }}>{countUnits("2 BHK")}</Text>
                <Text style={{ width: "75%", marginHorizontal: 12, color: "#204866", fontFamily: FONTS.Medium, fontSize: 15 }}>Total 2 BHK</Text>
                <View activeOpacity={0.8} style={styles.iconContainer}>
                  <Image source={ICONS.nextArrow} style={{ width: 20, height: 20 }} resizeMode="contain" />
                </View>
              </View>
            </TouchableOpacity>

            {/* 3 BHK */}
            <TouchableOpacity activeOpacity={0.7} style={styles.totalBhkTextView}>
              <View style={{ width: "90%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignSelf: "center" }}>
                <Text style={{ color: "#204866", fontFamily: FONTS.Bold, fontSize: 24 }}>{countUnits("3 BHK")}</Text>
                <Text style={{ width: "75%", marginHorizontal: 12, color: "#204866", fontFamily: FONTS.Medium, fontSize: 15 }}>Total 3 BHK</Text>
                <View activeOpacity={0.8} style={styles.iconContainer}>
                  <Image source={ICONS.nextArrow} style={{ width: 20, height: 20 }} resizeMode="contain" />
                </View>
              </View>
            </TouchableOpacity>

            {/* 4 BHK */}
            <TouchableOpacity activeOpacity={0.7} style={styles.totalBhkTextView}>
              <View style={{ width: "90%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignSelf: "center" }}>
                <Text style={{ color: "#204866", fontFamily: FONTS.Bold, fontSize: 24 }}>{countUnits("4 BHK")}</Text>
                <Text style={{ width: "75%", marginHorizontal: 12, color: "#204866", fontFamily: FONTS.Medium, fontSize: 15 }}>Total 4 BHK</Text>
                <View activeOpacity={0.8} style={styles.iconContainer}>
                  <Image source={ICONS.nextArrow} style={{ width: 20, height: 20 }} resizeMode="contain" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginBottom: RFPercentage(10) }} />
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
  dropDownView: {
    width: "90%",
    marginTop: RFPercentage(4),
    alignSelf: "center",
  },
  labelStyle: {
    color: "#204866",
    fontFamily: FONTS.Medium,
    fontSize: RFPercentage(2),
  },
  labelStyle2: {
    color: COLORS.boldText,
    fontSize: SCREEN_WIDTH * 0.043,
    fontFamily: FONTS.SemiBold,
    marginTop: RFPercentage(3),
  },
  allTowersText: {
    color: COLORS.boldText,
    fontSize: SCREEN_WIDTH * 0.043,
    fontFamily: FONTS.SemiBold,
    alignSelf: "center",
  },
  allTowersContainer: {
    alignSelf: "center",
    width: "90%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 8,
  },
  subAllTowersContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  totalBhkTextView: {
    marginTop: RFPercentage(2),
    width: "96%",
    height: "auto",
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf: "center",
    borderColor: COLORS.borderColor,
    borderWidth: RFPercentage(0.1),
    height: RFPercentage(10),
    width: "100%",
    borderRadius: RFPercentage(2),
  },
  nextIcon: {
    top: RFPercentage(0.4),
    fontSize: RFPercentage(2.5),
  },
  iconContainer: {
    position: "absolute",
    right: 0,
  },
});
