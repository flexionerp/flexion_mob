import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground, ScrollView, Modal, TextInput, ActivityIndicator, Alert, FlatList } from "react-native";
import { COLORS, FONTS, Url, SCREEN_HEIGHT, SCREEN_WIDTH, SCREENS } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import DropDownPicker from "react-native-dropdown-picker";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

// components
import InputField from "../../../common/InputField";

export const TotalLeadMainListings = ({ navigation, route }) => {
  const leads = route.params?.leads;
  const category = route.params?.category;
  const unreadOnly = route.params?.unreadOnly;
  const noAction = route.params?.noAction;
  const hours = route.params?.hours;
  const labelType = route.params?.labelType;
  const agentName = route.params?.agentName;
  const lead_id = route.params?.lead_id;

  const [mainListingLoading, setMainListingLoading] = useState(true);
  const [agentListingData, setAgentListingData] = useState([]);

  const dataToRender = leads || [];
  const { token } = useSelector((state) => state.user);

  const [inputField, setInputField] = useState([
    {
      placeholder: "Search Leads",
      value: "",
    },
  ]);
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const [searchTextTag, setSearchTextTag] = useState("");

  const handleSearchChangeTag = (text) => {
    setSearchTextTag(text);
  };

  // Main Listing
  const fetchMainListingData = async () => {
    try {
      const response = await Axios.get(`${Url}leads_list_api?userid=${token}`);
      const firstObject = response.data.data[0];
      const leadCount = firstObject ? firstObject.length : 0;
      // console.log("Latest count cold screen", leadCount);
      setAgentListingData(firstObject);
      setMainListingLoading(false);
    } catch (error) {
      console.error("API Error:", error);
      setMainListingLoading(false);
    }
  };

  useEffect(() => {
    fetchMainListingData();
  }, []);

  const refreshMainListing = () => {
    fetchMainListingData();
  };

  // const handleViewButton = (leadData) => {
  //   navigation.navigate("TotalLeadDetails", {
  //     leadData: {
  //       LAST_NAME: filterData.LAST_NAME,
  //       ID: filterData.ID,
  //       MOBILE: filterData.MOBILE?.toString() || "",
  //       EMAIL: filterData.EMAIL,
  //       BUDGET: filterData.BUDGET,
  //       COUNTRY: filterData.COUNTRY,
  //       CITY: filterData.CITY,
  //       ADDRESS: filterData.ADDRESS,
  //       LEAD_STATUS: filterData.LEAD_STATUS,
  //       LEAD_SOURCE: filterData.LEAD_SOURCE,
  //       COMPANY: filterData.COMPANY,
  //       BROKER: filterData.BROKER,
  //       POBOX: filterData.POBOX,
  //       FIRST_NAME: filterData.FIRST_NAME,
  //       BUDGET_MAX: filterData.BUDGET_MAX,
  //     },
  //   });
  // };

  const handleViewButton = (leadData) => {
    navigation.navigate(
      "TotalLeadDetails",
      {
        FIRST_NAME: leadData.FIRST_NAME || undefined,
        ID: leadData.ID || undefined,
        MOBILE: leadData.MOBILE?.toString() || "",
        EMAIL: leadData.EMAIL || undefined,
        BUDGET: leadData.BUDGET || undefined,
        COUNTRY: leadData.COUNTRY || undefined,
        CITY: leadData.CITY || undefined,
        ADDRESS: leadData.ADDRESS || undefined,
        LEAD_STATUS: leadData.LEAD_STATUS || undefined,
        PCOUNTRY_ID: leadData.PCOUNTRY_ID?.toString() || "",
        LEAD_SOURCE: leadData.LEAD_SOURCE || undefined,
        COMPANY: leadData.COMPANY || undefined,
        BROKER: leadData.BROKER || undefined,
        POBOX: leadData.POBOX || undefined,
        LAST_NAME: leadData.LAST_NAME || undefined,
        BUDGET_MAX: leadData.BUDGET_MAX?.toString() || "",
        BUDGET_MIN: leadData.BUDGET_MIN?.toString() || "",
        BHK1: leadData.BHK1?.toString() || "",
        BHK2: leadData.BHK2?.toString() || "",
        BHK3: leadData.BHK3?.toString() || "",
        OFFICE: leadData.OFFICE?.toString() || "",
        RETAIL: leadData.RETAIL?.toString() || "",
        STUDIO: leadData.STUDIO?.toString() || "",
      },
      {
        unmountOnBlur: true,
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={refreshMainListing} activeOpacity={0.5}>
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const handleTimeLineButton = (leadId, userName, createDate) => {
    navigation.navigate("TimeLine", { leadId, userName, createDate });
  };

  const filterData = () => {
    return agentListingData.filter((item) => {
      if (lead_id && item.LEAD_ID === lead_id) {
        // Open only the lead with the specified lead_id
        return true;
      }

      if (unreadOnly) {
        return (
          item.IS_READ === "0" &&
          ((item.FIRST_NAME?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
            (item.AGENT?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
            (item.LEAD_STATUS?.toLowerCase() || "").includes(searchText.toLowerCase()))
        );
      }
      if (noAction) {
        return (
          item.IS_EMAIL_SENT_AGENT === "1" &&
          ((item.FIRST_NAME?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
            (item.AGENT?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
            (item.LEAD_STATUS?.toLowerCase() || "").includes(searchText.toLowerCase()))
        );
      }
      if (hours) {
        return (
          item.IS_EMAIL_SENT === "1" &&
          ((item.FIRST_NAME?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
            (item.AGENT?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
            (item.LEAD_STATUS?.toLowerCase() || "").includes(searchText.toLowerCase()))
        );
      }
      if (labelType) {
        return (
          item.LEAD_TYPE === labelType &&
          ((item.FIRST_NAME?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
            (item.AGENT?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
            (item.LEAD_STATUS?.toLowerCase() || "").includes(searchText.toLowerCase()))
        );
      }
      if (agentName) {
        return (
          item.AGENT === agentName &&
          ((item.FIRST_NAME?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
            (item.AGENT?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
            (item.LEAD_STATUS?.toLowerCase() || "").includes(searchText.toLowerCase()))
        );
      }

      return (
        item.LEAD_STATUS === category &&
        ((item.FIRST_NAME?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
          (item.AGENT?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
          (item.LEAD_STATUS?.toLowerCase() || "").includes(searchText.toLowerCase()))
      );
    });
  };

  // Set filteredData based on your filter conditions
  const filteredData = filterData(lead_id);

  const [isMenuVisible3, setIsMenuVisible3] = useState(false);
  const toggleMenu3 = () => {
    setIsMenuVisible3(!isMenuVisible3);
  };

  const [isMenuVisible4, setIsMenuVisible4] = useState(false);
  const toggleMenu4 = () => {
    setIsMenuVisible4(!isMenuVisible4);
  };

  // Agent List
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [agentData, setAgentData] = useState([]);
  const [filteredAgentData, setFilteredAgentData] = useState([]);
  const [selectedAgentId, setSelectedAgentId] = useState(null);
  const [leadID, setLeadID] = useState(null);
  const [leadStatusID, setLeadStatusID] = useState(null);

  const fetchData = async () => {
    try {
      const response = await Axios.get(`${Url}leads_list_api?userid=${token}`);
      const result = response.data.data[1];
      // console.log("\n\n\n\n\n\n\nAgent Change Data", result);
      setAgentData(result);
      setFilteredAgentData(result);
      setLoading(false);
    } catch (error) {
      console.error("API Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAgentSearchChange = (text, agentId) => {
    setSearchText(text);
    const filteredData = agentData.filter((item) => item.LOGIN_NAME.toLowerCase().includes(text.toLowerCase()));
    setFilteredAgentData(filteredData);
  };

  // Logic to update Agent
  const handleAgentClick = (agentId) => {
    setSelectedAgentId(agentId);
  };

  const handleLeadIDLeadStatusID = (leadID, leadStatusID) => {
    setLeadID(leadID);
    setLeadStatusID(leadStatusID);
  };

  const updateAgent = async (selectedAgentId, leadID, leadStatusID) => {
    try {
      setLoading2(true);

      const response = await Axios.get(`${Url}get_agent_change_api`, {
        params: {
          agent_id: selectedAgentId,
          id: leadID,
          status_id: leadStatusID,
          user_id: token,
        },
      });

      console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\nAgent Update Successfull");
      setLoading2(false);
      fetchMainListingData();
      Alert.alert("Agent Updated", "The agent has been updated successfully", [
        {
          text: "OK",
          onPress: () => {
            toggleMenu3();
            setSelectedAgentId(null);
          },
        },
      ]);
    } catch (error) {
      console.error("\n\n\n\n\nAPI Error while updating agent:", error);
      setLoading2(false);
    }
  };

  // Tag List
  const [leadTypes, setLeadTypes] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [filteredTagData, setFilteredTagData] = useState([]);

  const fetchLeadTypes = async () => {
    try {
      const response = await Axios.get(`${Url}get_all_leadTypes`);
      // console.log("Tag API Response:", response.data);
      setLeadTypes(response.data);
      setFilteredTagData(response.data);
      // Set the leadTypes state with the data
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    fetchLeadTypes();
  }, []);

  const handleTagClick = (tagId) => {
    setSelectedTagId(tagId);
  };

  const handleTagSearchChange = (text, tagId) => {
    setSearchTextTag(text);
    const filteredData = leadTypes.filter((item) => item.NAME.toLowerCase().includes(text.toLowerCase()));
    setFilteredTagData(filteredData);
  };

  // Update Tag
  const handleLeadID = (leadID) => {
    setLeadID(leadID);
  };

  const updateTag = async (selectedTagId, leadID) => {
    try {
      setLoading2(true);

      const response = await Axios.get(`${Url}Update_LeadType_ByLead_api`, {
        params: {
          lead_type_id: selectedTagId,
          lead_id: leadID,
          userid: token,
          user_id: token,
        },
      });

      console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\nTag Update Successfull");
      setLoading2(false);
      fetchMainListingData();
      Alert.alert("Tag Updated", "Tag has been updated successfully", [
        {
          text: "OK",
          onPress: () => {
            toggleMenu4();
            setSelectedTagId(null);
          },
        },
      ]);
    } catch (error) {
      console.error("\n\n\n\n\nAPI Error while updating Tag:", error);
      setLoading2(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMainListingData();
      fetchData();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <BackButton navigation={navigation} label="Dashboard" /> */}
      <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", alignSelf: "center", flexDirection: "row" }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate(SCREENS.TOTALLEADLISTINGS)} style={{}}>
          <Ionicons name="chevron-back" style={{ fontSize: RFPercentage(3.2), marginRight: 5 }} color={"#06143b"} />
        </TouchableOpacity>
        <Text style={{ color: COLORS.boldText, fontSize: SCREEN_WIDTH * 0.043, fontFamily: FONTS.SemiBold, marginLeft: 8 }}>Dashboard</Text>
      </View>
      {/* Input field */}
      <View style={{ marginTop: RFPercentage(1), justifyContent: "center", alignItems: "center", width: "100%" }}>
        {inputField.map((item, i) => (
          <View key={i} style={{ marginTop: i === 0 ? 0 : RFPercentage(1.5) }}>
            <InputField
              placeholder={item.placeholder}
              placeholderColor={"#c0c0c2"}
              height={RFPercentage(6)}
              backgroundColor={"#ffff"}
              borderWidth={RFPercentage(0.1)}
              borderColor={COLORS.borderColor}
              borderRadius={RFPercentage(1.8)}
              fontSize={RFPercentage(2)}
              handleFeild={(text) => {
                setInputField([{ ...item, value: text }]);
                handleSearchChange(text);
              }}
              value={item.value}
              width={"92%"}
            />
          </View>
        ))}
      </View>

      {/* FlatList Data Listing */}
      {mainListingLoading ? (
        <ActivityIndicator style={{ marginTop: RFPercentage(3) }} size="large" color={"#06143b"} />
      ) : (
        <View style={{ marginTop: RFPercentage(1), justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
          <FlatList
            data={filteredData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <ImageBackground key={index} source={require("../../../assets/images/unitBG.png")} style={[styles.backgroundCartImage, { marginTop: index === 0 ? RFPercentage(2) : RFPercentage(2) }]}>
                  <View style={styles.subContainerCart}>
                    <View style={styles.cartDetailsView}>
                      <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%", alignSelf: "center" }}>
                        <Text style={styles.unitCodeStyle}>
                          {item.FIRST_NAME && item.FIRST_NAME.length > 0 ? (item.FIRST_NAME.length > 15 ? item.FIRST_NAME.substring(0, 15) + "..." : item.FIRST_NAME) : "Null"}
                        </Text>
                        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", position: "absolute", right: 0 }}>
                          <TouchableOpacity activeOpacity={0.8} onPress={() => handleTimeLineButton(item.ID, item.USER_NAME, item.CREATE_DATE)}>
                            <MaterialCommunityIcons name="timeline-text-outline" style={{ fontSize: RFPercentage(3.2), marginRight: RFPercentage(-0.4) }} color={"#06143b"} />
                          </TouchableOpacity>
                          <Text style={{ marginLeft: RFPercentage(1), fontSize: RFPercentage(1.6), color: "#06143b", fontWeight: "bold" }}>
                            {item.LEAD_AGE === null ? `${item.DIFF / 60} Hours ${item.DIFF % 60} Minutes` : `${item.LEAD_AGE} day(s)`}
                          </Text>
                        </View>
                        <View style={{ justifyContent: "center", alignItems: "center", position: "absolute", right: 0, top: RFPercentage(3.8) }}>
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "row",
                              width: RFPercentage(9.2),
                              height: RFPercentage(3.6),
                              borderRadius: RFPercentage(1.2),
                              borderColor: "#06143b",
                              borderWidth: RFPercentage(0.1),
                            }}
                          >
                            <AntDesign name="tagso" style={{ fontSize: RFPercentage(2.7) }} color={"#06143b"} />
                            <Text style={{ fontSize: RFPercentage(1.8), marginLeft: RFPercentage(0.3), color: "#06143b", fontFamily: FONTS.Medium }}>{item.ID}</Text>
                          </View>
                        </View>
                      </View>

                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                          marginTop: RFPercentage(1.5),
                        }}
                        onPress={() => {
                          handleLeadIDLeadStatusID(item.ID, item.LEAD_STATUS_ID);
                          toggleMenu3();
                        }}
                      >
                        <Text style={{ textDecorationLine: "underline", fontSize: RFPercentage(1.8), color: "#06143b", fontFamily: FONTS.Medium }}>{item.AGENT || "Null"}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          handleLeadID(item.ID);
                          toggleMenu4();
                        }}
                      >
                        <Text style={{ textDecorationLine: "underline", fontSize: RFPercentage(1.8), color: "#06143b", fontFamily: FONTS.Medium, marginTop: RFPercentage(1.5) }}>
                          {item.LEAD_TYPE || "Null"}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={{ marginTop: RFPercentage(1.5), flexDirection: "row", justifyContent: "center", alignItems: "center" }}
                        onPress={() => {
                          if (item.LEAD_STATUS !== "JUNK" && item.LEAD_STATUS !== "DEAL") {
                            navigation.navigate("LeadStatusChange", { currentStatus: item.LEAD_STATUS, leadID: item.ID });
                          }
                        }}
                      >
                        <MaterialCommunityIcons name="label-multiple-outline" style={{ fontSize: RFPercentage(3.2), marginRight: 3 }} color={"#06143b"} />
                        <Text style={{ fontSize: RFPercentage(1.8), color: "#06143b", fontFamily: FONTS.Medium }}>{item.LEAD_STATUS}</Text>
                        {/* <Text style={{ fontSize: RFPercentage(1.8), color: "#06143b", fontFamily: FONTS.Medium }}>{item.ID || "Null"}</Text> */}
                        {/* <Text style={{ fontSize: RFPercentage(1.8), color: "#06143b", fontFamily: FONTS.Medium }}>{item.PCOUNTRY_ID || "Null"}</Text> */}
                        {/* <Text style={{ fontSize: RFPercentage(1.8), color: "#06143b", fontFamily: FONTS.Medium }}>{item.CITY || "Null"}</Text> */}
                      </TouchableOpacity>

                      <View style={styles.priceListingButtonContainer}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                          {item.LEAD_SOURCE === "Email" ? (
                            <TouchableOpacity activeOpacity={0.8}>
                              <MaterialCommunityIcons name="email-outline" style={{ fontSize: RFPercentage(2.5), marginRight: 5 }} color={"#06143b"} />
                            </TouchableOpacity>
                          ) : item.LEAD_SOURCE === "Whatsapp" ? (
                            <TouchableOpacity activeOpacity={0.8}>
                              <MaterialCommunityIcons name="whatsapp" style={{ fontSize: RFPercentage(2.5), marginRight: 5 }} color={"#06143b"} />
                            </TouchableOpacity>
                          ) : (
                            <Text style={{ fontSize: RFPercentage(1.8), color: "#06143b", fontFamily: FONTS.Medium }}>{item.LEAD_SOURCE}</Text>
                          )}
                        </View>
                        <TouchableOpacity onPress={() => handleViewButton(item)} activeOpacity={0.5} style={styles.priceListingButton}>
                          <MaterialCommunityIcons name="label-multiple" style={{ fontSize: RFPercentage(2.2), marginRight: 5 }} color={"#06143b"} />
                          <Text style={styles.priceListingTextStyle}>View</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              );
            }}
          />
          <View style={{ marginBottom: RFPercentage(20) }} />
        </View>
      )}

      {/* Agent Modal */}
      <Modal visible={isMenuVisible3} transparent={true} onRequestClose={() => setIsAttachmentMenuVisible(false)}>
        <View style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              width: "94%",
              height: "80%",
              borderRadius: RFPercentage(3),
              backgroundColor: "white",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {/* Heading */}
            <View style={{ marginTop: RFPercentage(4), width: "90%", justifyContent: "center", alignItems: "center", alignSelf: "center", flexDirection: "row" }}>
              <TouchableOpacity activeOpacity={0.8} onPress={toggleMenu3} style={{ position: "absolute", left: 0 }}>
                <Ionicons name="chevron-back" style={{ fontSize: RFPercentage(3.2), marginRight: 5 }} color={"#06143b"} />
              </TouchableOpacity>

              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: RFPercentage(2.4), color: "#06143b", fontFamily: FONTS.Medium }}>Edit Lead Agent</Text>
                <AntDesign name="edit" style={{ marginLeft: RFPercentage(0.5), fontSize: RFPercentage(3.2) }} color={"#06143b"} />
              </View>
            </View>
            <View
              style={{
                width: "90%",
                height: RFPercentage(6.2),
                borderColor: COLORS.borderColor,
                borderWidth: RFPercentage(0.1),
                borderRadius: RFPercentage(1.2),
                padding: RFPercentage(1.6),
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                marginTop: RFPercentage(4),
              }}
            >
              <TextInput placeholder="Search Agent" placeholderTextColor="#c0c0c2" style={{ width: "90%", color: "black", fontFamily: FONTS.Medium }} onChangeText={handleAgentSearchChange} />
            </View>

            <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
              <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                <View style={{ marginTop: RFPercentage(3), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                  <Text style={{ fontSize: RFPercentage(2.4), color: "#06143b", fontFamily: FONTS.Medium }}>Agents:</Text>
                </View>
              </View>

              <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={true} style={{ width: "100%", height: "55%" }}>
                <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                  {/* Listing  */}
                  {loading ? (
                    <ActivityIndicator style={{ marginTop: RFPercentage(4) }} size="large" color={"#06143b"} />
                  ) : (
                    <View style={{ marginTop: RFPercentage(2), width: "90%", justifyContent: "center", alignItems: "flex-start", alignSelf: "center" }}>
                      {filteredAgentData.map((item, i) => (
                        <TouchableOpacity
                          key={i}
                          activeOpacity={0.5}
                          onPress={() => handleAgentClick(item.ID)}
                          style={{ marginTop: !i == 0 ? RFPercentage(2) : RFPercentage(1), flexDirection: "row", justifyContent: "center", alignItems: "center" }}
                        >
                          <View style={{ width: RFPercentage(1.5), height: RFPercentage(1.5), borderRadius: RFPercentage(30), backgroundColor: "#06143b" }} />
                          <Text style={{ marginLeft: RFPercentage(2), fontSize: RFPercentage(1.8), color: "#06143b", fontFamily: FONTS.Medium }}>{item.LOGIN_NAME}</Text>
                          {selectedAgentId === item.ID && <AntDesign name="checkcircle" style={{ marginLeft: RFPercentage(1), fontSize: RFPercentage(2.2), color: "#06143b" }} />}
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </ScrollView>
              {loading2 ? (
                <ActivityIndicator style={{ marginTop: RFPercentage(4) }} size="large" color={"#06143b"} />
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    if (selectedAgentId && leadID && leadStatusID) {
                      updateAgent(selectedAgentId, leadID, leadStatusID);
                    }
                  }}
                  style={{
                    marginTop: RFPercentage(4),
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
          </View>
        </View>
      </Modal>

      {/* Tag Edit Modal */}
      <Modal visible={isMenuVisible4} transparent={true} onRequestClose={() => setIsAttachmentMenuVisible(false)}>
        <View style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              width: "94%",
              height: "80%",
              borderRadius: RFPercentage(3),
              backgroundColor: "white",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {/* Heading */}
            <View style={{ marginTop: RFPercentage(4), width: "90%", justifyContent: "center", alignItems: "center", alignSelf: "center", flexDirection: "row" }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  toggleMenu4();
                  setSelectedTagId(null);
                }}
                style={{ position: "absolute", left: 0 }}
              >
                <Ionicons name="chevron-back" style={{ fontSize: RFPercentage(3.2), marginRight: 5 }} color={"#06143b"} />
              </TouchableOpacity>

              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: RFPercentage(2.4), color: "#06143b", fontFamily: FONTS.Medium }}>Edit Lead Tag</Text>
                <AntDesign name="edit" style={{ marginLeft: RFPercentage(0.5), fontSize: RFPercentage(3.2) }} color={"#06143b"} />
              </View>
            </View>
            <View
              style={{
                width: "90%",
                height: RFPercentage(6.2),
                borderColor: COLORS.borderColor,
                borderWidth: RFPercentage(0.1),
                borderRadius: RFPercentage(1.2),
                padding: RFPercentage(1.6),
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                marginTop: RFPercentage(4),
              }}
            >
              <TextInput placeholder="Search Tag" placeholderTextColor="#c0c0c2" style={{ width: "90%", color: "black", fontFamily: FONTS.Medium }} onChangeText={handleTagSearchChange} />
            </View>

            <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
              <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                <View style={{ marginTop: RFPercentage(3), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                  <Text style={{ fontSize: RFPercentage(2.4), color: "#06143b", fontFamily: FONTS.Medium }}>Tags:</Text>
                </View>
              </View>

              <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={true} style={{ width: "100%", height: "55%" }}>
                <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                  {/* Listing  */}
                  {loading ? (
                    <ActivityIndicator style={{ marginTop: RFPercentage(4) }} size="large" color={"#06143b"} />
                  ) : (
                    <View style={{ marginTop: RFPercentage(2), width: "90%", justifyContent: "center", alignItems: "flex-start", alignSelf: "center" }}>
                      {filteredTagData.map((item, i) => (
                        <TouchableOpacity
                          key={i}
                          activeOpacity={0.5}
                          onPress={() => handleTagClick(item.ID)}
                          style={{ marginTop: !i == 0 ? RFPercentage(2) : RFPercentage(1), flexDirection: "row", justifyContent: "center", alignItems: "center" }}
                        >
                          <View style={{ width: RFPercentage(1.5), height: RFPercentage(1.5), borderRadius: RFPercentage(30), backgroundColor: "#06143b" }} />
                          <Text style={{ marginLeft: RFPercentage(2), fontSize: RFPercentage(1.8), color: "#06143b", fontFamily: FONTS.Medium }}>{item.NAME}</Text>
                          {selectedTagId === item.ID && <AntDesign name="checkcircle" style={{ marginLeft: RFPercentage(1), fontSize: RFPercentage(2.2), color: "#06143b" }} />}
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </ScrollView>

              {loading2 ? (
                <ActivityIndicator style={{ marginTop: RFPercentage(4) }} size="large" color={"#06143b"} />
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    if (selectedTagId && leadID) {
                      updateTag(selectedTagId, leadID);
                    }
                  }}
                  style={{
                    marginTop: RFPercentage(4),
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
    fontSize: RFPercentage(1.6),
    color: "#06143b",
    fontWeight: "bold",
  },
  backgroundCartImage: {
    alignItems: "center",
    width: RFPercentage(45),
    height: RFPercentage(24),
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
    marginTop: RFPercentage(3.4),
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  unitCodeStyle: {
    fontSize: RFPercentage(2.4),
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
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    position: "absolute",
    bottom: RFPercentage(4),
  },
  priceListingButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 30,
    backgroundColor: "#87CEEB",
    borderRadius: 10,
    position: "absolute",
    right: 0,
  },
  categoriesContainer: {
    backgroundColor: "#ffffff",
    marginTop: RFPercentage(1),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  categoryButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: RFPercentage(1.2),
    padding: RFPercentage(1),
    margin: RFPercentage(1),
    width: RFPercentage(12),
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCategory: {
    backgroundColor: "#87CEEB",
  },
  categoryText: {
    color: "#06143b",
    fontWeight: "bold",
    fontSize: RFPercentage(2),
  },
  selectedCategoryText: {
    color: "#ffffff",
  },
  dropDownView: {
    width: "90%",
    marginTop: RFPercentage(3),
    alignSelf: "center",
  },
});
