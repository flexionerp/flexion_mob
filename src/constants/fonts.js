import { Platform } from 'react-native'
const FONTS = {
  Regular: Platform.OS == "android" ? 'Poppins-Regular' : "Poppins-Regular",
  Light: Platform.OS == "android" ? 'Poppins-Light' : "Poppins-Light",
  Medium: Platform.OS == "android" ? 'Poppins-Medium' : "Poppins-Medium",
  SemiBold: Platform.OS == "android" ? 'Poppins-SemiBold' : "Poppins-SemiBold",
  Bold: Platform.OS == "android" ? 'Poppins-Bold' : "Poppins-Bold",
};

export { FONTS };
