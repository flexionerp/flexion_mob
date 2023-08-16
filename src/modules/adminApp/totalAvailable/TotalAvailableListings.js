import React, { useState, useEffect, useRef } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Button } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { BackButton } from "../../../common/backButton";
import InputField from "../../../common/InputField";
import { COLORS, FONTS, ICONS, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constants";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Feather";
import { setLoader } from "../../../redux/loader/loader.action";

export const TotalAvailableListings = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { userDetail } = useSelector((state) => state.user);
  const { unitType, availableList } = route.params;

  const [inputField, setInputField] = useState([
    {
      placeholder: "Search Units",
      value: "",
    },
  ]);

  const [filteredAvailableList, setFilteredAvailableList] = useState(availableList);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filteredListings = availableList.filter(
      (listing) =>
        listing.UNIT_NAME.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.UNIT_CODE.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.UNIT_SPECS_NAME.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredAvailableList(filteredListings);
  }, [searchQuery, availableList]);

  return (
    <ImageBackground source={ICONS.bgImg} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container1}>
        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
          <View style={{ marginTop: RFPercentage(1), justifyContent: "center", alignItems: "center", width: "100%" }}>
            {inputField.map((item, i) => (
              <View key={i} style={{ marginTop: i === 0 ? 0 : RFPercentage(1.5) }}>
                <InputField
                  placeholder={item.placeholder}
                  placeholderColor={"#c0c0c2"}
                  height={RFPercentage(6)}
                  backgroundColor={null}
                  borderWidth={RFPercentage(0.1)}
                  borderColor={COLORS.borderColor}
                  secure={item.secure}
                  borderRadius={RFPercentage(1.8)}
                  fontSize={RFPercentage(2)}
                  handleFeild={(text) => {
                    setSearchQuery(text);
                    setFilteredAvailableList(availableList);
                  }}
                  value={searchQuery}
                  width={"94%"}
                />
              </View>
            ))}
          </View>

          <View style={{ marginTop: RFPercentage(1), left: RFPercentage(-1) }}>
            <BackButton navigation={navigation} label=" " />
          </View>

          <View style={{ paddingHorizontal: RFPercentage(2) }}>
            {filteredAvailableList.length > 0 ? (
              filteredAvailableList.map((listing, index) => (
                <View style={styles.borderContainer} key={index}>
                  <ImageBackground source={ICONS.unitBG} style={styles.container} resizeMode="cover">
                    <View style={styles.left}>
                      <View style={styles.top}>
                        <Text style={styles.unitCode}>{listing.UNIT_CODE}</Text>
                      </View>
                      <View style={styles.center}>
                        <Text style={styles.area}>Unit Name - {listing.UNIT_NAME}</Text>
                        <Text style={styles.area}>Gross Area - {listing.GROSS_AREA}</Text>
                        <Text style={styles.area}>Property Code - {listing.PROPERTY_CODE}</Text>
                        <Text style={styles.area}>Status - {listing.STATUS}</Text>
                        <Text style={styles.area}>Unit Specs Name - {listing.UNIT_SPECS_NAME}</Text>
                      </View>
                    </View>
                    <View style={styles.right}>
                      <View />
                      <View />
                      <TouchableOpacity
                        onPress={() => [
                          dispatch(setLoader(true)),
                          navigation.navigate("PreReservedForm", {
                            unit_id: listing.UNIT_ID,
                          }),
                        ]}
                      >
                        <ImageBackground source={ICONS.ppBG} style={styles.btnImg} resizeMode="cover">
                          <View style={styles.btnRow}>
                            <Text style={styles.btnLable}>Pre-Reserve</Text>
                          </View>
                          <View style={{ width: "85%", alignItems: "flex-end" }}>
                            <Icon name="arrow-right" size={14} />
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                      <View />
                      <View />
                    </View>
                  </ImageBackground>
                </View>
              ))
            ) : (
              <Text>No available listings for {unitType}</Text>
            )}
          </View>
          <View style={{ marginBottom: RFPercentage(10) }} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    width: "100%",
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
    height: RFPercentage(18),
    borderRadius: RFPercentage(1),
    borderColor: COLORS.borderColor,
    borderWidth: RFPercentage(0.1),
    overflow: "hidden",
    alignSelf: "center",
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
    marginTop: RFPercentage(0.6),
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
  borderContainer: {
    borderRadius: SCREEN_HEIGHT * 0.009,
    overflow: "hidden",
    marginTop: 12,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
  },
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // padding: SCREEN_HEIGHT * 0.01,
    height: Platform.OS == "ios" ? SCREEN_HEIGHT * 0.17 : SCREEN_HEIGHT * 0.22,
  },
  left: {
    width: "78%",
    left: RFPercentage(1.6),
  },
  right: {
    width: "20%",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "space-between",
    right: RFPercentage(2),
  },
  top: {
    marginBottom: 12,
  },
  center: {
    marginBottom: RFPercentage(1),
  },
  bottom: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  unitCode: {
    color: COLORS.boldText,
    fontSize: SCREEN_WIDTH * 0.05,
    fontFamily: FONTS.Bold,
  },
  name: {
    color: COLORS.boldText,
    fontSize: SCREEN_WIDTH * 0.037,
    fontFamily: FONTS.Medium,
  },
  area: {
    color: COLORS.normalText,
    fontSize: SCREEN_WIDTH * 0.029,
    fontFamily: FONTS.Medium,
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  detail: {
    color: COLORS.boldText,
    textAlign: "center",
    fontSize: SCREEN_WIDTH * 0.026,
    fontFamily: FONTS.Medium,
    marginLeft: 6,
  },
  btnStyle: {
    width: 100,
    height: 26,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  btnLabel: {
    color: COLORS.primary,
    fontSize: 11,
    fontFamily: FONTS.SemiBold,
    marginBottom: 2,
  },
  btnLable: {
    color: COLORS.normalText,
    fontSize: SCREEN_WIDTH * 0.025,
    fontFamily: FONTS.Medium,
    marginLeft: 5,
  },
  btnImg: {
    width: 80,
    height: 46,
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 5 },
    elevation: 5,
    shadowRadius: 4,
    shadowOpacity: 0.26,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
});
