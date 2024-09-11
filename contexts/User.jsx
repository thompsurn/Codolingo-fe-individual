import { createContext, useEffect, useState } from "react";
import { getUserByUsername } from "../utils/utils";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({
		user_name: "cogger101",
		score: 50,
		password: "password",
		avatar_url:
			"https://images.pexels.com/photos/982047/pexels-photo-982047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		following: ["cogger101"],
		progress: [1, 2, 3, 4, 5, 6, 7],
	});

	useEffect(() => {
		getUserByUsername("cogger101").then((response) => {
			setUser(response.data.user);
		});
	}, []);

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
