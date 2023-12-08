import ActionsType from "../utils/actions.type";
import axios from "axios";
import { SCREENS, Url } from "../../constants";
import { setLoader } from "../loader/loader.action";

export const setPayUrl = (list) => ({
  type: ActionsType.SET_PAY_URL,
  payload: list,
});

export const setBroker = (list) => ({
  type: ActionsType.SET_BROKER,
  payload: list,
});

export const setAgent = (list) => ({
  type: ActionsType.SET_AGENT,
  payload: list,
});

export const setPaymentPlan = (list) => ({
  type: ActionsType.SET_PAYMENT_PLAN,
  payload: list,
});

export const setUnitDetail = (list) => ({
  type: ActionsType.SET_UNIT_DETAIL,
  payload: list,
});

export const setCategoryList = (list) => ({
  type: ActionsType.SET_CATEGORIES_LIST,
  payload: list,
});

export const setModeList = (list) => ({
  type: ActionsType.SET_MODE_LIST,
  payload: list,
});

export const setBankList = (list) => ({
  type: ActionsType.SET_BANK_LIST,
  payload: list,
});

export const setReservationNoList = (list) => ({
  type: ActionsType.SET_RESERVATION_NO_LIST,
  payload: list,
});

export const setCustomersList = (list) => ({
  type: ActionsType.SET_CUSTOMERS_LIST,
  payload: list,
});

export const setReceiptsList = (list) => ({
  type: ActionsType.SET_RECEIPTS_LIST,
  payload: list,
});

export const setDuesCount = (list) => ({
  type: ActionsType.SET_DUES_COUNT,
  payload: list,
});

export const setCommissionList = (list) => ({
  type: ActionsType.SET_COMMISSION_LIST,
  payload: list,
});

export const setCityList1 = (list) => ({
  type: ActionsType.SET_CITY_LIST1,
  payload: list,
});

export const setCityList = (list) => ({
  type: ActionsType.SET_CITY_LIST,
  payload: list,
});

export const setCountryList = (list) => ({
  type: ActionsType.SET_COUNTRY_LIST,
  payload: list,
});

export const setUnitsCount = (list) => ({
  type: ActionsType.SET_UNITS_COUNT,
  payload: list,
});

export const setHomeList = (list) => ({
  type: ActionsType.SET_HOME_LIST,
  payload: list,
});

export const setCollections = (list) => ({
  type: ActionsType.SET_COLLECTIONS,
  payload: list,
});

export const setCustomerReceivables = (list) => ({
  type: ActionsType.SET_CUSTOMER_RECEIVABLES,
  payload: list,
});

export const setPropertyStats = (list) => ({
  type: ActionsType.SET_PROPERTY_STATS,
  payload: list,
});

export const setSaleTowerBStats = (list) => ({
  type: ActionsType.SET_SALE_TOWER_B_STATS,
  payload: list,
});
export const setSaleTowerAStats = (list) => ({
  type: ActionsType.SET_SALE_TOWER_A_STATS,
  payload: list,
});

export const setWeeklyTowerBStats = (list) => ({
  type: ActionsType.SET_WEEKLY_TOWER_B__STATS,
  payload: list,
});

export const setWeeklyTowerAStats = (list) => ({
  type: ActionsType.SET_WEEKLY_TOWER_A__STATS,
  payload: list,
});

export const setCustomerMasterStat = (list) => ({
  type: ActionsType.SET_CUSTOMER_MASTER_STATS,
  payload: list,
});

export const setBrokerStats = (list) => ({
  type: ActionsType.SET_BROKER_STATS,
  payload: list,
});

export const setCancelDataStats = (list) => ({
  type: ActionsType.SET_CANCEL_DATA_STATS,
  payload: list,
});

export const setReceiveableByUnit = (list) => ({
  type: ActionsType.SET_RECEIVEABLE_BY_UNIT,
  payload: list,
});

export const setCustomerReceivableList = (list) => ({
  type: ActionsType.SET_CUSTOMER_RECEIVABLE,
  payload: list,
});

export const setReceiptList = (list) => ({
  type: ActionsType.SET_RECEIPT_LIST,
  payload: list,
});

export const setGeneralData = (list) => ({
  type: ActionsType.SET_GENERAL_DATA,
  payload: list,
});

export const setReservationList = (list) => ({
  type: ActionsType.SET_RESERVATION_LIST,
  payload: list,
});

export const setWeeklyStats = (list) => ({
  type: ActionsType.SET_WEEKLY_STATS,
  payload: list,
});

export const setMonthlyStats = (list) => ({
  type: ActionsType.SET_MONTHLY_STATS,
  payload: list,
});

