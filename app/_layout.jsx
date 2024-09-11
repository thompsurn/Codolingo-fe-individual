import { Stack } from "expo-router/stack";
import { UserProvider } from "../contexts/User";
import { StyleSheet } from "react-native";

export default function Layout() {
	return (
		<UserProvider>
			<Stack
				screenOptions={{
          headerTitleAlign: "center",
					headerStyle: styles.header,
					headerTintColor: "#333",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="index" options={{ title: "Sign in" }} />
				<Stack.Screen
					name="Create-account"
					options={{
						title: "Create account",
					}}
				/>
			</Stack>
		</UserProvider>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#ddd",
		borderBottomColor: "#999",
	},
});