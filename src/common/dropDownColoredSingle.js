import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS, FONTS } from "../constants";

export const DropDownSingle = ({ name, data, getValue, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState(data);
  const [serach, setSearch] = useState("");

  const selectValue = (value, id) => {
    getValue(value, id);
    setIsOpen(false);
    setSearch("");
    setList(data);
  };

  const searchFilter = (item) => {
    setSearch(item);
    var categories_list = data;
    const filteredCatogries = categories_list
      ? categories_list.filter((filterCatogry) => {
          return filterCatogry.name && filterCatogry.name.toLowerCase().includes(item.toLowerCase());
        })
      : [];
    setList(filteredCatogries);
  };

  return (
    <View>
      {isOpen ? (
        <View style={styles.main}>
          <TouchableOpacity onPress={() => setIsOpen(false)}>
            <Icon name="search" size={13} color={COLORS.primary} />
          </TouchableOpacity>

          <TextInput
            style={{ width: "93%", height: 44, color: COLORS.primary, fontSize: wp("3.3"), fontFamily: FONTS.Regular }}
            placeholder="Search"
            placeholderTextColor={"#707070"}
            onChangeText={(value) => searchFilter(value)}
            value={serach}
          />
        </View>
      ) : (
        <TouchableOpacity style={styles.main} onPress={() => setIsOpen(!isOpen)}>
          <Text style={styles.btnText}>{name ?? `Select ${label}`}</Text>
          {!isOpen && <Icon name="chevron-forward-outline" size={12} />}
          {isOpen && <Icon name="chevron-down-outline" size={12} />}
        </TouchableOpacity>
      )}

      {isOpen && (
        <View style={styles.childView}>
          <ScrollView nestedScrollEnabled style={{ width: "100%" }}>
            <View style={{ height: 6 }} />
            <View
              style={{
                width: "100%",
                alignItems: "center",
              }}
            >
              {list.map((item, index) => {
                return (
                  <TouchableOpacity onPress={() => selectValue(item.name, item.id)} key={index} style={{ width: "100%", height: 35, justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.btnText}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={{ height: 6 }} />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  btnText: {
    width: "90%",
    color: "#9CBBD2",
    fontFamily: FONTS.Regular,
    fontSize: wp("3.5"),
  },
  childView: {
    maxHeight: 180,
    alignItems: "center",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 4,
    borderColor: "#70707026",
    backgroundColor: "white",
  },
  headingStyle: {
    width: "100%",
    color: COLORS.primary,
    fontSize: wp("4"),
    fontFamily: FONTS.Bold,
    marginBottom: Platform.OS == "android" ? 8 : 10,
  },
});
