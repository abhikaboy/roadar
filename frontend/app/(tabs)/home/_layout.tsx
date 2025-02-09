import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Slot } from "expo-router";

export default function Home() {
    const socketEndpoint = "ws://10.110.191.103:8080/ws/mechanic/67a7e53ead3126f3dab182dc/";
    useEffect(() => {
        const ws = new WebSocket(socketEndpoint);

        ws.onopen = () => {
            console.log("WebSocket connection established!");
            setConnection(true);
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
            setConnection(false);
        };

        ws.onmessage = (event) => {
            console.log("Received message from server:", event.data);
        };

        return function didUnmount() {};
    }, []);
    const [hasConnection, setConnection] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.screen}>
                <View style={styles.contentParent}>
                    <Text style={[styles.roadar, styles.roadarTypo]}>Roadar</Text>
                    <Slot />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#fff",
        flex: 1,
        height: Dimensions.get("window").height * 1,
        top: 0,
        width: "100%",
        position: "absolute",
    },
    contentParent: {
        top: 45,
        left: 26,
        paddingRight: 30,
        flex: 1,
        flexDirection: "column",
        gap: 0,
    },
    roadarTypo: {
        textAlign: "left",
        color: "#000",
        fontFamily: "Outfit-Medium",
        fontWeight: "500",
        alignSelf: "stretch",
    },
    roadar: {
        fontSize: 32,
    },
});
