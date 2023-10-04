import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

const ToggleSwitch = ({ value, onToggle }) => {
  return (
    <TouchableOpacity style={[styles.toggleContainer, value ? styles.activeToggle : styles.inactiveToggle]} onPress={() => onToggle(!value)}>
      <View style={[styles.toggleButton, value ? styles.activeButton : styles.inactiveButton]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    width: 50,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  toggleButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  activeToggle: {
    backgroundColor: "#4CAF50", // Active color
  },
  inactiveToggle: {
    backgroundColor: "#ccc", // Inactive color
  },
  activeButton: {
    transform: [{ translateX: 26 }],
  },
  inactiveButton: {
    transform: [{ translateX: 2 }],
  },
});

export default ToggleSwitch;