export const setSaleSummeryStats = (list) => ({
  type: ActionsType.SET_SALE_SUMMERY_STATS,
  payload: list,
});

export const getCustomerReceivables = () => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}get_pie_customer_Receivables`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setCustomerReceivables(response));
      })
      .catch((error) => {
        const err = error;
      });
  };
};

export const getCollections = () => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(
        `${Url}get_pie_oncollection`,
        // axios.get(`${Url}get_unidentified_customer_data`,
        { headers: headers },
      )
      .then((resp) => {
        let response = resp.data;
        dispatch(setCollections(response));
      })
      .catch((error) => {
        const err = error;
      });
  };
};

export const getPropertyStats = () => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}get_pie_chart_property`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setPropertyStats(response));
        // console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nTotal Units Count's API Res :", response.data.length);
      })
      .catch((error) => {
        const err = error;
        // console.log("getPropertyStats: ", err);
        dispatch(setLoader(false));
      });
  };
};

export const getReservationList = (id) => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };

    axios
      .get(`${Url}get_reservation_grid_api?user_info_id=${id}`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        console.log("getReservationList here ==============>: ", response.data.length);
        console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nHere is the total data response =========> ", resp.data);
        dispatch(setReservationList(response.data));
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;
        // console.log("getReservationList: ", err);
        dispatch(setLoader(false));
      });
  };
};

export const getWeeklyStats = () => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}get_pie_onweeklysale`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setWeeklyStats(response));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
      });
  };
};

export const getSaleTowerBStats = () => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}get_pie_onsaletowerb`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setSaleTowerBStats(response));
      })
      .catch((error) => {
        const err = error;

        dispatch(setLoader(false));
      });
  };
};

export const getSaleTowerAStats = () => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}get_pie_onsaletowera`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setSaleTowerAStats(response));
      })
      .catch((error) => {
        const err = error;

        dispatch(setLoader(false));
      });
  };
};

export const getWeeklyTowerBStats = () => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}get_pie_onweeklysaletowerb`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setWeeklyTowerBStats(response));
      })
      .catch((error) => {
        const err = error;

        dispatch(setLoader(false));
      });
  };
};

export const getWeeklyTowerAStats = () => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}get_pie_onweeklysaletowera`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setWeeklyTowerAStats(response));
      })
      .catch((error) => {
        const err = error;

        dispatch(setLoader(false));
      });
  };
};

export const getMonthlyStats = () => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}piechartonsaleDataAPI`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setMonthlyStats(response.percentage));
      })
      .catch((error) => {
        const err = error;

        dispatch(setLoader(false));
      });
  };
};

export const getSaleSummeryStats = () => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}get_pie_onsale`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setSaleSummeryStats(response));
      })
      .catch((error) => {
        const err = error;

        dispatch(setLoader(false));
      });
  };
};

export const getCancellationStats = () => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}get_cancelled_data_dashboard`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setCancelDataStats(response.data));
      })
      .catch((error) => {
        const err = error;

        dispatch(setLoader(false));
      });
  };
};

export const getBrokerStats = () => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}get_broker_master_data`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setBrokerStats(response));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
      });
  };
};

export const getCustomerMasterStats = () => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}get_customer_master_data`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setCustomerMasterStat(response));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
      });
  };
};

export const callGeneralApi = (data) => {
  const { STATUS, ORG_ID, ID } = data;
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    // axios.get(`${Url}View_reservation_formAPI?hdr_id=386&org_id=31&status=6`,
    axios
      .get(`${Url}View_Reservation_FormAPI?hdr_id=${ID}&org_id=${ORG_ID}&status=${STATUS}`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setGeneralData(response.data));
      })
      .catch((error) => {
        const err = error;

        dispatch(setLoader(false));
      });
  };
};

export const getReceiptList = (id) => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };

    axios
      .get(`${Url}get_receipts_details_API?id=${id}`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setReceiptList(response.data[0]));
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
      });
  };
};

export const getReceiptsList = (id) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    let headers = {
      "Content-Type": "application/json",
    };

    axios
      .get(`${Url}get_receipts_api?USER_INFO_ID=${id}`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setReceiptsList(response.data[0]));
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
      });
  };
};

