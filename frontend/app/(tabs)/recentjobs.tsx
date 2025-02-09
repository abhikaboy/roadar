import React, { useEffect, useState, useMemo } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import JobCard from "@/components/ui/JobCard";
import { ThemedText } from "@/components/ThemedText";

const screenHeight = Dimensions.get("window").height;
const cardHeight = screenHeight / 6.5; // Adjust card height for better spacing

export type Job = {
    id: number;
    type: string;
    mechanic?: string;
    date?: string;
    amount: number;
    status: "searching" | "found" | "completed";
    userId: number;
};

export default function RecentJobsScreen() {
    const router = useRouter();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    // Mock job data
    const mockJobs: Job[] = useMemo(
        () => [
            {
                id: 1,
                type: "Oil Change",
                mechanic: "John Doe",
                date: "2024-02-10",
                amount: 160,
                status: "found",
                userId: 101,
            },
            {
                id: 2,
                type: "Brake Repair",
                mechanic: undefined,
                date: "2024-02-12",
                amount: 180,
                status: "searching",
                userId: 102,
            },
            {
                id: 3,
                type: "Tire Replacement",
                mechanic: "Jane Smith",
                date: "2024-02-05",
                amount: 200,
                status: "completed",
                userId: 103,
            },
        ],
        []
    );

    useEffect(() => {
        setJobs(mockJobs);
        setLoading(false);
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

            {/* Active Jobs Section */}
            <Text style={styles.subTitle}>Active Jobs</Text>
            {jobs
                .filter((job) => job.status !== "completed")
                .map((job) => (
                    <View key={job.id} style={[styles.cardWrapper, { minHeight: cardHeight }]}>
                        <JobCard
                            job={job}
                            onPress={() => {
                                router.push({
                                    pathname: `/jobs/${job.id}`,
                                    params: {
                                        jobId: job.id.toString(),
                                        type: job.type,
                                        mechanic: job.mechanic || "",
                                        date: job.date || "",
                                        amount: job.amount.toString(),
                                        status: job.status,
                                    },
                                });
                            }}
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
                            onPress={() => {
                                router.push({
                                    pathname: `/jobs/${job.id}`,
                                    params: {
                                        jobId: job.id.toString(),
                                        type: job.type,
                                        mechanic: job.mechanic || "",
                                        date: job.date || "",
                                        amount: job.amount.toString(),
                                        status: job.status,
                                    },
                                });
                            }}
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
});
