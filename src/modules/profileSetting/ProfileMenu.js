import { StyleSheet, Text, View, Image, SafeAreaView, ImageBackground, Platform, TouchableOpacity, Alert } from "react-native";
import React, { useEffect } from "react";
import { ICONS, CUSTOMWIDTH, COLORS, FONTS, SCREENS, SCREEN_WIDTH } from "../../constants";
import { RowItem } from "./components/RowItem";
import { DeleteAccount } from "./components/DeleteAccount";
import { RegularBtn } from "../../common/regularBtn";
import { useSelector, useDispatch } from "react-redux";
import { setPropertyStats, setReservationList } from "../../redux/property/property.action";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Add this import
import { RFPercentage } from "react-native-responsive-fontsize";

export const MyAccount = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.user.userDetail);

  useEffect(() => {
    return () => {};
  }, []);

  const itemClick = () => {};

  const deleteClick = () => {
    dispatch(setReservationList([]));
    dispatch(setPropertyStats([]));
    navigation.navigate(SCREENS.DELETEACCOUNT);
  };

  const logout = async () => {
    try {
      // Remove username and password from AsyncStorage
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("password");
    } catch (error) {
      console.error("Error removing data from AsyncStorage:", error);
    }

    // Navigate to the login screen
    navigation.navigate(SCREENS.LOGINSCREEN);
  };

  const showDeleteAccountAlert = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete this account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => handleDeleteAccount(),
        },
      ],
      { cancelable: false },
    );
  };

  const handleDeleteAccount = () => {
    logout();
  };
  return (
    <SafeAreaView style={{ flex: 1, width: "100%" }}>
      <ImageBackground source={ICONS.bgImg} style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.headingStyle}>Profile</Text>
          <View style={{ height: 12 }} />
          <Image source={ICONS.userIcon} style={{ width: 81, height: 81 }} />
          <View style={{ width: "100%", alignItems: "center" }}>
            <Text style={{ color: COLORS.boldText, fontSize: 17, fontFamily: FONTS.Bold, width: "100%", marginVertical: 15 }}>
              {userDetail != null ? userDetail.FIRST_NAME + " " + userDetail.LAST_NAME : "null"}!
            </Text>
            <View style={styles.detailCard}>
              <View style={{ width: "100%" }}>
                <RowItem
                  label={"Surname"}
                  value={userDetail.LOGIN_NAME}
                  onClick={() => {
                    itemClick();
                  }}
                />
                <RowItem
                  label={"Name"}
                  value={userDetail.FIRST_NAME + " " + userDetail.LAST_NAME}
                  onClick={() => {
                    itemClick();
                  }}
                />
                <RowItem
                  label={"Email"}
                  value={userDetail.EMAIL}
                  onClick={() => {
                    itemClick();
                  }}
                />
                <RowItem
                  label={"Address"}
                  value={userDetail.ADDRESS}
                  onClick={() => {
                    itemClick();
                  }}
                />
                <RowItem
                  label={"Phone Number"}
                  value={userDetail.MOBILE}
                  onClick={() => {
                    itemClick();
                  }}
                />
              </View>
              <View style={{ height: 15 }} />
            </View>
          </View>
        </View>
        <View style={{ height: 20 }} />
        <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "flex-start", top: RFPercentage(-3) }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => showDeleteAccountAlert()}
            style={{
              borderRadius: RFPercentage(2),
              borderColor: COLORS.primary,
              borderWidth: RFPercentage(0.2),
              width: "38%",
              height: RFPercentage(6.2),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: COLORS.normalText, fontSize: RFPercentage(1.8), fontFamily: FONTS.Bold }}>Delete Account</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "85%", alignItems: "center", position: "absolute", bottom: Platform.OS == "ios" ? 70 : 90, flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
          {/* <RegularBtn
                        label={"Reset Password"}
                        size="100%"
                        bgColor={COLORS.primary}
                        onClick={() => navigation.navigate("ResetPassword")}
                    />
                    <View style={{ height: 12, width:'100%' }} /> */}
          <RegularBtn label={"Reset Password"} size="42%" bgColor={COLORS.primary} onClick={() => navigation.navigate("ResetPassword")} />
          {/* <RegularBtn label={"Logout"} size="42%" bgColor={COLORS.primary} onPress={() => logout()} /> */}
          <TouchableOpacity
            onPress={() => logout()}
            activeOpacity={0.8}
            style={{ borderRadius: RFPercentage(2), backgroundColor: COLORS.primary, width: "42%", height: RFPercentage(6.2), justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: COLORS.secondry, fontSize: 15, fontFamily: FONTS.Bold }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backfaceVisibility: "visible",
  },
  main: {
    width: "90%",
    justifyContent: "center",
    backfaceVisibility: "visible",
  },
  detailCard: {
    width: "100%",
    backgroundColor: COLORS.cardColor,
    borderRadius: 5,
    alignItems: "center",
    backfaceVisibility: "visible",
  },
  headingStyle: {
    width: "90%",
    color: COLORS.boldText,
    fontSize: SCREEN_WIDTH * 0.044,
    fontFamily: FONTS.SemiBold,
  },
});
