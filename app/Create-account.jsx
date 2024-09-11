import React, { useState, useContext } from "react";
import { Text, View, TextInput, Image, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { router } from "expo-router";
import { UserContext } from "../contexts/User";
import { postUser } from "../utils/utils";

const mainImage = require("../assets/geoffrey.jpg");
const avatar1 = require("../assets/avatar1.jpg");
const avatar2 = require("../assets/avatar2.jpg");
const upload = require("../assets/upload.jpeg");

export default function CreateAccount() {
	const [userNameInput, setUserNameInput] = useState("");

	const [passwordInput, setPasswordInput] = useState("");

	const [selectedAvatar, setSelectedAvatar] = useState(0);

	const [createDisabled, setCreateDisabled] = useState(false);

	const [userNameErrorShown, setUserNameErrorShown] = useState(false);

	const [passwordErrorShown, setPasswordErrorShown] = useState(false);

	const [userNameExistsShown, setUserNameExistsShown] = useState(false);

	const { setUser } = useContext(UserContext);

	const avatar1Link =
		"https://c7.alamy.com/comp/2RTX8T8/happy-puppy-welsh-corgi-14-weeks-old-dog-winking-panting-and-sitting-isolated-on-white-2RTX8T8.jpg";
	const avatar2Link =
		"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c2c855dc-6a89-4fb2-a65d-4a8d6dee7f83/dg1ue0h-c078cf5d-3bc7-404c-ad6b-df0bd79b2f24.jpg/v1/fill/w_360,h_360,q_75,strp/hotdog_more_like_a_wiener_dog_by_kaylagirl10_dg1ue0h-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzYwIiwicGF0aCI6IlwvZlwvYzJjODU1ZGMtNmE4OS00ZmIyLWE2NWQtNGE4ZDZkZWU3ZjgzXC9kZzF1ZTBoLWMwNzhjZjVkLTNiYzctNDA0Yy1hZDZiLWRmMGJkNzliMmYyNC5qcGciLCJ3aWR0aCI6Ijw9MzYwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.kPNToYnGRH6SJWHt5RSLa3-N2EpagyBJFUKk8idoAT8";

	const defaultAvatars = [avatar1, avatar2];

	const defaultAvatarLinks = [avatar1Link, avatar2Link];

	async function handleCreate() {
		setCreateDisabled(true);
		setUserNameExistsShown(false);
		const userNameRegex = /^[a-z0-9\-]{3,10}$/i;
		const passwordRegex = /^[a-z0-9]{8,20}$/i;

		try {
			setUserNameErrorShown(!userNameRegex.test(userNameInput));
			setPasswordErrorShown(!passwordRegex.test(passwordInput));
			if (userNameRegex.test(userNameInput) && passwordRegex.test(passwordInput)) {
				const createdUser = await postUser({
					user_name: userNameInput,
					password: passwordInput,
					avatar_url: defaultAvatarLinks[selectedAvatar],
				});
				setUserNameErrorShown(false);
				setPasswordErrorShown(false);
				setUser(createdUser.data.postedUser);
				router.replace("/Home?welcome=true");
			}
		} catch ({ response }) {
			setUserNameExistsShown(true);
			setPasswordErrorShown(false);
			setUserNameErrorShown(false);
			console.log(response);
		} finally {
			setCreateDisabled(false);
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={[styles.text, styles.title]}>Welcome to Codolingo...</Text>
				<Image style={styles.headerImage} source={mainImage} />
			</View>
			<Text style={[styles.text, styles.createText]}>Create an account:</Text>

			<View>
				<TextInput value={userNameInput} onChangeText={setUserNameInput} placeholder="username" style={styles.form} />

				{userNameErrorShown && (
					<Text style={styles.errorMessage}>
						Username must contain letters, numbers and "-" only and be 3-10 characters long
					</Text>
				)}

				{userNameExistsShown && <Text style={styles.errorMessage}>A user with that name already exists</Text>}

				<TextInput
					value={passwordInput}
					onChangeText={setPasswordInput}
					placeholder="password"
					style={styles.form}
					secureTextEntry={true}
				/>

				{passwordErrorShown && (
					<Text style={styles.errorMessage}>
						Password must contain letters and numbers only and be 8-20 characters long
					</Text>
				)}
			</View>

			<Text style={[styles.text, styles.avatarText]}>Choose an avatar:</Text>

			<View style={styles.avatarContainer}>
				{defaultAvatars.map((avatar, index) => {
					return (
						<Pressable
							onPress={() => {
								setSelectedAvatar(index);
							}}
							key={index}
						>
							<Image style={[styles.image, selectedAvatar === index && styles.selectedImage]} source={avatar} />
						</Pressable>
					);
				})}
				<TouchableOpacity>
					<Image style={styles.image} source={upload} />
				</TouchableOpacity>
			</View>
			<TouchableOpacity onPress={handleCreate} style={[styles.buttons, styles.text]} disabled={createDisabled}>
				<Text style={styles.text}>Create profile & sign in</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		fontFamily: "monospace",
		fontSize: 20,
	},

	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "stretch",
		padding: 15,
		backgroundColor: "#dbd2e0",
	},

	title: {
		fontSize: 25,
		flexWrap: "wrap",
		flex: 1,
	},

	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15,
	},

	createText: {
		marginBottom: 10,
	},

	headerImage: {
		height: 120,
		width: 120,
		borderColor: "grey",
		borderWidth: 4,
		borderRadius: 10,
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
	},

	avatarText: {
		marginTop: 10,
	},

	avatarContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "left",
		alignItems: "center",
		marginTop: 10,
	},

	image: {
		height: 100,
		width: 100,
		borderColor: "grey",
		borderWidth: 4,
		borderRadius: 10,
		marginLeft: 10,
		marginBottom: 10,
	},

	selectedImage: {
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

	errorMessage: {
		marginLeft: 5,
		fontFamily: "monospace",
		fontSize: 14,
		color: "red",
	},
});
