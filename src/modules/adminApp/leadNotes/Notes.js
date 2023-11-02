import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert, ActivityIndicator, useWindowDimensions, Modal } from "react-native";
import { COLORS, FONTS, Url } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import HTML from "react-native-render-html";
import moment from "moment";
// import DocumentPicker from "react-native-document-picker";
import Pdf from "react-native-pdf";

export const LeadNotes = ({ navigation, route }) => {
  const { token } = useSelector((state) => state.user);
  const leadName = route.params?.leadName;
  const leadID = route.params?.leadID;
  const [apiResult, setApiResult] = useState(null);
  const [noteTypes, setNoteTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const windowWidth = useWindowDimensions().width;

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
    setIsLoading(true);

    try {
      const response = await fetch(`${Url}get_notes_forlead_api?user_id=${token}&form_id=116&ref_id=${leadID}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setApiResult(data);
      // console.log("\n\n\n\n\n\nNotes listing API Data here ", data);
    } catch (error) {
      console.error("Error fetching API data:", error);
    } finally {
      setIsLoading(false);
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

  const renderNoteTypes = (windowWidth) => {
    return noteTypes.map((item, index) => {
      const noteHtml = showFullNote ? item.NOTE : item.NOTE.substring(0, 300);
      const shouldShowReadMore = item.NOTE.length > 300;
      const formattedDateTime = moment(item.CREATED_ON).format("DD-MM-YYYY hh:mm A");

      return (
        <View key={index} style={{ marginTop: RFPercentage(5), width: "100%", justifyContent: "flex-start", alignItems: "flex-start" }}>
          {/* Added by and at */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontFamily: FONTS.Medium, fontSize: RFPercentage(1.8), color: "black" }}>{item.CREATED_USER}</Text>
            <Text style={{ marginLeft: 10, fontFamily: FONTS.Medium, fontSize: RFPercentage(1.8), color: "grey" }}>{formattedDateTime}</Text>
          </View>
          {/* Notes Text */}
          <View style={{ marginTop: RFPercentage(1), width: "100%", justifyContent: "flex-start", alignItems: "flex-start" }}>
            <HTML contentWidth={windowWidth} style={{ lineHeight: RFPercentage(5) }} source={{ html: noteHtml }} />
          </View>
          {shouldShowReadMore && (
            <TouchableOpacity activeOpacity={0.8} style={{ marginTop: RFPercentage(0.1) }} onPress={toggleNote}>
              <Text style={{ color: "#CDA349", fontSize: RFPercentage(1.8), fontFamily: FONTS.Medium }}>{showFullNote ? "Read Less" : "Read More"}</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    });
  };

  const [showFullNote, setShowFullNote] = useState(false);
  const maxLines = 3;

  const toggleNote = () => {
    setShowFullNote(!showFullNote);
  };

  // const [attachmentPicked, setAttachmentPicked] = useState(false);
  // const [selectedFileURI, setSelectedFileURI] = useState("");

  // const handlePickDocument = async () => {
  //   try {
  //     const result = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //       allowMultiSelection: true,
  //     });

  //     if (result.length > 0) {
  //       const selectedURIs = result.map((file) => file.uri);

  //       setAttachmentPicked(true);

  //       setSelectedFileURI(selectedURIs);
  //     }
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //     } else {
  //       throw err;
  //     }
  //   }
  // };

  const insertNote = async () => {
    try {
      const url = `${Url}insert_notes_lead_api?note_type=3&hdr_id=${leadID}&notes=${notes}&org_id=33&user_id=${token}`;
      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Notes Insert API Response:", data);
    } catch (error) {
      console.error("Error calling the API:", error);
      Alert.alert("Failed to add note", "An error occurred while adding a note.");
    }
  };

  // useEffect(() => {
  //   insertNote();
  // }, []);

  // const [pdfModalVisible, setPdfModalVisible] = useState(false);
  // const [pdfUrl, setPdfUrl] = useState("");
  // const [isLoading2, setIsLoading2] = useState(true);

  // const fetchPdfData = async () => {
  //   setIsLoading2(true);

  //   try {
  //     const response = await fetch(`${Url}get_common_documents_lead_api?lead_id=${leadID}`);

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log("\n\n\n\n\n\n\n\n\n\n\nData document view returned data", data);

  //     if (data.length > 0 && data[0].length > 0 && data[0][0].FILE_PATH) {
  //       const filePath = data[0][0].FILE_PATH;
  //       const combinedUrl = `https://erp.flexion.ae:8018${filePath}`;
  //       console.log("\n\n\n\n\n\n\n\nCombined URL", combinedUrl);
  //       setPdfUrl(combinedUrl);
  //     } else {
  //       // Alert.alert("Error", "PDF file not found in the API response.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching PDF data:", error);
  //     // Alert.alert("Error", "An error occurred while fetching PDF data.");
  //   } finally {
  //     setIsLoading2(false);
  //   }
  // };

  // const closePdfModal = () => {
  //   setPdfModalVisible(false);
  // };

  // const openPdfModal = (pdfUrl) => {
  //   setPdfUrl(pdfUrl);
  //   setPdfModalVisible(true);
  // };

  // useEffect(() => {
  //   fetchPdfData();
  // }, []);

  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [pdfUrls, setPdfUrls] = useState([]); // Store an array of PDF URLs
  const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
  const [isLoading2, setIsLoading2] = useState(true);

  useEffect(() => {
    // Fetch PDF data when the component mounts
    fetchPdfData();
  }, []);

  const fetchPdfData = async () => {
    setIsLoading2(true);

    try {
      // Replace this with your API call to get multiple PDF URLs
      const response = await fetch(`${Url}get_common_documents_lead_api?lead_id=${leadID}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const pdfUrls = data.map((item) => `https://erp.flexion.ae:8018${item[0].FILE_PATH}`);
      setPdfUrls(pdfUrls);
      setCurrentPdfIndex(0); // Set the initial PDF to be displayed
    } catch (error) {
      console.error("Error fetching PDF data:", error);
    } finally {
      setIsLoading2(false);
    }
  };

  const closePdfModal = () => {
    setPdfModalVisible(false);
  };

  const openPdfModal = (index) => {
    setCurrentPdfIndex(index);
    setPdfModalVisible(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label="Note Details" />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={{ width: "100%" }}>
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
          {/*Lead Name */}
          <TouchableOpacity activeOpacity={0.8} style={{ marginTop: RFPercentage(2), width: "90%", justifyContent: "center", alignItems: "center", flexDirection: "row", alignSelf: "center" }}>
            <Text style={{ fontSize: RFPercentage(2.6), color: "#06143b", fontWeight: "bold" }}>{leadName}</Text>
          </TouchableOpacity>

          {/*  Notes input field*/}
          <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
            {fields.map((item, i) => (
              <View key={i} style={{ marginTop: RFPercentage(3) }}>
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
                      color: "#000",
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
                      <TouchableOpacity onPress={() => [handleSave(item.name), insertNote(), fetchApiData(), setNotes("")]}>
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

          {/* See Document */}
          {/* <TouchableOpacity
            onPress={() => [openPdfModal(pdfUrl), fetchPdfData()]}
            style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", alignSelf: "center", flexDirection: "row", marginTop: RFPercentage(2) }}
          >
            <Text style={{ top: RFPercentage(0.4), fontSize: RFPercentage(1.8), color: "#06143b", fontFamily: FONTS.Regular }}>View PDF</Text>
            <FontAwesome name="file-pdf-o" style={{ marginLeft: RFPercentage(0.6), fontSize: RFPercentage(3) }} color={"#06143b"} />
          </TouchableOpacity> */}
          {isLoading2 ? (
            <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", alignSelf: "center", flexDirection: "row", marginTop: RFPercentage(2.4) }}>
              <ActivityIndicator style={{ marginLeft: RFPercentage(3) }} size="large" color="#CDA349" />
            </View>
          ) : (
            <>
              {pdfUrls.length > 0 ? (
                pdfUrls.map((pdfUrl, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => openPdfModal(index)}
                    style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", alignSelf: "center", flexDirection: "row", marginTop: RFPercentage(2) }}
                  >
                    <Text style={{ top: RFPercentage(0.4), fontSize: RFPercentage(1.8), color: "#06143b", fontFamily: FONTS.Regular }}>{`(${index + 1}) View PDF`}</Text>
                    <FontAwesome name="file-pdf-o" style={{ marginLeft: RFPercentage(0.6), fontSize: RFPercentage(3) }} color={"#06143b"} />
                  </TouchableOpacity>
                ))
              ) : (
                <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", alignSelf: "center", flexDirection: "row", marginTop: RFPercentage(2) }}>
                  <Text style={{ top: RFPercentage(0.4), fontSize: RFPercentage(1.8), color: "grey", fontFamily: FONTS.Regular }}>No PDF Available</Text>

                  <FontAwesome name="file-pdf-o" style={{ marginLeft: RFPercentage(0.6), fontSize: RFPercentage(2.8) }} color={"#06143b"} />
                </View>
              )}
            </>
          )}

          {/* Display the selected file's URI */}
          {/* {selectedFileURI.length > 0 && (
            <View style={{ margin: RFPercentage(1) }}>
              <Text style={{ fontSize: RFPercentage(1.8), fontFamily: FONTS.Regular, fontWeight: "bold" }}>Selected File URIs:</Text>
              {selectedFileURI.map((uri, index) => (
                <Text key={index.toString()} style={{ fontSize: RFPercentage(1.8), fontFamily: FONTS.Regular }}>
                  {uri}
                </Text>
              ))}
            </View>
          )} */}

          <View style={{ width: "90%", justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#CDA349" />
            ) : noteTypes && noteTypes.length > 0 ? (
              renderNoteTypes(windowWidth)
            ) : (
              <Text style={{ fontSize: RFPercentage(2), color: "grey", marginTop: RFPercentage(3) }}>No Notes Added Yet</Text>
            )}
          </View>
        </View>
        <View style={{ marginBottom: RFPercentage(20) }} />
      </ScrollView>
      <Modal visible={pdfModalVisible} animationType="slide" transparent={true} onRequestClose={closePdfModal}>
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.7)", justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: RFPercentage(2),
              width: "96%",
              height: "80%",
              alignSelf: "center",
              backgroundColor: "white",
              overflow: "hidden",
            }}
          >
            {pdfModalVisible ? (
              isLoading2 ? (
                <ActivityIndicator size="large" color="#CDA349" />
              ) : pdfUrls[currentPdfIndex] ? (
                <Pdf
                  source={{ uri: pdfUrls[currentPdfIndex], cache: true }}
                  style={{ width: "100%", height: "100%" }}
                  onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`PDF loaded from ${pdfUrls[currentPdfIndex]}`);
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                  }}
                  onError={(error) => {
                    console.error(error);
                  }}
                />
              ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ fontSize: RFPercentage(2), color: "grey" }}>No Document available</Text>
                </View>
              )
            ) : null}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={closePdfModal}
              style={{
                position: "absolute",
                top: RFPercentage(2),
                right: RFPercentage(2),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="closecircle" style={{ fontSize: RFPercentage(3.5) }} color={"#06143b"} />
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
