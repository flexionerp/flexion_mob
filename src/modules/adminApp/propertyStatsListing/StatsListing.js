import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../../../common/searchBar";
import { Item } from "./components/Item";
import { useSelector } from "react-redux";
import { FONTS } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import moment from "moment";

export function StatsListing({ navigation, route }) {
  let { label, list } = route.params;
  const loader = useSelector((state) => state.loader.loader);
  const [propertyList, setList] = useState(list);
  const [search, setSearch] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  const emputyComponent = () => <Text style={{ color: "#000000", fontSize: 13, fontFamily: FONTS.Bold, alignSelf: "center" }}>Empty Result</Text>;

  const getSearch = (item) => {
    setSearch(item);
    var unit_list = list;
    const filteredUnites = unit_list
      ? unit_list.filter((filterUnit) => {
          return (
            (filterUnit.CUSTOMER_NAME && filterUnit.CUSTOMER_NAME.toLowerCase().includes(item.toLowerCase())) ||
            (filterUnit.NATIONALITY && filterUnit.NATIONALITY.toLowerCase().includes(item.toLowerCase())) ||
            filterUnit.UNIT_CODE.toLowerCase().includes(item.toLowerCase()) ||
            (filterUnit.BROKER_NAME && filterUnit.BROKER_NAME.toLowerCase().includes(item.toLowerCase())) ||
            filterUnit.AGENT_NAME.toLowerCase().includes(item.toLowerCase()) ||
            filterUnit.STATUS_NAME.toLowerCase().includes(item.toLowerCase()) ||
            filterUnit.UNIT_SPECS_NAME.toLowerCase().includes(item.toLowerCase()) ||
            filterUnit.SALE_VALUE.trim().toString().includes(item) ||
            filterUnit.PRE_RESERVE_NO.toString().includes(item) ||
            filterUnit.ID.toString().includes(item) ||
            filterUnit.GROSS_AREA.toString().includes(item) ||
            filterUnit.UNIT_ID.toString().includes(item) ||
            moment(filterUnit.PRE_RESERVE_DATE).format("MM-DD-YYYY").toString().includes(item) ||
            moment(filterUnit.RESERVE_DATE).format("MM-DD-YYYY").toString().includes(item) ||
            filterUnit.SALE_VALUE.toString().includes(item.toLowerCase())
          );
        })
      : [];
    setList(filteredUnites);
  };

  return (
    <LinearGradient colors={["#E4EEFE", "#F9FCFF", "#FFFFFF"]} style={styles.container}>
      <SafeAreaView style={styles.main}>
        <Header navigation={navigation} label={label} value={search} getInputValue={getSearch.bind(this)} />
        <View style={{ height: 3, width: "100%" }} />
        <BackButton navigation={navigation} />
        {loader ? (
          <View style={{ flex: 1, alignItems: "center", marginTop: 12 }}>
            <ActivityIndicator size={"small"} color="#000000" />
          </View>
        ) : (
          <FlatList
            style={{ width: "100%" }}
            data={propertyList}
            renderItem={({ item }) => (
              <View style={{ width: "100%", alignItems: "center" }}>
                <Item navigation={navigation} data={item} />
              </View>
            )}
            keyExtractor={(item) => item.ID}
            ListEmptyComponent={emputyComponent}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  main: {
    width: "100%",
    alignItems: "center",
  },
});
