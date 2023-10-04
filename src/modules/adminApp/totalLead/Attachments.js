import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import PDFView from "react-native-pdf";

const Attachments = ({ attachment }) => {
  // Check if the attachment is an image
  if (attachment.type && attachment.type.startsWith("image/")) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: attachment.uri }} style={styles.image} />
      </View>
    );
  }

  // Check if the attachment is a PDF
  if (attachment.type && attachment.type === "application/pdf") {
    return (
      <View style={styles.container}>
        <PDFView source={{ uri: attachment.uri, cache: true }} onLoad={() => console.log("PDF loaded")} onError={(error) => console.error("PDF Error:", error)} style={styles.pdf} />
      </View>
    );
  }

  // Handle other types of attachments here

  return (
    <View style={styles.container}>
      <Text>Unsupported attachment type</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  pdf: {
    width: 200,
    height: 200,
  },
});

export default Attachments;
