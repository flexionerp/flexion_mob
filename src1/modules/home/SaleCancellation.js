import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect } from "react";
import Header from "../../common/HeaderB";
import { COLORS, FONTS, ICONS } from "../../constants";
import moment from "moment";

export const SaleCancellation = ({ navigation, route }) => {
  const data = route.params.data;

  useEffect(() => {
    console.log("data: ", data);
    return () => {};
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} label={"Sale Cancellation"} />
      <View style={{ height: 12 }} />
      <ScrollView style={{ width: "100%" }} contentContainerStyle={{ width: "100%", alignItems: "center" }}>
        <View style={styles.listingConatiner}>
          <View style={styles.detailCard}>
            {/* <Text style={styles.statusLabel}>Sale Cancellation</Text> */}
            {data.map((item, index) => {
              return (
                <View key={index} style={styles.left}>
                  <Text style={styles.label}>{item.REASON}</Text>
                  <Text style={styles.value}>{item.SALEVALUE}</Text>
                </View>
              );
            })}
          </View>
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
  listingConatiner: {
    width: "85%",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  detailCard: {
    width: "100%",
    backgroundColor: COLORS.cardColor,
    borderRadius: 5,

    paddingVertical: 12,
    alignItems: "center",
  },
  statusLabel: {
    width: "95%",
    color: COLORS.secondry,
    fontFamily: FONTS.SemiBold,
    fontSize: 15,
  },
  left: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "rgba(255, 255, 255, 0.5)",
    borderBottomWidth: 1,
    marginTop: 12,
  },
  label: {
    width: "47.5%",
    color: COLORS.secondry,
    fontSize: 11,
    fontFamily: FONTS.SemiBold,
  },
  value: {
    width: "47.5%",
    color: COLORS.secondry,
    fontSize: 9,
    fontFamily: FONTS.Regular,
    textAlign: "right",
  },
});
