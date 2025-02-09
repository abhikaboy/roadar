import { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch, Image, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ActiveTag } from "@/components/ui/ActiveTag";
import JobCard from "@/components/jobCard";
import MechanicalProfileCombined from "@/components/MechanicalProfileCombined";
import React from "react";

export default function MechanicHome() {
    const [mechanicProfile, setMechanicProfile] = useState<{
        profilePic: any;
        name: string;
        active: boolean;
        lat: number;
        lon: number;
    } | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulated mock user profile since backend isn't built
        const mockProfileData = {
            profilePic: require("@/assets/images/Robert.png"),
            name: "John Doe",
            active: true,
            lat: 42.3555,
            lon: -71.0565,
        };
        setMechanicProfile(mockProfileData);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    if (!mechanicProfile) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>User profile not found</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <ThemedText type="title">Roadar</ThemedText>
                    </View>
                    <View style={styles.row}>
                        <ThemedText type="subtitle">Your Status: </ThemedText>
                        <ActiveTag active={mechanicProfile.active} />
                    </View>
                    <View style={styles.mechanicToggle}>
                        <ThemedText type="subtitle">Switch your status: </ThemedText>

                        <Switch
                            value={mechanicProfile.active}
                            onValueChange={() =>
                                setMechanicProfile((prev) => (prev ? { ...prev, active: !prev.active } : null))
                            }
                            trackColor={{ false: "#767577", true: "#002366" }}
                            thumbColor={mechanicProfile.active ? "#fff" : "#f4f3f4"}
                        />
                    </View>
                    <JobCard
                        picture={require("@/assets/images/Robert.png")}
                        type="Flat Tire"
                        driver="Dennis Liu"
                        budget={500}
                        lat={42.3555}
                        lon={-71}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        height: "100%",
        alignItems: "center",
        padding: 10,
    },
    header: {
        marginBottom: 20,
        textAlign: "left",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "flex-start",
        marginBottom: 10,
    },
    mechanicToggle: {
        justifyContent: "flex-start",
        flexDirection: "row",
        gap: 12,
        marginTop: 10,
    },
    scrollContainer: {
        paddingBottom: 50,
        alignItems: "center",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        fontSize: 18,
        color: "red",
    },
});
