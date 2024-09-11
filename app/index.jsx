import React, { useContext, useState } from "react";
import { Text, View, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { UserContext } from "../contexts/User";
import { getUserByUsername } from "../utils/utils";

const MainImage = require("../assets/geoffrey.jpg");

export default function Start() {
	const { user, setUser } = useContext(UserContext);

	const [userNameInput, setUserNameInput] = useState("cogger101");

	const [passwordInput, setPasswordInput] = useState("password");

	const [userNameErrorShown, setUserNameErrorShown] = useState(false);

	const [passwordErrorShown, setPasswordErrorShown] = useState(false);

	const [signInDisabled, setSignInDisabled] = useState(false);

	async function handleSignIn() {
		setSignInDisabled(true);
		try {
			const userToSignIn = await getUserByUsername(userNameInput);
			setUserNameErrorShown(false);
			setPasswordErrorShown(false);
			setSignInDisabled(false);

			if (passwordInput === userToSignIn.data.user.password) {
				setUser(userToSignIn.data.user);
				router.replace("/Home");
			} else {
				setPasswordErrorShown(true);
			}
		} catch ({ response }) {
			setUserNameErrorShown(true);
			setPasswordErrorShown(false);
			setSignInDisabled(false);
			console.log(response);
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={[styles.text, styles.title]}>Welcome to Codolingo...</Text>
				<View>
					<Image style={styles.image} source={MainImage} />
				</View>
			</View>

			<Text style={[styles.text, styles.description]}>Getting basic & fundamental knowledge on the go</Text>

			<TextInput
				value={userNameInput}
				onChangeText={setUserNameInput}
				placeholder="username"
				style={styles.form}
	
			/>

			{userNameErrorShown && <Text style={styles.errorMessage}>Username does not exist</Text>}

			<TextInput
				value={passwordInput}
				secureTextEntry={true}
				onChangeText={setPasswordInput}
				placeholder="password"
				style={styles.form}
			/>

			{passwordErrorShown && <Text style={styles.errorMessage}>Incorrect password</Text>}

			<View style={styles.padding}>
				<TouchableOpacity style={styles.buttons} onPress={handleSignIn} disabled={signInDisabled}>
					<Text style={styles.text}>Sign in</Text>
				</TouchableOpacity>
				<Link
					href="/Create-account"
					style={[styles.text, styles.buttons, styles.createAccount]}
					disabled={signInDisabled}
				>
					Create an account
				</Link>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		fontFamily: "monospace",
		fontSize: 20,
	},

	createAccount: {
		textAlign: "center",
		verticalAlign: "middle",
	},

	container: {
		flex: 1,
		backgroundColor: "#dbd2e0",
		alignItems: "stretch",
		padding: 15,
	},

	title: {
		fontSize: 25,
		flexWrap: "wrap",
    flex: 1,
	},

	image: {
		height: 120,
		width: 120,
		borderColor: "grey",
		borderWidth: 4,
		borderRadius: 10,
	},

	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	description: {
		flexDirection: "row",
		width: 190,
		height: 150,
		fontSize: 22,
	},

	form: {
		flexDirection: "column",
		alignItems: "center",
		padding: 10,
		justifyContent: "space-around",
		backgroundColor: "#f8f8f8",
		margin: 5,
		color: "black",
		fontSize: 16,
		fontFamily: "monospace",
		borderRadius: 15,
		borderColor: "green",
	},

	buttons: {
		flexDirection: "column",
		alignItems: "center",
		borderWidth: 2.5,
		borderColor: "black",
		margin: 5,
		color: "black",
		backgroundColor: "#f8f8f8",
		borderRadius: 15,
	},

	padding: {
		padding: 15,
	},

	errorMessage: {
		marginLeft: 5,
		fontFamily: "monospace",
		fontSize: 14,
		color: "red",
	},
});
