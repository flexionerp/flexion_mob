import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground, ScrollView, TextInput, Button } from "react-native";
import { COLORS, FONTS } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/FontAwesome";

//components
import InputField from "../../../common/InputField";

export const TotalLeadDetails = ({ navigation, route }) => {
  const [showButton, setShowButton] = useState(false);
  const toggleShowButton = () => {
    setShowButton(!showButton);
  };
  // Dropdown
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [items, setItems] = useState([
    { label: "SQFT", value: "SQFT" },
    { label: "SQMT", value: "SQMT" },
    { label: "LUMPSUM", value: "LUMPSUM" },
  ]);

  // Lead Fields;
  // const [inputField, setInputField] = useState([
  //   {
  //     placeholder: "Lead Name",
  //     value: "",
  //   },
  //   {
  //     placeholder: "Mobile Number",
  //     value: "",
  //   },
  //   {
  //     placeholder: "Email@gmail.com",
  //     value: "",
  //   },

  //   {
  //     placeholder: "Budget",
  //     value: "",
  //   },
  // ]);

  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [editMode, setEditMode] = useState({
    country: false,
    city: false,
    address: false,
    mobileNo: false,
    lastName: false,
    email: false,
    budget: false,
  });

  const fields = [
    {
      name: "lastName",
      label: "Last Name",
      value: lastName,
      setter: setLastName,
    },
    {
      name: "mobileNo",
      label: "Mobile Number",
      value: mobileNo,
      setter: setMobileNo,
    },
    {
      name: "email",
      label: "Email@gmail.com",
      value: email,
      setter: setEmail,
    },
    {
      name: "budget",
      label: "Budget",
      value: budget,
      setter: setBudget,
    },
    {
      name: "country",
      label: "Country",
      value: country,
      setter: setCountry,
    },
    {
      name: "city",
      label: "City",
      value: city,
      setter: setCity,
    },
    {
      name: "address",
      label: "Address",
      decs: true,
      value: address,
      setter: setAddress,
    },
  ];

  const handleEdit = (field) => {
    setEditMode((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const handleSave = (field) => {
    // Handle saving the value for the specific field here
    setEditMode((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  const handleCancel = (field) => {
    // Handle canceling the edit for the specific field here
    setEditMode((prevState) => ({
      ...prevState,
      [field]: false,
    }));
    // You can also reset the field value if needed
    if (field === "lastName") setLastName("");
    else if (field === "mobileNo") setMobileNo("");
    else if (field === "email") setEmail("");
    else if (field === "budget") setBudget("");
    else if (field === "country") setCountry("");
    else if (field === "city") setCity("");
    else if (field === "address") setAddress("");
  };
  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label="Lead Details" />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
          <TouchableOpacity
            onPress={toggleShowButton}
            activeOpacity={0.8}
            style={{ marginTop: RFPercentage(3), width: "86%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", alignSelf: "center" }}
          >
            <Text style={{ fontSize: RFPercentage(2), color: "#06143b", fontWeight: "bold" }}>Actions</Text>
            <MaterialCommunityIcons name="more" style={{ marginLeft: RFPercentage(1), fontSize: RFPercentage(3.2) }} color={"#06143b"} />
          </TouchableOpacity>

          {showButton ? (
            <View style={{ marginTop: RFPercentage(3), width: "86%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "center" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("LeadNotes")}
                activeOpacity={0.8}
                style={{ borderRadius: RFPercentage(1.5), backgroundColor: COLORS.primary, width: RFPercentage(14), height: RFPercentage(5.5), justifyContent: "center", alignItems: "center" }}
              >
                <Text style={{ color: COLORS.secondry, fontFamily: FONTS.Medium, fontSize: RFPercentage(2) }}>Notes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ borderRadius: RFPercentage(1.5), backgroundColor: COLORS.primary, width: RFPercentage(14), height: RFPercentage(5.5), justifyContent: "center", alignItems: "center" }}
              >
                <Text style={{ color: COLORS.secondry, fontFamily: FONTS.Medium, fontSize: RFPercentage(2) }}>Reminder</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("LeadEmail")}
                activeOpacity={0.8}
                style={{ borderRadius: RFPercentage(1.5), backgroundColor: COLORS.primary, width: RFPercentage(14), height: RFPercentage(5.5), justifyContent: "center", alignItems: "center" }}
              >
                <Text style={{ color: COLORS.secondry, fontFamily: FONTS.Medium, fontSize: RFPercentage(2) }}>Email</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {/* Input fields */}
          {/* <TouchableOpacity activeOpacity={0.8} style={{ marginTop: RFPercentage(3), width: "86%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", alignSelf: "center" }}>
            <Text style={{ fontSize: RFPercentage(2.3), color: "#06143b", fontWeight: "bold" }}>Lead Information</Text>
          </TouchableOpacity> */}

          {/* Input field */}
          {/* <View style={{ marginTop: RFPercentage(3), justifyContent: "center", alignItems: "center", width: "100%" }}>
            {inputField.map((item, i) => (
              <View key={i} style={{ marginTop: i === 3 ? RFPercentage(3.8) : RFPercentage(1.5) }}>
                <InputField
                  placeholder={item.placeholder}
                  placeholderColor={"#9CBBD2"}
                  height={RFPercentage(6)}
                  backgroundColor={"#ffff"}
                  icon={false}
                  borderWidth={RFPercentage(0.1)}
                  borderColor={COLORS.borderColor}
                  borderRadius={RFPercentage(1.8)}
                  fontSize={RFPercentage(1.8)}
                  fontFamily={FONTS.Regular}
                  color="#9CBBD2"
                  handleFeild={(text) => {
                    const updatedInputField = [...inputField];
                    updatedInputField[i].value = text;
                    setInputField(updatedInputField);
                  }}
                  value={item.value}
                  width={"92%"}
                />
                {i === 2 ? (
                  <View style={{ width: "88%", alignSelf: "center", marginTop: RFPercentage(2) }}>
                    <DropDownPicker
                      placeholder={selectedItems.length === 0 ? "Unit Type" : selectedItems.join(", ")}
                      placeholderStyle={{ color: "#9CBBD2" }}
                      style={{
                        marginBottom: open ? RFPercentage(18) : 0,
                        height: RFPercentage(4.5),
                        borderColor: COLORS.borderColor,
                        borderWidth: RFPercentage(0.1),
                        borderRadius: RFPercentage(2),
                      }}
                      dropDownContainerStyle={{
                        backgroundColor: "#0000",
                        borderColor: COLORS.borderColor,
                        borderWidth: RFPercentage(0.1),
                      }}
                      open={open}
                      value={values}
                      items={items}
                      setOpen={setOpen}
                      setValue={(selectedItems) => {
                        setValues(selectedItems);
                        setSelectedItems(selectedItems);
                      }}
                      setItems={setItems}
                      multiple={true}
                      labelStyle={{
                        fontWeight: "600",
                        color: COLORS.dark,
                      }}
                    />
                  </View>
                ) : null}
              </View>
            ))}
          </View> */}

          {/* Address Info */}
          <TouchableOpacity activeOpacity={0.8} style={{ marginTop: RFPercentage(3), width: "86%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", alignSelf: "center" }}>
            <Text style={{ fontSize: RFPercentage(2.3), color: "#06143b", fontWeight: "bold" }}>Lead Information</Text>
          </TouchableOpacity>
          {/* Input fields */}
          {/* <View
            style={{
              height: RFPercentage(6),
              borderColor: "#CDA349",
              borderWidth: 1,
              borderRadius: RFPercentage(1.6),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              marginTop: RFPercentage(3),
              width: "90%",
              padding: RFPercentage(1.7),
            }}
          >
            <TextInput placeholder="Country" placeholderTextColor={"#9CBBD2"} style={{ width: "100%", color: "#9CBBD2" }} value={country} onChangeText={setCountry} editable={editMode.country} />
            {editMode.country ? (
              <View style={{ position: "absolute", right: RFPercentage(0.8), flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={() => handleSave("country")}>
                  <Icon name="check" type="font-awesome" color="grey" size={18} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: RFPercentage(1) }} onPress={() => handleCancel("country")}>
                  <Icon name="close" type="font-awesome" color="grey" size={18} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ position: "absolute", right: RFPercentage(0.8) }}>
                <TouchableOpacity onPress={() => handleEdit("country")}>
                  <Icon name="edit" type="font-awesome" color="grey" size={18} />
                </TouchableOpacity>
              </View>
            )}
          </View> */}
          <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
            {fields.map((item, i) => (
              <View key={i} style={{ marginTop: i === 3 ? RFPercentage(3) : RFPercentage(3) }}>
                <View
                  style={{
                    height: item.decs ? RFPercentage(14) : RFPercentage(6),
                    borderColor: "#CDA349",
                    borderWidth: 1,
                    borderRadius: RFPercentage(1.6),
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "89%",
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
                        position: "absolute",
                        right: RFPercentage(0.8),
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity onPress={() => handleSave(item.name)}>
                        <Icon name="check" type="font-awesome" color="grey" size={18} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{ marginLeft: RFPercentage(1) }} onPress={() => handleCancel(item.name)}>
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
                {i === 2 ? (
                  <View style={{ width: "89%", alignSelf: "center", marginTop: RFPercentage(3) }}>
                    <DropDownPicker
                      placeholder={selectedItems.length === 0 ? "Unit Type" : selectedItems.join(", ")}
                      placeholderStyle={{ color: "#9CBBD2" }}
                      style={{
                        marginBottom: open ? RFPercentage(18) : 0,
                        borderColor: COLORS.borderColor,
                        borderWidth: RFPercentage(0.1),
                        borderRadius: RFPercentage(1.6),
                      }}
                      dropDownContainerStyle={{
                        backgroundColor: "#0000",
                        borderColor: COLORS.borderColor,
                        borderWidth: RFPercentage(0.1),
                      }}
                      open={open}
                      value={values}
                      items={items}
                      setOpen={setOpen}
                      setValue={(selectedItems) => {
                        setValues(selectedItems);
                        setSelectedItems(selectedItems);
                      }}
                      setItems={setItems}
                      multiple={true}
                      labelStyle={{
                        fontWeight: "600",
                        color: COLORS.dark,
                      }}
                    />
                  </View>
                ) : null}

                {i === 3 ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ marginTop: RFPercentage(3), width: "86%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", alignSelf: "flex-start" }}
                  >
                    <Text style={{ fontSize: RFPercentage(2.3), color: "#06143b", fontWeight: "bold" }}>Address Information</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            ))}
          </View>
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
