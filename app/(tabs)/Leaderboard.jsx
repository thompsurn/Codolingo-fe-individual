import { React, useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import ScoreCard from "../../components/ScoreCard";
import { getAllUsers } from "../../utils/utils";
import { UserContext } from "../../contexts/User"

export default function Leaderboard() {
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState([]);
	const {user} = useContext(UserContext)

	useEffect(() => {
		getAllUsers()
			.then((fetchedUsers) => {
				const sortedUsers = fetchedUsers.data.users.sort((a, b) => b.progress.length - a.progress.length)
				setUsers(sortedUsers);
				setLoading(false);
			})
			.catch((error) => {
        console.log(error);
        setLoading(false);
			});
	}, [user]);

	if (loading) return <Text>Loading...</Text>;

	return (
		<ScrollView style={styles.page}>
			{users.map((user) => {
				return (
					<View key={user.user_name}>
						<ScoreCard username={user.user_name} avatar={user.avatar_url} score={user.progress.length * 10} />
					</View>
				);
			})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	text: {
		fontFamily: "monospace",
		fontSize: 20,
	},
	page: {
		backgroundColor: "#DBD2E0",
	},
});
