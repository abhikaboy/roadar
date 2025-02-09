import OnboardButton from "@/components/ui/OnboardButton";
import { useFonts } from "expo-font";
import { Link,  useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

export default function registerDone() {
    const router = useRouter();

    const handleContinue = () => {
        //CHANGE: ROUTE TO HOME
        router.replace("/(tabs)/home");
    };

    return (
        <View style={style.frame}>
            <View style={style.content}>
                <View style={style.textFrame}>
                    <Text style={style.text}>Great! You've successfully registered on Roadar.</Text>
                    <View style={style.inputFrame}>
                        <View style={style.yourNameBox}>
                            <Text style={style.yourName}>Continue to the home page to see services.</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ width: "100%", gap: 10 }}>
                <OnboardButton
                    title="Bring me to Services"
                    color="#082a74"
                    textColor="#FFFFFF"
                    href="/Explore"
                    onPress={handleContinue}
                />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    frame: {
        justifyContent: "center",
        alignItems: "center",
        gap: 100,
    },
    content: {
        width: "80%",
        maxWidth: 400,
        flexDirection: "column",
        alignItems: "stretch",
        marginBottom: 60,
    },
    textFrame: {
        width: "100%",
        marginBottom: 20,
        gap: 36,
        maxWidth: 300,
    },
    text: {
        alignSelf: "stretch",
        fontSize: 24,
        fontWeight: "500",
        fontFamily: "Outfit-Medium",
    },
    input: {
        borderRadius: 7,
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 3,
        alignSelf: "stretch",
    },
    inputFrame: {
        width: "100%",
        gap: 20,
        alignSelf: "stretch",
    },
    yourName: {
        color: "#000",
        alignSelf: "stretch",
        fontSize: 16,
        fontWeight: "300",
        fontFamily: "Outfit-Light",
        width: "100%",
    },
    yourNameBox: {
        width: 300,
        gap: 11,
        alignSelf: "stretch",
    },
});
