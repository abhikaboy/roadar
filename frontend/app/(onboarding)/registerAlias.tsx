import OnboardButton from "@/components/ui/OnboardButton";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

export default function registerAlias() {
    const [vehicleName, setVehicleName] = useState("");
    const router = useRouter();

    const handleContinue = () => {
        console.log(vehicleName);
        router.push("/registerSpecifics");
    };

    //TODO make this go to homepage
    const handleSkip = () => {
        router.push("/(onboarding)/registerDone");
    };

    return (
        <View style={style.frame}>
            <View style={style.content}>
                <View style={style.textFrame}>
                    <Text style={style.text}>Want to register for a vehicle?</Text>

                    <View style={style.inputFrame}>
                        <View style={style.yourNameBox}>
                            <Text style={style.yourName}>Let us know what you want your car to be called.</Text>
                        </View>
                    </View>
                    <View style={style.inputFrame}>
                        <View style={style.yourNameBox}>
                            <Text style={style.yourName}>Alias for your vehicle</Text>
                            <TextInput
                                value={vehicleName}
                                onChangeText={setVehicleName}
                                placeholder="Name"
                                style={style.input}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ width: "100%", gap: 10 }}>
                <OnboardButton
                    title="Continue"
                    color="#082a74"
                    textColor="#FFFFFF"
                    href="/registerPfp"
                    onPress={handleContinue}
                />
                <OnboardButton title="Skip" color="#FFFFFF" textColor="#000000" border={true} onPress={handleSkip} />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    frame: {
        justifyContent: "center",
        alignItems: "center",
        gap: 180,
    },
    content: {
        width: "80%",
        maxWidth: 400,
        flexDirection: "column",
        alignItems: "center",
    },
    textFrame: {
        width: "100%",
        marginBottom: 20,
        gap: 36,
    },
    text: {
        textAlign: "center",
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
