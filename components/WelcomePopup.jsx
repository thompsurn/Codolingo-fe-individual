import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

export default function WelcomePopUp({ isVisible }) {
  const [isModalVisible, setModalVisible] = useState(isVisible);
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigateToHome = () => {
    toggleModal();
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        backdropOpacity={0.3}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.title}>Welcome to Codolingo!</Text>
            <Text style={styles.message}>
              To use this app simply make your way through the questions. Once
              you have completed one section, the next section will unlock.
            </Text>
            <Text style={styles.message}>
              Play against friends and monitor your progress in our leaderboard
            </Text>
            <Text style={styles.message}>Happy Coding!!!</Text>
            <TouchableOpacity style={styles.button} onPress={navigateToHome}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DBD2E0",
  },
  modal: {
    justifyContent: "center",
    margin: 0,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignSelf: "center",
  },
  text: {
    fontFamily: "monospace",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#dbd2e0",
    width: 100,
    height: 40,
    paddingTop: 10,
    borderRadius: 15,
  },

  title: {
    fontFamily: "monospace",
    fontSize: 24,
    fontWeight: "bold",
    color: "#dbd2e0",
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },

  message: {
    fontFamily: "monospace",
    fontSize: 18,
    color: "grey",
    marginBottom: 15,
    textAlign: "center",
  },

  buttonText: {
    fontSize: 18,
    color: "grey",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "monospace",
  },
});
