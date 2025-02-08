import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function CompletedJobScreen() {
    const { jobId } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Spark Plug Repair</Text>
            <Text>Completed on September 21st, 2025</Text>
            <Text>Cost: $160</Text>
            <Text>Description: This is the description that you have given for this particular repair.</Text>
            <Text>Repaired by:</Text>
            <View style={styles.mechanicCard}>
                <Image source={{ uri: "https://via.placeholder.com/50" }} style={styles.mechanicImage} />
                <Text>Mechanic Bobby Palazzi</Text>
                <Text>bobbypalazzi@gmail.com</Text>
            </View>
            <Text>Before</Text>
            <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.image} />
            <Text>After</Text>
            <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, alignItems: "center", justifyContent: "center" },
    title: { fontSize: 22, fontWeight: "bold" },
    image: { width: 150, height: 150, marginVertical: 10 },
    mechanicCard: { padding: 10, alignItems: "center", marginVertical: 10 },
    mechanicImage: { width: 50, height: 50, borderRadius: 25 },
});
