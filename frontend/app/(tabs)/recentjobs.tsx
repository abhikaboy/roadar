import React, { useEffect, useState, useMemo } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import JobCard from "@/components/ui/JobCard";
import axios from "axios";

const screenHeight = Dimensions.get("window").height;
const cardHeight = screenHeight / 6.5; // Adjust card height for better spacing

export default function RecentJobsScreen() {
    const router = useRouter();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                console.log("Fetching jobs from:", process.env.EXPO_PUBLIC_URL);

                if (!process.env.EXPO_PUBLIC_URL) {
                    throw new Error("EXPO_PUBLIC_URL is undefined. Check your environment variables.");
                }

                let response = await axios.get(`${process.env.EXPO_PUBLIC_URL}/api/v1/jobs`);

                console.log("Response received:", response.data); // ✅ Log API response

                const jobsData = response.data.map((job: any) => ({
                    id: job._id || job.id, // Ensure correct ID mapping
                    type: job.JobType || job.type, // Handle variations in API response
                    mechanic: job.mechanic || "Not Assigned",
                    date: job.timestamp ? new Date(job.timestamp).toLocaleDateString() : "Unknown Date",
                    amount: job.money || job.amount || 0, // Handle missing data
                    status: job.status?.toLowerCase() || "searching", // Convert status to lowercase
                    userId: job.requester || job.userId,
                }));

                setJobs(jobsData);
            } catch (error: any) {
                console.error("❌ Error fetching jobs:", error.message || error);
                setError("Failed to load jobs. Please check your API connection.");
                setJobs(mockJobs); // Fallback to mock data
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.sectionTitle}>Your Jobs</Text>

            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Active Jobs Section */}
            <Text style={styles.subTitle}>Active Jobs</Text>
            {jobs
                .filter((job) => job.status !== "completed")
                .map((job) => (
                    <View key={job.id} style={[styles.cardWrapper, { minHeight: cardHeight }]}>
                        <JobCard
                            job={job}
                            onPress={() => router.push(`/jobs/${job.id}`)} // ✅ Pass only job ID
                        />

                        {/* Status container moved to the bottom-right */}
                        <View
                            style={[
                                styles.statusContainer,
                                job.status === "found" ? styles.foundStatus : styles.searchingStatus,
                            ]}>
                            <View
                                style={[
                                    styles.statusCircle,
                                    job.status === "found" ? styles.foundCircle : styles.searchingCircle,
                                ]}
                            />
                            <Text style={styles.statusText}>{job.status}</Text>
                        </View>
                    </View>
                ))}

            {/* Past Jobs Section */}
            <Text style={styles.subTitle}>Past Jobs</Text>
            {jobs
                .filter((job) => job.status === "completed")
                .map((job) => (
                    <View key={job.id} style={[styles.cardWrapper, { height: cardHeight }]}>
                        <JobCard
                            job={job}
                            onPress={() => router.push(`/jobs/${job.id}`)} // ✅ Pass only job ID
                        />
                    </View>
                ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: { flexGrow: 1, padding: 20, backgroundColor: "#fff", fontFamily: "Outfit" },
    sectionTitle: { fontSize: 32, fontWeight: "medium", marginBottom: 10, marginTop: "20%", fontFamily: "Outfit" },
    subTitle: { fontSize: 24, fontWeight: "medium", marginTop: 20, marginBottom: 5, fontFamily: "Outfit" },
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    cardWrapper: { justifyContent: "center", alignItems: "center", marginBottom: 0 },
    statusContainer: {
        position: "absolute",
        bottom: 5,
        right: 5,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: { width: -0.5, height: 0.5 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2,
        fontFamily: "Outfit",
    },
    statusCircle: { width: 10, height: 10, borderRadius: 5, marginRight: 5 },
    foundCircle: { backgroundColor: "#28A745" },
    searchingCircle: { backgroundColor: "#D32F2F" },
    foundStatus: { backgroundColor: "#E0F7E9" },
    searchingStatus: { backgroundColor: "#FFE3E3" },
    statusText: { fontSize: 14, fontWeight: "bold" },
    errorText: { fontSize: 16, color: "red", textAlign: "center", marginTop: 10 },
});
