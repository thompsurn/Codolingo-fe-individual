import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function Settings() {
  return (
    <View style={styles.page}>
      <TouchableOpacity>
        <Text style={styles.profile}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.soundEffects}>Sound Effects</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.help}>Help Centre</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.feedback}>Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.privacy}>Privacy</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.termsAndConditions}>T&C's</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.about}>About</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    fontFamily: "monospace",
    fontSize: 20,
    padding: 10,
  },
  soundEffects: {
    fontFamily: "monospace",
    fontSize: 20,
    padding: 10,
  },
  help: {
    fontFamily: "monospace",
    fontSize: 20,
    padding: 10,
  },
  feedback: {
    fontFamily: "monospace",
    fontSize: 20,
    padding: 10,
  },
  page: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "stretch",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#dbd2e0",
  },
  privacy: {
    fontFamily: "monospace",
    fontSize: 20,
    padding: 10,
  },
  termsAndConditions: {
    fontFamily: "monospace",
    fontSize: 20,
    padding: 10,
  },
  about: {
    fontFamily: "monospace",
    fontSize: 20,
    padding: 10,
  },
});
