import { Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, FONTS, ICONS, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../constants";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../../redux/loader/loader.action";
import Icon from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import axios from "axios";
import { Url, SCREENS } from "../../../../constants";

export const Item = ({ navigation, route, data, label, refreshCallback }) => {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state.user);
  const { UNIT_CODE, UNIT_NAME, GROSS_AREA, PROPERTY_CODE, STATUS, UNIT_ID } = data;
  //   const [refreshing, setRefreshing] = useState(false);

  const btnClicked = () => {
    dispatch(setLoader(true));

    const USER_INFO_ID = userDetail.USER_INFO_ID;
    const unit_id = UNIT_ID;

    const apiUrl = `${Url}update_release_unrelease_api?unit_id=${unit_id}&USER_INFO_ID=${USER_INFO_ID}&is_released=1`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("API Response =====>", response.data);

        if (response.status === 200) {
          // Trigger the callback function to set refreshing to true
          navigation.goBack();
          refreshCallback(); // Call the callback function if it exists
          console.log("Successfully Updated");

          dispatch(setLoader(false));
        } else {
          console.error("Request Successful but API Response has this Error : ", response.statusText);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  //   useEffect(() => {
  //     if (refreshing) {
  //       setRefreshing(false);
  //     }
  //   }, [refreshing]);

  return (
    <View style={styles.borderContainer}>
      <ImageBackground source={ICONS.unitBG} style={styles.container} resizeMode="cover">
        {/* <Text>{UNIT_ID}</Text> */}
        <View style={styles.left}>
          <View style={styles.top}>
            <Text style={styles.unitCode}>{UNIT_CODE}</Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.area}>Unit Name - {UNIT_NAME}</Text>
            <Text style={styles.area}>Gross Area - {GROSS_AREA}</Text>
            <Text style={styles.area}>Property Code - {PROPERTY_CODE}</Text>
            <Text style={styles.area}>Status - {STATUS}</Text>
          </View>
        </View>
        {/* <Text>{userDetail.USER_INFO_ID}</Text> */}
        <View style={styles.right}>
          <View />
          <View />
          <TouchableOpacity onPress={btnClicked}>
            <ImageBackground source={ICONS.ppBG} style={styles.btnImg} resizeMode="cover">
              <View style={styles.btnRow}>
                <Text style={styles.btnLable}>{STATUS === "NOT RELEASED" ? "Release" : "Pre-Reserve"}</Text>
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
  );
};

const styles = StyleSheet.create({
  borderContainer: {
    borderRadius: SCREEN_HEIGHT * 0.009,
    overflow: "hidden",
    marginTop: 12,
    borderColor: COLORS.borderColor,
    borderWidth: 1,
  },
  container: {
    width: SCREEN_WIDTH * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SCREEN_HEIGHT * 0.01,
    height: Platform.OS == "ios" ? SCREEN_HEIGHT * 0.15 : SCREEN_HEIGHT * 0.22,
  },
  left: {
    width: "78%",
  },
  right: {
    width: "20%",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  top: {
    marginBottom: 12,
  },
  center: {
    marginBottom: 12,
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
