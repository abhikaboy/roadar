import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { ThemedText } from "@/components/ThemedText";
import OnboardButton from "@/components/ui/OnboardButton";

interface ServiceProps {
    service: string;
    [key: string]: any;
}

export default function Service() {
    const { service } = useLocalSearchParams();

    const [color, setColor] = useState("green");

    return (
        <View style={{ flex: 1, alignItems: "left", justifyContent: "center", flexDirection: "column" }}>
            <View>
                <ThemedText type="title">Let us know if we got your request right!</ThemedText>
            </View>
            <View
                style={{
                    flexDirection: "column",
                    gap: 24,
                    marginTop: 24,
                }}>
                <ThemedText style={{ fontSize: 20 }}>Urgency: High</ThemedText>
                <ThemedText style={{ fontSize: 20 }}>Budget: 500</ThemedText>
                <ThemedText style={{ fontSize: 20 }}>
                    Notes: This is the description that you have given for this particular repair.
                </ThemedText>
                <ThemedText style={{ fontSize: 20 }}>Photo:</ThemedText>
                <Image
                    source={{
                        uri: "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg",
                    }}
                    style={{ width: "100%", height: 250 }}
                />
            </View>
            <View>
                <OnboardButton title="Accept" color="#082a74" textColor="#FFFFFF" onPress={() => {}} />
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