export const getCustomerReceivable = (id, cid) => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}customer_receiablesAPI?USER_INFO_ID=${id}&customerid=${cid}`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        if (cid == 0) {
          dispatch(setCustomerReceivableList(response.data));
        } else {
          dispatch(setCustomerReceivableList(response.data));
        }
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;

        dispatch(setLoader(false));
      });
  };
};

export const getReceivablebyUnit = (id) => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };

    axios
      .get(`${Url}receivable_by_unit_detail_API?USER_INFO_ID=${id}`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setReceiveableByUnit(response.data));
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;

        dispatch(setLoader(false));
      });
  };
};

export const getHomelist = (id, name) => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}home_api?USER_INFO_ID=${id}&LOGIN_NAME=${name}`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setHomeList(response));
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
      });
  };
};

export const getCountList = () => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}get_unit_form_API`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setUnitsCount(response));
        // console.log("lenght :", response.length);
      })
      .catch((error) => {
        const err = error;
        if (err.response) {
          // console.log("getCountList error", err.response);
        }
        dispatch(setLoader(false));
      });
  };
};

export const getDuesCount = (id) => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}get_14bucket_API?USER_INFO_ID=${id}`, { headers: headers })
      .then((resp) => {
        let response = resp.data;

        dispatch(setDuesCount(response));
      })
      .catch((error) => {
        const err = error;
        if (err.response) {
          // console.log("getDuesCount error", err.response);
        }
        dispatch(setLoader(false));
      });
  };
};

export const getCountryList = () => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}get_customer_form_api`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        let countryList = response.data;
        let temp = [];
        countryList.forEach((element) => {
          temp.push({
            id: element.COUNTRY_ID,
            name: element.COUNTRY_NAME,
          });
        });
        dispatch(setCountryList(temp));
      })
      .catch((error) => {
        const err = error;
        if (err.response) {
          // console.log("getCountryList error", err.response);
        }
      });
  };
};

export const getCityList = (id) => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}get_city_by_countrys?country_id=${id}`, { headers: headers })
      .then((resp) => {
        let countryList = resp.data;
        let temp = [];
        countryList.forEach((element) => {
          temp.push({
            id: element.CITY_ID,
            name: element.CITY_NAME,
          });
        });
        dispatch(setCityList(temp));
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
        if (err.response) {
          // console.log("getCityList error", err.response);
        }
      });
  };
};
export const getCityList1 = (id) => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}get_city_by_countrys?country_id=${id}`, { headers: headers })
      .then((resp) => {
        let countryList = resp.data;
        let temp = [];
        countryList.forEach((element) => {
          temp.push({
            id: element.CITY_ID,
            name: element.CITY_NAME,
          });
        });
        dispatch(setCityList1(temp));
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
        if (err.response) {
          // console.log("getCityList1 error", err.response);
        }
      });
  };
};

export const insertCustomer = (data, navigation) => {
  const { dob, name, type, fname, lname, namear, country, city, country1, city1, address1, USER_INFO_ID, email } = data;
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(
        `${Url}insert_customer_api?dob=${dob}&name=${name}&type=${type}&fname=${fname}&lname=${lname}&namear=${namear}&country=${country}&city=${city}&country1=${country1}&city1=${city1}&address1=${address1}&USER_INFO_ID=${USER_INFO_ID}&email=${email}`,
        { headers: headers },
      )
      .then((resp) => {
        let response = resp.data;
        alert(response.message);
        navigation.goBack();
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
        if (err.response) {
          // console.log("insertCustomer error", err.response);
        }
      });
  };
};

export const getCommissionList = (id) => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}broker_commission_api?USER_INFO_ID=${id}`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setCommissionList(response.data));
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
        if (err.response) {
          console.log("getCommissionList error", err.response);
        }
      });
  };
};

export const getCustomersList = () => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}getCustomerByOrgId?org_id=33`, { headers: headers })
      .then((resp) => {
        let countryList = resp.data;
        let temp = [];
        countryList.result.forEach((element) => {
          temp.push({
            id: element.CUSTOMER_ID,
            name: element.NAME,
          });
        });
        dispatch(setCustomersList(temp));
      })
      .catch((error) => {
        const err = error;
        if (err.response) {
          console.log("getCustomersList error", err.response);
        }
      });
  };
};

export const getReservationNoList = (id) => {
  return (dispatch) => {
    dispatch(setLoader(true));
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}getReservationByCustomerId?id=${id}`, { headers: headers })
      .then((resp) => {
        let countryList = resp.data;
        let temp = [];
        countryList.forEach((element) => {
          temp.push({
            id: element.ID,
            name: element.PRE_RESERVE_NO,
          });
        });
        dispatch(setReservationNoList(temp));
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
        if (err.response) {
          console.log("getReservationNoList error", err.response);
        }
      });
  };
};

