import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Switch, Alert, ActivityIndicator } from "react-native";
import { COLORS, FONTS, Url } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

export const Reminder = ({ navigation, route }) => {
  const { token } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const toggleSwitch = () => {
    setIsSwitchOn((previousState) => !previousState);
  };
  const [isStatusOn, setStatusOn] = useState(false);
  const leadID = route.params?.leadID;

  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [message, setMessage] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
    const formattedDate = formatDateTime(date);
    console.log("Formatted Date:", formattedDate);
  };
  const clearDate = () => {
    setSelectedDate(null);
  };

  const formatDateTime = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleDateString(undefined, options);
  };

  const [reminders, setReminders] = useState([]);

  const fetchReminders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${Url}get_reminders_api?ref_id=${leadID}&ref_code=lead_reminder&org_id=33&user_id=${token}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setReminders(data);
      setIsLoading(false);
      console.log("Fetched reminders:", data);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching reminders:", error);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  // Insert Reminder API
  const sendReminder = async () => {
    console.log("Message Typed:", message);
    const formattedDate = selectedDate ? formatDateTime(selectedDate) : null;
    const is_active = isSwitchOn ? 1 : 0;
    console.log("\n\n\n\n\n\n\n\n\n\n\nFormat date time", formattedDate);
    const apiUrl = `${Url}insert_reminder_api?remin_date=08-FEB-2023,03:58:00 PM&form_id=116&ref_code=lead_reminder&ref_id=${leadID}&is_sms=0&is_email=1&is_whatsapp=0&message=${message}&org_id=33&ref_table=lead_overview&user_id=${token}&ref_name=lead_reminder&is_active=${is_active}`;
    console.log(is_active);
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("API response:", data);
      Alert.alert("Success", "Reminder Created Successfully!", [
        {
          text: "OK",
          onPress: () => {
            setMessage("");
            fetchReminders();
          },
        },
      ]);
    } catch (error) {
      console.error("Error sending reminder:", error);
    }
  };

  const tableData = [
    {
      srNo: 1,
      reminderSetTo: "John Doe",
      message: "Hello, World!",
      sent: "Yes",
      createdOn: "2023-09-14",
      activeDeactivate: "Active",
    },
    // Add more data rows as needed
  ];

  const renderTableHeader = () => {
    return (
      <View style={styles.tableRow}>
        <Text style={styles.columnHeader}>Sr.No</Text>
        {/* <Text style={styles.columnHeader}>Reminder</Text> */}
        <Text style={styles.columnHeader}>Message</Text>
        <Text style={styles.columnHeader}>Sent</Text>
        <Text style={styles.columnHeader}>Created</Text>
        <Text style={styles.columnHeader}>Status</Text>
      </View>
    );
  };

  const renderTableRow = (rowData, index) => {
    const formattedReminderDate = moment(rowData.REMIND_DATE).format("YYYY-MM-DD HH:mm A");

    return (
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>{index + 1}</Text>
        <Text style={styles.tableCell}>{rowData.MESSAGE}</Text>
        <Text style={styles.tableCell}>{rowData.IS_SENT === "YES" ? "Yes" : "No"}</Text>
        <Text style={styles.tableCell}>{formattedReminderDate}</Text>
        <View style={{ alignItems: "center", left: RFPercentage(0.1) }}>
          <Switch style={{ transform: [{ scale: 0.8 }] }} value={rowData.IS_ACTIVE === 1} trackColor={{ false: "#CDA349", true: "#06143b" }} onValueChange={(newValue) => setStatusOn(newValue)} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container1}>
      <BackButton navigation={navigation} label="Lead Detail" />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
          <TouchableOpacity activeOpacity={0.8} style={{ marginTop: RFPercentage(4), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", alignSelf: "center" }}>
            <Text style={{ fontSize: RFPercentage(2.3), color: "#06143b", fontWeight: "bold" }}>Select Date</Text>
          </TouchableOpacity>
          <View style={styles.container}>
            <TouchableOpacity onPress={showDatePicker} style={styles.inputContainer}>
              <Text style={[styles.inputText, selectedDate ? styles.selectedText : styles.placeholderText]}>{selectedDate ? formatDateTime(selectedDate) : "Select Date and Time"}</Text>
              <AntDesign name="calendar" style={{ fontSize: RFPercentage(2.2) }} color="#06143b" />
            </TouchableOpacity>

            {selectedDate && (
              <TouchableOpacity onPress={clearDate} style={styles.clearButton}>
                <Ionicons name="md-close-circle" size={24} color="#06143b" />
              </TouchableOpacity>
            )}

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              headerTextIOS="Select Date and Time"
              pickerContainerStyleIOS={{ backgroundColor: "white" }}
              textColor={COLORS.black}
            />
          </View>

          <TouchableOpacity activeOpacity={0.8} style={{ marginTop: RFPercentage(4), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", alignSelf: "center" }}>
            <Text style={{ fontSize: RFPercentage(2.3), color: "#06143b", fontWeight: "bold" }}>Message</Text>
          </TouchableOpacity>
          <View
            style={{
              height: RFPercentage(20),
              borderColor: "#CDA349",
              borderWidth: 1,
              borderRadius: RFPercentage(1.6),
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              width: "90%",
              padding: RFPercentage(2),
              marginTop: RFPercentage(2),
            }}
          >
            <TextInput
              value={message}
              onChangeText={(text) => setMessage(text)}
              placeholder="Message"
              placeholderTextColor={"#9CBBD2"}
              style={{ width: "90%", color: COLORS.black, fontSize: RFPercentage(1.8) }}
            />
          </View>

          <View style={{ flexDirection: "row", marginTop: RFPercentage(2), width: "90%", justifyContent: "flex-start", alignItems: "center" }}>
            <Text style={{ fontSize: RFPercentage(2), color: "#06143b", fontWeight: "bold" }}>Set Status</Text>
            <Switch style={{ transform: [{ scale: 0.8 }] }} value={isSwitchOn} onValueChange={toggleSwitch} trackColor={{ false: "#CDA349", true: "#06143b" }} />
          </View>

          <View style={{ marginTop: RFPercentage(3), width: "60%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "center" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={sendReminder}
              style={{ borderRadius: RFPercentage(1.5), backgroundColor: COLORS.primary, width: RFPercentage(14), height: RFPercentage(5.5), justifyContent: "center", alignItems: "center" }}
            >
              <Text style={{ color: COLORS.secondry, fontFamily: FONTS.Medium, fontSize: RFPercentage(2) }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ borderRadius: RFPercentage(1.5), backgroundColor: COLORS.normalText, width: RFPercentage(14), height: RFPercentage(5.5), justifyContent: "center", alignItems: "center" }}
            >
              <Text style={{ color: COLORS.secondry, fontFamily: FONTS.Medium, fontSize: RFPercentage(2) }}>Close</Text>
            </TouchableOpacity>
          </View>

          {/* Table */}
          {isLoading ? (
            <ActivityIndicator size="large" style={{ marginTop: RFPercentage(6) }} color={"#06143b"} />
          ) : reminders.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: RFPercentage(14), fontSize: RFPercentage(1.8), color: "grey", fontFamily: FONTS.Regular }}>No Data Added</Text>
          ) : (
            // Render data when isLoading is false and reminders array is not empty
            <View style={styles.tableContainer}>
              {renderTableHeader()}
              {reminders.map((rowData, index) => renderTableRow(rowData, index))}
            </View>
          )}
        </View>
        <View style={{ marginBottom: RFPercentage(20) }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.secondry,
  },
  container: {
    width: "90%",
    height: RFPercentage(6),
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#CDA349",
    borderWidth: 1,
    marginTop: RFPercentage(2),
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

  tableContainer: {
    marginTop: RFPercentage(4),
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#CDA349",
    width: "100%",
  },

  columnHeader: {
    color: "#000",
    fontWeight: "bold",
    fontSize: RFPercentage(1.6),
    flex: 1,
    height: RFPercentage(4),
    textAlign: "center",
    // backgroundColor: "#06143b",
    // borderRightColor: "#FFFFFF",
    // borderColor: "#FFFFFF",
    // borderWidth: RFPercentage(0.1),
  },

  tableCell: {
    fontSize: RFPercentage(1.7),
    flex: 1,
    textAlign: "center",
    paddingVertical: 5,
    color: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#CDA349", // Border color
  },
});
