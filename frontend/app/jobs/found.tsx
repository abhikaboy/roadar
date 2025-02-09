import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function FoundJobScreen() {
    const { jobId } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Spark Plug Repair</Text>
            <Text>Scheduled for September 21st, 2025</Text>
            <Text>Suggested Cost: $160</Text>
            <Text>Description: This is the description that you have given for this particular repair.</Text>
            <Image
                source={{ uri: "https://miro.medium.com/v2/resize:fit:736/1*YqfVlyCe06DfcPsR3kpYrw.jpeg" }}
                style={styles.image}
            />
            <Text>Repaired by:</Text>
            <View style={styles.mechanicCard}>
                <Image
                    source={{ uri: "https://miro.medium.com/v2/resize:fit:736/1*YqfVlyCe06DfcPsR3kpYrw.jpeg" }}
                    style={styles.mechanicImage}
                />
                <Text>Mechanic Bobby Palazzi</Text>
                <Text>bobbypalazzi@gmail.com</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.deny]}>
                    <Text>Deny</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, alignItems: "center", justifyContent: "center" },
    title: { fontSize: 22, fontWeight: "bold" },
    image: { width: 150, height: 150, marginVertical: 10 },
    mechanicCard: { padding: 10, alignItems: "center", marginVertical: 10 },
    mechanicImage: { width: 50, height: 50, borderRadius: 25 },
    buttonContainer: { flexDirection: "row", marginTop: 10 },
    button: { padding: 10, backgroundColor: "green", marginHorizontal: 5 },
    deny: { backgroundColor: "red" },
});
