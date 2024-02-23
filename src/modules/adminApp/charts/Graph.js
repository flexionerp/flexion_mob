import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Platform, ActivityIndicator, Alert, Button } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FONTS, ICONS, Url, SCREEN_WIDTH, COLORS } from "../../../constants";
import React, { useState, useEffect } from "react";
import { BackButton } from "../../../common/backButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";
import { BarChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import axios from "axios";
import * as Progress from "react-native-progress";

const Graph = ({ navigation, route }) => {
  const title = route.params?.title;
  const [agents, setAgents] = useState([]);
  const [lastFiveResponses, setLastFiveResponses] = useState([]);
  const [lastFiveResponsesi, setLastFiveResponsesi] = useState([]);
  const [lastFiveResponsesd, setLastFiveResponsesd] = useState([]);
  const [lastFiveResponsesc, setLastFiveResponsesc] = useState([]);
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  // Sale Dropdowns
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
    { label: "All Agent", value: "all" },
    { value: "6", label: "Dion" },
    { value: "11", label: "Sakina" },
    { value: "12", label: "JoclaireAG" },
    { value: "13", label: "fhamidAG" },
    { value: "14", label: "yhamidAG" },
    { value: "16", label: "Anastasia" },
    { value: "17", label: "Yasser" },
    { value: "20", label: "Aldrin" },
    { value: "22", label: "joclaire_mgmt_units" },
    { value: "26", label: "Anthony" },
    { value: "27", label: "bahaa" },
    { value: "28", label: "jawharacsd" },
    { value: "29", label: "oldleads" },
    { value: "30", label: "aldrinag" },
    { value: "31", label: "Victoria" },
  ]);

  const handleAgentValueChange = (label) => {
    setValue3(label);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(`${Url}leads_list_api?userid=${token}`);
  //       const result = response.data.data[1];

  //       console.log("\n\n\n\n\n\n\n\n\n\n\nye rha", result);

  //       // Map the API data to the format required by DropDownPicker
  //       const mappedData = apiData.map((item) => ({
  //         label: item.LOGIN_NAME,
  //         value: item.ID.toString(), // Ensure value is a string
  //       }));

  //       // Add the mapped data to the existing items
  //       setItems3([...items3, ...mappedData]);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(null);
  const [items4, setItems4] = useState([
    { label: "Month", value: "months" },
    { label: "Week", value: "weeks" },
    { label: "Days", value: "days" },
  ]);

  const [open4su, setOpen4su] = useState(false);
  const [value4su, setValue4su] = useState(null);
  const [items4su, setItems4su] = useState([{ label: "All", value: "all" }]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${Url}get_unit_name_list_api`);

        if (!response.ok) {
          throw new Error("Failed to fetch dropdown values");
        }

        const data = await response.json();

        // console.log("\n\n\n\n\n\n\n\n\n Response from list of unit dropdown", data);

        const apiDropdownValues = data.map((item) => ({
          label: item.UNIT_SPECS_NAME,
          value: item.UNIT_SPECS_NAME,
        }));

        setItems4su([...items4su, ...apiDropdownValues]);
      } catch (error) {
        console.error("Error fetching dropdown values:", error.message);
      }
    };

    fetchData();
  }, []);

  // Inventory Dropdowns
  const [openi, setOpeni] = useState(false);
  const [valuei, setValuei] = useState(null);
  const [itemsi, setItemsi] = useState([
    { label: "All Tower", value: "all" },
    { label: "Tower A", value: "TOWER%20A" },
    { label: "Tower B", value: "TOWER%20B" },
    { label: "RETAIL", value: "RETAIL" },
    { label: "TREPPAN LIVING", value: "TREPPAN%20LIVING" },
  ]);

  const [open4i, setOpen4i] = useState(false);
  const [value4i, setValue4i] = useState(null);
  const [items4i, setItems4i] = useState([
    { label: "All Unit", value: "all" },
    { label: "1 BHK", value: "1%20BHK" },
    { label: "2 BHK", value: "2%20BHK" },
    { label: "3 BHK", value: "3%20BHK" },
    { label: "STUDIO", value: "STUDIO" },
    { label: "RETAIL", value: "RETAIL" },
  ]);

  const [open4f, setOpen4f] = useState(false);
  const [value4f, setValue4f] = useState(null);
  const [items4f, setItems4f] = useState([]);

  const getAvailableFloors = (inventoryData) => {
    const availableUnits = inventoryData.filter((entry) => entry.UNIT_STATUS === "Available");
    const uniqueFloors = [...new Set(availableUnits.map((entry) => entry.FLOOR))];
    return uniqueFloors;
  };

  // Collection Dropdowns
  const [openc, setOpenc] = useState(false);
  const [valuec, setValuec] = useState(null);
  const [itemsc, setItemsc] = useState([
    { label: "All", value: "all" },
    { label: "Cleared", value: "Cleared" },
    { label: "In hand", value: "In hand" },
    { label: "Return", value: "Return" },
  ]);

  const [open4c, setOpen4c] = useState(false);
  const [value4c, setValue4c] = useState(null);
  const [items4c, setItems4c] = useState([
    { label: "Month", value: "months" },
    { label: "Week", value: "weeks" },
    { label: "Days", value: "days" },
  ]);

  const [open4fc, setOpen4fc] = useState(false);
  const [value4fc, setValue4fc] = useState(null);
  const [items4fc, setItems4fc] = useState([
    { label: "All", value: "all" },
    { label: "CASH", value: "CASH" },
    { label: "CREDIT", value: "CREDIT" },
    { label: "CARD", value: "CARD" },
    { label: "BY LINK", value: "BY LINK" },
    { label: "CHEQUE", value: "CHEQUE" },
    { label: "BANK TRANSFER", value: "BANK TRANSFER" },
  ]);

  // Dues Dropdowns
  const [open4d, setOpen4d] = useState(false);
  const [value4d, setValue4d] = useState(null);
  const [items4d, setItems4d] = useState([
    { label: "All", value: "all" },
    { label: "RETAIL", value: "RETAIL" },
    { label: "TOWER 1", value: "TOWER%201" },
    { label: "TOWER 2", value: "TOWER%202" },
    { label: "TREPPAN LIVING", value: "TREPPAN%20LIVING" },
  ]);

  const [open4fd, setOpen4fd] = useState(false);
  const [value4fd, setValue4fd] = useState(null);
  const [items4fd, setItems4fd] = useState([{ label: "All", value: "all" }]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${Url}get_due_list_values_api?data=customer&APIKey=216bb413-8022-416e-83cf-aad38748d724`);

        if (!response.ok) {
          throw new Error("Failed to fetch dropdown values");
        }

        const data = await response.json();

        // console.log("\n\n\n\n\n\n\n\n\n Response from list of customers", data);

        const apiDropdownValues = data.map((item) => ({
          label: item.VAULES,
          value: item.VAULES,
        }));

        setItems4fd([...items4fd, ...apiDropdownValues]);
      } catch (error) {
        console.error("Error fetching dropdown values:", error.message);
      }
    };

    fetchData();
  }, []);

  const [opend, setOpend] = useState(false);
  const [valued, setValued] = useState(null);
  const [itemsd, setItemsd] = useState([{ label: "All", value: "all" }]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${Url}get_due_list_values_api?data=unit&APIKey=216bb413-8022-416e-83cf-aad38748d724`);

        if (!response.ok) {
          throw new Error("Failed to fetch dropdown values");
        }

        const data = await response.json();

        // console.log("\n\n\n\n\n\n\n\n\n Response from list of unit dropdown", data);

        const apiDropdownValues = data.map((item) => ({
          label: item.VAULES,
          value: item.VAULES,
        }));

        setItemsd([...itemsd, ...apiDropdownValues]);
      } catch (error) {
        console.error("Error fetching dropdown values:", error.message);
      }
    };

    fetchData();
  }, []);

  const [opendd, setOpendd] = useState(false);
  const [valuedd, setValuedd] = useState(null);
  const [itemsdd, setItemsdd] = useState([{ label: "All", value: "all" }]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${Url}get_due_list_values_api?data=document&APIKey=216bb413-8022-416e-83cf-aad38748d724`);

        if (!response.ok) {
          throw new Error("Failed to fetch dropdown values");
        }

        const data = await response.json();

        // console.log("\n\n\n\n\n\n\n\n\n Response from list of document picker", data);

        const apiDropdownValues = data.map((item) => ({
          label: item.VAULES,
          value: item.VAULES,
        }));

        setItemsdd([...itemsdd, ...apiDropdownValues]);
      } catch (error) {
        console.error("Error fetching dropdown values:", error.message);
      }
    };

    fetchData();
  }, []);

  // Cancellations
  const [open4cancel, setOpen4cancel] = useState(false);
  const [value4cancel, setValue4cancel] = useState(null);
  const [items4cancel, setItems4cancel] = useState([
    { label: "All", value: "all" },
    { label: "RETAIL", value: "RETAIL" },
    { label: "TOWER 1", value: "TOWER%201" },
    { label: "TOWER 2", value: "TOWER%202" },
    { label: "TREPPAN LIVING", value: "TREPPAN%20LIVING" },
  ]);

  const [open4fcancel, setOpen4fcancel] = useState(false);
  const [value4fcancel, setValue4fcancel] = useState(null);
  const [items4fcancel, setItems4fcancel] = useState([{ label: "All", value: "all" }]);

  const [opencancel, setOpencancel] = useState(false);
  const [valuecancel, setValuecancel] = useState(null);
  const [itemscancel, setItemscancel] = useState([{ label: "All", value: "all" }]);

  const [opendcancel, setOpendcancel] = useState(false);
  const [valuedcancel, setValuedcancel] = useState(null);
  const [itemsdcancel, setItemsdcancel] = useState([{ label: "All", value: "all" }]);

  // Lead
  const [open4lead, setOpen4lead] = useState(false);
  const [value4lead, setValue4lead] = useState(null);
  const [items4lead, setItems4lead] = useState([
    { label: "All", value: "all" },
    { label: "ASSIGNED", value: "ASSIGNED" },
    { label: "COLD", value: "COLD" },
    { label: "WARM", value: "WARM" },
    { label: "HOT", value: "HOT" },
  ]);

  const [open3l, setOpen3l] = useState(false);
  const [value3l, setValue3l] = useState(null);
  const [items3l, setItems3l] = useState([
    { label: "Dion", value: "Dion" },
    { label: "Sakina", value: "Sakina" },
    { label: "JoclaireAG", value: "JoclaireAG" },
    { label: "fhamidAG", value: "fhamidAG" },
    { label: "yhamidAG", value: "yhamidAG" },
    { label: "Anastasia", value: "Anastasia" },
    { label: "Yasser", value: "Yasser" },
    { label: "Aldrin", value: "Aldrin" },
    { label: "joclaire_mgmt_units", value: "joclaire_mgmt_units" },
    { label: "Anthony", value: "Anthony" },
    { label: "bahaa", value: "bahaa" },
    { label: "jawharacsd", value: "jawharacsd" },
    { label: "oldleads", value: "oldleads" },
    { label: "aldrinag", value: "aldrinag" },
    { label: "Victoria", value: "Victoria" },
  ]);

  const handleAgentValueChangel = (value) => {
    setValue3l(value);
  };

  const [open4flead, setOpen4flead] = useState(false);
  const [value4flead, setValue4flead] = useState(null);
  const [items4flead, setItems4flead] = useState([
    { label: "Month", value: "months" },
    { label: "Week", value: "weeks" },
    { label: "Days", value: "days" },
  ]);

  const [openlead, setOpenlead] = useState(false);
  const [valuelead, setValuelead] = useState(null);
  const [itemslead, setItemslead] = useState([
    { label: "All", value: "all" },
    { label: "Whatsapp", value: "Whatsapp" },
    { label: "Facebook", value: "Facebook" },
    { label: "Google", value: "Google" },
  ]);

  // Tciket
  const [open4ticket, setOpen4ticket] = useState(false);
  const [value4ticket, setValue4ticket] = useState(null);
  const [items4ticket, setItems4ticket] = useState([{ label: "All", value: 1 }]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://tvh.flexion.ae:9091/get_ticket_list_values_api?data=status&APIKey=216bb413-8022-416e-83cf-aad38748d724");

        if (!response.ok) {
          throw new Error("Failed to fetch dropdown values");
        }

        const data = await response.json();

        // console.log("\n\n\n\n\n\n\n\n\n Response from list of status ticket dropdown", data);

        const apiDropdownValues = data.map((item) => ({
          label: item.NAME,
          value: item.ID,
        }));

        setItems4ticket([...items4ticket, ...apiDropdownValues]);
      } catch (error) {
        console.error("Error fetching dropdown values:", error.message);
      }
    };

    fetchData();
  }, []);
  const handleTicketValueChange = (value) => {
    setValue4ticket(value);
  };

  const [open4fticket, setOpen4fticket] = useState(false);
  const [value4fticket, setValue4fticket] = useState(null);
  const [items4fticket, setItems4fticket] = useState([{ label: "All", value: "all" }]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://tvh.flexion.ae:9091/get_ticket_list_values_api?data=assign&APIKey=216bb413-8022-416e-83cf-aad38748d724");

        if (!response.ok) {
          throw new Error("Failed to fetch dropdown values");
        }

        const data = await response.json();

        // console.log("\n\n\n\n\n\n\n\n\n Response from list of status ticket dropdown", data);

        const apiDropdownValues = data.map((item) => ({
          label: item.FIRST_NAME,
          value: item.ID,
        }));

        setItems4fticket([...items4fticket, ...apiDropdownValues]);
      } catch (error) {
        console.error("Error fetching dropdown values:", error.message);
      }
    };

    fetchData();
  }, []);
  const handleTicketValueChange2 = (value) => {
    setValue4fticket(value);
  };

  const [openticket, setOpenticket] = useState(false);
  const [valueticket, setValueticket] = useState(null);
  const [itemsticket, setItemsticket] = useState([{ label: "All", value: "all" }]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://tvh.flexion.ae:9091/get_ticket_list_values_api?data=source&APIKey=216bb413-8022-416e-83cf-aad38748d724");

        if (!response.ok) {
          throw new Error("Failed to fetch dropdown values");
        }

        const data = await response.json();

        // console.log("\n\n\n\n\n\n\n\n\n Response from list of status ticket dropdown", data);

        const apiDropdownValues = data.map((item) => ({
          label: item.NAME,
          value: item.ID,
        }));

        setItemsticket([...itemsticket, ...apiDropdownValues]);
      } catch (error) {
        console.error("Error fetching dropdown values:", error.message);
      }
    };

    fetchData();
  }, []);
  const handleTicketValueChange3 = (value) => {
    setValueticket(value);
  };

  const [opentickettime, setOpentickettime] = useState(false);
  const [valuetickettime, setValuetickettime] = useState(null);
  const [itemstickettime, setItemstickettime] = useState([
    { label: "Days", value: "days" },
    { label: "Months", value: "months" },
    { label: "Weeks", value: "weeks" },
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
    return (
      value !== null ||
      value3 !== null ||
      value3l !== null ||
      value4 !== null ||
      valuei !== null ||
      value4i !== null ||
      value4f !== null ||
      valuec !== null ||
      value4c !== null ||
      value4fc !== null ||
      valued !== null ||
      value4d !== null ||
      value4fd !== null ||
      value4su !== null ||
      valuedd !== null ||
      value4cancel !== null ||
      value4fcancel !== null ||
      valuecancel !== null ||
      valuedcancel !== null ||
      value4ticket !== null ||
      value4fticket !== null ||
      valueticket !== null ||
      value4lead !== null ||
      value4flead !== null ||
      valuelead !== null ||
      valuetickettime !== null
    );
  };

  // Dropdown of agents
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);

  //       const response = await fetch(`${Url}leads_list_api?userid=${token}`);
  //       const result = await response.json();

  //       const agentNamesFromApi = result.data[1].map((agent) => ({
  //         label: agent.LOGIN_NAME,
  //         value: agent.ID,
  //       }));

  //       const agentNames = [...agentNamesFromApi];

  //       setAgents(agentNames);
  //     } catch (error) {
  //       console.error("\n\n\n\n\n\n\n\n\nError fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleClearButtonPress = () => {
    setValue(null);
    setValuei(null);
    setValue3(null);
    setValue3l(null);
    setValue4(null);
    setValue4i(null);
    setValue4f(null);
    setValuec(null);
    setValue4c(null);
    setValue4fc(null);
    setValued(null);
    setValue4d(null);
    setValue4fd(null);
    setValue4su(null);
    setValuedd(null);
    setValue4cancel(null);
    setValue4fcancel(null);
    setValuecancel(null);
    setValuedcancel(null);
    setValue4ticket(null);
    setValue4fticket(null);
    setValueticket(null);
    setValue4lead(null);
    setValue4flead(null);
    setValuelead(null);
    setValuetickettime(null);
  };

  // Sales Data
  const [totalSalesValue, setTotalSalesValue] = useState(0);
  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${Url}get_sales_data_by_date_api?date_type=${value4 || "days"}&unit_type=${value4su || "all"}&USER_INFO_ID=${token}&building_type=${value || "all"}&agent_type=${
          value3 || "all"
        }&APIKey=216bb413-8022-416e-83cf-aad38748d724`;
        const response = await fetch(url);
        const result = await response.json();

        const totalSalesValue = result.reduce((sum, entry) => sum + entry.TOTAL_SALE_VALUE, 0);
        // console.log(totalSalesValue);
        setTotalSalesValue(totalSalesValue);

        const lastFiveResponses = result.slice(-6);
        // console.log("\n\n\n\n\n\n\n\n\n\n\nThis is the response from sale graph api", result);
        setLastFiveResponses(lastFiveResponses);

        const totalSales = result.reduce((sum, entry) => sum + entry.TOTAL_SALES, 0);

        const formattedData = {
          labels: [
            ...lastFiveResponses.map((entry) => {
              let label;
              if (value4 === "weeks") {
                label = formatDateString(entry.WEEK_START);
              } else {
                const date = new Date(entry.REPORT_DATE);
                label = `${date.getDate()}-${date.toLocaleString("default", { month: "short" })}-${date.getFullYear().toString().substr(-2)}`;
              }

              // Replace "31-Dec-40" with "All"
              return label === "31-Dec-40" ? "All" : label;
            }),
          ],
          datasets: [
            {
              data: [...lastFiveResponses.map((entry) => entry.TOTAL_SALES)],
            },
          ],
        };
        setSalesData(formattedData);
        // console.log("\n\n\n\n\n\n\n\n\nAPI Response for sale graph:", formattedData);
      } catch (error) {
        console.error("\n\n\n\n\n\n\n\n\nError fetching data:", error);
      }
    };

    fetchData();
  }, [value, value3, value4, value4su]);

  // Inventory Data
  const [totalInventoryValue, setTotalInventoryValue] = useState(0);
  const [inventoryData, setInventoryData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${Url}get_inventory?tower=${valuei || "all"}&unit=${value4i || "all"}&APIKey=216bb413-8022-416e-83cf-aad38748d724`;
        const response = await fetch(url);
        const result = await response.json();

        // console.log("\n\n\n\n\n\n\n\n\n\n\n Inventory Data", result);
        const totalInventoryValue = result.reduce((sum, entry) => sum + entry.SALE_VALUE, 0);
        // console.log("\n\n\n\n\n\n\n\n\n\nTotal inventory value", totalInventoryValue);
        setTotalInventoryValue(totalInventoryValue);
        const filteredResult = value4f ? result.filter((entry) => entry.FLOOR === value4f) : result;

        const labelCounts = {};
        filteredResult.forEach((entry) => {
          const label = entry.UNIT_SPECS_NAME;
          labelCounts[label] = (labelCounts[label] || 0) + 1;
        });

        // Add a new entry for "All" with the sum of all label counts
        const allCount = Object.values(labelCounts).reduce((sum, count) => sum + count, 0);
        labelCounts.All = allCount;

        const formattedData = {
          labels: Object.keys(labelCounts),
          datasets: [
            {
              data: Object.values(labelCounts),
            },
          ],
        };

        const availableFloors = getAvailableFloors(result);
        const availableFloorItems = availableFloors.map((floor) => ({ label: floor.toString(), value: floor.toString() }));

        setItems4f(availableFloorItems);
        setLastFiveResponsesi(filteredResult);
        setInventoryData(formattedData);
        // console.log("\n\n\n\n\n\n\n\n\nAPI Response for Inventory graph:", formattedData);
      } catch (error) {
        console.error("\n\n\n\n\n\n\n\n\nError fetching data:", error);
      }
    };

    fetchData();
  }, [valuei, value4i, value4f]);

  // Dues Data
  const [totalDuesValue, setTotalDuesValue] = useState(0);
  const [duesData, setDuesData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const [result, setResult] = useState([]);
  const barLabels = ["0-30", "31-60", "61-90", "91-120", "120+"];

  const calculateSaleValueForCategory = (category, data) => {
    const categoryIndex = barLabels.indexOf(category);
    const filteredData = data.filter((entry) => {
      const outstandingDays = entry.OUTSTANDING_DAYS;

      if (categoryIndex === 0 && outstandingDays <= 30) {
        return true;
      } else if (categoryIndex === 1 && outstandingDays <= 61) {
        return true;
      } else if (categoryIndex === 2 && outstandingDays <= 91) {
        return true;
      } else if (categoryIndex === 3 && outstandingDays <= 121) {
        return true;
      } else if (categoryIndex === 4 && outstandingDays > 120) {
        return true;
      }

      return false;
    });

    if (filteredData.length === 0) {
      return ""; // or return some default value
    }

    const saleValue = filteredData.reduce((sum, entry) => sum + entry.INV_BALANCE, 0);
    return Number(saleValue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${Url}get_due_list_api?property=${value4d || "all"}&customer=${value4fd || "all"}&unit=${valued || "all"}&document=${
          valuedd || "all"
        }&APIKey=216bb413-8022-416e-83cf-aad38748d724`;

        const response = await fetch(url);
        const result = await response.json();
        setResult(result);
        // console.log("\n\n\n\n\n\n\n\n\n\n\nDues Data", result);

        const totalDuesValue = result.reduce((sum, entry) => sum + entry.INV_BALANCE, 0);
        // console.log("\n\n\n\n\n\n\n\n\n\nTotal Dues value", totalDuesValue);

        setTotalDuesValue(totalDuesValue);

        const filteredResult = value4f ? result.filter((entry) => entry.FLOOR === value4f) : result;

        // Hardcoded labels for the bars

        // Initialize counts for each bar
        const barCounts = [0, 0, 0, 0, 0];

        filteredResult.forEach((entry) => {
          const outstandingDays = entry.OUTSTANDING_DAYS;

          if (outstandingDays <= 30) {
            barCounts[0]++;
          } else if (outstandingDays <= 60) {
            barCounts[1]++;
          } else if (outstandingDays <= 90) {
            barCounts[2]++;
          } else if (outstandingDays <= 120) {
            barCounts[3]++;
          } else {
            barCounts[4]++;
          }
        });

        const formattedData = {
          labels: barLabels,
          datasets: [
            {
              data: barCounts,
            },
          ],
        };

        setDuesData(formattedData);
        // console.log("\n\n\n\n\n\n\n\n\nAPI Response for Dues graph:", formattedData);
      } catch (error) {
        console.error("\n\n\n\n\n\n\n\n\nError fetching data:", error);
      }
    };

    fetchData();
  }, [value4d, value4fd, valued, valuedd]);

  // Collection Data
  const [totalCollectionValue, setTotalCollectionValue] = useState(0);
  const [collectionData, setCollectionData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${Url}get_receipt_data?dt=${value4c || "months"}&mop=${value4fc || "all"}&cs=${valuec || "all"}&APIKey=216bb413-8022-416e-83cf-aad38748d724`;
        const response = await fetch(url);
        const result = await response.json();
        const totalCollectionValue = result.reduce((sum, entry) => sum + entry.COLLECTION, 0);
        setTotalCollectionValue(totalCollectionValue);
        // Get the last 5 responses
        const lastFiveResponses = result.slice(-5);
        // console.log("\n\n\n\n\n\n\n\n\n\n\nThis is the response from collection graph api", result);
        setLastFiveResponsesc(lastFiveResponses);

        const formattedData = {
          labels: lastFiveResponses.map((entry) => {
            let label;
            if (value4c === "weeks") {
              label = formatDateString(entry.WEEK_START);
            } else if (value4c === "days") {
              label = formatDateString(entry.DAYS);
            } else {
              label = formatDateString(entry.MONTHS);
            }

            // Replace "31-Dec-40" with "All"
            return label === "31-Dec-40" ? "All" : label;
          }),
          datasets: [
            {
              data: lastFiveResponses.map((entry) => Math.ceil(entry.COLLECTION)),
            },
          ],
        };
        setCollectionData(formattedData);
        // console.log("\n\n\n\n\n\n\n\n\nAPI Response for collection graph:", formattedData);
      } catch (error) {
        // console.error("\n\n\n\n\n\n\n\n\nError fetching data:", error);
      }
    };

    fetchData();
  }, [valuec, value4c, value4fc]);

  // lead Data
  const [totalLeads, setTotalLeads] = useState(0);
  const [loadingLead, setLoadingLead] = useState(true);
  const [progress, setProgress] = useState(0);

  const [leadChartData, setLeadChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  useEffect(() => {
    const makeApiRequest = async () => {
      try {
        setLoadingLead(true);

        const response = await axios.get(`${Url}leads_list_api?userid=${token}`);
        const leadData = response.data.data[0];

        if (!Array.isArray(leadData) || leadData.length === 0) {
          console.error("Lead data is not valid:", leadData);
          return;
        }

        console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nLead Data", leadData);

        const currentDate = new Date();

        let lastFiveDates = [];

        if (value4flead === "days") {
          // Calculate the last five days
          lastFiveDates = Array.from({ length: 5 }, (_, index) => {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() - index);
            return date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
          });
        } else if (value4flead === "weeks") {
          // Calculate the first date of last five weeks
          lastFiveDates = Array.from({ length: 5 }, (_, index) => {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() - index * 7);
            const firstDayOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
            return firstDayOfWeek.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
          });
        } else {
          // Default: Calculate the last five months
          lastFiveDates = Array.from({ length: 5 }, (_, index) => {
            const month = currentDate.getMonth() - index + 1;
            const year = currentDate.getFullYear();
            return `${month < 10 ? "0" : ""}${month}/${year}`;
          });
        }

        const filteredLeads = leadData.filter((lead) => {
          if (
            lead &&
            lead.CREATED_ON &&
            (!value4lead || value4lead === "all" || lead.LEAD_STATUS === value4lead) &&
            !["LOST", "DEAL", "JUNK"].includes(lead.LEAD_STATUS) &&
            (!value3l || lead.AGENT === value3l)
          ) {
            const leadDateComponents = lead.CREATED_ON.split("/");
            const leadMonthYear = `${leadDateComponents[1].padStart(2, "0")}/${leadDateComponents[2]}`;

            if (value4flead === "days" || value4flead === "weeks") {
              const formattedLeadDate = `${leadDateComponents[0].padStart(2, "0")}/${leadDateComponents[1].padStart(2, "0")}/${leadDateComponents[2]}`;
              console.log("Formatted Lead Date here:", formattedLeadDate);
              console.log("Last five dates:", lastFiveDates);
              console.log("Includes:", lastFiveDates.includes(formattedLeadDate));
              return lastFiveDates.includes(formattedLeadDate);
            } else {
              console.log("Lead Month/Year:", leadMonthYear);
              console.log("Last five dates:", lastFiveDates);
              console.log("Includes:", lastFiveDates.includes(leadMonthYear));
              return lastFiveDates.includes(leadMonthYear);
            }
          }
          return false;
        });
        console.log("Filtered Leads:", filteredLeads);

        console.log("Selected Agent Label:", value3l ? value3l : "All Agents");

        const monthCounts = lastFiveDates.reduce((counts, month) => {
          const count = filteredLeads.filter((lead) => {
            if (lead && lead.CREATED_ON) {
              const [leadDay, leadMonth, leadYear] = lead.CREATED_ON.split("/");
              const formattedLeadMonth = `${leadMonth.padStart(2, "0")}/${leadYear}`;
              return month === formattedLeadMonth;
            }
            return false;
          }).length;
          counts[month] = count;
          return counts;
        }, {});

        const allCount = lastFiveDates.reduce((sum, month) => {
          const count = monthCounts[month] || 0;
          return sum + count;
        }, 0);
        monthCounts.All = allCount;

        console.log("Month Counts:", monthCounts);

        const formattedLeadData = {
          labels: [...lastFiveDates, "All"],
          datasets: [
            {
              data: Object.values(monthCounts),
            },
          ],
        };

        // Set state
        setTotalLeads(allCount);
        setLeadChartData(formattedLeadData);
        console.log("Formatted Response for Lead graph:", formattedLeadData);
      } catch (error) {
        console.error("Error fetching lead data:", error);
      } finally {
        setLoadingLead(false);
        setProgress(0);
      }
    };

    makeApiRequest();
  }, [valuelead, value4lead, value4flead, value3l]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 0.9 ? 1 : prev + 0.01));
    }, 250);

    return () => clearInterval(interval);
  }, [valuelead, value4lead, value4flead, value3, loadingLead]);

  // Ticket Data
  const [ticketData, setTicketData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const [lastFiveResponsesTickets, setLastFiveResponsesTickets] = useState([]);

  const [itemsTs, setItemsTs] = useState([]);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.toLocaleString("default", { month: "short" })}-${date.getFullYear().toString().substr(-2)}`;
  };

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const ticketUrl = `http://tvh.flexion.ae:9095/get_ticket_list_api?dt=${valuetickettime || "days"}&ts=${value4ticket || 1}&assign=${value4fticket || "all"}&source=${
          valueticket || "all"
        }&APIKey=216bb413-8022-416e-83cf-aad38748d724`;
        const ticketResponse = await fetch(ticketUrl);
        const ticketResult = await ticketResponse.json();
        // console.log("\n\n\n\n\n\n\n\n\nTicket graph api response", ticketResult);

        const latestFiveResponses = ticketResult.slice(-6);

        setLastFiveResponsesTickets(latestFiveResponses);

        const allCount = ticketResult.reduce((sum, entry) => sum + entry.TOTAL_TICKETS, 0);

        let formattedTicketData = {};
        let labelKey = "";

        if (valuetickettime === "months") {
          formattedTicketData = {
            labels: latestFiveResponses.map((entry) => {
              let label = formatDateString(entry.MONTHS);
              return label === "31-Dec-40" ? "All" : label;
            }),
            datasets: [
              {
                data: latestFiveResponses.map((entry) => entry.TOTAL_TICKETS),
              },
            ],
          };
          labelKey = "MONTHS";
        } else if (valuetickettime === "weeks") {
          formattedTicketData = {
            labels: latestFiveResponses.map((entry) => {
              let label = formatDateString(entry.WEEK_START);
              return label === "31-Dec-40" ? "All" : label;
            }),
            datasets: [
              {
                data: latestFiveResponses.map((entry) => entry.TOTAL_TICKETS),
              },
            ],
          };
          labelKey = "WEEK_START";
        } else {
          formattedTicketData = {
            labels: latestFiveResponses.map((entry) => {
              let label = formatDateString(entry.REPORT_DATE);
              return label === "31-Dec-40" ? "All" : label;
            }),
            datasets: [
              {
                data: latestFiveResponses.map((entry) => entry.TOTAL_TICKETS),
              },
            ],
          };
          labelKey = "REPORT_DATE";
        }

        const availableTimePeriods = latestFiveResponses.map((entry) => ({
          label: formatDateString(entry[labelKey]),
          value: entry[labelKey].toString(),
        }));

        setItemsTs(availableTimePeriods);
        setTicketData(formattedTicketData);
      } catch (error) {
        console.error("\n\n\n\n\n\n\n\n\nError fetching ticket data:", error);
      }
    };

    fetchTicketData();
  }, [valuetickettime, value4ticket, value4fticket, valueticket]);

  return (
    <ImageBackground source={ICONS.bgImg} style={styles.container}>
      <SafeAreaView style={styles.main}>
        <BackButton navigation={navigation} label="Chart Details" />
        <ScrollView style={{ width: "100%" }}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", marginTop: RFPercentage(2) }}>
              {isAnyDropdownSelected() && (
                <TouchableOpacity onPress={handleClearButtonPress} activeOpacity={0.8} style={{ flexDirection: "row", position: "absolute", right: 0 }}>
                  <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.1), fontFamily: FONTS.Medium }}>Clear</Text>
                  <MaterialCommunityIcons name="filter-remove-outline" style={{ marginLeft: RFPercentage(0.5), fontSize: RFPercentage(3) }} color={COLORS.boldText} />
                </TouchableOpacity>
              )}
            </View>

            {/* Sale Dropdown */}
            {title === "Sale" && (
              <>
                <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", marginTop: RFPercentage(1) }}>
                  <View style={{ width: "34%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                    {/* Dropdown1 */}
                    <View style={styles.dropDownView}>
                      <DropDownPicker
                        placeholder="Tower"
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
                        placeholder="Agent"
                        searchable={true}
                        searchPlaceholder="Search..."
                        placeholderStyle={{ color: COLORS.normalText }}
                        style={{
                          borderColor: COLORS.boldText,
                          borderWidth: RFPercentage(0.1),
                          backgroundColor: "#f2f2f2",
                        }}
                        dropDownContainerStyle={{
                          maxHeight: RFPercentage(24),
                          backgroundColor: "#0000",
                          borderColor: COLORS.boldText,
                          borderWidth: RFPercentage(0.1),
                        }}
                        open={open3}
                        value={value3}
                        items={items3}
                        setOpen={setOpen3}
                        setValue={setValue3}
                        setItems={setItems3}
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

                <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", marginTop: open ? RFPercentage(28) : RFPercentage(5) }}>
                  <View style={{ position: "absolute", left: 0, width: "34%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                    {/* Dropdown3 */}
                    <View style={styles.dropDownView}>
                      <DropDownPicker
                        placeholder="Unit"
                        placeholderStyle={{ color: COLORS.normalText }}
                        style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                        dropDownContainerStyle={{ maxHeight: RFPercentage(24), backgroundColor: "#0000", borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1) }}
                        open={open4su}
                        value={value4su}
                        items={items4su}
                        setOpen={setOpen4su}
                        setValue={setValue4su}
                        setItems={setItems4su}
                        labelStyle={{
                          fontWeight: "500",
                          color: COLORS.dark,
                          fontSize: RFPercentage(1.8),
                        }}
                      />
                    </View>
                  </View>
                </View>
              </>
            )}

            {/* Inventory dropdowns */}
            {title === "Inventory" && (
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
                      open={openi}
                      value={valuei}
                      items={itemsi}
                      setOpen={setOpeni}
                      setValue={setValuei}
                      setItems={setItemsi}
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
                      placeholder="All Unit"
                      placeholderStyle={{ color: COLORS.normalText }}
                      style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                      dropDownContainerStyle={{ maxHeight: RFPercentage(24), backgroundColor: "#0000", borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1) }}
                      open={open4i}
                      value={value4i}
                      items={items4i}
                      setOpen={setOpen4i}
                      setValue={setValue4i}
                      setItems={setItems4i}
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
                      placeholder="Floor"
                      placeholderStyle={{ color: COLORS.normalText }}
                      style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                      dropDownContainerStyle={{ maxHeight: RFPercentage(24), backgroundColor: "#0000", borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1) }}
                      open={open4f}
                      value={value4f}
                      items={items4f}
                      setOpen={setOpen4f}
                      setValue={setValue4f}
                      setItems={setItems4f}
                      labelStyle={{
                        fontWeight: "500",
                        color: COLORS.dark,
                        fontSize: RFPercentage(1.8),
                      }}
                    />
                  </View>
                </View>
              </View>
            )}

            {/* Collection dropdowns */}
            {title === "Collection" && (
              <>
                <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", marginTop: RFPercentage(1) }}>
                  <View style={{ width: "34%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                    {/* Dropdown1 */}
                    <View style={styles.dropDownView}>
                      <DropDownPicker
                        placeholder="Months"
                        placeholderStyle={{ fontSize: RFPercentage(1.7), color: COLORS.normalText }}
                        style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                        dropDownContainerStyle={{ maxHeight: RFPercentage(24), backgroundColor: "#0000", borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1) }}
                        open={open4c}
                        value={value4c}
                        items={items4c}
                        setOpen={setOpen4c}
                        setValue={setValue4c}
                        setItems={setItems4c}
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
                        placeholder="Mode..."
                        placeholderStyle={{ fontSize: RFPercentage(1.7), color: COLORS.normalText }}
                        style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                        dropDownContainerStyle={{ maxHeight: RFPercentage(24), backgroundColor: "#0000", borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1) }}
                        open={open4fc}
                        value={value4fc}
                        items={items4fc}
                        setOpen={setOpen4fc}
                        setValue={setValue4fc}
                        setItems={setItems4fc}
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
                        placeholder="Payme..."
                        placeholderStyle={{ fontSize: RFPercentage(1.7), color: COLORS.normalText }}
                        style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                        dropDownContainerStyle={{
                          maxHeight: RFPercentage(24),
                          backgroundColor: "#0000",
                          borderColor: COLORS.boldText,
                          borderWidth: RFPercentage(0.1),
                        }}
                        open={openc}
                        value={valuec}
                        items={itemsc}
                        setOpen={setOpenc}
                        setValue={setValuec}
                        setItems={setItemsc}
                        labelStyle={{
                          fontWeight: "500",
                          color: COLORS.dark,
                          fontSize: RFPercentage(1.8),
                        }}
                      />
                    </View>
                  </View>
                </View>
              </>
            )}

            {/* Dues API */}
            {title === "Dues" && (
              <>
                <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", marginTop: RFPercentage(1) }}>
                  <View style={{ width: "34%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                    {/* Dropdown1 */}
                    <View style={styles.dropDownView}>
                      <DropDownPicker
                        placeholder="Prope..."
                        placeholderStyle={{ fontSize: RFPercentage(1.7), color: COLORS.normalText }}
                        style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                        dropDownContainerStyle={{ maxHeight: RFPercentage(16), backgroundColor: "#0000", borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1) }}
                        open={open4d}
                        value={value4d}
                        items={items4d}
                        setOpen={setOpen4d}
                        setValue={setValue4d}
                        setItems={setItems4d}
                        labelStyle={{
                          fontWeight: "500",
                          color: COLORS.dark,
                        }}
                      />
                    </View>
                  </View>

                  <View style={{ width: "34%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                    {/* Dropdown2 */}
                    <View style={styles.dropDownView}>
                      <DropDownPicker
                        placeholder="Custo..."
                        searchable={true} // Enable search
                        searchPlaceholder="Search..."
                        placeholderStyle={{ fontSize: RFPercentage(1.7), color: COLORS.normalText }}
                        style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                        dropDownContainerStyle={{ maxHeight: RFPercentage(24), backgroundColor: "#0000", borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1) }}
                        open={open4fd}
                        value={value4fd}
                        items={items4fd}
                        setOpen={setOpen4fd}
                        setValue={setValue4fd}
                        setItems={setItems4fd}
                        labelStyle={{
                          fontWeight: "500",
                          color: COLORS.dark,
                        }}
                      />
                    </View>
                  </View>

                  <View style={{ width: "34%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                    {/* Dropdown3 */}
                    <View style={styles.dropDownView}>
                      <DropDownPicker
                        placeholder="Unit"
                        searchable={true} // Enable search
                        searchPlaceholder="Search unit..."
                        placeholderStyle={{ fontSize: RFPercentage(1.7), color: COLORS.normalText }}
                        style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                        dropDownContainerStyle={{
                          maxHeight: RFPercentage(24),
                          backgroundColor: "#0000",
                          borderColor: COLORS.boldText,
                          borderWidth: RFPercentage(0.1),
                        }}
                        open={opend}
                        value={valued}
                        items={itemsd}
                        setOpen={setOpend}
                        setValue={setValued}
                        setItems={setItemsd}
                        labelStyle={{
                          fontWeight: "500",
                          color: COLORS.dark,
                        }}
                      />
                    </View>
                  </View>
                </View>

                <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", marginTop: open4d ? RFPercentage(20) : RFPercentage(5) }}>
                  <View style={{ position: "absolute", left: 0, width: "34%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                    {/* Dropdown4 */}
                    <View style={styles.dropDownView}>
                      <DropDownPicker
                        placeholder="Docum..."
                        placeholderStyle={{ fontSize: RFPercentage(1.7), color: COLORS.normalText }}
                        style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                        dropDownContainerStyle={{
                          maxHeight: RFPercentage(24),
                          backgroundColor: "#0000",
                          borderColor: COLORS.boldText,
                          borderWidth: RFPercentage(0.1),
                        }}
                        open={opendd}
                        value={valuedd}
                        items={itemsdd}
                        setOpen={setOpendd}
                        setValue={setValuedd}
                        setItems={setItemsdd}
                        labelStyle={{
                          fontWeight: "500",
                          color: COLORS.dark,
                        }}
                      />
                    </View>
                  </View>
                </View>
              </>
            )}

            {/* Cancellations API */}
            {title === "Cancellations" && (
              <>
                <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", marginTop: RFPercentage(1) }}>
                  <View style={{ width: "34%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                    {/* Dropdown1 */}
                    <View style={styles.dropDownView}>
                      <DropDownPicker
                        placeholder="Prope..."
                        placeholderStyle={{ fontSize: RFPercentage(1.7), color: COLORS.normalText }}
                        style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                        dropDownContainerStyle={{ maxHeight: RFPercentage(16), backgroundColor: "#0000", borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1) }}
                        open={open4cancel}
                        value={value4cancel}
                        items={items4cancel}
                        setOpen={setOpen4cancel}
                        setValue={setValue4cancel}
                        setItems={setItems4cancel}
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
                        placeholder="Custo..."
                        searchable={true} // Enable search
                        searchPlaceholder="Search..."
                        placeholderStyle={{ fontSize: RFPercentage(1.7), color: COLORS.normalText }}
                        style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                        dropDownContainerStyle={{ maxHeight: RFPercentage(24), backgroundColor: "#0000", borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1) }}
                        open={open4fcancel}
                        value={value4fcancel}
                        items={items4fcancel}
                        setOpen={setOpen4fcancel}
                        setValue={setValue4fcancel}
                        setItems={setItems4fcancel}
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
                        placeholder="Unit"
                        searchable={true} // Enable search
                        searchPlaceholder="Search unit..."
                        placeholderStyle={{ fontSize: RFPercentage(1.7), color: COLORS.normalText }}
                        style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                        dropDownContainerStyle={{
                          maxHeight: RFPercentage(24),
                          backgroundColor: "#0000",
                          borderColor: COLORS.boldText,
                          borderWidth: RFPercentage(0.1),
                        }}
                        open={opencancel}
                        value={valuecancel}
                        items={itemscancel}
                        setOpen={setOpencancel}
                        setValue={setValuecancel}
                        setItems={setItemscancel}
                        labelStyle={{
                          fontWeight: "500",
                          color: COLORS.dark,
                          fontSize: RFPercentage(1.8),
                        }}
                      />
                    </View>
                  </View>
                </View>

                <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", marginTop: open4cancel ? RFPercentage(20) : RFPercentage(5) }}>
                  <View style={{ position: "absolute", left: 0, width: "34%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                    {/* Dropdown4 */}
                    <View style={styles.dropDownView}>
                      <DropDownPicker
                        placeholder="Docum..."
                        placeholderStyle={{ fontSize: RFPercentage(1.7), color: COLORS.normalText }}
                        style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                        dropDownContainerStyle={{
                          maxHeight: RFPercentage(24),
                          backgroundColor: "#0000",
                          borderColor: COLORS.boldText,
                          borderWidth: RFPercentage(0.1),
                        }}
                        open={opendcancel}
                        value={valuedcancel}
                        items={itemsdcancel}
                        setOpen={setOpendcancel}
                        setValue={setValuedcancel}
                        setItems={setItemsdcancel}
                        labelStyle={{
                          fontWeight: "500",
                          color: COLORS.dark,
                          fontSize: RFPercentage(1.8),
                        }}
                      />
                    </View>
                  </View>
                </View>
              </>
            )}

            {/* Lead API */}
            {title === "Lead" && (
              <>
                <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", marginTop: RFPercentage(1) }}>
                  <View style={{ width: "34%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                    {/* Dropdown1 */}
                    <View style={styles.dropDownView}>
                      <DropDownPicker
                        placeholder="Status"
                        placeholderStyle={{ color: COLORS.normalText }}
                        style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                        dropDownContainerStyle={{ maxHeight: RFPercentage(16), backgroundColor: "#0000", borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1) }}
                        open={open4lead}
                        value={value4lead}
                        items={items4lead}
                        setOpen={setOpen4lead}
                        setValue={setValue4lead}
                        setItems={setItems4lead}
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
                        placeholder="Agent"
                        placeholderStyle={{ color: COLORS.normalText }}
                        style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                        dropDownContainerStyle={{ maxHeight: RFPercentage(24), backgroundColor: "#0000", borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1) }}
                        open={open3l}
                        loading={loading}
                        ActivityIndicatorComponent={({ color, size }) => <ActivityIndicator color={color} size={size} />}
                        value={value3l}
                        items={items3l}
                        setOpen={setOpen3l}
                        setValue={handleAgentValueChangel}
                        setItems={setItems3l}
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
                        dropDownContainerStyle={{
                          maxHeight: RFPercentage(24),
                          backgroundColor: "#0000",
                          borderColor: COLORS.boldText,
                          borderWidth: RFPercentage(0.1),
                        }}
                        open={open4flead}
                        value={value4flead}
                        items={items4flead}
                        setOpen={setOpen4flead}
                        setValue={setValue4flead}
                        setItems={setItems4flead}
                        labelStyle={{
                          fontWeight: "500",
                          color: COLORS.dark,
                          fontSize: RFPercentage(1.8),
                        }}
                      />
                    </View>
                  </View>
                </View>
                {/* <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", marginTop: open4lead ? RFPercentage(20) : RFPercentage(5) }}>
                  <View style={{ position: "absolute", left: 0, width: "34%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                    <View style={styles.dropDownView}>
                      <DropDownPicker
                        placeholder="Source"
                        searchable={true} // Enable search
                        searchPlaceholder="Search unit..."
                        placeholderStyle={{ color: COLORS.normalText }}
                        style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                        dropDownContainerStyle={{
                          maxHeight: RFPercentage(24),
                          backgroundColor: "#0000",
                          borderColor: COLORS.boldText,
                          borderWidth: RFPercentage(0.1),
                        }}
                        open={openlead}
                        value={valuelead}
                        items={itemslead}
                        setOpen={setOpenlead}
                        setValue={setValuelead}
                        setItems={setItemslead}
                        labelStyle={{
                          fontWeight: "500",
                          color: COLORS.dark,
                          fontSize: RFPercentage(1.8),
                        }}
                      />
                    </View>
                  </View>
                </View> */}
              </>
            )}

            {/* Ticket API */}
            {title === "Ticket" && (
              <>
                <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", marginTop: RFPercentage(1) }}>
                  <View style={{ width: "34%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                    {/* Dropdown1 */}
                    <View style={styles.dropDownView}>
                      <DropDownPicker
                        placeholder="Status"
                        placeholderStyle={{ color: COLORS.normalText }}
                        style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                        dropDownContainerStyle={{ maxHeight: RFPercentage(20), backgroundColor: "#0000", borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1) }}
                        open={open4ticket}
                        value={value4ticket}
                        items={items4ticket}
                        setOpen={setOpen4ticket}
                        setValue={handleTicketValueChange}
                        setItems={setItems4ticket}
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
                        placeholder="Assign"
                        searchable={true} // Enable search
                        searchPlaceholder="Search..."
                        placeholderStyle={{ color: COLORS.normalText }}
                        style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                        dropDownContainerStyle={{ maxHeight: RFPercentage(24), backgroundColor: "#0000", borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1) }}
                        open={open4fticket}
                        value={value4fticket}
                        items={items4fticket}
                        setOpen={setOpen4fticket}
                        setValue={handleTicketValueChange2}
                        setItems={setItems4fticket}
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
                        placeholder="Source"
                        searchable={true} // Enable search
                        searchPlaceholder="Search..."
                        placeholderStyle={{ color: COLORS.normalText }}
                        style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                        dropDownContainerStyle={{
                          maxHeight: RFPercentage(24),
                          backgroundColor: "#0000",
                          borderColor: COLORS.boldText,
                          borderWidth: RFPercentage(0.1),
                        }}
                        open={openticket}
                        value={valueticket}
                        items={itemsticket}
                        setOpen={setOpenticket}
                        setValue={handleTicketValueChange3}
                        setItems={setItemsticket}
                        labelStyle={{
                          fontWeight: "500",
                          color: COLORS.dark,
                          fontSize: RFPercentage(1.8),
                        }}
                      />
                    </View>
                  </View>
                </View>

                <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", marginTop: open4ticket ? RFPercentage(26) : RFPercentage(5) }}>
                  <View style={{ position: "absolute", left: 0, width: "34%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                    {/* Dropdown4 */}
                    <View style={styles.dropDownView}>
                      <DropDownPicker
                        placeholder="Days"
                        placeholderStyle={{ color: COLORS.normalText }}
                        style={{ borderColor: COLORS.boldText, borderWidth: RFPercentage(0.1), backgroundColor: "#f2f2f2" }}
                        dropDownContainerStyle={{
                          maxHeight: RFPercentage(24),
                          backgroundColor: "#0000",
                          borderColor: COLORS.boldText,
                          borderWidth: RFPercentage(0.1),
                        }}
                        open={opentickettime}
                        value={valuetickettime}
                        items={itemstickettime}
                        setOpen={setOpentickettime}
                        setValue={setValuetickettime}
                        setItems={setItemstickettime}
                        labelStyle={{
                          fontWeight: "500",
                          color: COLORS.dark,
                          fontSize: RFPercentage(1.8),
                        }}
                      />
                    </View>
                  </View>
                </View>
              </>
            )}
            {/* Graph */}
            <View
              style={{
                marginTop:
                  open ||
                  open3 ||
                  open3l ||
                  open4 ||
                  openi ||
                  open4i ||
                  open4f ||
                  openc ||
                  open4c ||
                  open4fc ||
                  opend ||
                  open4d ||
                  open4fd ||
                  open4su ||
                  opendd ||
                  open4cancel ||
                  open4fcancel ||
                  opencancel ||
                  opendcancel ||
                  open4ticket ||
                  open4fticket ||
                  openticket ||
                  open4lead ||
                  open4flead ||
                  openlead ||
                  opentickettime
                    ? RFPercentage(26)
                    : RFPercentage(4),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.2), fontFamily: FONTS.Medium }}>{title}</Text>
            </View>

            {title === "Sale" && (
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
                verticalLabelRotation={20}
              />
            )}

            {title === "Inventory" && (
              <BarChart
                style={{ marginTop: RFPercentage(2), borderRadius: 16 }}
                data={inventoryData}
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
                verticalLabelRotation={28}
              />
            )}

            {title === "Collection" && (
              <BarChart
                style={{ marginTop: RFPercentage(2), borderRadius: 16 }}
                data={collectionData}
                width={SCREEN_WIDTH * 0.9}
                height={300}
                chartConfig={{
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(10, 150, 44, ${opacity})`,
                  labelColor: () => `rgba(0, 0, 0, 1)`,
                }}
                fromZero={true}
                showValuesOnTopOfBars={true}
                verticalLabelRotation={28}
              />
            )}

            {title === "Dues" && (
              <BarChart
                style={{ marginTop: RFPercentage(2), borderRadius: 16 }}
                data={duesData}
                width={SCREEN_WIDTH * 0.9}
                height={300}
                chartConfig={{
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(10, 150, 44, ${opacity})`,
                  labelColor: () => `rgba(0, 0, 0, 1)`,
                }}
                fromZero={true}
                showValuesOnTopOfBars={true}
                verticalLabelRotation={28}
              />
            )}

            {title === "Lead" && (
              <>
                {loadingLead ? (
                  <View style={{ marginTop: RFPercentage(12), flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Progress.Circle progress={progress} size={80} thickness={5} color="#001448" showsText formatText={(progress) => `${Math.round(progress * 100)}%`} />
                    <Text style={{ marginTop: RFPercentage(1), color: COLORS.boldText, fontSize: RFPercentage(2), fontFamily: FONTS.Medium }}>Loading...</Text>
                  </View>
                ) : (
                  title === "Lead" && (
                    <BarChart
                      style={{ marginTop: RFPercentage(2), borderRadius: 16 }}
                      data={leadChartData}
                      width={SCREEN_WIDTH * 0.9}
                      height={300}
                      chartConfig={{
                        backgroundGradientFrom: "#ffffff",
                        backgroundGradientTo: "#ffffff",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(10, 150, 44, ${opacity})`,
                        labelColor: () => `rgba(0, 0, 0, 1)`,
                      }}
                      fromZero={true}
                      showValuesOnTopOfBars={true}
                      verticalLabelRotation={28}
                    />
                  )
                )}
              </>
            )}

            {title === "Ticket" && (
              <BarChart
                style={{ marginTop: RFPercentage(2), borderRadius: 16 }}
                data={ticketData}
                width={SCREEN_WIDTH * 0.9}
                height={300}
                chartConfig={{
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(10, 150, 44, ${opacity})`,
                  labelColor: () => `rgba(0, 0, 0, 1)`,
                }}
                fromZero={true}
                showValuesOnTopOfBars={true}
                verticalLabelRotation={28}
              />
            )}
          </View>

          {/* Sale Values */}
          {title === "Sale" && (
            <>
              <View style={{ marginTop: RFPercentage(3), justifyContent: "center", alignItems: "flex-start", width: "90%", alignSelf: "center" }}>
                <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.1), fontFamily: FONTS.Medium }}>Sale Values</Text>
              </View>

              {lastFiveResponses && lastFiveResponses.length > 0 ? (
                <>
                  {salesData.labels.map((label, index) => {
                    const entry = lastFiveResponses[index];

                    if (entry) {
                      const { REPORT_DATE, TOTAL_SALES, TOTAL_SALE_VALUE } = entry;

                      return (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            marginTop: !index == 1 ? RFPercentage(1.4) : RFPercentage(1.2),
                            justifyContent: "flex-start",
                            alignItems: "center",
                            width: "90%",
                            alignSelf: "center",
                          }}
                        >
                          <Text style={{ color: COLORS.normalText, fontSize: RFPercentage(2), fontFamily: FONTS.Medium }}>{label} :</Text>
                          <Text style={{ marginLeft: RFPercentage(1), color: COLORS.normalText, fontSize: RFPercentage(2.1), fontFamily: FONTS.Bold }}>
                            {Number(TOTAL_SALE_VALUE).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </Text>
                          <Text style={{ marginLeft: RFPercentage(1), color: COLORS.normalText, fontSize: RFPercentage(2), fontFamily: FONTS.Medium }}>({TOTAL_SALES})</Text>
                        </View>
                      );
                    }
                    return null;
                  })}
                </>
              ) : (
                <Text></Text>
              )}
            </>
          )}

          {title === "Inventory" && (
            <>
              <View style={{ marginTop: RFPercentage(3), justifyContent: "center", alignItems: "flex-start", width: "90%", alignSelf: "center" }}>
                <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.1), fontFamily: FONTS.Medium }}>Inventory Values</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: RFPercentage(1.5),
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "90%",
                  alignSelf: "center",
                }}
              >
                <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2), fontFamily: FONTS.Medium }}>All</Text>
                <Text style={{ marginLeft: RFPercentage(1), color: COLORS.normalText, fontSize: RFPercentage(2.1), fontFamily: FONTS.Bold }}>
                  {Number(totalInventoryValue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
              </View>
              {/* Sum for each bar unit type from api response inventoryData */}
              <View style={{ justifyContent: "center", alignItems: "flex-start", width: "90%", alignSelf: "center" }}>
                {["1 BHK", "2 BHK", "3 BHK", "STUDIO", "RETAIL"].map((unitType, index) => {
                  const totalSaleValue = lastFiveResponsesi.filter((entry) => entry.UNIT_SPECS_NAME === unitType).reduce((sum, entry) => sum + entry.SALE_VALUE, 0);

                  return (
                    <View key={unitType} style={{ marginTop: !index == 0 ? RFPercentage(2) : RFPercentage(1.5), justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                      <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2), fontFamily: FONTS.Medium }}>{unitType}:</Text>
                      <Text style={{ marginLeft: RFPercentage(1), color: COLORS.normalText, fontSize: RFPercentage(2.1), fontFamily: FONTS.Bold }}>
                        {Number(totalSaleValue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </>
          )}

          {title === "Dues" && (
            <>
              <View style={{ marginTop: RFPercentage(3), justifyContent: "center", alignItems: "flex-start", width: "90%", alignSelf: "center" }}>
                <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.1), fontFamily: FONTS.Medium }}>Dues Values</Text>
              </View>

              <View style={{ flexDirection: "row", marginTop: RFPercentage(1.5), justifyContent: "flex-start", alignItems: "center", width: "90%", alignSelf: "center" }}>
                <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2), fontFamily: FONTS.Medium }}>Total Dues Value:</Text>
                <Text style={{ marginLeft: RFPercentage(1), color: COLORS.normalText, fontSize: RFPercentage(2.1), fontFamily: FONTS.Bold }}>
                  {Number(totalDuesValue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
              </View>

              {duesData.labels.map((label, index) => {
                const count = duesData.datasets[0].data[index];
                const saleValue = calculateSaleValueForCategory(label, result);

                return (
                  <View key={index} style={{ marginTop: RFPercentage(1.2), width: "90%", justifyContent: "flex-start", alignItems: "center", alignSelf: "center", flexDirection: "row" }}>
                    <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2), fontFamily: FONTS.Medium }}>{label} :</Text>
                    <Text style={{ marginLeft: RFPercentage(1), color: COLORS.normalText, fontSize: RFPercentage(2.1), fontFamily: FONTS.Bold }}>{count}</Text>
                    {count > 0 && <Text style={{ marginLeft: RFPercentage(1), color: COLORS.normalText, fontSize: RFPercentage(2.1), fontFamily: FONTS.Bold }}>({saleValue})</Text>}
                  </View>
                );
              })}
            </>
          )}

          {title === "Collection" && (
            <>
              <View style={{ marginTop: RFPercentage(3), justifyContent: "center", alignItems: "flex-start", width: "90%", alignSelf: "center" }}>
                <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.1), fontFamily: FONTS.Medium }}>Collection Values</Text>
              </View>

              {collectionData.labels.map((label, index) => {
                const { REPORT_DATE, COLLECTION, MONTHS, DAYS, WEEK_START } = lastFiveResponsesc[index];

                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      marginTop: !index == 1 ? RFPercentage(1.4) : RFPercentage(1.2),
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: "90%",
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ color: COLORS.normalText, fontSize: RFPercentage(2), fontFamily: FONTS.Medium }}>{label} :</Text>
                    <Text style={{ marginLeft: RFPercentage(1), color: COLORS.normalText, fontSize: RFPercentage(2), fontFamily: FONTS.Bold }}>
                      {Number(COLLECTION).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  </View>
                );
              })}
            </>
          )}

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
