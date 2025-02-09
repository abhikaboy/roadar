/* eslint-disable import/no-unresolved */
import { useState, useEffect } from "react";

import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAuth } from "@/hooks/useAuth";

export default function TabTwoScreen() {
    const { setJob } = useAuth();
    const [selected, setSelected] = useState(new Date().toISOString());
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
            try {
                const data = JSON.parse(event.data);
                setJob(data);
                console.log(data);
            } catch (e) {
                console.log(e);
            }
            // if (!event.data.contains("Hello user")) {
            //     setJob(JSON.parse(event.data));
            // }
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
            <Calendar
                onDayPress={(day) => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: "orange" },
                }}
            />
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
