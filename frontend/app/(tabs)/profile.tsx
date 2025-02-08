import { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function ProfileScreen() {
    const { id } = useLocalSearchParams();
    const [userProfile, setUserProfile] = useState<{
        profilePic: string;
        name: string;
        vehicles: string;
        phone: string;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserProfile = async () => {
            // Simulated mock user profile since backend isn't built
            const mockProfileData = {
                profilePic: "https://via.placeholder.com/100",
                name: "John Doe",
                vehicles: "Tesla Model 3, BMW X5",
                phone: "(123) 456-7890",
            };
            setUserProfile(mockProfileData);
            setLoading(false);
        };
        getUserProfile();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    if (!userProfile) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>User profile not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: userProfile.profilePic }} style={styles.profilePic} />
            <Text style={styles.name}>{userProfile.name}</Text>
            <Text style={styles.info}>Vehicles: {userProfile.vehicles}</Text>
            <Text style={styles.info}>Phone: {userProfile.phone}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#f5f5f5" },
    profilePic: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
    name: { fontSize: 20, fontWeight: "bold" },
    info: { fontSize: 16, marginTop: 5 },
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    errorText: { fontSize: 18, color: "red" },
});
