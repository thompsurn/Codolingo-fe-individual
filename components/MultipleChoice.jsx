import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function MultipleChoice({
  question,
  userAnswer,
  setUserAnswer,
}) {
  return (
    <View style={styles.questionSection}>
      <Text style={styles.teaching}>{question.teaching}</Text>
      <Text style={styles.question}>{question.question}</Text>
      {question.options.map((option, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              setUserAnswer(index);
            }}
            key={option}
            style={[
              styles.option,
              userAnswer === index && styles.selectedOption,
            ]}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  questionSection: {
    padding: 10,
    alignItems: "center",
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
  option: {
    width: "90%",
    backgroundColor: "#9d8189",
    borderColor: "green",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    padding: 6,
  },
  optionText: {
    fontFamily: "monospace",
    fontSize: 20,
    textAlign: "center",
  },
  selectedOption: {
    backgroundColor: "lightgrey",
  },
});
