import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import SearchBar from "../../../common/searchBar";
import { Item } from "./components/Item";
import { useSelector } from "react-redux";
import { FONTS, ICONS } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  getReservationList,
  getPropertyStats,
  getCollections,
  getMonthlyStats,
  getCancellationStats,
  getSaleSummeryStats,
  getCustomerReceivable,
  getSaleTowerAStats,
  getSaleTowerBStats,
  getDuesCount,
  getHomelist,
  getCountList,
} from "../../../redux/property/property.action";

export function DashboardListing({ navigation, route, refreshCallback }) {
  const dispatch = useDispatch();

  let { label, list, token } = route.params;
  const loader = useSelector((state) => state.loader.loader);
  const [propertyList, setList] = useState(list);
  const [search, setSearch] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const fetchData = () => {
    setIsRefreshing(true);

    // Dispatch your API calls here
    dispatch(getReservationList(token));
    dispatch(getPropertyStats());
    dispatch(getCountList());
    dispatch(getMonthlyStats());

    setIsRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.refreshing) {
        fetchData();
      }
    }, [route.params?.refreshing]),
  );

  const emputyComponent = () => <Text style={{ color: "#000000", fontSize: 13, fontFamily: FONTS.Bold, alignSelf: "center" }}>Empty Result</Text>;

  const getSearch = (item) => {
    setSearch(item);
    var unit_list = list;
    const filteredUnites = unit_list
      ? unit_list.filter((filterUnit) => {
          return (
            filterUnit.UNIT_CODE.toLowerCase().includes(item.toLowerCase()) ||
            filterUnit.UNIT_NAME.toLowerCase().includes(item.toLowerCase()) ||
            filterUnit.PROPERTY_CODE.toLowerCase().includes(item.toLowerCase()) ||
            filterUnit.STATUS.toLowerCase().includes(item.toLowerCase()) ||
            filterUnit.GROSS_AREA.toString().includes(item)
          );
        })
      : [];
    setList(filteredUnites);
  };
  return (
    <ImageBackground source={ICONS.bgImg} style={styles.container}>
      <SafeAreaView style={styles.main}>
        <SearchBar value={search} getInputValue={getSearch.bind(this)} />
        <View style={{ height: 8, width: "100%" }} />
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
                <Item navigation={navigation} data={item} label={label} refreshCallback={fetchData} dispatch={dispatch} />
              </View>
            )}
            keyExtractor={(item) => item.ID}
            ListEmptyComponent={emputyComponent}
          />
        )}
      </SafeAreaView>
    </ImageBackground>
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
