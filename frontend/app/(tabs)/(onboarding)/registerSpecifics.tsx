import OnboardButton from "@/components/ui/OnboardButton";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

export default function registerSpecifics() {
    const { user } = useAuth();
    const [makeModel, setMakeModel] = useState("");
    const [year, setYear] = useState("");
    const [license, setLicense] = useState("");

    const router = useRouter();

    const handleContinue = async () => {
        console.log(makeModel);

        // api request to add car details
        let [make, model] = makeModel.split(" ");
        let combined = {
            make: make,
            model: model,
            year: parseInt(year),
            licensePlate: license,
            picture: "",
        };

        // \/ remove later
        router.push("/registerDone");


        const url = process.env.EXPO_PUBLIC_API_URL + "/" + "driver" + "s/" + user._id + "/addCar";
        console.log(url);
        const response1 = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...combined,
            }),
        });
        if (!response1.ok) {
            alert("Failed to update");
        }
        console.log(response1);

        // axios
        //     .post(process.env.EXPO_PUBLIC_URL + "/api/v1/drivers/" + user._id + "/addCar", {
        //         ...combined,
        //     })
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        // console.log("ADDING CAR");


        // router.push("/registerDone");
    };

    const handleSkip = () => {
        router.push("/");
    };

    return (
        <View style={style.frame}>
            <View style={style.content}>
                <View style={style.textFrame}>
                    <Text style={style.text}>Let us know the specifics of your vehicle</Text>

                    <View style={style.inputFrame}>
                        <View style={style.yourNameBox}>
                            <Text style={style.yourName}>Make and model of your vehicle</Text>
                            <TextInput
                                value={makeModel}
                                onChangeText={setMakeModel}
                                placeholder="Make and model"
                                style={style.input}
                            />
                        </View>
                    </View>
                    <View style={style.inputFrame}>
                        <View style={style.yourNameBox}>
                            <Text style={style.yourName}>Year of vehicle</Text>
                            <TextInput value={year} onChangeText={setYear} placeholder="Year" style={style.input} />
                        </View>
                    </View>
                    <View style={style.inputFrame}>
                        <View style={style.yourNameBox}>
                            <Text style={style.yourName}>License of your vehicle</Text>
                            <TextInput
                                value={license}
                                onChangeText={setLicense}
                                placeholder="Plate Number"
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
        gap: 60,
    },
    content: {
        width: "80%",
        maxWidth: 400,
        flexDirection: "column",
        alignItems: "stretch",
        marginBottom: 15,
    },
    textFrame: {
        width: "100%",
        marginBottom: 20,
        gap: 15,
    },
    text: {
        alignSelf: "stretch",
        fontSize: 24,
        fontWeight: "500",
        fontFamily: "Outfit-Medium",
        maxWidth: 300,
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
