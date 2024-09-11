import { Text, View, StyleSheet, Image } from "react-native"

import { UserContext } from "../contexts/User"
import React, { useContext } from "react"

export default function ScoreCard(users) {
const {user, setUser} = useContext(UserContext)

    return (
        <View style={users.username === user.user_name ? styles.currentUser : styles.container}>

            <Image style={users.username === user.user_name ? styles.userAvatar : styles.avatar} source={{ uri: users.avatar }} />

            <Text style={styles.text}>{users.username}</Text>

            <Text style={[styles.text, styles.score]}>{users.score} XP</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "monospace",
        fontSize: 20,
        fontWeight: "bold",
    },
    container: {
        backgroundColor: "#B2B2B2",
        flexDirection: "row", 
        alignItems: "center",
        margin: 10,
        paddingVertical: 15,
        borderRadius: 10,
    },
    currentUser: {
        backgroundColor: "#B2B2B2",
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
        paddingVertical: 15,
        borderRadius: 10,
        borderColor: "green",
        borderWidth: 2,
       
    },
    avatar: {
        height: 80,
        width: 80,
        marginLeft: 15,
        marginRight: 10,
        borderRadius: 50,
        
    },
    userAvatar: {
        height: 80,
        width: 80,
        marginLeft: 13,
        marginRight: 10,
        borderRadius: 50,
        borderColor: "green",
        borderWidth: 4,
        padding: 5,
    },
    score: {
        marginRight: 15,
        marginLeft: "auto",
        fontWeight: "normal",
    }
})

