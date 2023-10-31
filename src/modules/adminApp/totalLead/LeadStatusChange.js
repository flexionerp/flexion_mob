import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RFPercentage } from "react-native-responsive-fontsize";
import AntDesign from "react-native-vector-icons/AntDesign";
import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, FONTS, Url } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";

export const LeadStatusChange = ({ navigation, route }) => {
  const currentStatus = route.params?.currentStatus;
  const leadID = route.params?.leadID;
  const { token } = useSelector((state) => state.user);
  const [reasonForLost, setReasonForLost] = useState("");
  const [budgetMaxValue, setBudgetMaxValue] = useState("");
  const [isSimpleLeadStatusSaving, setSimpleLeadStatusSaving] = useState(false);
  const [isChecklistLeadStatusSaving, setChecklistLeadStatusSaving] = useState(false);

  // Dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isCleared, setIsCleared] = useState(false);

  const [items, setItems] = useState([
    { label: "COLD", value: 2 },
    { label: "WARM", value: 3 },
    { label: "HOT", value: 4 },
    { label: "LOST", value: 6 },
    { label: "JUNK", value: 5 },
    { label: "DEAL", value: 7 },
  ]);
  const filteredItems = items.filter((item) => item.label !== currentStatus).filter((item) => !(["ASSIGNED", "LOST"].includes(currentStatus) && item.value === 7));

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

  const calculateMaxDate = () => {
    const currentDate = new Date();
    if (value === 4) {
      return moment(currentDate).add(15, "days").toDate();
    }
    if (value === 3) {
      return moment(currentDate).add(30, "days").toDate();
    }
    return moment(currentDate).toDate();
  };

  // Simple API
  const updateSimpleLeadStatus = async () => {
    try {
      const response = await axios.get(`${Url}update_lead_status_api`, {
        params: {
          pk: leadID,
          status: value,
          user_id: token,
        },
      });

      console.log("\n\n\n\n\n\n\n\n\nSuccessfully Status Updated", response.data);
      Alert.alert("Status Updated Successfully", "Success!", [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  // Simple API
  const updateLostLeadStatus = async () => {
    try {
      const response = await axios.get(`${Url}lead_lost_manually_api`, {
        params: {
          lead_id: leadID,
          user_id: token,
          comments: reasonForLost,
        },
      });

      console.log("\n\n\n\n\n\n\n\n\nSuccessfully Lost Status Updated", response.data);
      Alert.alert("Status Updated Successfully", "Success!", [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  // Chec List
  const updateChecklistLeadStatus = async () => {
    if (!selectedDate) {
      Alert.alert("Please select a Decision Making Date", "Kindly pick a date.");
      return;
    }

    if (isChecked2 && !budgetMaxValue) {
      Alert.alert("Please enter a value for Budget Matching", "Kindly input a value.");
      return;
    }
    try {
      const response = await axios.get(`${Url}lead_change_statusWARM_api`, {
        params: {
          dur_date: selectedDate,
          budget_max: budgetMaxValue,
          to_status: value,
          funding: isChecked1 ? 1 : 0,
          budget: isChecked2 ? 1 : 0,
          id: leadID,
          user_id: token,
        },
      });

      console.log("\n\n\n\n\n\n\n\n\nStatus Updated Successfully", response.data);
      Alert.alert("Status Updated Successfully", "Success!", [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      console.error("API Error:", error);
    }
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
          {value == 6 ? (
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
                value={reasonForLost}
                onChangeText={(text) => setReasonForLost(text)}
                style={{ height: "100%", fontSize: RFPercentage(2), width: "96%", position: "absolute", left: RFPercentage(1.5), top: RFPercentage(0.5) }}
              />
            </View>
          ) : null}

          {/* CheckList */}
          {(value == 3 || value == 4) && currentStatus !== 4 ? (
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
                  <TextInput
                    placeholder="0"
                    placeholderTextColor={"grey"}
                    keyboardType="numeric"
                    style={{
                      width: "90%",
                      fontWeight: "600",
                      fontSize: RFPercentage(1.9),
                      color: COLORS.dark,
                    }}
                    value={budgetMaxValue}
                    onChangeText={(text) => setBudgetMaxValue(text)}
                  />
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
                  maximumDate={calculateMaxDate()}
                  pickerContainerStyleIOS={{ backgroundColor: "#C4C4C4" }}
                  textColor={COLORS.black}
                />
              </View>
              <View style={{ marginTop: RFPercentage(1.5), width: "90%", justifyContent: "flex-start", alignItems: "flex-start", alignSelf: "center" }}>
                {value == 4 ? (
                  <Text style={{ color: "#06143b", fontFamily: FONTS.Regular, fontSize: RFPercentage(1.8) }}>You can select date upto next 15 Days</Text>
                ) : (
                  <Text style={{ color: "#06143b", fontFamily: FONTS.Regular, fontSize: RFPercentage(1.8) }}>You can select date upto next 30 Days</Text>
                )}
              </View>
            </View>
          ) : null}

          {value == 3 || value == 4 || value == 6 ? null : (
            // Simple Save Button
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setSimpleLeadStatusSaving(true); // Set loading state to true
                updateSimpleLeadStatus()
                  .then(() => {
                    setSimpleLeadStatusSaving(false); // Set loading state to false on success
                  })
                  .catch(() => {
                    setSimpleLeadStatusSaving(false); // Set loading state to false on failure
                  });
              }}
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
              <Text style={{ color: COLORS.secondry, fontFamily: FONTS.Bold, fontSize: RFPercentage(2.1) }}> {isSimpleLeadStatusSaving ? "Saving..." : "Save"}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ marginBottom: RFPercentage(20) }} />
      </ScrollView>

      {/* Checklist Save Button */}
      {/* {value == 3 || value == 4 || value == 6 ? (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setChecklistLeadStatusSaving(true);
            updateChecklistLeadStatus()
              .then(() => {
                setChecklistLeadStatusSaving(false);
              })
              .catch(() => {
                setChecklistLeadStatusSaving(false);
              });
          }}
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
          <Text style={{ color: COLORS.secondry, fontFamily: FONTS.Bold, fontSize: RFPercentage(2.1) }}> {isChecklistLeadStatusSaving ? "Saving..." : "Save"}</Text>
        </TouchableOpacity>
      ) : null} */}
      {value === 6 ? (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setChecklistLeadStatusSaving(true);
            updateLostLeadStatus()
              .then(() => {
                setChecklistLeadStatusSaving(false);
              })
              .catch(() => {
                setChecklistLeadStatusSaving(false);
              });
          }}
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
          <Text style={{ color: "white", fontFamily: FONTS.Bold, fontSize: RFPercentage(2.1) }}>{isChecklistLeadStatusSaving ? "Saving..." : "Save"}</Text>
        </TouchableOpacity>
      ) : value === 3 || value === 4 ? (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setChecklistLeadStatusSaving(true);
            updateChecklistLeadStatus()
              .then(() => {
                setChecklistLeadStatusSaving(false);
              })
              .catch(() => {
                setChecklistLeadStatusSaving(false);
              });
          }}
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
          <Text style={{ color: "white", fontFamily: FONTS.Bold, fontSize: RFPercentage(2.1) }}>{isChecklistLeadStatusSaving ? "Saving..." : "Save"}</Text>
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
