import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function JobDetailsScreen() {
    const { jobId } = useLocalSearchParams();

    const jobData = [
        {
            id: 1,
            type: "Spark Plug Repair",
            mechanic: "Bobby Palazzi",
            date: "2025-09-21",
            amount: 160,
            status: "found",
        },
        { id: 2, type: "Spark Plug Repair", mechanic: undefined, date: "2025-09-21", amount: 160, status: "searching" },
        {
            id: 3,
            type: "Spark Plug Repair",
            mechanic: "Bobby Palazzi",
            date: "2025-09-21",
            amount: 160,
            status: "completed",
        },
    ];

    const job = jobData.find((j) => j.id.toString() === jobId);

    if (!job) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Job not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{job.type}</Text>
            <Text style={styles.date}>
                {job.status === "completed" ? "From" : "Scheduled for"} {job.date}
            </Text>
            <Text>Description: This is the description that you have given for this repair.</Text>
            <Text>Cost: ${job.amount}</Text>

            {job.status === "searching" && <Text>🔍 Looks like we're still searching for a mechanic.</Text>}

            {job.status === "found" && (
                <>
                    <Text>Our searches paid off! We've found a mechanic for you.</Text>
                    <View style={styles.mechanicCard}>
                        <Text>Mechanic: {job.mechanic}</Text>
                        <TouchableOpacity style={styles.button}>
                            <Text>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.deny]}>
                            <Text>Deny</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            {job.status === "completed" && (
                <>
                    <Text>Repaired by: {job.mechanic}</Text>
                    <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.image} />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, alignItems: "center", justifyContent: "center" },
    title: { fontSize: 22, fontWeight: "bold" },
    date: { fontSize: 16, marginVertical: 5 },
    mechanicCard: { padding: 10, alignItems: "center", marginVertical: 10 },
    button: { padding: 10, backgroundColor: "green", marginHorizontal: 5 },
    deny: { backgroundColor: "red" },
    errorText: { fontSize: 18, color: "red" },
    image: { width: 150, height: 150, marginVertical: 10 },
});
