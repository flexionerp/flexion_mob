import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Platform, Alert, Button } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FONTS, ICONS, Url, SCREEN_WIDTH, COLORS } from "../../../constants";
import React, { useState, useEffect } from "react";
import { BackButton } from "../../../common/backButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";
import { BarChart } from "react-native-chart-kit";

const Graph = ({ navigation, route }) => {
  const title = route.params?.title;
  const [agents, setAgents] = useState([]);
  const [lastFiveResponses, setLastFiveResponses] = useState([]);

  // Dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "All Tower", value: "all" },
    { label: "Tower A", value: "Tower A" },
    { label: "Tower B", value: "Tower B" },
    { label: "RETAIL", value: "RETAIL" },
    { label: "TREPPAN LIVING", value: "TREPPAN LIVING" },
  ]);

  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([
    { label: "Dion", value: "Dion" },
    { label: "Aldrin", value: "Aldrin" },
    { label: "Vandom", value: "Vandom" },
  ]);

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(null);
  const [items4, setItems4] = useState([
    { label: "Month", value: "months" },
    { label: "Week", value: "weeks" },
    { label: "Days", value: "days" },
  ]);

  const data = {
    labels: ["100,00", "200,00", "600,00", "40,00", "50,000"],
    datasets: [
      {
        data: [10, 15, 20, 11, 20],
      },
    ],
  };

  const isAnyDropdownSelected = () => {
    return value !== null || value3 !== null || value4 !== null;
  };

  // Dropdown of agents
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://tvh.flexion.ae:9091/leads_list_api?userid=5231");
        const result = await response.json();

        const agentNamesFromApi = result.data[1].map((agent) => ({
          label: agent.LOGIN_NAME,
          value: agent.ID,
        }));

        const agentNames = [{ label: "All Agent", value: "all" }, ...agentNamesFromApi];

        setAgents(agentNames);
      } catch (error) {
        console.error("\n\n\n\n\n\n\n\n\nError fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const handleClearButtonPress = () => {
    setValue(null);
    setValue3(null);
    setValue4(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://tvh.flexion.ae:9091/get_sales_data_by_date_api?date_type=${value4 || "days"}&USER_INFO_ID=5231&building_type=${value || "all"}&agent_type=${value3 || "all"}`;
        const response = await fetch(url);
        const result = await response.json();

        // Get the last 5 responses
        const lastFiveResponses = result.slice(-5);
        console.log("\n\n\n\n\n\n\n\n\n\n\n", lastFiveResponses);
        setLastFiveResponses(lastFiveResponses);

        const formattedData = {
          labels: lastFiveResponses.map((entry) => {
            if (value4 === "weeks") {
              return entry.WEEK_START;
            } else {
              const date = new Date(entry.REPORT_DATE);
              return `${date.getDate()}-${date.toLocaleString("default", { month: "short" })}-${date.getFullYear().toString().substr(-2)}`;
            }
          }),
          datasets: [
            {
              data: lastFiveResponses.map((entry) => entry.TOTAL_SALES),
            },
          ],
        };

        setSalesData(formattedData);
        console.log("\n\n\n\n\n\n\n\n\nAPI Response for sale graph:", formattedData);
      } catch (error) {
        console.error("\n\n\n\n\n\n\n\n\nError fetching data:", error);
      }
    };

    fetchData();
  }, [value, value3, value4]);

  return (
    <ImageBackground source={ICONS.bgImg} style={styles.container}>
      <SafeAreaView style={styles.main}>
        <BackButton navigation={navigation} label="Chart Details" />

        <ScrollView style={{ width: "100%" }}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", marginTop: RFPercentage(2) }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.2), fontFamily: FONTS.Medium }}>Select</Text>
                <Ionicons name="filter" style={{ marginLeft: RFPercentage(1), fontSize: RFPercentage(3) }} color={COLORS.boldText} />
              </View>
              {isAnyDropdownSelected() && (
                <TouchableOpacity onPress={handleClearButtonPress} activeOpacity={0.8} style={{ flexDirection: "row", position: "absolute", right: 0 }}>
                  <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.1), fontFamily: FONTS.Medium }}>Clear</Text>
                  <MaterialCommunityIcons name="filter-remove-outline" style={{ marginLeft: RFPercentage(0.5), fontSize: RFPercentage(3) }} color={COLORS.boldText} />
                </TouchableOpacity>
              )}
            </View>

            {/* Filters */}
            <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", marginTop: RFPercentage(1) }}>
              <View style={{ width: "34%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                {/* Dropdown1 */}
                <View style={styles.dropDownView}>
                  <DropDownPicker
                    placeholder="All Tower"
                    placeholderStyle={{ color: COLORS.normalText }}
                    style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                    dropDownContainerStyle={{
                      maxHeight: RFPercentage(24),
                      backgroundColor: "#0000",
                      borderColor: COLORS.boldText,
                      borderWidth: RFPercentage(0.1),
                    }}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    labelStyle={{
                      fontWeight: "500",
                      color: COLORS.dark,
                      fontSize: RFPercentage(1.8),
                    }}
                  />
                </View>
              </View>

              <View style={{ width: "34%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                {/* Dropdown2 */}
                <View style={styles.dropDownView}>
                  <DropDownPicker
                    placeholder="All Agent"
                    placeholderStyle={{ color: COLORS.normalText }}
                    style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                    dropDownContainerStyle={{ maxHeight: RFPercentage(24), backgroundColor: "#0000", borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1) }}
                    open={open3}
                    value={value3}
                    items={agents}
                    setOpen={setOpen3}
                    setValue={setValue3}
                    setItems={setItems3}
                    searchable={true} // Enable search
                    searchPlaceholder="Search agent..."
                    searchablePlaceholderTextColor={COLORS.normalText}
                    searchableError={() => <Text>Agent not found</Text>}
                    labelStyle={{
                      fontWeight: "500",
                      color: COLORS.dark,
                      fontSize: RFPercentage(1.8),
                    }}
                  />
                </View>
              </View>

              <View style={{ width: "34%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                {/* Dropdown3 */}
                <View style={styles.dropDownView}>
                  <DropDownPicker
                    placeholder="Days"
                    placeholderStyle={{ color: COLORS.normalText }}
                    style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                    dropDownContainerStyle={{ maxHeight: RFPercentage(24), backgroundColor: "#0000", borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1) }}
                    open={open4}
                    value={value4}
                    items={items4}
                    setOpen={setOpen4}
                    setValue={setValue4}
                    setItems={setItems4}
                    labelStyle={{
                      fontWeight: "500",
                      color: COLORS.dark,
                      fontSize: RFPercentage(1.8),
                    }}
                  />
                </View>
              </View>
            </View>

            {/* Graph */}
            <View style={{ marginTop: open || open3 || open4 ? RFPercentage(26) : RFPercentage(4), justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.2), fontFamily: FONTS.Medium }}>{title}</Text>
            </View>

            <BarChart
              style={{ marginTop: RFPercentage(2), borderRadius: 16 }}
              data={salesData}
              width={SCREEN_WIDTH * 0.9}
              height={300}
              yAxisLabel=""
              chartConfig={{
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(10, 150, 44, ${opacity})`,
                labelColor: () => `rgba(0, 0, 0, 1)`,
              }}
              fromZero={true}
              showValuesOnTopOfBars={true}
              verticalLabelRotation={24}
            />
          </View>

          {/* Sale Values */}
          <View style={{ marginTop: RFPercentage(3), justifyContent: "center", alignItems: "flex-start", width: "90%", alignSelf: "center" }}>
            <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.1), fontFamily: FONTS.Medium }}>Sale Values</Text>
          </View>
          {salesData.labels.map((label, index) => {
            const { REPORT_DATE, TOTAL_SALES, TOTAL_SALE_VALUE } = lastFiveResponses[index];

            return (
              <View
                key={index}
                style={{ flexDirection: "row", marginTop: !index == 1 ? RFPercentage(1.4) : RFPercentage(1.2), justifyContent: "flex-start", alignItems: "center", width: "90%", alignSelf: "center" }}
              >
                <Text style={{ color: COLORS.normalText, fontSize: RFPercentage(2), fontFamily: FONTS.Medium }}>{label} :</Text>
                {/* Convert in proper format of 2,300,000.00 */}
                <Text style={{ marginLeft: RFPercentage(1), color: COLORS.normalText, fontSize: RFPercentage(2), fontFamily: FONTS.Bold }}>
                  {Number(TOTAL_SALE_VALUE).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
                <Text style={{ marginLeft: RFPercentage(1), color: COLORS.normalText, fontSize: RFPercentage(2), fontFamily: FONTS.Medium }}>({TOTAL_SALES})</Text>
              </View>
            );
          })}
          <View style={{ marginBottom: RFPercentage(15) }} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Graph;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  main: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  customerContainer: {
    width: "90%",
    height: 70,
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginTop: 12,
  },
  hello: {
    color: "#204866",
    fontFamily: FONTS.Medium,
    fontSize: 16,
    marginTop: 8,
  },
  unitContainer: {
    width: "90%",
    height: 70,
    borderWidth: 1,
    borderColor: "#CDA349",
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  hello: {
    color: "#204866",
    fontFamily: FONTS.Medium,
    fontSize: 16,
    marginTop: 8,
  },
  customerName: {
    color: "#204866",
    fontFamily: FONTS.Bold,
    fontSize: 23,
  },
  unitText: {
    width: "75%",
    marginHorizontal: 12,
    color: "#204866",
    fontFamily: FONTS.Medium,
    fontSize: 15,
  },
  statsContainer: {
    width: "48%",
    height: 72,
    borderWidth: 1,
    borderColor: "#CDA349",
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginTop: 12,
  },
  statsLabel: {
    color: "#204866",
    fontFamily: FONTS.Medium,
    fontSize: 14,
    marginTop: 8,
  },
  statsValue: {
    color: "#204866",
    fontFamily: FONTS.Bold,
    fontSize: 20,
  },
  dropDownView: {
    width: "90%",
    marginTop: RFPercentage(2),
    alignSelf: "center",
  },
});