export const insertReceipt = (data, navigation) => {
  const { PRE_RESERVATION_NO, CUSTOMER, NARRATION, RECEIPT_DATE, RECEIVED_FROM, REFERENCE_CODE, CURR, USER_INFO_ID } = data;
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(
        `${Url}insertReceipt_api?PRE_RESERVATION_NO=${PRE_RESERVATION_NO}&CUSTOMER=${CUSTOMER}&NARRATION=${NARRATION}&ORG=33&RECEIPT_DATE=${RECEIPT_DATE}&RECEIVED_FROM=${RECEIVED_FROM}&REFERENCE_CODE=${REFERENCE_CODE}&CURR=2&USER_INFO_ID=${USER_INFO_ID}`,
        { headers: headers },
      )
      .then((resp) => {
        let response = resp.data;
        console.log(response);
        dispatch(getReservationNoList(USER_INFO_ID));
        navigation.navigate(SCREENS.CREATEPAYMENT, { id: response.data.id });
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
        if (err.response) {
          console.log("insertReceipt error", err.response);
        }
      });
  };
};

export const getBankModeList = () => {
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}get_mod_and_banks`, { headers: headers })
      .then((resp) => {
        let countryList = resp.data;
        let tempBank = [];
        let tempMode = [];
        let tempCat = [];
        countryList.data.banksData.forEach((element) => {
          tempBank.push({
            id: element.ID,
            name: element.NAME,
          });
        });
        countryList.data.modsData.forEach((element) => {
          tempMode.push({
            id: element.ID,
            name: element.NAME,
          });
        });
        countryList.data.categoriesData.forEach((element) => {
          tempCat.push({
            id: element.ID,
            name: element.CATEGORY_NAME,
          });
        });
        dispatch(setBankList(tempBank));
        dispatch(setModeList(tempMode));
        dispatch(setCategoryList(tempCat));
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
        if (err.response) {
          console.log("getBankModeList error", err.response);
        }
      });
  };
};

export const insertPaymentDetail = (data, navigation) => {
  const { cheque, amount, hdr_id, modOfPay, dueDate, bank, NARRATION, USER_INFO_ID, category, branch } = data;
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(
        `${Url}insertReceiptDetails_api?cheque=${cheque}&amount=${amount}&hdr_id=${hdr_id}&modOfPay=${modOfPay}&dueDate=${dueDate}&bank=${bank}&NARRATION=${NARRATION}&USER_INFO_ID=${USER_INFO_ID}&category=${category}&branch=${branch}`,
        { headers: headers },
      )
      .then((resp) => {
        let response = resp.data;
        console.log(response);
        alert("Record added successfully!");
        dispatch(getReceiptsList(USER_INFO_ID));
        dispatch(getReservationNoList(USER_INFO_ID));
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
        if (err.response) {
          console.log("insertReceipt error", err.response);
        }
      });
  };
};

export const insertApproval = (data) => {
  const { RESERVE_ID, PRE_RESERVE_ID, PK, LEVEL, USER_INFO_ID, LOGIN_NAME, TYPE, COMMENTS, ORG_ID, UNIT_ID, conf_val, conf_val1, dt } = data;
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(
        `${Url}Insert_Approval_Confirmation_api?RESERVE_ID=${RESERVE_ID}&PRE_RESERVE_ID=${PRE_RESERVE_ID}&PK=${PK}&LEVEL=${LEVEL}&USER_INFO_ID=${USER_INFO_ID}&LOGIN_NAME=${LOGIN_NAME}&TYPE=${TYPE}&COMMENTS=${COMMENTS}&ORG_ID=${ORG_ID}&UNIT_ID=${UNIT_ID}&conf_val=${conf_val}&conf_val1=${conf_val1}&dt=${dt}`,
        { headers: headers },
      )
      .then((resp) => {
        let response = resp.data;
        alert("Record update!");
        dispatch(getHomelist(USER_INFO_ID, LOGIN_NAME));
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
        if (err.response) {
          console.log("insertReceipt error", err.response);
        }
      });
  };
};

export const insertConfirmReceipt = (data) => {
  const { id, reserve_id, USER_INFO_ID } = data;
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}confirmReceipthdrapi?id=${id}&reserve_id=${reserve_id}&USER_INFO_ID=${USER_INFO_ID}`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        alert("Record update!");
        dispatch(getReceiptsList(USER_INFO_ID));
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
        if (err.response) {
          console.log("insertReceipt error", err.response);
        }
      });
  };
};

export const insertGenearteCommission = (data) => {
  const { brokerid } = data;
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}generatecomm_api?brokerid=${brokerid}`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        alert("Broker commission has generated successfully");
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
        if (err.response) {
          console.log("insertReceipt error", err.response);
        }
      });
  };
};

export const generateLink = (data) => {
  const { due, unit_code, id, name } = data;
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}generatepaymentlink_api?due=${due}&unit_code=${unit_code}&id=${id}&name=${name}&email=a`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        console.log(response);
        alert("Paymentlink Sent Successfully...");
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
        if (err.response) {
          console.log("generateLink error", err.response);
        }
      });
  };
};

