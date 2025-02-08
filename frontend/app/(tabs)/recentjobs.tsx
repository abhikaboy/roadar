import React, { useEffect, useState, useMemo } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import JobCard from "@/components/ui/JobCard";

const screenHeight = Dimensions.get("window").height;
const cardHeight = screenHeight / 6; // Reduce height to decrease space between cards

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
                    <View key={job.id} style={[styles.cardWrapper, { height: cardHeight }]}>
                        <JobCard
                            job={job}
                            onPress={() => router.push({ pathname: "/repair-details", params: { repair: job } })}
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
                            onPress={() => router.push({ pathname: "/repair-details", params: { repair: job } })}
                        />
                    </View>
                ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: { flexGrow: 1, padding: 20, backgroundColor: "#fff" },
    sectionTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    subTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 5 },
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    cardWrapper: { justifyContent: "center", alignItems: "center", marginBottom: 10 },

    // Move budget further to the right
    rightMiddle: {
        width: "40%",
        alignItems: "flex-end",
        marginRight: 75, // ✅ Moved budget section further right
    },

    // Status container now positioned at the bottom-right
    statusContainer: {
        position: "absolute",
        bottom: 5, // ✅ Move it all the way to the bottom
        right: 5, // ✅ Move it all the way to the right
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
    },
    statusCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    foundCircle: { backgroundColor: "#28A745" },
    searchingCircle: { backgroundColor: "#D32F2F" },
    foundStatus: { backgroundColor: "#E0F7E9" },
    searchingStatus: { backgroundColor: "#FFE3E3" },
    statusText: { fontSize: 14, fontWeight: "bold" },
});
