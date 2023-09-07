import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground, ScrollView, TextInput, Button } from "react-native";
import { COLORS, FONTS } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/FontAwesome";

const MAX_LINES_TO_SHOW = 3;
const NOTES_PER_LOAD = 3;

export const LeadNotes = ({ navigation, route }) => {
  const [notes, setNotes] = useState("");
  const [editMode, setEditMode] = useState({
    address: false,
  });

  const fields = [
    {
      name: "notes",
      label: "Notes",
      decs: true,
      value: notes,
      setter: setNotes,
    },
  ];

  const handleEdit = (field) => {
    setEditMode((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const handleSave = (field) => {
    setEditMode((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  const handleCancel = (field) => {
    setEditMode((prevState) => ({
      ...prevState,
      [field]: false,
    }));
    if (field === "notes") setNotes("");
  };

  // Notes
  const notesData = [
    {
      name: "Rana",
      timestamp: "02-Jan-2023 1:00 PM",
      noteText: "This is the test note that is being added at the time of development once the development phase is over we will replace this text with the original one.",
    },
    {
      name: "Ahmad",
      timestamp: "02-March-2023 2:00 PM",
      noteText:
        "This is the test note that is being added at the time of development once the development phase is over we will replace this text with the original one. Now this is the line to test weather the read more option is enabled now or not because if its not I will have to go thorugh the whole process again to make sure it works as expected.",
    },
    {
      name: "Usman",
      timestamp: "03-Jan-2023 2:00 PM",
      noteText:
        "This is the test note that is being added at the time of development once the development phase is over we will replace this text with the original one. Now this is the line to test weather the read more option is enabled now or not because if its not I will have to go thorugh the whole process again to make sure it works as expected.",
    },
    {
      name: "Saim",
      timestamp: "01-April-2023 2:00 PM",
      noteText:
        "This is the test note that is being added at the time of development once the development phase is over we will replace this text with the original one. Now this is the line to test weather the read more option is enabled now or not because if its not I will have to go thorugh the whole process again to make sure it works as expected.",
    },
    {
      name: "Tayyab",
      timestamp: "02-April-2023 2:00 PM",
      noteText:
        "This is the test note that is being added at the time of development once the development phase is over we will replace this text with the original one. Now this is the line to test weather the read more option is enabled now or not because if its not I will have to go thorugh the whole process again to make sure it works as expected.",
    },
  ];

  const [expandedNotes, setExpandedNotes] = useState({});
  const [visibleNotes, setVisibleNotes] = useState(NOTES_PER_LOAD);

  const handleReadMoreClick = (index) => {
    setExpandedNotes((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const handleLoadMoreClick = () => {
    setVisibleNotes((prevVisibleNotes) => prevVisibleNotes + NOTES_PER_LOAD);
  };
  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label="Note Details" />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
          {/*Lead Name */}
          <TouchableOpacity activeOpacity={0.8} style={{ marginTop: RFPercentage(3), width: "90%", justifyContent: "center", alignItems: "center", flexDirection: "row", alignSelf: "center" }}>
            <Text style={{ fontSize: RFPercentage(2.6), color: "#06143b", fontWeight: "bold" }}>Lead Name</Text>
          </TouchableOpacity>

          {/*  Notes input field*/}
          <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
            {fields.map((item, i) => (
              <View key={i} style={{ marginTop: RFPercentage(4) }}>
                <View
                  style={{
                    height: item.decs ? RFPercentage(14) : RFPercentage(6),
                    borderColor: "#CDA349",
                    borderWidth: 1,
                    borderRadius: RFPercentage(1.6),
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "90%",
                    padding: RFPercentage(1.7),
                  }}
                >
                  <TextInput
                    multiline={item.decs ? true : null}
                    placeholder={item.label}
                    placeholderTextColor={"#9CBBD2"}
                    style={{ width: "100%", color: "#9CBBD2", fontFamily: FONTS.Regular }}
                    value={item.value}
                    onChangeText={item.setter}
                    editable={editMode[item.name]}
                  />
                  {editMode[item.name] ? (
                    <View
                      style={{
                        // position: "absolute",
                        // right: RFPercentage(0.8),
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity onPress={() => handleSave(item.name)}>
                        <Icon name="check" type="font-awesome" color="grey" size={18} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ marginLeft: RFPercentage(0.5) }} onPress={() => handleCancel(item.name)}>
                        <Icon name="close" type="font-awesome" color="grey" size={18} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={{ position: "absolute", right: RFPercentage(0.8) }}>
                      <TouchableOpacity onPress={() => handleEdit(item.name)}>
                        <Icon name="edit" type="font-awesome" color="grey" size={18} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Notes Cart */}
          {notesData.slice(0, visibleNotes).map((note, index) => (
            <View key={index} style={{ marginTop: RFPercentage(5), width: "90%", justifyContent: "flex-start", alignItems: "flex-start" }}>
              {/* Added by and at */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: FONTS.Medium, fontSize: RFPercentage(1.8), color: "black" }}>{note.name}</Text>
                <Text style={{ marginLeft: 10, fontFamily: FONTS.Medium, fontSize: RFPercentage(1.8), color: "grey" }}>{note.timestamp}</Text>
              </View>
              {/* Notes Text */}
              <View style={{ marginTop: RFPercentage(1), width: "100%", justifyContent: "flex-start", alignItems: "flex-start" }}>
                <Text numberOfLines={expandedNotes[index] ? undefined : MAX_LINES_TO_SHOW} style={{ textAlign: "justify", lineHeight: RFPercentage(2.8) }}>
                  {note.noteText}
                </Text>
                {note.noteText.length > MAX_LINES_TO_SHOW * 40 && (
                  <TouchableOpacity onPress={() => handleReadMoreClick(index)}>
                    <Text style={{ color: "#CDA349", marginTop: 5, fontFamily: FONTS.Bold }}>{expandedNotes[index] ? "Read Less" : "Read More"}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
          {notesData.length > visibleNotes && (
            <TouchableOpacity
              onPress={handleLoadMoreClick}
              activeOpacity={0.8}
              style={{
                marginTop: RFPercentage(5),
                borderRadius: RFPercentage(1.5),
                backgroundColor: COLORS.primary,
                width: RFPercentage(16),
                height: RFPercentage(5.5),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: COLORS.secondry, fontFamily: FONTS.Medium, fontSize: RFPercentage(2) }}>Load More</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ marginBottom: RFPercentage(20) }} />
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
  priceListingTextStyle: {
    fontSize: RFPercentage(1.5),
    color: "#06143b",
    fontWeight: "bold",
  },
  backgroundCartImage: {
    alignItems: "center",
    marginTop: RFPercentage(3),
    width: RFPercentage(45),
    height: RFPercentage(28),
    borderRadius: RFPercentage(1.8),
    borderColor: COLORS.borderColor,
    borderWidth: RFPercentage(0.1),
    overflow: "hidden",
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
    marginTop: RFPercentage(2),
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
    marginTop: RFPercentage(1.2),
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
    width: 100,
    height: 30,
    backgroundColor: "#87CEEB",
    borderRadius: 10,
  },
  dropDownView: {},
});