export const getBrokerList = (data) => {
  return (dispatch) => {
    let { unit_id, USER_INFO_ID } = data;
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}property_res_form_api?org_id=33&unit_id=${unit_id}&USER_INFO_ID=${USER_INFO_ID}`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        dispatch(setUnitDetail(response.result2[0]));
        console.log("PP Lists: ", resp.data);
        let tempPlan = [];
        let tempBroker = [];
        let tempAgent = [];
        response.result.forEach((element) => {
          tempPlan.push({
            id: element.PPLAN_HDR_ID,
            name: element.PPLAN_HDR_NAME,
          });
        });
        response.BROKER.forEach((element) => {
          tempBroker.push({
            id: element.BROKER_ID,
            name: element.NAME,
          });
        });
        response.AGENT.forEach((element) => {
          tempAgent.push({
            id: element.ID,
            name: element.AGENT_NAME,
          });
        });
        dispatch(setPaymentPlan(tempPlan));
        console.log("Payment Plan dispatcher :", tempPlan);
        dispatch(setBroker(tempBroker));
        console.log("Broker List Data Dispatcher :", tempBroker);
        dispatch(setAgent(tempAgent));
        console.log("Agen List Dispatcher :", tempAgent);
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
        if (err.response) {
          console.log("getBrokerList error", err.response);
        }
      });
  };
};

export const insertPreReservation = (data, navigation) => {
  const {
    pre_res_dt,
    sale_val,
    unit_id,
    price,
    payment_plan,
    agent,
    broker,
    USER_INFO_ID,
    Per,
    Customer_ID,
    PROPERTY_ID,
    UNIT_SPECS_ID,
    PRICE_TYPE,
    Customer_ID1,
    Per1,
    Customer_ID2,
    Per2,
    Primary1,
    Primary2,
    Primary,
  } = data;

  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };

    const apiUrl = `${Url}insert_pre_reservation1_API?pre_res_dt=${pre_res_dt}&sale_val=${sale_val}&unit_id=${unit_id}&prop_id=${PROPERTY_ID}&unit_desc_id=${UNIT_SPECS_ID}&price=${price}&pricetype=${PRICE_TYPE}&payment_plan=${payment_plan}&agent=${agent}&broker=${broker}&USER_INFO_ID=${USER_INFO_ID}&Customer_ID=${Customer_ID}&Primary=${Primary}&Per=${Per}&org_id=33&&Customer_ID1=${Customer_ID1}&Primary1=${Primary1}&Per1=${Per1}&Customer_ID2=${Customer_ID2}&Primary2=${Primary2}&Per2=${Per2}`;

    console.log("API URL:", apiUrl); // Log the constructed API URL

    axios
      .get(apiUrl, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        console.warn("insertPreReservation is here===========> : ", response);

        alert("Pre Reserved Successfully!");
        navigation.goBack();
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
        if (err.response) {
          console.log("insertPreReservation error", err.response);
        }
      });
  };
};

export const insertPay = (data, navigation) => {
  const { due, unit_code, id, name } = data;
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}generatepaymentlink_api1?due=${due}&unit_code=${unit_code}&id=${id}&name=${name}&email=a`, { headers: headers })
      .then((resp) => {
        let response = resp.data;
        // { "status": 1, "message": "https://paypage.ngenius-payments.com/?code=d5f7807528e62496" }
        dispatch(setPayUrl(response.message));
        dispatch(setLoader(false));
        navigation.navigate("PayWebview", { payUrl: response.message });
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
        if (err.response) {
          console.log("generateLink error", err.response);
        }
      });
  };
};

export const composeEmail = (data) => {
  const { subject, message, rid, USER_INFO_ID } = data;
  return (dispatch) => {
    let headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${Url}send_notes_email_api?to=info@fakhruddinproperties.com&cc=info@fakhruddinproperties.com&subject=${subject}&notes=${message}&rid=${rid}&USER_INFO_ID=${USER_INFO_ID}`, {
        headers: headers,
      })
      .then((resp) => {
        let response = resp.data;
        console.log("composeEmail: ", response);
        alert("Email sent successfully.");
        dispatch(setLoader(false));
      })
      .catch((error) => {
        const err = error;
        dispatch(setLoader(false));
        if (err.response) {
          console.log("composeEmail error", err.response);
        }
      });
  };
};
