import { Button, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter, useSearchParams } from "expo-router/build/hooks";
import { useNavigation } from "expo-router";
import UrgencyCircle from "@/components/ui/UrgencyCircle";
import OnboardButton from "@/components/ui/OnboardButton";

interface ServiceProps {
    service: string;
    [key: string]: any;
}

export default function Service() {
    const { service } = useLocalSearchParams();
    const router = useRouter();

    const [budget, setBudget] = useState("");
    const [color, setColor] = useState("green");
    const [details, setDetails] = useState("")

    const changeColor = (col) => {
        setColor(col);
        console.log(color);
    };

    const handleContinue = () => {
        console.log(budget),
        console.log(color)
        console.log(details)
        router.push("/home/sendImage")
    }

    return (
        <View style={styles.content}>

            <Text style={styles.services}>A few extra notes on your {service}...</Text>
            <View>
                <View style={styles.inputWrapper}>
                    <Text style={styles.text}>Urgency</Text>
                    <View style={styles.urgency}>
                        {color == "green" ? (
                            <UrgencyCircle color="#5cff95" active={true} />
                        ) : (
                            <UrgencyCircle
                                color="#5cff95"
                                active={false}
                                onPress={() => {
                                    changeColor("green");
                                }}
                            />
                        )}
                        {color == "yellow" ? (
                            <UrgencyCircle color="#ffff5c" active={true} />
                        ) : (
                            <UrgencyCircle
                                color="#ffff5c"
                                active={false}
                                onPress={() => {
                                    changeColor("yellow");
                                }}
                            />
                        )}
                        {color == "red" ? (
                            <UrgencyCircle color="#ff5c5f" active={true} />
                        ) : (
                            <UrgencyCircle
                                color="#ff5c5f"
                                active={false}
                                onPress={() => {
                                    changeColor("red");
                                }}
                            />
                        )}
                    </View>
                    <Text style={styles.text}>Budget</Text>
                    <TextInput
                        value={budget}
                        placeholder="$50"
                        style={styles.input}
                        onChangeText={setBudget}
                    />
                    <Text style={styles.text}>Notes</Text>
                    <TextInput
                        value={details}
                        placeholder="Put your details here"
                        style={[styles.input, {height: '25%'}]}
                        onChangeText={setDetails}
                    />
                </View>
                
            </View>
            <View style={styles.buttonContainer}>
                    <OnboardButton
                        title="Continue"
                        color="#000042"
                        textColor="#000"
                        onPress={handleContinue} // Use the function here
                    />
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    title: {
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
        flexDirection: "column"
    },
    urgency: {
        flexDirection: "row",
        gap: 14,
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
        width: '90%',
    },
    buttonContainer: {
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically (if needed)
        marginTop: 100, // Add some space above the button
    },
});
