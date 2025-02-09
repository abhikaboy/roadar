/* eslint-disable import/no-unresolved */

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
            <Text style={styles.title}>Your {job.type} Repair</Text>

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
            {job.status === "pending" && (
                <View style={styles.section}>
                    <View style={styles.imageContainer}>
                        <Text style={styles.imageLabel}>Before</Text>
                        <Image
                            source={{ uri: "https://miro.medium.com/v2/resize:fit:736/1*YqfVlyCe06DfcPsR3kpYrw.jpeg" }}
                            style={styles.image}
                        />
                    </View>
                    <Text style={styles.label}>Repaired by:</Text>
                    <View style={styles.searchingBox}>
                        <Image source={require("@/assets/images/search3d.png")} style={styles.avatar} />

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
                        <Image
                            source={{ uri: "https://miro.medium.com/v2/resize:fit:736/1*YqfVlyCe06DfcPsR3kpYrw.jpeg" }}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.foundContainer}>
                        <View style={styles.mechanicCard}>
                            <View
                                style={{
                                    flexDirection: "column",
                                    gap: 19,
                                }}>
                                <Text style={styles.label}>Repaired by:</Text>
                                <Text>
                                    Our searches paid off! We’ve found a mechanic for you. Check out their profile below
                                    and let us know if you want them to take on this repair!
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}>
                                    <Image
                                        source={{
                                            uri: "https://miro.medium.com/v2/resize:fit:736/1*YqfVlyCe06DfcPsR3kpYrw.jpeg",
                                        }}
                                        style={styles.avatar}
                                    />
                                    <View>
                                        <Text style={styles.mechanicName}>{job.mechanic || "Pending"}</Text>
                                        <Text style={styles.mechanicEmail}>bobbypalazzi@gmail.com</Text>
                                    </View>
                                </View>
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
                        <Image
                            source={{ uri: "https://miro.medium.com/v2/resize:fit:736/1*YqfVlyCe06DfcPsR3kpYrw.jpeg" }}
                            style={styles.avatar}
                        />
                        <View>
                            <Text style={styles.mechanicName}>{job.mechanic || "Unknown Mechanic"}</Text>
                            <Text style={styles.mechanicEmail}>bobbypalazzi@gmail.com</Text>
                        </View>
                    </View>

                    {/* 🔹 Before & After Images - Moved Right Below Mechanic Info */}
                    <View style={styles.imageRow}>
                        <View style={styles.imageWrapper}>
                            <Image
                                source={{
                                    uri: "https://miro.medium.com/v2/resize:fit:736/1*YqfVlyCe06DfcPsR3kpYrw.jpeg",
                                }}
                                style={styles.image}
                            />
                            <Text style={styles.imageLabel}>Before</Text>
                        </View>
                        <View style={styles.imageWrapper}>
                            <Image
                                source={{
                                    uri: "https://miro.medium.com/v2/resize:fit:736/1*YqfVlyCe06DfcPsR3kpYrw.jpeg",
                                }}
                                style={styles.image}
                            />
                            <Text style={styles.imageLabel}>After</Text>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: "#fff", alignItems: "flex-start", fontFamily: "Outfit" },

    /* 🔙 Back Button */
    backButton: { position: "absolute", top: 20, left: 15, zIndex: 10 },

    /* 🔹 Title Below Back Button */
    title: {
        fontSize: 24,
        fontWeight: "semibold",
        marginTop: "30%",
        marginBottom: 5,
        alignSelf: "flex-start",
        fontFamily: "Outfit",
    },

    infoContainer: { width: "100%", marginBottom: 20, fontFamily: "Outfit" },
    date: { fontSize: 20, marginBottom: 5, fontFamily: "Outfit" },
    description: { fontSize: 16, marginBottom: 10, fontFamily: "Outfit", fontWeight: "300" },
    costLabel: { fontSize: 16, fontWeight: "regular", marginBottom: 10, fontFamily: "Outfit" },

    /* 🔹 Section for Searching, Found, and Completed */
    section: { width: "100%", marginBottom: 1 },

    /* 🔹 Searching Status */
    searchingBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    searchingText: { fontSize: 16, marginRight: 10, color: "#555", flex: 1, fontFamily: "Outfit", fontWeight: "400" },

    /* 🔹 Found Status */
    foundContainer: { width: "100%", marginBottom: 20, fontFamily: "Outfit" },
    mechanicCard: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 24,
        borderRadius: 10,
        backgroundColor: "#FaFaFa",
        fontFamily: "Outfit",
        fontSize: 16,
    },
    avatar: { width: 128, height: 128, borderRadius: 25, marginRight: 10 },
    mechanicName: { fontSize: 16, fontWeight: "bold", fontFamily: "Outfit" },
    mechanicEmail: { fontSize: 14, color: "#555", fontFamily: "Outfit" },

    /* 🔹 Before & After Images (Moved Higher) */
    imageRow: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 10 },
    imageWrapper: { alignItems: "center", width: "48%" },

    /* 🔹 Image Section */
    imageContainer: { width: "100%", marginBottom: 20 },
    imageLabel: { fontSize: 16, fontWeight: "medium", marginTop: 5 },
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
