import React, { useState, useEffect } from "react";

import { StyleSheet } from "react-native";
import { View, Text } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";

import io from "socket.io-client";

export default function TabTwoScreen() {
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
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
            headerImage={
                <IconSymbol
                    size={310}
                    color="#808080"
                    name="chevron.left.forwardslash.chevron.right"
                    style={styles.headerImage}
                />
            }>
            <ThemedText style={{ fontFamily: "Outfit" }}>This is the content page.</ThemedText>
            <ThemedText style={{ fontFamily: "Outfit" }}>t page.</ThemedText>
            <View style={styles.list}>
                <Text>h</Text>
                <Text>h</Text>
                <Text>h</Text>
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: "#808080",
        bottom: -90,
        left: -35,
        position: "absolute",
    },
    titleContainer: {
        flexDirection: "row",
        gap: 8,
    },
    list: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#fff",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 20,
    },
});
