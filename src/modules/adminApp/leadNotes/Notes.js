import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, FlatList } from "react-native";
import { COLORS, FONTS, Url } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import HTML from "react-native-render-html";
import moment from "moment";

export const LeadNotes = ({ navigation, route }) => {
  const { token } = useSelector((state) => state.user);
  const leadName = route.params?.leadName;
  const leadID = route.params?.leadID;
  const [apiResult, setApiResult] = useState(null);
  const [noteTypes, setNoteTypes] = useState([]);

  const [notes, setNotes] = useState("");
  const [editMode, setEditMode] = useState({
    notes: false,
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

  const fetchApiData = async () => {
    try {
      const response = await fetch(`${Url}get_notes_forlead_api?user_id=${token}&form_id=116&ref_id=${leadID}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setApiResult(data);
      console.log("\n\n\n\n\n\nNotes API Data here ", data);
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  useEffect(() => {
    if (apiResult && apiResult.length > 1) {
      setNoteTypes(apiResult[1]);
    }
  }, [apiResult]);

  const [showFullNote, setShowFullNote] = useState(false);
  const maxLines = 3;

  const toggleNote = () => {
    setShowFullNote(!showFullNote);
  };

  const renderNoteTypeItem = ({ item }) => {
    const noteHtml = showFullNote ? item.NOTE : item.NOTE.substring(0, 300);
    const shouldShowReadMore = item.NOTE.length > 300;
    const formattedDateTime = moment(item.CREATED_ON).format("DD-MM-YYYY hh:mm A");

    return (
      <View style={{ marginTop: RFPercentage(5), width: "100%", justifyContent: "flex-start", alignItems: "flex-start" }}>
        {/* Added by and at */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontFamily: FONTS.Medium, fontSize: RFPercentage(1.8), color: "black" }}>{item.CREATED_USER}</Text>
          <Text style={{ marginLeft: 10, fontFamily: FONTS.Medium, fontSize: RFPercentage(1.8), color: "grey" }}>{formattedDateTime}</Text>
        </View>
        {/* Notes Text */}
        <View style={{ marginTop: RFPercentage(1), width: "100%", justifyContent: "flex-start", alignItems: "flex-start" }}>
          <HTML style={{ lineHeight: RFPercentage(5) }} source={{ html: noteHtml }} />
        </View>
        {shouldShowReadMore && (
          <TouchableOpacity activeOpacity={0.8} style={{ marginTop: RFPercentage(0.1) }} onPress={toggleNote}>
            <Text style={{ color: "#CDA349", fontSize: RFPercentage(1.8), fontFamily: FONTS.Medium }}>{showFullNote ? "Read Less" : "Read More"}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label="Note Details" />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
          {/*Lead Name */}
          <TouchableOpacity activeOpacity={0.8} style={{ marginTop: RFPercentage(3), width: "90%", justifyContent: "center", alignItems: "center", flexDirection: "row", alignSelf: "center" }}>
            <Text style={{ fontSize: RFPercentage(2.6), color: "#06143b", fontWeight: "bold" }}>{leadName}</Text>
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
                    style={{
                      width: editMode[item.name] ? "90%" : "100%",
                      color: "#9CBBD2",
                      fontFamily: FONTS.Regular,
                    }}
                    value={item.value}
                    onChangeText={item.setter}
                    editable={editMode[item.name]}
                  />
                  {editMode[item.name] ? (
                    <View
                      style={{
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

          {noteTypes && noteTypes.length > 0 ? (
            <View style={{ width: "90%", justifyContent: "center", alignItems: "center" }}>
              <FlatList data={noteTypes} keyExtractor={(item) => item.NOTE_TYPE_ID.toString()} renderItem={renderNoteTypeItem} />
            </View>
          ) : (
            <Text style={{ fontSize: RFPercentage(2), color: "grey", marginTop: RFPercentage(5) }}>No Notes Added Yet</Text>
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
  noteTypeItem: {
    borderColor: "#CDA349",
    borderWidth: 1,
    borderRadius: RFPercentage(1.6),
    marginVertical: RFPercentage(1),
    padding: RFPercentage(1.7),
    alignItems: "center",
  },
  noteTypeText: {
    color: "#9CBBD2",
    fontFamily: FONTS.Regular,
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
