import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet } from "react-native";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarStyle: styles.tabBar,
				tabBarActiveTintColor: "green",
				tabBarInactiveTintColor: "#333",
				tabBarShowLabel: false,
				tabBarLabelPosition: "below-icon",
				tabBarLabelStyle: styles.tabLabel,
				headerTitleAlign: "center",
				headerStyle: styles.header,
				headerTintColor: "#333",
				headerTitleStyle: {
					fontWeight: "bold",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					href: null,
				}}
			/>
			<Tabs.Screen
				name="Home"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => <FontAwesome size={40} name="home" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="Leaderboard"
				options={{
					title: "Leaderboard",
					tabBarIcon: ({ color }) => <FontAwesome size={35} name="trophy" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="Notifications"
				options={{
					title: "Notifications",
					tabBarIcon: ({ color }) => <FontAwesome size={35} name="bell" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="Settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color }) => <FontAwesome size={35} name="cog" color={color} />,
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#ddd",
		borderBottomColor: "#999",
	},
	tabBar: {
		backgroundColor: "#ddd",
		borderTopColor: "#999",
	},
	tabLabel: {
		fontFamily: "monospace",
		fontSize: 11,
	},
});
