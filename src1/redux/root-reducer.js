import { combineReducers } from "redux"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import userReducer from "./user/user.reducer"
import propertyReducer from "./property/property.reducer"
import loaderReducer from "./loader/loader.reducer"

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  user: userReducer,
  property: propertyReducer,
  loader: loaderReducer,
})

export default persistReducer(persistConfig, rootReducer)
