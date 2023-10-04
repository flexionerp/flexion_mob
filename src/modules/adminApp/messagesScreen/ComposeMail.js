import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Modal, Image } from "react-native";
import { COLORS, FONTS } from "../../../constants";
import { BackButton } from "../../../common/backButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import DocumentPicker from "react-native-document-picker";
import PDFView from "react-native-pdf";

export const ComposeMail = ({ navigation, route }) => {
  const [pickedImages, setPickedImages] = useState([]);
  const [pickedPDFs, setPickedPDFs] = useState([]);
  const [pdfPicked, setPdfPicked] = useState(false);

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
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf],
      });

      // Concatenate the newly picked PDFs with the existing ones
      setPickedPDFs([...pickedPDFs, ...results]);

      // Set pdfPicked to true if there are picked PDFs
      setPdfPicked(results.length > 0);

      console.log("Picked PDF Results", results);
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

  // Email Main Body Message
  const [message, setMessage] = useState("");

  const handleMessageChange = (text) => {
    setMessage(text);
  };

  const removePickedImage = (indexToRemove) => {
    const updatedImages = pickedImages.filter((_, index) => index !== indexToRemove);
    setPickedImages(updatedImages);
  };

  const removePickedPDF = (indexToRemove) => {
    const updatedPDFs = pickedPDFs.filter((_, index) => index !== indexToRemove);
    setPickedPDFs(updatedPDFs);
    setPdfPicked(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label="Lead Details" />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <View style={styles.menuContainer2}>
            {/*Lead Name */}
            <View style={{ marginTop: RFPercentage(2), width: "90%", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row" }}>
              <TouchableOpacity activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "flex-start" }}>
                <Text style={{ fontSize: RFPercentage(2.1), color: "#06143b", fontFamily: FONTS.Medium }}>New Message</Text>
                <Text style={{ fontSize: RFPercentage(1.8), color: "grey", fontFamily: FONTS.Medium }}>EmailIbrahim@gmail.com</Text>
              </TouchableOpacity>
            </View>
            {/* Saperation */}
            <View style={{ marginTop: RFPercentage(2), width: "100%", height: RFPercentage(0.1), backgroundColor: "lightgrey" }} />
            <View style={{ marginTop: RFPercentage(2), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
              <Text style={{ fontSize: RFPercentage(2), color: "grey", fontFamily: FONTS.Medium }}>To:</Text>
              <TextInput style={{ fontFamily: FONTS.Regular, color: "black", marginLeft: RFPercentage(1), width: "100%" }} />
            </View>
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
        </View>
      </ScrollView>

      {/* Attachemnts will be shown here in a row like we have in gmail attachments */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ position: "absolute", bottom: RFPercentage(20), width: "90%", alignSelf: "center" }}>
        {pickedImages.map((image, index) => (
          <View key={index} style={{ position: "relative" }}>
            <Image source={{ uri: image.uri }} style={{ borderRadius: RFPercentage(1), opacity: 0.8, width: 100, height: 100, marginRight: 10 }} />
            <TouchableOpacity onPress={() => removePickedImage(index)} style={{ position: "absolute", top: RFPercentage(0.5), right: RFPercentage(2) }}>
              <AntDesign name="closecircle" style={{ fontSize: RFPercentage(2.4), color: "white" }} />
            </TouchableOpacity>
          </View>
        ))}
        {/* {pickedPDFs.map((pdf, index) => (
          <PDFView
            key={index}
            source={{ uri: pdf.uri, cache: true }}
            onLoadComplete={(numberOfPages, filePath) => {}}
            onPageChanged={(page, numberOfPages) => {}}
            onError={(error) => {
              console.error("PDF Error:", error);
            }}
            style={{ width: 100, height: 100, marginRight: 10 }}
          />
        ))} */}
        {pickedPDFs.map((pdf, index) => (
          <View
            key={index}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: RFPercentage(12),
              height: RFPercentage(12),
              borderColor: "red",
              borderWidth: RFPercentage(0.1),
              borderRadius: RFPercentage(1),
              marginRight: 10, // Adjust spacing between PDFs
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: RFPercentage(0.5), right: RFPercentage(0.6) }}
              onPress={() => removePickedPDF(index)} // Remove the specific picked PDF
            >
              <AntDesign name="closecircle" style={{ fontSize: RFPercentage(2.4), color: "black" }} />
            </TouchableOpacity>
            <Text style={{ fontSize: RFPercentage(2), color: "red", fontFamily: FONTS.Medium }}>PDF Picked</Text>
          </View>
        ))}
      </ScrollView>
      {/* Bottom Actions */}
      <View style={{ width: "86%", position: "absolute", bottom: RFPercentage(15), justifyContent: "flex-start", alignItems: "center", flexDirection: "row", alignSelf: "center" }}>
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
        <TouchableOpacity onPress={() => setIsMenuVisible2(false)} activeOpacity={0.8} style={{ position: "absolute", right: 0, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
          <FontAwesome name="send-o" style={{ fontSize: RFPercentage(2.6) }} color={"#06143b"} />
          <Text style={{ marginLeft: RFPercentage(0.5), fontSize: RFPercentage(2), color: "#06143b", fontFamily: FONTS.Medium }}>Send</Text>
        </TouchableOpacity>
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
    width: "100%",
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopLeftRadius: RFPercentage(3),
    borderTopRightRadius: RFPercentage(3),
  },

  dropDownView: {},
});
