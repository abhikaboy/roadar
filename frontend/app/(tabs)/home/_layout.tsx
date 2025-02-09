import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Slot } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import * as Location from "expo-location";

const API_KEY = "67a807c9155ac060356032aksc02680";

export default function Home() {
    const { user } = useAuth();
    const socketEndpoint = "ws://10.110.191.103:8080/ws/mechanic/" + user._id + "/";
    console.log(socketEndpoint);
    const [location, setLocation] = useState<any | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const { setJob } = useAuth();
    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            let { latitude, longitude } = location.coords;

            const fetchAddress = async () => {
                try {
                    const url = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${API_KEY}`;
                    const response = await axios.get(url);
                    if (response.data.display_name) {
                        setAddress(
                            response.data.address.road +
                                ", " +
                                response.data.address.city +
                                ", " +
                                response.data.address.state
                        );
                    } else {
                        console.error("No address found");
                    }
                } catch (err) {
                    console.error(err);
                }
            };

            setLocation([latitude, longitude]);
            fetchAddress();
        }

        getCurrentLocation();
    }, []);
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
        };

        let end = user.accountType == "mechanic" ? "mechanic" : "drivers";
        // get the location of the user
        axios.patch(process.env.EXPO_PUBLIC_URL + "api/v1/" + end + "/" + user._id, {
            location: location,
        });
        console.log(location);
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
