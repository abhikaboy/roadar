import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function SearchingJobScreen() {
    const { jobId } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Spark Plug Repair</Text>
            <Text>Scheduled for September 21st, 2025</Text>
            <Text>Budget: $160</Text>
            <Text>Description: This is the description that you have given for this particular repair.</Text>
            <Image
                source={{ uri: "https://miro.medium.com/v2/resize:fit:736/1*YqfVlyCe06DfcPsR3kpYrw.jpeg" }}
                style={styles.image}
            />
            <Text style={styles.status}>We’re still searching for a mechanic for this repair.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, alignItems: "center", justifyContent: "center" },
    title: { fontSize: 22, fontWeight: "bold" },
    image: { width: 150, height: 150, marginVertical: 10 },
    status: { fontSize: 16, marginTop: 10, textAlign: "center" },
});
