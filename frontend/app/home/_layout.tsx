import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from 'react';
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


    return(
        <SafeAreaView style={{flex: 1}}>
        <ScrollView style={styles.screen}>
            <View style={styles.contentParent}>
                <Text style={[styles.roadar, styles.roadarTypo]}>Roadar</Text>
                <View>
                    <Slot />
                </View>
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#fff",
        flex: 1,
        position: "absolute",
        height: "120%",
        width: "100%"
    },
    contentParent: {
        top: 45,
        left: 26,
        width: 351,
        gap: 27,
        flex: 1,
    },
    roadarTypo: {
        textAlign: "left",
        color: "#000",
        fontFamily: "Outfit-Medium",
        fontWeight: "500",
        alignSelf: "stretch"
    },
    roadar: {
        fontSize: 32
    },

})