import { useLocalSearchParams, useRouter } from "expo-router";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

export type Job = {
    id: string;
    type: string;
    mechanic?: string;
    date?: string;
    amount: number;
    status: "Pending" | "On The Way" | "In Progress" | "Completed" | "Cancelled";
    userId: string;
    description: string;
    pictures?: string[];
};

export default function JobDetailsScreen() {
    const { id } = useLocalSearchParams(); // Get job ID from URL
    const router = useRouter();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [mechanic, setMechanic] = useState<{
        id: string;
        name: string;
        email: string;
        phoneNumber: string;
        picture: string;
        bio: string;
        rating: number;
        totalRatings: number;
    } | null>(null);

    // 🔹 Hardcoded Mechanic Data (3 Sample Mechanics)
    const mechanics = [
        {
            id: "m1",
            name: "Alex Johnson",
            email: "alex.johnson@example.com",
            phoneNumber: "555-1234",
            picture: "https://randomuser.me/api/portraits/men/32.jpg",
            bio: "Experienced auto mechanic with 10 years of service.",
            rating: 4.8,
            totalRatings: 120,
        },
        {
            id: "m2",
            name: "Maria Rodriguez",
            email: "maria.rodriguez@example.com",
            phoneNumber: "555-5678",
            picture: "https://randomuser.me/api/portraits/women/44.jpg",
            bio: "Passionate about vehicle repair and customer service.",
            rating: 4.9,
            totalRatings: 150,
        },
        {
            id: "m3",
            name: "Jake Thompson",
            email: "jake.thompson@example.com",
            phoneNumber: "555-9101",
            picture: "https://randomuser.me/api/portraits/men/76.jpg",
            bio: "Specialist in engine diagnostics and repairs.",
            rating: 4.7,
            totalRatings: 90,
        },
    ];

    // 🔹 Function to randomly select a mechanic
    const assignRandomMechanic = () => {
        const randomMechanic = mechanics[Math.floor(Math.random() * mechanics.length)];
        setMechanic(randomMechanic);
    };

    const rMechanic = useMemo(() => {
        return mechanics[Math.floor(Math.random() * mechanics.length)];
    }, [job?.status]);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                console.log(`Fetching job details for ID: ${id}`);

                const response = await axios.get(`${process.env.EXPO_PUBLIC_URL}/api/v1/jobs/${id}`);
                const jobData = response.data;

                setJob({
                    id: jobData._id,
                    type: jobData.JobType,
                    mechanic: jobData.mechanic || "Not Assigned",
                    description: jobData.details || "No details available",
                    date: new Date(jobData.timestamp).toLocaleDateString(),
                    amount: jobData.money,
                    status: jobData.status,
                    userId: jobData.requester,
                    pictures: jobData.picture || [], // Ensure pictures is an array
                });
            } catch (error) {
                console.error("Error fetching job details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchJobDetails();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    if (!job) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>❌ Job not found</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* 🔙 Back Button (Now Fully Pressable) */}
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                {/* 🔹 Title Below Back Button */}
                <Text style={styles.title}>Your {job.type} Repair</Text>

                {/* 🔹 Job Information Section */}
                <View style={styles.infoContainer}>
                    <Text style={styles.date}>
                        {job.status === "Completed" ? `From ${job.date}` : `Scheduled for ${job.date}`}
                    </Text>
                    <Text style={styles.description}>Description: {job.description}</Text>
                    <Text style={styles.costLabel}>
                        {job.status === "Completed" ? "Cost of Repair:" : "Budget:"} ${job.amount}
                    </Text>
                </View>

                {/* 🔹 Before/After Images from Backend */}
                {job.pictures?.length > 0 && (
                    <View style={styles.imageRow}>
                        <View style={styles.imageWrapper}>
                            <Text style={styles.imageLabel}>Before</Text>
                            <Image source={{ uri: job.pictures[0] }} style={styles.image} />
                        </View>
                        {job.pictures.length > 1 && (
                            <View style={styles.imageWrapper}>
                                <Text style={styles.imageLabel}>After</Text>
                                <Image source={{ uri: job.pictures[1] }} style={styles.image} />
                            </View>
                        )}
                    </View>
                )}

                {/* 🔹 Searching Status - Styled to Match Image */}
                {job.status === "Pending" && (
                    <View style={styles.section}>
                        <Text style={styles.label}>Repaired by:</Text>
                        <View style={styles.searchingBox}>
                            <MaterialIcons name="search" size={40} color="#6C757D" />
                            <Text style={styles.searchingText}>
                                Looks like we’re still searching for a mechanic for you. Stay on the lookout for
                                updates!
                            </Text>
                        </View>
                    </View>
                )}

                {/* 🔹 On The Way*/}
                {job.status === "On The Way" && (
                    <View style={styles.otwContainer}>
                        <Text style={styles.label}>Repaired by:</Text>
                        <Text style={styles.otwText}>
                            Our searches paid off! We’ve found a mechanic for you. Check out their profile below!
                        </Text>
                        <Text style={styles.costLabel}>Suggested Cost: ${job.amount}</Text>
                        <View style={styles.mechanicCard}>
                            <Image
                                source={{
                                    uri: rMechanic.picture,
                                }}
                                style={styles.avatar}
                            />
                            <View>
                                <Text style={styles.mechanicName}>{rMechanic.name || null}</Text>
                                <Text style={styles.mechanicEmail}>{rMechanic.email || "No email provided"}</Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* 🔹 In Progress*/}
                {job.status === "In Progress" && (
                    <View style={styles.section}>
                        <Text style={styles.label}>Being repaired by:</Text>
                        <Text style={styles.searchingText}>Your mechanic is working on your vehicle!</Text>
                        <Text style={styles.costLabel}>Suggested Cost: ${job.amount}</Text>
                        <View style={styles.mechanicCard}>
                            <Image
                                source={{
                                    uri: rMechanic.picture,
                                }}
                                style={styles.avatar}
                            />
                            <View>
                                <Text style={styles.mechanicName}>{rMechanic.name || "No name provided"}</Text>
                                <Text style={styles.mechanicEmail}>{rMechanic.email || "No email provided"}</Text>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
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

    /* 🔹 On the Way Status */
    otwContainer: { width: "100%", marginBottom: 20 },
    mechanicCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#F3F4F6",
    },
    otwText: { fontSize: 16, marginLeft: 10, color: "#555", flex: 1 },
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

    label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
    errorText: { fontSize: 18, color: "red", textAlign: "center", marginTop: 20 },
});
