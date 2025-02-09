import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { ThemedText } from "@/components/ThemedText";
import OnboardButton from "@/components/ui/OnboardButton";
import { useAuth } from "@/hooks/useAuth";
import { create } from "react-test-renderer";
import axios from "axios";

import * as Location from "expo-location";
import { router } from "expo-router";

interface ServiceProps {
    service: string;
    [key: string]: any;
}

const API_KEY = "67a807c9155ac060356032aksc02680";

export default function Service() {
    const [location, setLocation] = useState<any | null>(null);
    const [address, setAddress] = useState<string | null>(null);

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

    const { service } = useLocalSearchParams();
    const { createJob, user } = useAuth();

    const [color, setColor] = useState("green");
    const convertColorToUrgency = (color: string) => {
        if (color === "green") {
            return "High";
        } else if (color === "yellow") {
            return "Medium";
        } else {
            return "Low";
        }
    };
    console.log(createJob?.service);
    const handleContinue = () => {
        axios
            .post(process.env.EXPO_PUBLIC_URL + "/api/v1/jobs/", {
                location: location,
                address: address,
                picture: [createJob?.picture],
                requester: user._id,
                jobType: createJob?.service,
                requestType: "Live",
                urgency: convertColorToUrgency(color),
                money: parseFloat(createJob?.budget),
                details: createJob?.details,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        router.push("/home/backtohome");
    };

    return (
        <View style={{ flex: 1, alignItems: "left", justifyContent: "center", flexDirection: "column", top: -50 }}>
            <View>
                <ThemedText type="title">Let us know if we got your request right!</ThemedText>
            </View>
            <View
                style={{
                    flexDirection: "column",
                    gap: 24,
                    marginTop: 24,
                }}>
                <ThemedText style={{ fontSize: 20 }}>Urgency: {convertColorToUrgency(createJob?.color)}</ThemedText>
                <ThemedText style={{ fontSize: 20 }}>Where: {address}</ThemedText>
                <ThemedText style={{ fontSize: 20 }}>Budget: ${createJob?.budget}</ThemedText>
                <ThemedText style={{ fontSize: 20 }}>
                    Notes:
                    {createJob?.details}
                </ThemedText>
                <ThemedText style={{ fontSize: 20 }}>Photo:</ThemedText>
                <Image
                    source={{
                        uri:
                            createJob?.picture ||
                            "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg",
                    }}
                    style={{ width: "100%", height: 250, paddingRight: 32 }}
                />
            </View>
            <View style={{ width: "120%", marginTop: 16 }}>
                <OnboardButton title="Accept" color="#082a74" textColor="#FFFFFF" onPress={handleContinue} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        gap: 27,
    },
    services: {
        fontSize: 24,
    },
    text: {
        alignSelf: "stretch",
        fontSize: 20,
        fontWeight: "300",
        fontFamily: "Outfit-Light",
        color: "#000",
        textAlign: "left",
    },
    inputWrapper: {
        gap: 14,
    },
    urgency: {
        flex: 1,
        flexDirection: "row",
        gap: 14,
    },
});
