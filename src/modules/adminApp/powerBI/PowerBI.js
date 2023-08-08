import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import React from "react";
import { BackButton } from "../../../common/backButton";
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constants";
import { WebView } from "react-native-webview";

const PowerBI = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label="Power BI" />
      <View>
        <WebView
          source={{
            uri: "https://app.powerbi.com/groups/da2ba9a1-a4a5-4558-98d5-5de89ec0523f/reports/af972607-2770-4df5-bd04-9be3f55c21df/ReportSectiona36649b4590e8d22e1b9?bookmarkGuid=Bookmark0f6cfa08562b296a3dc7",
          }}
          style={{ marginTop: 20, flex: 1 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PowerBI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondry,
  },
});
