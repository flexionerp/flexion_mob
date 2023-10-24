import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Modal, Image, Alert, ActivityIndicator } from "react-native";
import { COLORS, FONTS, Url } from "../../../constants";
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
import axios from "axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CheckBox from "@react-native-community/checkbox";

//components
import InputField from "../../../common/InputField";

export const TotalLeadDetails = ({ navigation, route }) => {
  const FIRST_NAME = route.params?.FIRST_NAME;
  const ID = route.params?.ID;
  const MOBILE = route.params?.MOBILE;
  const EMAIL = route.params?.EMAIL;
  const BUDGET = route.params?.BUDGET;
  const COUNTRY = route.params?.COUNTRY;
  const CITY = route.params?.CITY;
  const ADDRESS = route.params?.ADDRESS;
  const LEAD_STATUS = route.params?.LEAD_STATUS;
  const LEAD_SOURCE = route.params?.LEAD_SOURCE;
  const COMPANY = route.params?.COMPANY;
  const BHK1 = route.params?.BHK1;
  const BHK2 = route.params?.BHK2;
  const BHK3 = route.params?.BHK3;
  const OFFICE = route.params?.OFFICE;
  const RETAIL = route.params?.RETAIL;
  const STUDIO = route.params?.STUDIO;
  const BROKER = route.params?.BROKER;
  const POBOX = route.params?.POBOX;
  const LAST_NAME = route.params?.LAST_NAME;
  const BUDGET_MAX = route.params?.BUDGET_MAX;
  const BUDGET_MIN = route.params?.BUDGET_MIN;
  const PCOUNTRY_ID = route.params?.PCOUNTRY_ID;
  const refreshCallback = route.params?.refreshCallback;

  const goBackWithRefresh = () => {
    if (refreshCallback) {
      refreshCallback();
    }
    navigation.goBack();
  };

  const [showUnitType, setShowUnitType] = useState(false);
  const toggleUnitType = () => {
    setShowUnitType(!showUnitType);
  };

  // Menu
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [isMenuVisible2, setIsMenuVisible2] = useState(false);

  const [isMenuVisible3, setIsMenuVisible3] = useState(false);

  //Unit Type Dropdown
  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(["italy", "spain", "barcelona", "finland"]);
  // const [items, setItems] = useState([
  //   { label: "1 BHK", value: "1 BHK" },
  //   { label: "2 BHK", value: "2 BHK" },
  //   { label: "3 BHK", value: "3 BHK" },
  //   { label: "4 BHK", value: "4 BHK" },
  // ]);

  const [countryPicked, setCountryPicked] = useState(false);

  const toggleCountry = () => {
    setCountryPicked(!countryPicked);
  };

  const [pCountryPicked, setPCountryPicked] = useState(false);

  const togglePCountry = () => {
    setPCountryPicked(!pCountryPicked);
  };

  // Dropdown for Country
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([]);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([]);

  const [selectedCountryId, setSelectedCountryId] = useState(null); // State to store the selected country ID
  const [selectedCity, setSelectedCity] = useState(null); // State to store the selected city

  useEffect(() => {
    const apiUrl = `${Url}country_list_api`;
    setLoading(true);

    axios
      .get(apiUrl)
      .then((response) => {
        const countries = response.data.data[0].map((country) => ({
          label: country.COUNTRY_NAME,
          value: country.COUNTRY_ID.toString(),
        }));

        setItems2(countries);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Define the API endpoint for fetching cities
    const apiUrl = `${Url}get_city_by_countrys?country_id=${selectedCountryId}`;
    setLoading(true);

    // Make the API request when the selected country changes
    if (selectedCountryId) {
      axios
        .get(apiUrl)
        .then((response) => {
          // Extract the CITY_NAME from the API response
          const cities = response.data.map((city) => ({
            label: city.CITY_NAME,
            value: city.CITY_ID.toString(),
          }));

          // Set the fetched cities in the state
          setItems3(cities);
        })
        .catch((error) => {
          console.error("Error fetching cities: ", error);
        })
        .finally(() => {
          // Hide the loading indicator
          setLoading(false);
        });
    }
  }, [selectedCountryId]);

  const handleCountryChange = (countryId) => {
    setSelectedCountryId(countryId);
    setValue2(countryId);
    console.log("\n\n\n\n\n\n\n\n\n\n\n Country ID", countryId);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setValue3(city);
    console.log("\n\n\n\n\n\n\n\n\n\n\n City", city);
  };

  const handleSaveCountry = () => {
    console.log("\n\n\n\n\n\n\n\n\n Picked Country", selectedCountryId);
    console.log("\n\n\n\n\n\n\n\n\n Picked City", selectedCity);
    setLoadingSave(true);

    const apiUrl = `${Url}updatecountryforlead_api?id=${ID}&country=${selectedCountryId}&city=${selectedCity}`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("\n\n\n\n\n\n\n\n\nCountry and City Update Successful!");
        Alert.alert("Country and City Updated Successfully!", [
          {
            text: "OK",
          },
        ]);
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
      })
      .finally(() => {
        setLoadingSave(false);
      });
  };

  const [firstName, setFirstName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [company, setCompany] = useState("");
  const [leadOwner, setLeadOwner] = useState("");
  const [brokerName, setBrokerName] = useState("");
  const [budgetFrom, setBudgetFrom] = useState("");
  const [unitType, setUnitType] = useState("");
  const [pobox, setPOBox] = useState("");
  const [rescountry, setResCountry] = useState("");
  const [pCountry, setPCountry] = useState("");

  const [editMode, setEditMode] = useState({
    city: false,
    address: false,
    mobileNo: false,
    firstName: false,
    email: false,
    budgetMax: false,
    phone: false,
    leadStatus: false,
    leadSource: false,
    country: false,
    company: false,
    pCountry: false,
    leadOwner: false,
    unitType: false,
    brokerName: false,
    budgetFrom: false,
    pOBox: false,
    rescountry: false,
  });

  const fields = [
    {
      name: "firstName",
      label: FIRST_NAME || "First Name",
      value: firstName,
      setter: setFirstName,
    },
    {
      name: "mobileNo",
      label: MOBILE || "Mobile Number",
      value: mobileNo,
      setter: setMobileNo,
    },
    {
      name: "email",
      label: EMAIL || "Email",
      value: email,
      setter: setEmail,
    },
    {
      name: "budgetMax",
      label: BUDGET_MAX || "Budget Max",
      value: budgetMax,
      setter: setBudgetMax,
    },
    {
      name: "budgetMin",
      label: BUDGET_MIN || "Budget Min",
      value: budgetMin,
      setter: setBudgetMin,
    },
    {
      name: "phone",
      label: "Phone",
      value: phone,
      setter: setPhone,
    },
    {
      name: "leadStatus",
      label: LEAD_STATUS || "Lead Status",
      value: leadStatus,
      setter: setLeadStatus,
    },
    {
      name: "leadSource",
      label: LEAD_SOURCE + "(Lead Source)" || "Lead Source",
      value: leadSource,
      setter: setLeadSource,
    },
    {
      name: "company",
      label: COMPANY || "Company",
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
      name: "brokerName",
      label: BROKER || "Broker Name",
      value: brokerName,
      setter: setBrokerName,
    },
    {
      name: "unitType",
      label: "Unit Type",
      value: unitType,
      setter: setUnitType,
    },
    {
      name: "budgetFrom",
      label: "Budget From",
      value: budgetFrom,
      setter: setBudgetFrom,
    },

    {
      name: "country",
      label: COUNTRY || "Country",
      value: country,
      setter: setCountry,
    },

    {
      name: "city",
      label: CITY || "City",
      value: city,
      setter: setCity,
    },
    {
      name: "pobox",
      label: POBOX || "PO BOX",
      value: pobox,
      setter: setPOBox,
    },
    {
      name: "pCountry",
      label: "Passport Country",
      value: pCountry,
      setter: setPCountry,
    },
    {
      name: "rescountry",
      label: "RES Country",
      value: rescountry,
      setter: setResCountry,
    },
    {
      name: "address",
      label: ADDRESS || "Address",
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
    if (field === "firstName") {
      setFirstName(firstName);
      updateLeadName();
    }
    if (field === "mobileNo") {
      setMobileNo(mobileNo);
      updateLeadMobile();
    }
    if (field === "email") {
      setEmail(email);
      updateLeadEmail();
    }
    if (field === "phone") {
      setPhone(phone);
      updateLeadPhone();
    }

    if (field === "budgetMax") {
      setBudgetMax(budgetMax);
      updateLeadBudgetMax();
    }
    if (field === "budgetMin") {
      setBudgetMin(budgetMin);
      updateLeadBudgetMin();
    }
    if (field === "address") {
      setAddress(address);
      updateLeadAddress();
    }
    if (field === "pobox") {
      setPOBox(pobox);
      updateLeadPOBOX();
    }
  };

  const handleCancel = (field) => {
    setEditMode((prevState) => ({
      ...prevState,
      [field]: false,
    }));

    // Reset the value for the specific field when canceled
    switch (field) {
      case "firstName":
        setFirstName("");
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
      case "budgetMin":
        setBudgetMin("");
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
      case "pCountry":
        setPCountry("");
        break;
      case "leadSource":
        setLeadSource("");
        break;
      case "company":
        setCompany("");
        break;
      case "leadOwner":
        setLeadOwner("");
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
      case "unitType":
        setUnitType("");
        break;
      case "rescountry":
        setResCountry("");
        break;
      default:
        break;
    }
  };

  // Date Picker for decision making date
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
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleDateString(undefined, options);
  };

  // Update Lead Name
  const updateLeadName = async () => {
    try {
      const response = await fetch(`${Url}updatenameforlead_api?name=${firstName}&id=${ID}`);
      const data = await response.json();
      console.log("\n\n\n\n\n\n\n\n\n\n\n\n\nLead Name successfully updated");
    } catch (error) {
      console.error("\n\n\n\n\n\n\n\n\n\n\n\n\nLead Name Update Error:", error);
    }
  };

  // Update Mobile Number
  const updateLeadMobile = async () => {
    try {
      const response = await fetch(`${Url}updatemobileforlead_api?mobile=${mobileNo}&id=${ID}`);
      const data = await response.json();
      console.log("\n\n\n\n\n\n\n\n\n\n\n\n\nLead Mobile Number successfully updated");
    } catch (error) {
      console.error("\n\n\n\n\n\n\n\n\n\n\n\n\nLead Mobile Number Update Error:", error);
    }
  };

  // Update Email
  const updateLeadEmail = async () => {
    try {
      const response = await fetch(`${Url}updateemailforlead_api?email=${email}&id=${ID}`);
      const data = await response.json();
      console.log("\n\n\n\n\n\n\n\n\n\n\n\n\nLead Email Successfully Updated");
    } catch (error) {
      console.error("\n\n\n\n\n\n\n\n\n\n\n\n\nLead Email Update Error:", error);
    }
  };

  // Update Phone
  const updateLeadPhone = async () => {
    try {
      const response = await fetch(`${Url}updateemailforlead_api?phone=${phone}&id=${ID}`);
      const data = await response.json();
      console.log("\n\n\n\n\n\n\n\n\n\n\n\n\nLead Phone Successfully Updated");
    } catch (error) {
      console.error("\n\n\n\n\n\n\n\n\n\n\n\n\nLead Phone Update Error:", error);
    }
  };

  // Budget Max Update
  const updateLeadBudgetMax = async () => {
    try {
      const response = await fetch(`${Url}updatehbforlead_api?hb=${budgetMax}&id=${ID}`);
      const data = await response.json();
      console.log("\n\n\n\n\n\n\n\n\n\n\n\n\nLead Budget Max Successfully Updated");
    } catch (error) {
      console.error("\n\n\n\n\n\n\n\n\n\n\n\n\nLead Budget Max Update Error:", error);
    }
  };

  // Budget Min Update
  const updateLeadBudgetMin = async () => {
    try {
      const response = await fetch(`${Url}updatelbforlead_api?lb=${budgetMin}&id=${ID}`);
      const data = await response.json();
      console.log("\n\n\n\n\n\n\n\n\n\n\n\n\nLead Budget Min Successfully Updated");
    } catch (error) {
      console.error("\n\n\n\n\n\n\n\n\n\n\n\n\nLead Budget Min Update Error:", error);
    }
  };

  // POBOX Update
  const updateLeadPOBOX = async () => {
    try {
      const response = await fetch(`${Url}updatefaxforlead_api?fax=${pobox}&id=${ID}`);
      const data = await response.json();
      console.log("\n\n\n\n\n\n\n\n\n\n\n\n\nPOBOX Successfully Updated");
    } catch (error) {
      console.error("\n\n\n\n\n\n\n\n\n\n\n\n\nPOBOX Update Error:", error);
    }
  };

  // Address
  const updateLeadAddress = async () => {
    try {
      const response = await fetch(`${Url}updateaddressforlead_api?address=${address}&id=${ID}`);
      const data = await response.json();
      console.log("\n\n\n\n\n\n\n\n\n\n\n\n\nLead Address Successfully Updated");
    } catch (error) {
      console.error("\n\n\n\n\n\n\n\n\n\n\n\n\nLead Address Update Error:", error);
    }
  };

  // PCountry
  const [loadingPSave, setLoadingPSave] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(null);
  const [items4, setItems4] = useState([]);

  const [selectedPCountryId, setSelectedPCountryId] = useState(null);

  useEffect(() => {
    const apiUrl = `${Url}country_list_api`;
    setLoading(true);

    axios
      .get(apiUrl)
      .then((response) => {
        const countries = response.data.data[0].map((country) => ({
          label: country.COUNTRY_NAME,
          value: country.COUNTRY_ID.toString(),
        }));

        setItems4(countries);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePCountryChange = (countryId) => {
    setSelectedPCountryId(countryId);
    setValue4(countryId);
    console.log("\n\n\n\n\n\n\n\n\n\n\n Country ID For PCountry", countryId);
  };

  const handleSavePCountry = () => {
    console.log("\n\n\n\n\n\n\n\n\n Picked PCountry", selectedPCountryId);
    setLoadingPSave(true);
    const apiUrl = `${Url}updatepcountryforlead_api?id=${ID}&pcountry=${selectedPCountryId}`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("\n\n\n\n\n\n\n\n\nPCountry Update Successful!");
        Alert.alert("PCountry Updated Successfully!", [
          {
            text: "OK",
          },
        ]);
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
      })
      .finally(() => {
        setLoadingPSave(false);
      });
  };

  useEffect(() => {
    if (PCOUNTRY_ID !== undefined && PCOUNTRY_ID !== null) {
      setValue4(PCOUNTRY_ID.toString());
    }
  }, [PCOUNTRY_ID]);

  useEffect(() => {
    if (selectedPCountryId) {
      const selectedCountry = items4.find((item) => item.value === selectedPCountryId);
      if (selectedCountry) {
        const placeholderText = selectedCountry.label;
        setOpen4(true);
        setValue4(selectedPCountryId.toString());
      }
    }
  }, [selectedPCountryId, items4]);

  // Unit Type
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [checkbox4, setCheckbox4] = useState(false);
  const [checkbox5, setCheckbox5] = useState(false);
  const [checkbox6, setCheckbox6] = useState(false);
  const [loadingCheckbox, setLoadingCheckbox] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    setCheckbox1(route.params?.STUDIO === "1");
    setCheckbox2(route.params?.BHK1 === "1");
    setCheckbox3(route.params?.BHK2 === "1");
    setCheckbox4(route.params?.BHK3 === "1");
    setCheckbox5(route.params?.OFFICE === "1");
    setCheckbox6(route.params?.RETAIL === "1");
  }, [route.params]);

  const handleCheckboxChange = async (checkboxNumber, value) => {
    let type;
    let valueToSend = value ? 1 : 0;

    switch (checkboxNumber) {
      case 1:
        setCheckbox1(value);
        type = "STUDIO";
        break;
      case 2:
        setCheckbox2(value);
        type = "BHK1";
        break;
      case 3:
        setCheckbox3(value);
        type = "BHK2";
        break;
      case 4:
        setCheckbox4(value);
        type = "BHK3";
        break;
      case 5:
        setCheckbox5(value);
        type = "OFFICE";
        break;
      case 6:
        setCheckbox6(value);
        type = "RETAIL";
        break;
      default:
        break;
    }
    setLoadingCheckbox(true);

    if (type) {
      const apiURL = `${Url}setvalueforunit_api?id=${ID}&type=${type}&value=${valueToSend}`;
      try {
        const response = await fetch(apiURL, {
          method: "GET",
        });

        if (response.ok) {
          console.log("\n\n\n\n\n\n\n\n\n\nUnit Type Updated Successfully", response);

          setShowSuccessMessage(true);

          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 1000);
        } else {
          console.error("\n\n\n\n\n\n\n\n\n\n\nUnit Type API call failed");
        }
      } catch (error) {
        console.error("\n\n\n\n\n\n\n\n\n\nAPI call error:", error);
      }
      setLoadingCheckbox(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "center" }}>
        <TouchableOpacity activeOpacity={0.8} onPress={goBackWithRefresh} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Ionicons name="chevron-back" style={{ fontSize: RFPercentage(4) }} color={"#06143b"} />
          <Text style={{ marginLeft: RFPercentage(0.5), fontSize: RFPercentage(2.3), color: "#06143b", fontWeight: "bold" }}>Lead Listing</Text>
        </TouchableOpacity>
      </View>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
        {/* <Text>{BHK1}</Text>
        <Text>{BHK2}</Text>
        <Text>{BHK3}</Text>
        <Text>{OFFICE}</Text>
        <Text>{RETAIL}</Text>
        <Text>{STUDIO}</Text> */}
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
          <View style={{ marginTop: RFPercentage(3), width: "86%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("LeadNotes", { leadName: FIRST_NAME, leadID: ID })}
              activeOpacity={0.8}
              style={{ borderRadius: RFPercentage(1.5), backgroundColor: COLORS.primary, width: RFPercentage(14), height: RFPercentage(5.5), justifyContent: "center", alignItems: "center" }}
            >
              <Text style={{ color: COLORS.secondry, fontFamily: FONTS.Medium, fontSize: RFPercentage(2) }}>Notes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Reminder", { leadID: ID })}
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
                  Lead_Email: EMAIL,
                  Lead_ID: ID,
                  type: "inbox",
                  // leadData: leadData,
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
              <View key={i} style={{ marginTop: i === 3 ? RFPercentage(3) : RFPercentage(3), width: "100%" }}>
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
                    alignSelf: "center",
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
                      <TouchableOpacity
                        onPress={() => {
                          if (i === 11) {
                            toggleUnitType();
                          } else if (i === 13 || i === 14) {
                            toggleCountry();
                          } else if (i === 16) {
                            togglePCountry();
                          } else {
                            handleEdit(item.name);
                          }
                        }}
                      >
                        <Icon name="edit" type="font-awesome" color="grey" size={18} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {i === 10 ? (
                  <View style={styles.container1}>
                    <TouchableOpacity onPress={showDatePicker} style={styles.inputContainer}>
                      <Text style={[styles.inputText, selectedDate ? styles.selectedText : styles.placeholderText]}>{selectedDate ? formatDateTime(selectedDate) : "Decision Making Date"}</Text>
                      <Icon name="edit" type="font-awesome" color="grey" size={18} />
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
                ) : null}

                {i === 11 ? (
                  <View style={{ width: "89%", alignSelf: "center", marginTop: RFPercentage(3) }}>
                    {showUnitType ? (
                      <View>
                        {loadingCheckbox ? (
                          <ActivityIndicator size="large" color="#06143b" />
                        ) : (
                          <>
                            {/* <View style={{ width: "100%", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row", alignSelf: "center" }}>
                          <Text style={{ fontSize: RFPercentage(2.2), color: "#06143b", fontWeight: "bold" }}>Unit Type :</Text>
                        </View> */}
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                              <CheckBox
                                style={{ transform: [{ scale: 0.8 }] }} // Adjust scale value to control checkbox size
                                value={checkbox1}
                                onValueChange={(value) => handleCheckboxChange(1, value)}
                              />
                              <Text style={{ fontSize: RFPercentage(2), color: "#06143b", fontFamily: FONTS.Medium }}>STUDIO</Text>
                              <CheckBox style={{ transform: [{ scale: 0.8 }], marginLeft: RFPercentage(1.5) }} value={checkbox2} onValueChange={(value) => handleCheckboxChange(2, value)} />
                              <Text style={{ fontSize: RFPercentage(2), color: "#06143b", fontFamily: FONTS.Medium }}>1 BHK</Text>
                              <CheckBox style={{ transform: [{ scale: 0.8 }], marginLeft: RFPercentage(1.5) }} value={checkbox3} onValueChange={(value) => handleCheckboxChange(3, value)} />
                              <Text style={{ fontSize: RFPercentage(2), color: "#06143b", fontFamily: FONTS.Medium }}>2 BHK</Text>
                              <CheckBox style={{ transform: [{ scale: 0.8 }], marginLeft: RFPercentage(1.5) }} value={checkbox4} onValueChange={(value) => handleCheckboxChange(4, value)} />
                              <Text style={{ fontSize: RFPercentage(2), color: "#06143b", fontFamily: FONTS.Medium }}>3 BHK</Text>
                            </View>
                            <View style={{ marginTop: RFPercentage(2), flexDirection: "row", alignItems: "center" }}>
                              <CheckBox
                                style={{ transform: [{ scale: 0.8 }] }} // Adjust scale value to control checkbox size
                                value={checkbox5}
                                onValueChange={(value) => handleCheckboxChange(5, value)}
                              />
                              <Text style={{ fontSize: RFPercentage(2), color: "#06143b", fontFamily: FONTS.Medium }}>OFFICE</Text>
                              <CheckBox style={{ transform: [{ scale: 0.8 }], marginLeft: RFPercentage(1.8) }} value={checkbox6} onValueChange={(value) => handleCheckboxChange(6, value)} />
                              <Text style={{ fontSize: RFPercentage(2), color: "#06143b", fontFamily: FONTS.Medium }}>Retail</Text>
                            </View>
                          </>
                        )}
                        {showSuccessMessage && (
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              marginTop: RFPercentage(2),
                              alignSelf: "center",
                            }}
                          >
                            <Feather name="check-circle" style={{ fontSize: RFPercentage(6) }} color={COLORS.borderColor} />
                          </View>
                        )}
                      </View>
                    ) : null}
                  </View>
                ) : null}

                {i === 11 ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ marginTop: RFPercentage(1), width: "89%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", alignSelf: "center" }}
                  >
                    <Text style={{ fontSize: RFPercentage(2.3), color: "#06143b", fontWeight: "bold" }}>Address Information</Text>
                  </TouchableOpacity>
                ) : null}

                {countryPicked ? (
                  <>
                    {i === 13 ? (
                      <View style={{ width: "86%", alignSelf: "center", marginTop: RFPercentage(3) }}>
                        <DropDownPicker
                          placeholder="Country"
                          loading={loading} // Use the loading prop to show the loading indicator
                          placeholderStyle={{ color: COLORS.normalText }}
                          style={{
                            marginBottom: open2 ? RFPercentage(25) : 0,
                            borderColor: COLORS.borderColor,
                            borderWidth: RFPercentage(0.1),
                            borderRadius: RFPercentage(1.6),
                          }}
                          dropDownContainerStyle={{
                            backgroundColor: "#0000",
                            borderColor: COLORS.borderColor,
                            borderWidth: RFPercentage(0.1),
                          }}
                          open={open2}
                          maxHeight={RFPercentage(25)}
                          value={value2}
                          items={items2}
                          setOpen={setOpen2}
                          setValue={setValue2}
                          setItems={setItems2}
                          onChangeValue={(value) => {
                            console.log("Selected country value:", value);
                            handleCountryChange(value);
                          }}
                        />
                      </View>
                    ) : null}

                    {i === 13 ? (
                      <View style={{ width: "86%", alignSelf: "center", justifyContent: "center", alignItems: "center", marginTop: RFPercentage(3) }}>
                        <DropDownPicker
                          placeholder="City"
                          loading={loading}
                          placeholderStyle={{ color: COLORS.normalText }}
                          style={{ marginBottom: open3 && !loading ? RFPercentage(25) : 0, borderColor: COLORS.borderColor, borderWidth: RFPercentage(0.1), borderRadius: RFPercentage(1.6) }}
                          dropDownContainerStyle={{ backgroundColor: "#0000", borderColor: COLORS.borderColor, borderWidth: RFPercentage(0.1) }}
                          open={open3}
                          maxHeight={RFPercentage(25)}
                          value={value3}
                          items={items3}
                          setOpen={setOpen3}
                          setValue={setValue3}
                          setItems={setItems3}
                          onChangeValue={(value) => {
                            console.log("Selected city value:", value);
                            handleCityChange(value);
                          }}
                        />

                        {loadingSave ? (
                          <ActivityIndicator style={{ marginTop: RFPercentage(3) }} size="large" color={"#06143b"} />
                        ) : (
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={handleSaveCountry}
                            style={{
                              borderRadius: RFPercentage(1.5),
                              backgroundColor: COLORS.primary,
                              width: RFPercentage(14),
                              height: RFPercentage(5.5),
                              justifyContent: "center",
                              alignItems: "center",
                              marginTop: RFPercentage(3),
                            }}
                          >
                            <Text style={{ color: COLORS.secondry, fontFamily: FONTS.Medium, fontSize: RFPercentage(2) }}>Save</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    ) : null}
                  </>
                ) : null}

                {pCountryPicked ? (
                  <>
                    {i === 16 ? (
                      <View style={{ width: "86%", alignSelf: "center", marginTop: RFPercentage(3) }}>
                        <DropDownPicker
                          placeholder={value4} // Set the placeholder dynamically
                          loading={loading} // Use the loading prop to show the loading indicator
                          placeholderStyle={{ color: COLORS.normalText }}
                          style={{
                            marginBottom: open4 ? RFPercentage(25) : 0,
                            borderColor: COLORS.borderColor,
                            borderWidth: RFPercentage(0.1),
                            borderRadius: RFPercentage(1.6),
                          }}
                          dropDownContainerStyle={{
                            backgroundColor: "#0000",
                            borderColor: COLORS.borderColor,
                            borderWidth: RFPercentage(0.1),
                          }}
                          open={open4}
                          maxHeight={RFPercentage(25)}
                          value={value4}
                          items={items4}
                          setOpen={setOpen4}
                          setValue={setValue4}
                          setItems={setItems4}
                          onChangeValue={(value) => {
                            console.log("Selected country value:", value);
                            handlePCountryChange(value);
                          }}
                        />
                      </View>
                    ) : null}

                    {i === 16 ? (
                      <View style={{ width: "86%", alignSelf: "center", justifyContent: "center", alignItems: "center", marginTop: RFPercentage(3) }}>
                        {loadingPSave ? (
                          <ActivityIndicator style={{ marginTop: RFPercentage(0.5) }} size="large" color={"#06143b"} />
                        ) : (
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={handleSavePCountry}
                            style={{
                              borderRadius: RFPercentage(1.5),
                              backgroundColor: COLORS.primary,
                              width: RFPercentage(14),
                              height: RFPercentage(5.5),
                              justifyContent: "center",
                              alignItems: "center",
                              marginTop: RFPercentage(0.5),
                            }}
                          >
                            <Text style={{ color: COLORS.secondry, fontFamily: FONTS.Medium, fontSize: RFPercentage(2) }}>Save</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    ) : null}
                  </>
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
  container1: {
    width: "90%",
    height: RFPercentage(6.2),
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#CDA349",
    borderWidth: 1,
    marginTop: RFPercentage(3),
    borderRadius: RFPercentage(1.7),
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
    fontSize: RFPercentage(2),
  },
  placeholderText: {
    color: "#9CBBD2",
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
  dropDownView: {},
});
