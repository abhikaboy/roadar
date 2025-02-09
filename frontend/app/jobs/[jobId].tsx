import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function JobDetailsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const job = params?.job ? JSON.parse(params.job) : null;

    if (!job) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>❌ Job not found</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* 🔙 Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            {/* 🔹 Title Below Back Button */}
            <Text style={styles.title}>{job.type}</Text>

            {/* 🔹 Job Information Section */}
            <View style={styles.infoContainer}>
                <Text style={styles.date}>
                    {job.status === "completed" ? `From ${job.date}` : `Scheduled for ${job.date}`}
                </Text>
                <Text style={styles.description}>Description: This is the description for your repair.</Text>
                <Text style={styles.costLabel}>
                    {job.status === "completed" ? "Cost of Repair:" : "Budget:"} ${job.amount}
                </Text>
            </View>

            {/* 🔹 Searching Status */}
            {job.status === "searching" && (
                <View style={styles.section}>
                    <View style={styles.imageContainer}>
                        <Text style={styles.imageLabel}>Before</Text>
                        <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.image} />
                    </View>
                    <Text style={styles.label}>Repaired by:</Text>
                    <View style={styles.searchingBox}>
                        <MaterialIcons name="search" size={40} color="#6C757D" />
                        <Text style={styles.searchingText}>
                            Looks like we’re still searching for a mechanic for you. Stay on the lookout for when we
                            notify you!
                        </Text>
                    </View>
                </View>
            )}

            {/* 🔹 Found Status */}
            {job.status === "found" && (
                <View style={styles.section}>
                    <View style={styles.imageContainer}>
                        <Text style={styles.imageLabel}>Before</Text>
                        <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.image} />
                    </View>
                    <View style={styles.foundContainer}>
                        <Text style={styles.label}>Repaired by:</Text>
                        <View style={styles.mechanicCard}>
                            <Image source={{ uri: "https://via.placeholder.com/50" }} style={styles.avatar} />
                            <View>
                                <Text style={styles.mechanicName}>{job.mechanic || "Pending"}</Text>
                                <Text style={styles.mechanicEmail}>bobbypalazzi@gmail.com</Text>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, styles.deny]}>
                                <Text style={styles.buttonText}>Deny</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.accept]}>
                                <Text style={styles.buttonText}>Accept</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

            {/* 🔹 Completed (Historical) Status */}
            {job.status === "completed" && (
                <View style={styles.section}>
                    {/* 🔹 Mechanic Info */}
                    <Text style={styles.label}>Repaired by:</Text>
                    <View style={styles.mechanicCard}>
                        <Image source={{ uri: "https://via.placeholder.com/50" }} style={styles.avatar} />
                        <View>
                            <Text style={styles.mechanicName}>{job.mechanic || "Unknown Mechanic"}</Text>
                            <Text style={styles.mechanicEmail}>bobbypalazzi@gmail.com</Text>
                        </View>
                    </View>

                    {/* 🔹 Before & After Images - Moved Right Below Mechanic Info */}
                    <View style={styles.imageRow}>
                        <View style={styles.imageWrapper}>
                            <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.image} />
                            <Text style={styles.imageLabel}>Before</Text>
                        </View>
                        <View style={styles.imageWrapper}>
                            <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.image} />
                            <Text style={styles.imageLabel}>After</Text>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: "#fff", alignItems: "flex-start" },

    /* 🔙 Back Button */
    backButton: { position: "absolute", top: 20, left: 15, zIndex: 10 },

    /* 🔹 Title Below Back Button */
    title: { fontSize: 24, fontWeight: "bold", marginTop: 50, marginBottom: 5, alignSelf: "flex-start" },

    infoContainer: { width: "100%", marginBottom: 20 },
    date: { fontSize: 16, marginBottom: 5 },
    description: { fontSize: 16, marginBottom: 10 },
    costLabel: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },

    /* 🔹 Section for Searching, Found, and Completed */
    section: { width: "100%", marginBottom: 20 },

    /* 🔹 Searching Status */
    searchingBox: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#F3F4F6",
        borderRadius: 10,
    },
    searchingText: { fontSize: 16, marginLeft: 10, color: "#555", flex: 1 },

    /* 🔹 Found Status */
    foundContainer: { width: "100%", marginBottom: 20 },
    mechanicCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#F3F4F6",
    },
    avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
    mechanicName: { fontSize: 16, fontWeight: "bold" },
    mechanicEmail: { fontSize: 14, color: "#555" },

    /* 🔹 Before & After Images (Moved Higher) */
    imageRow: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 10 },
    imageWrapper: { alignItems: "center", width: "48%" },

    /* 🔹 Image Section */
    imageContainer: { width: "100%", marginBottom: 20 },
    imageLabel: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
    image: { width: "100%", height: 200, borderRadius: 10, resizeMode: "cover" },

    /* 🔹 Accept/Deny Buttons */
    buttonContainer: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 10 },
    button: { padding: 10, borderRadius: 5, alignItems: "center", width: "48%" },
    accept: { backgroundColor: "#42AE54" },
    deny: { backgroundColor: "#FF6969" },
    buttonText: { color: "#fff", fontWeight: "bold" },

    label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
    errorText: { fontSize: 18, color: "red", textAlign: "center", marginTop: 20 },
});
