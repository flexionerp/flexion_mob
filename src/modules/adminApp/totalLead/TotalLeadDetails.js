import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Modal, Image } from "react-native";
import { COLORS, FONTS } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import DocumentPicker from "react-native-document-picker";
import PDFView from "react-native-pdf";

//components
import InputField from "../../../common/InputField";

export const TotalLeadDetails = ({ navigation, route }) => {
  const leadData = route.params?.leadData;
  if (!leadData) {
    return (
      <View>
        <Text>Error: Lead data not found.</Text>
      </View>
    );
  }

  const [pickedImages, setPickedImages] = useState([]);
  const [pickedPDFs, setPickedPDFs] = useState([]);

  const openImagePicker = () => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.error) {
        setPickedImages([...pickedImages, response.assets[0]]);
      }
    });
  };

  const openPDFPicker = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setPickedPDFs([...pickedPDFs, result]);
      console.log("Picked PDF Result", result);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const openCamera = () => {
    const options = {
      title: "Take a Photo",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
      }
      console.log("Cemra Picked Image Result", response);
    });
  };
  const [showButton, setShowButton] = useState(false);
  const toggleShowButton = () => {
    setShowButton(!showButton);
  };

  // Menu
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const [isMenuVisible2, setIsMenuVisible2] = useState(false);
  const toggleMenu2 = () => {
    setIsMenuVisible2(!isMenuVisible2);
  };

  const [isMenuVisible3, setIsMenuVisible3] = useState(false);
  const toggleMenu3 = () => {
    setIsMenuVisible3(!isMenuVisible3);
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

  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [company, setCompany] = useState("");
  const [leadOwner, setLeadOwner] = useState("");
  const [paymentPlan, setPaymentPlan] = useState("");
  const [brokerName, setBrokerName] = useState("");
  const [budgetFrom, setBudgetFrom] = useState("");
  const [decisionMakingDate, setDecisionMakingDate] = useState("");
  const [pobox, setPOBox] = useState("");
  const [rescountry, setResCountry] = useState("");

  const [editMode, setEditMode] = useState({
    country: false,
    city: false,
    address: false,
    mobileNo: false,
    lastName: false,
    email: false,
    budgetMax: false,
    phone: false,
    leadStatus: false,
    leadSource: false,
    modifiedBy: false,
    createdBy: false,
    company: false,
    leadOwner: false,
    paymentPlan: false,
    brokerName: false,
    budgetFrom: false,
    decisionMakingDate: false,
    pOBox: false,
    rescountry: false,
  });

  const fields = [
    {
      name: "lastName",
      label: leadData.LAST_NAME || "Last Name",
      value: lastName,
      setter: setLastName,
    },
    {
      name: "mobileNo",
      label: leadData.MOBILE || "Mobile Number",
      value: mobileNo,
      setter: setMobileNo,
    },
    {
      name: "email",
      label: leadData.EMAIL || "Email",
      value: email,
      setter: setEmail,
    },
    {
      name: "budgetMax",
      label: leadData.BUDGET_MAX || "Budget Max",
      value: budgetMax,
      setter: setBudgetMax,
    },
    {
      name: "phone",
      label: "Phone",
      value: phone,
      setter: setPhone,
    },
    {
      name: "leadStatus",
      label: leadData.LEAD_STATUS || "Lead Status",
      value: leadStatus,
      setter: setLeadStatus,
    },
    {
      name: "leadSource",
      label: leadData.LEAD_SOURCE || "Lead Source",
      value: leadSource,
      setter: setLeadSource,
    },
    {
      name: "modifiedBy",
      label: "Modified By",
      value: modifiedBy,
      setter: setModifiedBy,
    },
    {
      name: "createdBy",
      label: "Created By",
      value: createdBy,
      setter: setCreatedBy,
    },
    {
      name: "company",
      label: leadData.COMPANY || "Company",
      value: company,
      setter: setCompany,
    },
    {
      name: "leadOwner",
      label: "Lead Owner",
      value: leadOwner,
      setter: setLeadOwner,
    },
    {
      name: "paymentPlan",
      label: "Payment Plan",
      value: paymentPlan,
      setter: setPaymentPlan,
    },
    {
      name: "brokerName",
      label: leadData.BROKER || "Broker Name",
      value: brokerName,
      setter: setBrokerName,
    },
    {
      name: "budgetFrom",
      label: "Budget From",
      value: budgetFrom,
      setter: setBudgetFrom,
    },
    {
      name: "decisionMakingDate",
      label: "Decision Making Date",
      value: decisionMakingDate,
      setter: setDecisionMakingDate,
    },
    ,
    {
      name: "country",
      label: leadData.COUNTRY || "Country",
      value: country,
      setter: setCountry,
    },
    {
      name: "city",
      label: leadData.CITY || "City",
      value: city,
      setter: setCity,
    },
    {
      name: "pobox",
      label: leadData.POBOX || "PO BOX",
      value: pobox,
      setter: setPOBox,
    },
    {
      name: "rescountry",
      label: "RES Country",
      value: rescountry,
      setter: setResCountry,
    },
    {
      name: "address",
      label: leadData.ADDRESS || "Address",
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
    // Reset the value for the specific field when canceled
    switch (field) {
      case "lastName":
        setLastName("");
        break;
      case "mobileNo":
        setMobileNo("");
        break;
      case "email":
        setEmail("");
        break;
      case "budgetMax":
        setBudgetMax("");
        break;
      case "country":
        setCountry("");
        break;
      case "city":
        setCity("");
        break;
      case "address":
        setAddress("");
        break;
      case "phone":
        setPhone("");
        break;
      case "leadStatus":
        setLeadStatus("");
        break;
      case "leadSource":
        setLeadSource("");
        break;
      case "modifiedBy":
        setModifiedBy("");
        break;
      case "createdBy":
        setCreatedBy("");
        break;
      case "company":
        setCompany("");
        break;
      case "leadOwner":
        setLeadOwner("");
        break;
      case "paymentPlan":
        setPaymentPlan("");
        break;
      case "pobox":
        setPOBox("");
        break;
      case "brokerName":
        setBrokerName("");
        break;
      case "budgetFrom":
        setBudgetFrom("");
        break;
      case "rescountry":
        setResCountry("");
        break;
      case "decisionMakingDate":
        setDecisionMakingDate("");
        break;
      default:
        break;
    }
  };

  const clearAttachments = () => {
    setAttachments([]);
  };

  // Email Main Body Message
  const [message, setMessage] = useState("");

  const handleMessageChange = (text) => {
    setMessage(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label="Lead Details" />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
        {/* <Text>{leadData.ID}</Text> */}
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
          <View style={{ marginTop: RFPercentage(3), width: "86%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("LeadNotes", { leadName: leadData.FIRST_NAME, leadID: leadData.ID })}
              activeOpacity={0.8}
              style={{ borderRadius: RFPercentage(1.5), backgroundColor: COLORS.primary, width: RFPercentage(14), height: RFPercentage(5.5), justifyContent: "center", alignItems: "center" }}
            >
              <Text style={{ color: COLORS.secondry, fontFamily: FONTS.Medium, fontSize: RFPercentage(2) }}>Notes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Reminder", { leadID: leadData.ID })}
              activeOpacity={0.8}
              style={{ borderRadius: RFPercentage(1.5), backgroundColor: COLORS.primary, width: RFPercentage(14), height: RFPercentage(5.5), justifyContent: "center", alignItems: "center" }}
            >
              <Text style={{ color: COLORS.secondry, fontFamily: FONTS.Medium, fontSize: RFPercentage(2) }}>Reminder</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => [
                navigation.navigate("InboxMessagesScreen", {
                  title: "Inbox",
                  heading: "Recent Messages",
                  Lead_Email: leadData.EMAIL,
                  Lead_ID: leadData.ID,
                  type: "inbox",
                  leadData: leadData,
                }),
              ]}
              activeOpacity={0.8}
              style={{ borderRadius: RFPercentage(1.5), backgroundColor: COLORS.primary, width: RFPercentage(14), height: RFPercentage(5.5), justifyContent: "center", alignItems: "center" }}
            >
              <Text style={{ color: COLORS.secondry, fontFamily: FONTS.Medium, fontSize: RFPercentage(2) }}>Email</Text>
            </TouchableOpacity>
          </View>

          {/* Address Info */}
          <TouchableOpacity activeOpacity={0.8} style={{ marginTop: RFPercentage(3), width: "86%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", alignSelf: "center" }}>
            <Text style={{ fontSize: RFPercentage(2.3), color: "#06143b", fontWeight: "bold" }}>Lead Information</Text>
          </TouchableOpacity>

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

                {i === 14 ? (
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

      {/* Drawer Modal */}
      <Modal visible={isMenuVisible} transparent={true} onRequestClose={() => setIsMenuVisible(false)}>
        <View style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={styles.menuContainer}>
            {/*Lead Name */}
            <TouchableOpacity activeOpacity={0.8} style={{ marginTop: RFPercentage(4), width: "90%", justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
              <Text style={{ fontSize: RFPercentage(2.2), color: "#06143b", fontFamily: FONTS.Medium }}>Ibrahim Khalid</Text>
              <Text style={{ fontSize: RFPercentage(2), color: "#06143b", fontFamily: FONTS.Medium }}>EmailIbrahim@gmail.com</Text>
            </TouchableOpacity>
            <View style={{ marginTop: RFPercentage(4), width: "100%", height: RFPercentage(0.1), backgroundColor: "lightgrey" }} />
            {/* Buttons */}
            <TouchableOpacity
              onPress={() => [setIsMenuVisible(false), setIsMenuVisible2(true)]}
              activeOpacity={0.8}
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                marginTop: RFPercentage(4.5),
              }}
            >
              <Feather name="edit" style={{ fontSize: RFPercentage(3.4) }} color={"#06143b"} />
              <Text style={{ marginLeft: RFPercentage(1.2), color: "#06143b", fontFamily: FONTS.Medium, fontSize: RFPercentage(2.1) }}>New Mail</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => [
                setIsMenuVisible(false),
                navigation.navigate("MessagesScreen", {
                  title: "Inbox",
                  heading: "Recent Messages",
                  Lead_Email: leadData.EMAIL,
                  Lead_ID: leadData.ID,
                  type: "inbox",
                }),
              ]}
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                marginTop: RFPercentage(3),
              }}
            >
              <MaterialIcons name="move-to-inbox" style={{ fontSize: RFPercentage(3.4) }} color={"#06143b"} />
              <Text style={{ marginLeft: RFPercentage(1.2), color: "#06143b", fontFamily: FONTS.Medium, fontSize: RFPercentage(2.1) }}>Inbox</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => [
                setIsMenuVisible(false),
                navigation.navigate("MessagesScreen", {
                  title: "Send",
                  heading: "Recent Messages",
                  Lead_Email: leadData.EMAIL,
                  Lead_ID: leadData.ID,
                  type: "send",
                }),
              ]}
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                marginTop: RFPercentage(3),
              }}
            >
              <FontAwesome name="send-o" style={{ fontSize: RFPercentage(3) }} color={"#06143b"} />
              <Text style={{ marginLeft: RFPercentage(1.2), color: "#06143b", fontFamily: FONTS.Medium, fontSize: RFPercentage(2.1) }}>Sent</Text>
            </TouchableOpacity>

            {/* Close */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsMenuVisible(false)}
              style={{ flexDirection: "row", position: "absolute", width: "100%", bottom: RFPercentage(10), justifyContent: "flex-start", alignItems: "center" }}
            >
              <Ionicons name="backspace-outline" style={{ fontSize: RFPercentage(4) }} color={"#06143b"} />

              <Text style={{ marginLeft: RFPercentage(1.2), color: "#06143b", fontFamily: FONTS.Medium, fontSize: RFPercentage(2.1) }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* New Mail Modal */}
      <Modal visible={isMenuVisible2} transparent={true} onRequestClose={() => setIsMenuVisible2(false)}>
        <View style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={styles.menuContainer2}>
            <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
              <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                {/*Lead Name */}
                <View style={{ marginTop: RFPercentage(2), width: "90%", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row" }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => setIsMenuVisible2(false)}>
                    <AntDesign name="close" style={{ fontSize: RFPercentage(3) }} color={"#06143b"} />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={{ marginLeft: RFPercentage(2), justifyContent: "center", alignItems: "flex-start" }}>
                    <Text style={{ fontSize: RFPercentage(2.1), color: "#06143b", fontFamily: FONTS.Medium }}>New Message</Text>
                    <Text style={{ fontSize: RFPercentage(1.8), color: "grey", fontFamily: FONTS.Medium }}>EmailIbrahim@gmail.com</Text>
                  </TouchableOpacity>
                </View>
                {/* Saperation */}
                <View style={{ marginTop: RFPercentage(2), width: "100%", height: RFPercentage(0.1), backgroundColor: "lightgrey" }} />
                {/* To */}
                <View style={{ marginTop: RFPercentage(2), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                  <Text style={{ fontSize: RFPercentage(2), color: "grey", fontFamily: FONTS.Medium }}>To:</Text>
                  <TextInput style={{ fontFamily: FONTS.Regular, color: "black", marginLeft: RFPercentage(1), width: "100%" }} />
                </View>
                {/* Saperation */}
                <View style={{ marginTop: RFPercentage(2), width: "100%", height: RFPercentage(0.1), backgroundColor: "lightgrey" }} />
                {/* Subject */}
                <View style={{ marginTop: RFPercentage(2), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                  <Text style={{ fontSize: RFPercentage(2), color: "grey", fontFamily: FONTS.Medium }}>Subject:</Text>
                  <TextInput style={{ fontFamily: FONTS.Regular, color: "black", marginLeft: RFPercentage(1), width: "100%" }} />
                </View>
                {/* Saperation */}
                <View style={{ marginTop: RFPercentage(2), width: "100%", height: RFPercentage(0.1), backgroundColor: "lightgrey" }} />
                <View
                  style={{
                    marginTop: RFPercentage(2),
                    width: "90%",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <TextInput
                    placeholder="Message"
                    multiline={true}
                    style={{
                      fontFamily: FONTS.Regular,
                      color: "black",
                      width: "100%",
                    }}
                    value={message}
                    onChangeText={handleMessageChange}
                  />
                </View>
              </View>
            </ScrollView>
            {/* Attachemnts will be shown here in a row like we have in gmail attachments */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: RFPercentage(3) }}>
              {pickedImages.map((image, index) => (
                <Image key={index} source={{ uri: image.uri }} style={{ width: 100, height: 100, marginRight: 10 }} />
              ))}
              {pickedPDFs.map((pdf, index) => (
                <PDFView
                  key={index}
                  source={{ uri: pdf.uri, cache: true }}
                  onLoadComplete={(numberOfPages, filePath) => {
                    /* Handle PDF loaded */
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    /* Handle page change */
                  }}
                  onError={(error) => {
                    console.error("PDF Error:", error);
                    // You can display an error message to the user here
                  }}
                  style={{ width: 100, height: 100, marginRight: 10 }}
                />
              ))}
            </ScrollView>

            {/* Bottom Actions */}
            <View style={{ width: "86%", position: "absolute", bottom: RFPercentage(5), justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
              <TouchableOpacity activeOpacity={0.8} onPress={toggleMenu3}>
                <Entypo name="attachment" style={{ fontSize: RFPercentage(3.4) }} color={"#06143b"} />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setMessage("");
                }}
                style={{ marginLeft: RFPercentage(5), justifyContent: "center", alignItems: "center", flexDirection: "row" }}
              >
                <MaterialCommunityIcons name="delete-sweep-outline" style={{ fontSize: RFPercentage(3.5) }} color={"#06143b"} />
                <Text style={{ marginLeft: RFPercentage(0.5), fontSize: RFPercentage(2), color: "#06143b", fontFamily: FONTS.Medium }}>Discard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsMenuVisible2(false)}
                activeOpacity={0.8}
                style={{ position: "absolute", right: 0, justifyContent: "center", alignItems: "center", flexDirection: "row" }}
              >
                <FontAwesome name="send-o" style={{ fontSize: RFPercentage(2.6) }} color={"#06143b"} />
                <Text style={{ marginLeft: RFPercentage(0.5), fontSize: RFPercentage(2), color: "#06143b", fontFamily: FONTS.Medium }}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Second modal  */}
          <Modal visible={isMenuVisible3} transparent={true} onRequestClose={() => setIsAttachmentMenuVisible(false)}>
            <View style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", flex: 1, justifyContent: "center", alignItems: "center" }}>
              <View
                style={{
                  width: "100%",
                  position: "absolute",
                  bottom: 0,
                  height: "30%",
                  borderRadius: RFPercentage(2),
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={openImagePicker}>
                  <Text style={{ fontSize: RFPercentage(2), color: "#06143b", fontFamily: FONTS.Medium }}>Select Image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: RFPercentage(3) }} onPress={openPDFPicker}>
                  <Text style={{ fontSize: RFPercentage(2), color: "#06143b", fontFamily: FONTS.Medium }}>Select PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: RFPercentage(3) }} onPress={openCamera}>
                  <Text style={{ fontSize: RFPercentage(2), color: "#06143b", fontFamily: FONTS.Medium }}>Take a Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: RFPercentage(3) }} onPress={() => setIsMenuVisible3(false)}>
                  <Text style={{ fontSize: RFPercentage(2), color: "#06143b", fontFamily: FONTS.Medium }}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </Modal>
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
  menuContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "78%",
    height: "100%",
    backgroundColor: "white",
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  menuContainer2: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "90%",
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopLeftRadius: RFPercentage(3),
    borderTopRightRadius: RFPercentage(3),
  },

  dropDownView: {},
});
