import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import OnboardButton from "@/components/ui/OnboardButton";
import { useAuth } from "@/hooks/useAuth";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";

export default function index() {
    const { user } = useAuth();
    const {initialFirstName, initialLastName, initialPhoneNumber} = useLocalSearchParams();
    const [firstName, setFirstName] = useState(initialFirstName as string || "");
    const [lastName, setLastName] = useState(initialLastName as string || "");
    const [phone, setPhone] = useState(initialPhoneNumber as string || "");
    const router = useRouter();

    const handleContinue = async () => {

        console.log(firstName);
        console.log(lastName);

        console.log(phone);
        const url = process.env.EXPO_PUBLIC_API_URL + "/" + user.accountType + "s/" + user._id
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                phoneNumber: phone
            })  
        })
        if (!response.ok) {
            alert("Failed to update")
        }
        router.push("/registerPfp");
    };

    return (
        <View style={style.frame}>
            <View style={style.content}>
                <View style={style.textFrame}>
                    <Text style={style.text}>Tell us more about yourself</Text>
                    <View style={{ marginTop: 24, gap: 20 }}>
                        <View style={style.inputFrame}>
                            <View style={style.yourNameBox}>
                                <Text style={style.yourName}>First name</Text>
                                <TextInput
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    placeholder="Abhik"
                                    style={style.input}
                                />
                            </View>
                        </View>
                        <View style={style.inputFrame}>
                            <View style={style.yourNameBox}>
                                <Text style={style.yourName}>Last name</Text>
                                <TextInput
                                    value={lastName}
                                    onChangeText={setLastName}
                                    placeholder="Ray"
                                    style={style.input}
                                />
                            </View>
                        </View>
                        <View style={style.inputFrame}>
                            <View style={style.yourNameBox}>
                                <Text style={style.yourName}>Phone Number</Text>
                                <TextInput
                                    value={phone}
                                    onChangeText={setPhone}
                                    placeholder="6097751922"
                                    style={style.input}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ width: "100%" }}>
                <OnboardButton
                    title="Continue"
                    color="#082a74"
                    textColor="#FFFFFF"
                    href="/registerPfp"
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
        gap: 145,
    },
    content: {
        width: "90%",
        maxWidth: 400,
        flexDirection: "column",
        alignItems: "stretch",
    },
    textFrame: {
        width: "100%",
        marginBottom: 20,
        top: "10%",
        gap: 20,
    },
    text: {
        textAlign: "center",
        alignSelf: "stretch",
        fontSize: 24,
        fontWeight: "500",
        fontFamily: "Outfit",
    },
    input: {
        borderRadius: 7,
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        height: 45,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 3,
        alignSelf: "stretch",
    },
    inputFrame: {
        // width: "100%",
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
        gap: 5,
        alignSelf: "stretch",
    },
});
