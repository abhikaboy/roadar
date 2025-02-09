import { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ActiveTag } from "@/components/ui/ActiveTag";
import JobCard from "@/components/jobCard";
import React from "react";
import axios from "axios";
import { useRouter } from "expo-router";
import MechanicJobCard from "@/components/jobCard";

export type Job = {
    id: string;
    location: number[];
    address: string;
    picture?: string[];
    type: string;
    requestType: string;
    urgency: string;
    amount: number;
    userId: string;
    description: string;
    status: string;
    timestamp: string;
    driver?: {
        id: string;
        name: string;
        rating?: number;
    } | null;
};

const parseId = (str: string) => (str === "000000000000000000000000" ? null : str);

export default function MechanicHome() {
    const router = useRouter();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [mechanicProfile, setMechanicProfile] = useState<{ active: boolean }>({ active: true });

    useEffect(() => {
        const fetchOnline = async () => {
            try {
                let id = "507f1f77bcf86cd799439011";
                const response = await axios.get(`${process.env.EXPO_PUBLIC_URL}/api/v1/mechanics/${id}/online`);
                console.log(response.data);

                setMechanicProfile({ active: response.data.active });
            } catch (err) {
                console.error(err);
            }
        };

        fetchOnline();
    }, []);

    

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                let id = "507f1f77bcf86cd799439011";
                const response = await axios.get(`${process.env.EXPO_PUBLIC_URL}/api/v1/jobs/requester/${id}`);
                console.log(response);
                if (response.data.length > 0) {
                    const formattedJobs = response.data.map((job: any) => ({
                        id: job._id,
                        location: job.location || [0, 0],
                        address: job.address || "Unknown location",
                        picture: job.picture || [],
                        type: job.JobType,
                        requestType: job.requestType,
                        urgency: job.urgency,
                        description: job.details,
                        amount: job.money,
                        status: job.status,
                        timestamp: new Date(job.timestamp).toISOString(),
                        userId: job.requester,
                        driver: job.requester,
                    }));

                    setJobs(formattedJobs);
                } else {
                    setJobs([
                        {
                            id: "mock1",
                            location: [42.3601, -71.0589],
                            address: "Boston, MA",
                            picture: [],
                            type: "Flat Tire",
                            requestType: "Emergency",
                            urgency: "High",
                            description: "Flat tire on the highway, need assistance ASAP!",
                            amount: 50,
                            status: "Open",
                            timestamp: new Date().toISOString(),
                            userId: "mockUser1",
                            driver: { id: "mockDriver1", name: "John Doe", rating: 4.5 },
                        },
                        {
                            id: "mock2",
                            location: [34.0522, -118.2437],
                            address: "Los Angeles, CA",
                            picture: [],
                            type: "Battery Jumpstart",
                            requestType: "Standard",
                            urgency: "Medium",
                            description: "Car won't start, need a battery jump.",
                            amount: 30,
                            status: "Open",
                            timestamp: new Date().toISOString(),
                            userId: "mockUser2",
                            driver: { id: "mockDriver2", name: "Jane Smith", rating: 4.8 },
                        },
                    ]);
                }
            } catch (err) {
                console.error("Error fetching jobs:", err);
            }
        };

        fetchJobs();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <ThemedText type="title">Roadar</ThemedText>
                    </View>

                    <View style={styles.statusContainer}>
                        <View style={styles.row}>
                            <ThemedText type="subtitle">Your Status: </ThemedText>
                            <ActiveTag active={mechanicProfile.active} />
                        </View>
                        <View style={styles.mechanicToggle}>
                            <ThemedText type="subtitle">Switch your status: </ThemedText>
                            <Switch
                                value={mechanicProfile.active}
                                onValueChange={() => setMechanicProfile((prev) => ({ active: !prev.active }))}
                                trackColor={{ false: "#767577", true: "#002366" }}
                                thumbColor={mechanicProfile.active ? "#fff" : "#f4f3f4"}
                            />
                        </View>
                    </View>

                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <MechanicJobCard
                                key={job.id}
                                picture={job.picture?.[0] || require("@/assets/images/Robert.png")}
                                type={job.type}
                                driver={job.driver?.name || "Unknown"}
                                budget={job.amount}
                                lat={job.location[0]}
                                lon={job.location[1]}
                            />
                        ))
                    ) : (
                        <Text style={styles.noJobsText}>No jobs available</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    container: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        height: "100%",
        alignItems: "flex-start",
        padding: 20,
    },
    header: {
        marginBottom: 20,
        width: "100%",
    },
    statusContainer: {
        width: "100%",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "flex-start",
        marginBottom: 10,
    },
    mechanicToggle: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginTop: 10,
    },
    scrollContainer: {
        paddingBottom: 50,
        alignItems: "flex-start",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    noJobsText: {
        fontSize: 18,
        color: "#555",
        marginTop: 20,
    },
});
