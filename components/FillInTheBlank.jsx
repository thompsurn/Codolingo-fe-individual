import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";




export default function FillInTheBlank({ question,
  userAnswer,
  setUserAnswer }) {
  const [text, setText] = useState('');

  return (
    <View style={styles.questionSection}>
      <Text style={styles.teaching}>{question.teaching}</Text>

      <Text style={styles.question}>{question.question}</Text>

      <TextInput style={styles.form} onChangeText={setText} value={text} placeholder='Type your answer here...' onBlur={() => {setUserAnswer(text.toLowerCase())}} />
    </View>
  )
}

const styles = StyleSheet.create({
  questionSection: {
    padding: 15,
    alignItems: "stretch",
    justifyContent: "center",
  },
  teaching: {
    backgroundColor: "#ECE7E9",
    fontFamily: "monospace",
    fontSize: 20,
    padding: 6,
    lineHeight: 28,
    borderRadius: 15,
  },
  question: {
    fontFamily: "monospace",
    fontSize: 20,
    marginTop: 5,
    fontWeight: "bold",
    padding: 6,
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 30,
    justifyContent: "space-around",
    backgroundColor: "#9d8189",
    borderRadius: 4,
    margin: 5,
    color: "#252422",
    fontSize: 12,
    fontFamily: "monospace",
  },
});