import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function Notifications() {
  const names = ["Yennie456", "Swandimeer", "GoodGeoffery"];

  const notificationMsg = " has joined Codolingo";

  return (
    <ScrollView style={styles.page}>
      <>
        {names.map((name, index) => {
          return (
            <View key={index} style={[styles.dummyUser, styles.container]}>
              <Text style={styles.names}>{name}</Text>
              <Text style={styles.notificationMsg}>{notificationMsg}</Text>
              <TouchableOpacity style={styles.addBtn}>
                <Text>Follow</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#DBD2E0",
  },
  text: {
    fontFamily: "monospace",
    fontSize: 15,
    padding: 10,
  },
  container: {
    backgroundColor: "#B2B2B2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    margin: 10,
    paddingVertical: 15,
    borderRadius: 10,
  },
  names: {
    color: "darkgreen",
    fontWeight: "bold",
  },
  dummyUser: {
    backgroundColor: "#B2B2B2",
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    paddingVertical: 15,
    borderRadius: 10,
    borderColor: "green",
    borderWidth: 2,
  },

  addBtn: {
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: "black",
    marginLeft: "auto",
    color: "black",
    backgroundColor: "#f8f8f8",
    borderRadius: 30,
    paddingHorizontal: 10,
  },
});
