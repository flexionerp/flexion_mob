import ActionsType from "../utils/actions.type";
const INITIAL_STATE = {
  totalUnitsCount: [],
  totalDuesCount: [],
  reservationList: [],
  weeklyStats: [],
  weeklyTowerAStats: [],
  weeklyTowerBStats: [],
  monthlyStats: [],
  saleSummeryStats: [],
  saleSummeryTowerAStats: [],
  saleSummeryTowerBStats: [],
  cancelDataStats: [],
  brokerDataStats: [],
  customerMsaterStats: [],
  customerReceivables: [],
  collections: [],
  generalData: [],
  receiptList: [],
  customerReceivableList: [],
  receivablebyUnit: [],
  propertyStats: [],
  homeList: [],
  countryList: [],
  cityList: [],
  cityList1: [],
  commisionList: [],
  receiptsList: [],
  customersList: [],
  reservationNoList: [],
  bankList: [],
  modeList: [],
  categoryList: [],
  unitDetail: null,
  paymentPlan: [],
  agent: [],
  broker: [],
  payUrl: null,

  error: {},
  response: {},
};

const propertyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionsType.SET_PAY_URL:
      return {
        ...state,
        payUrl: action.payload,
      };

    case ActionsType.SET_BROKER:
      return {
        ...state,
        broker: action.payload,
      };
    case ActionsType.SET_AGENT:
      return {
        ...state,
        agent: action.payload,
      };
    case ActionsType.SET_PAYMENT_PLAN:
      return {
        ...state,
        paymentPlan: action.payload,
      };
    case ActionsType.SET_UNIT_DETAIL:
      return {
        ...state,
        unitDetail: action.payload,
      };
    case ActionsType.SET_CATEGORIES_LIST:
      return {
        ...state,
        categoryList: action.payload,
      };
    case ActionsType.SET_MODE_LIST:
      return {
        ...state,
        modeList: action.payload,
      };
    case ActionsType.SET_BANK_LIST:
      return {
        ...state,
        bankList: action.payload,
      };

    case ActionsType.SET_RESERVATION_NO_LIST:
      return {
        ...state,
        reservationNoList: action.payload,
      };

    case ActionsType.SET_CUSTOMERS_LIST:
      return {
        ...state,
        customersList: action.payload,
      };

    case ActionsType.SET_RECEIPTS_LIST:
      return {
        ...state,
        receiptsList: action.payload,
      };

    case ActionsType.SET_COMMISSION_LIST:
      return {
        ...state,
        commisionList: action.payload,
      };

    case ActionsType.SET_CITY_LIST1:
      return {
        ...state,
        cityList1: action.payload,
      };

    case ActionsType.SET_CITY_LIST:
      return {
        ...state,
        cityList: action.payload,
      };

    case ActionsType.SET_COUNTRY_LIST:
      return {
        ...state,
        countryList: action.payload,
      };

    case ActionsType.SET_DUES_COUNT:
      return {
        ...state,
        totalDuesCount: action.payload,
      };

    case ActionsType.SET_UNITS_COUNT:
      return {
        ...state,
        totalUnitsCount: action.payload,
      };

    case ActionsType.SET_HOME_LIST:
      return {
        ...state,
        homeList: action.payload,
      };

    case ActionsType.SET_CUSTOMER_RECEIVABLES:
      return {
        ...state,
        customerReceivables: action.payload,
      };

    case ActionsType.SET_COLLECTIONS:
      return {
        ...state,
        collections: action.payload,
      };

    case ActionsType.SET_PROPERTY_STATS:
      return {
        ...state,
        propertyStats: action.payload,
      };

    case ActionsType.SET_SALE_TOWER_B_STATS:
      return {
        ...state,
        saleSummeryTowerBStats: action.payload,
      };

    case ActionsType.SET_SALE_TOWER_A_STATS:
      return {
        ...state,
        saleSummeryTowerAStats: action.payload,
      };

    case ActionsType.SET_WEEKLY_TOWER_B__STATS:
      return {
        ...state,
        weeklyTowerBStats: action.payload,
      };

    case ActionsType.SET_WEEKLY_TOWER_A__STATS:
      return {
        ...state,
        weeklyTowerAStats: action.payload,
      };

    case ActionsType.SET_CUSTOMER_MASTER_STATS:
      return {
        ...state,
        customerMsaterStats: action.payload,
      };

    case ActionsType.SET_BROKER_STATS:
      return {
        ...state,
        brokerDataStats: action.payload,
      };

    case ActionsType.SET_CANCEL_DATA_STATS:
      return {
        ...state,
        cancelDataStats: action.payload,
      };

    case ActionsType.SET_RECEIVEABLE_BY_UNIT:
      return {
        ...state,
        receivablebyUnit: action.payload,
      };

    case ActionsType.SET_CUSTOMER_RECEIVABLE:
      return {
        ...state,
        customerReceivableList: action.payload,
      };

    case ActionsType.SET_RECEIPT_LIST:
      return {
        ...state,
        receiptList: action.payload,
      };

    case ActionsType.SET_GENERAL_DATA:
      return {
        ...state,
        generalData: action.payload,
      };

    case ActionsType.SET_RESERVATION_LIST:
      return {
        ...state,
        reservationList: action.payload,
      };
    case ActionsType.SET_WEEKLY_STATS:
      return {
        ...state,
        weeklyStats: action.payload,
      };
    case ActionsType.SET_MONTHLY_STATS:
      return {
        ...state,
        monthlyStats: action.payload,
      };
    case ActionsType.SET_SALE_SUMMERY_STATS:
      return {
        ...state,
        saleSummeryStats: action.payload,
      };

    default:
      return state;
  }
};

export default propertyReducer;
