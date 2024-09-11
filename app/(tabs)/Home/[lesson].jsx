import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { useContext, useEffect, useState, useRef } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import MultipleChoice from "../../../components/MultipleChoice";
import DragAndDrop from "../../../components/DragAndDrop";
import FillInTheBlank from "../../../components/FillInTheBlank";
import {
  getQuestionsByLessonId,
  patchUserProgress,
} from "../../../utils/utils";
import { UserContext } from "../../../contexts/User";
import { Audio } from "expo-av";

import LottieView from "lottie-react-native";

export default function Lesson() {
  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [userAnswer, setUserAnswer] = useState(null);
  const [incorrect, setIncorrect] = useState(false);
  const lessonId = useLocalSearchParams().lesson;
  const { user, setUser } = useContext(UserContext);

  const correctSound = useRef(new Audio.Sound());
  const incorrectSound = useRef(new Audio.Sound());
  const completedSound = useRef(new Audio.Sound());

  useEffect(() => {
    const loadSound = async () => {
      try {
        await correctSound.current.loadAsync(
          require("../../../assets/yay.wav")
        );
        await incorrectSound.current.loadAsync(
          require("../../../assets/incorrect-answer.mp3")
        );
        await completedSound.current.loadAsync(
          require("../../../assets/well-done.wav")
        );
      } catch (error) {
        console.log("Error loading sound", error);
      }
    };

    loadSound();
  }, []);

  useEffect(() => {
    setLoading(true);
    getQuestionsByLessonId(lessonId)
      .then((response) => {
        const requestedQuestions = response.data.questions;

        const filteredQuestions = requestedQuestions.filter(
          (question) => !user.progress.includes(question._id)
        );

        setQuestions(filteredQuestions);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [lessonId, user.progress]);

  useEffect(() => {
    if (questions.length === 0) {
      const playLessonCompleteSound = async () => {
        try {
          await completedSound.current.replayAsync(); 
        } catch (error) {
          console.log(error);
        }
      };
      playLessonCompleteSound();
    }
  }, [questions]);

    const handleSubmit = async () => {
    let correct = questions[0].answer === userAnswer 

    if (typeof questions[0].answer === 'object') {
      correct = questions[0].answer.toString() === userAnswer.toString()
    }
    if (correct) {
      try {
        await correctSound.current.replayAsync();
      } catch (error) {
        console.log("Error", error);
      }

      patchUserProgress(user.user_name, { progress: questions[0]._id }).then(
        (response) => {
          setUser(response.data.user);
          setQuestions((current) => {
            const newQuestions = [...current];
            newQuestions.shift();
            return newQuestions;
          });
        }
      );
    } else {
      setIncorrect(true);
      try {
        await incorrectSound.current.replayAsync();
      } catch (error) {
        console.log(error);
      }
      setQuestions((current) => {
        const newQuestions = [...current];
        newQuestions.push(newQuestions[0]);
        newQuestions.shift();
        return newQuestions;
      });
    }
    setUserAnswer(null);
  };

  if (loading) {
    return <Text style={[styles.text, styles.loading]}>Loading...</Text>;
  } else if (incorrect) {
    return (
      <View style={styles.background}>
        <Text style={[styles.text, styles.incorrect]}>That's not right</Text>
        <TouchableOpacity onPress={() => setIncorrect(false)}>
          <Text style={styles.button}>Got it</Text>
        </TouchableOpacity>
      </View>
    );
  }

	if (questions.length === 0 && Platform.OS === "android") {
    return (
      <View style={styles.background}>
        <Text style={[styles.text, styles.incorrect]}>
          Lesson complete, Well done!
        </Text>

        <LottieView
          source={require("../../../assets/animation.json")}
          style={{ width: "60%", height: "60%" }}
          autoPlay
          loop
        />
        <Link href="/Home" style={styles.button}>
          Return to lessons
        </Link>
      </View>
    );
  } else if (questions.length === 0 && Platform.OS != "android") {
    return (
      <View style={styles.background}>
        <Text style={[styles.text, styles.incorrect]}>
          Lesson complete, Well done!
        </Text>
        <Link href="/Home" style={styles.button}>
          Return to lessons
        </Link>
      </View>
    );
  }

	if (questions.length === 0 && Platform.OS === "android") {
		return (
			<View style={styles.background}>
				<Text style={[styles.text, styles.incorrect]}>Lesson complete, Well done!</Text>

				<LottieView
					source={require("../../../assets/animation.json")}
					style={{ width: "60%", height: "60%" }}
					autoPlay
					loop
				/>
				<Link href="/Home" style={styles.button}>
					Return to lessons
				</Link>
			</View>
		);
	} else if (questions.length === 0 && Platform.OS != "android") {
		return (
			<View style={styles.background}>
				<Text style={[styles.text, styles.incorrect]}>Lesson complete, Well done!</Text>

				<Link href="/Home" style={styles.button}>
					Return to lessons
				</Link>
			</View>
		);
	}

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.lesson}>
        {questions[0].type === "multiple choice" && (
          <MultipleChoice
            question={questions[0]}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
          />
        )}
        {questions[0].type === "drag and drop" && (
          <View style={styles.dragAndDropContainer}>
            <DragAndDrop question={questions[0]} userAnswer={userAnswer} setUserAnswer={setUserAnswer} />
          </View>
        )}
        {questions[0].type === "fill in the blank" && (
          <FillInTheBlank
            question={questions[0]}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
          />
        )}
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "monospace",
    fontSize: 20,
  },
  background: {
    alignItems: "center",
    backgroundColor: "#dbd2e0",
    height: "100%",
    paddingBottom: 15,
  },
  loading: {
    paddingVertical: 15,
    textAlign: "center",
    height: "100%",
    backgroundColor: "#bbb",
  },
  lesson: {
    alignItems: "center",
    height: "100vh",
  },
  button: {
    width: "fit-content",
    padding: 5,
    fontFamily: "monospace",
    fontSize: 20,
    fontWeight: "bold",
    borderWidth: 2.5,
    borderColor: "black",
    marginVertical: 5,
    marginHorizontal: 10,
    color: "black",
    backgroundColor: "#f8f8f8",
    borderRadius: 15,
    textAlign: "center",
    textAlignVertical: "center",
  },
  incorrect: {
    marginVertical: 15,
    textAlign: "center",
  },
  dragAndDropContainer: {
    width: "100%",
  },
});
