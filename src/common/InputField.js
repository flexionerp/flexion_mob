import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

function InputField({
  onTouchStart = () => {},
  onTouchEnd = () => {},
  placeholder,
  handleFeild,
  borderColor = "#fffff",
  borderWidth = RFPercentage(0),
  fontFamily = null,
  placeholderColor = "#B4B6B8",
  borderRadius = RFPercentage(1),
  backgroundColor = "#fffff",
  keyboardType = "default",
  textCenter = "left",
  fontSize = RFPercentage(2.5),
  editIcon = false,
  dropdownIcon = false,
  multiLine = false,
  width,
  value,
  height = RFPercentage(6.9),
  secure = false,
  handleClear = false,
  leftIconName = "",
  autoFocus = false,
  searchMarginLeft = null,
  placeholderAtStart = false,
  icon = true,
  color = "black",
  ...otherProps
}) {
  const [eyeIcon, setEyeIcon] = useState(false);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: borderWidth,
        width: width,
        height: height,
        borderRadius: borderRadius,
        marginVertical: RFPercentage(0.7),
      }}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        onChangeText={(text) => handleFeild(text)}
        onResponderStart={onTouchStart}
        onEndEditing={onTouchEnd}
        value={value}
        autoFocus={autoFocus}
        multiline={multiLine}
        keyboardType={keyboardType}
        secureTextEntry={secure && !eyeIcon}
        textAlign={textCenter}
        style={{
          left: icon ? RFPercentage(1) : RFPercentage(-0.7),
          top: placeholderAtStart ? RFPercentage(-2) : null,
          fontWeight: icon ? "bold" : null,
          color: color,
          alignSelf: "center",
          fontFamily: fontFamily,
          fontSize: fontSize,
          width: "90%",
        }}
        {...otherProps}
      ></TextInput>

      {icon ? (
        <TouchableOpacity style={{ right: RFPercentage(2) }}>
          <Image style={{ width: RFPercentage(2.5), height: RFPercentage(2.5) }} source={require("../assets/images/searchIcon.png")} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export default InputField;
