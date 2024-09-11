import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Link, useGlobalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { getAllLessons } from "../../../utils/utils";
import { UserContext } from "../../../contexts/User";
import CircularProgress from "react-native-circular-progress-indicator";
import WelcomePopUp from "../../../components/WelcomePopup";
const MainImage = require("../../../assets/geoffrey.jpg");

export default function Home() {
	const [allLessons, setAllLessons] = useState([]);
	const { welcome } = useGlobalSearchParams();
	const showModal = welcome === "true";

	const [loading, setLoading] = useState(true);

	const { user } = useContext(UserContext);

	useEffect(() => {
		setLoading(true);
		getAllLessons()
			.then((response) => {
				setAllLessons(response.data.lessons);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <Text style={[styles.text, styles.loading]}>Loading...</Text>;
	}

	function calculateLessonProgress(lessonQuestions, userProgress) {
		const completedQuestions = lessonQuestions.filter((question) => userProgress.includes(question));
		return (completedQuestions.length / lessonQuestions.length) * 100;
	}

	return (
		<ScrollView style={styles.page}>
			<View style={styles.header}>
				<Text style={[styles.text, styles.title]}>{"Click on a lesson\nto begin..."}</Text>
				<Image style={styles.image} source={MainImage} />
			</View>

			<View style={styles.lessons}>
				{allLessons.map((lesson, index) => {
					return (
						<Link
							key={lesson._id}
							style={[styles.lesson, { marginRight: (index * 100) % 200, marginLeft: 50 }]}
							href={`/Home/${lesson._id}`}
						>
							<CircularProgress
								value={calculateLessonProgress(lesson.questions, user.progress)}
								title={lesson._id}
								radius={40}
								titleFontSize={24}
								circleBackgroundColor={"#333"}
								showProgressValue={false}
								activeStrokeColor={"#00C400"}
								titleStyle={{ fontWeight: "bold" }}
								style={styles.progressCircle}
							/>
						</Link>
					);
				})}
			</View>
			<WelcomePopUp isVisible={showModal} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	page: {
		height: "100vh",
		backgroundColor: "#dbd2e0",
	},

	text: {
		fontFamily: "monospace",
		fontSize: 20,
	},

	loading: {
		paddingTop: 15,
		textAlign: "center",
		height: "100%",
		backgroundColor: "#dbd2e0",
	},

	header: {
		padding: 15,
		borderBottomColor: "rgba(0,0,0,.2)",
		borderBottomWidth: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,.10)",
	},

	title: {},

	image: {
		height: 120,
		width: 120,
		borderColor: "grey",
		borderWidth: 4,
		borderRadius: 10,
	},

	lessons: {
		flexDirection: "column",
		alignItems: "center",
    paddingBottom: 15,
	},

	progressCircle: {
		width: 57,
		height: 57,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "yellow",
		textAlign: "center",
	},

	lesson: {
		marginTop: 15,
	},
});
