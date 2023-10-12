import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, FlatList } from "react-native";
import { COLORS, FONTS, Url } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import AntDesign from "react-native-vector-icons/AntDesign";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

export const LeadStatusChange = ({ navigation, route }) => {
  const currentStatus = route.params?.currentStatus;

  // Dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isCleared, setIsCleared] = useState(false);

  const [items, setItems] = useState([
    { label: "COLD", value: "COLD" },
    { label: "WARM", value: "WARM" },
    { label: "HOT", value: "HOT" },
    { label: "LOST", value: "LOST" },
    { label: "JUNK", value: "JUNK" },
  ]);
  const filteredItems = items.filter((item) => item.value !== currentStatus);

  // Checks
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const toggleCheck1 = () => {
    setIsChecked1(!isChecked1);
  };

  const toggleCheck2 = () => {
    setIsChecked2(!isChecked2);
  };

  const checkButtonStyle1 = isChecked1 ? { backgroundColor: COLORS.borderColor } : {};
  const checkButtonStyle2 = isChecked2 ? { backgroundColor: COLORS.borderColor } : {};

  // Date Picker
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };
  const clearDate = () => {
    setSelectedDate(null);
  };

  const formatDateTime = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label="Lead Listing" />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
          {/* Heading */}
          <View style={{ marginTop: RFPercentage(2.5), width: "90%", justifyContent: "center", alignItems: "center", alignSelf: "center", flexDirection: "row" }}>
            <Text style={{ fontSize: RFPercentage(2.4), color: "#06143b", fontFamily: FONTS.Medium }}>Lead Status Edit</Text>
            <AntDesign name="edit" style={{ marginLeft: RFPercentage(0.5), fontSize: RFPercentage(3.2) }} color={"#06143b"} />
          </View>

          {/* Picker to change status */}
          <View style={{ marginTop: RFPercentage(4), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
            <Text style={{ fontSize: RFPercentage(2), color: "#06143b", fontFamily: FONTS.Medium }}>Current Status: {currentStatus}</Text>
          </View>

          {/* Dropdown */}
          <View style={{ width: "90%", marginTop: RFPercentage(4), alignSelf: "center" }}>
            <DropDownPicker
              placeholder="Edit Status"
              placeholderStyle={{ color: COLORS.normalText }}
              style={{ borderColor: COLORS.borderColor, borderWidth: RFPercentage(0.1) }}
              dropDownContainerStyle={{ backgroundColor: "#0000", borderColor: COLORS.borderColor, borderWidth: RFPercentage(0.1) }}
              open={open}
              value={value}
              items={filteredItems}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              labelStyle={{
                fontWeight: "600",
                color: COLORS.dark,
              }}
            />
          </View>

          {/* Reason for lost */}
          {value == "LOST" ? (
            <View
              style={{
                width: "90%",
                height: RFPercentage(15),
                marginTop: open ? RFPercentage(30) : RFPercentage(4),
                borderColor: COLORS.borderColor,
                borderWidth: RFPercentage(0.1),
                borderRadius: RFPercentage(1),
              }}
            >
              <TextInput
                placeholder="Reason for Lost"
                placeholderTextColor={"grey"}
                maxHeight={RFPercentage(14)}
                scrollEnabled={true}
                multiline={true}
                style={{ height: "100%", fontSize: RFPercentage(2), width: "96%", position: "absolute", left: RFPercentage(1.5), top: RFPercentage(0.5) }}
              />
            </View>
          ) : null}

          {/* CheckList */}
          {(value == "WARM" || value == "HOT") && currentStatus !== "HOT" ? (
            <View style={{ width: "100%", marginTop: open ? RFPercentage(30) : RFPercentage(4), justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
              <Text style={{ fontSize: RFPercentage(2.2), color: "#06143b", fontFamily: FONTS.Medium }}>CheckList</Text>

              <View style={{ width: "90%", marginTop: RFPercentage(3), alignSelf: "center", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                <TouchableOpacity style={styles.checkButton} onPress={toggleCheck1}>
                  <View style={[styles.innerCircle, checkButtonStyle1]}>{isChecked1 && <View />}</View>
                </TouchableOpacity>
                <Text style={{ fontSize: RFPercentage(1.8), color: "#06143b", fontFamily: FONTS.Medium }}>Funding Available</Text>
              </View>

              <View style={{ width: "90%", marginTop: RFPercentage(3), alignSelf: "center", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                <TouchableOpacity style={styles.checkButton} onPress={toggleCheck2}>
                  <View style={[styles.innerCircle, checkButtonStyle2]}>{isChecked2 && <View />}</View>
                </TouchableOpacity>
                <Text style={{ fontSize: RFPercentage(1.8), color: "#06143b", fontFamily: FONTS.Medium }}>Budget Matching</Text>
              </View>

              {/* Input field for Budget Matching */}
              {isChecked2 ? (
                <View
                  style={{
                    width: "90%",
                    height: RFPercentage(6),
                    marginTop: RFPercentage(3),
                    borderColor: COLORS.borderColor,
                    borderWidth: RFPercentage(0.1),
                    borderRadius: RFPercentage(1),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextInput placeholder="0" placeholderTextColor={"grey"} keyboardType="numeric" style={{ width: "90%", fontWeight: "600", fontSize: RFPercentage(1.9), color: COLORS.dark }} />
                </View>
              ) : null}

              <View style={{ width: "90%", marginTop: RFPercentage(4), alignSelf: "center", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                <Text style={{ fontSize: RFPercentage(1.8), color: "#06143b", fontFamily: FONTS.Medium }}>Decision Making Date</Text>
              </View>
              {/* Date Picker */}
              <View style={styles.container1}>
                <TouchableOpacity onPress={showDatePicker} style={styles.inputContainer}>
                  <Text style={[styles.inputText, selectedDate ? styles.selectedText : styles.placeholderText]}>{selectedDate ? formatDateTime(selectedDate) : "Decision Making Date"}</Text>
                  <AntDesign name="calendar" style={{ fontSize: RFPercentage(2.2) }} color="#06143b" />
                </TouchableOpacity>

                {selectedDate && (
                  <TouchableOpacity onPress={clearDate} style={styles.clearButton}>
                    <Ionicons name="md-close-circle" size={24} color="#06143b" />
                  </TouchableOpacity>
                )}

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  headerTextIOS="Select Date"
                  pickerContainerStyleIOS={{ backgroundColor: "#C4C4C4" }}
                  textColor={COLORS.black}
                />
              </View>
            </View>
          ) : null}

          {value == "WARM" || value == "HOT" || value == "LOST" ? null : (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                marginTop: open ? RFPercentage(30) : RFPercentage(10),
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
          )}
        </View>
        <View style={{ marginBottom: RFPercentage(20) }} />
      </ScrollView>

      {/* Save Button */}
      {value == "WARM" || value == "HOT" || value == "LOST" ? (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            position: "absolute",
            bottom: RFPercentage(15),
            marginTop: RFPercentage(10),
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
      ) : null}
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
