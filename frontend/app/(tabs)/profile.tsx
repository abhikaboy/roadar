import ProfileCombined from "@/components/ProfileCombined";
import { ScrollView, SafeAreaView, Image, ImageSourcePropType } from "react-native";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, StatusBar } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React from "react";

// Sample data for Vehicle List
const vehicleList = {
    vehicles: [
        {
            id: 1,
            name: "Tesla Model S",
            make: "Tesla",
            model: "Model S",
            year: "2022",
            lisence: "TESLA2022",
            carGraphic: require("@/assets/images/CarGraphic.png"),
        },
        {
            id: 2,
            name: "BMW X5",
            make: "BMW",
            model: "X5",
            year: "2021",
            lisence: "BMW2021",
            carGraphic: require("@/assets/images/CarGraphic2.png"),
        },
        {
            id: 3,
            name: "BMW X5",
            make: "BMW",
            model: "X5",
            year: "2021",
            lisence: "BMW2021",
            carGraphic: require("@/assets/images/CarGraphic.png"),
        },
    ],
};

export default function Profile() {
    const { id } = useLocalSearchParams();
    const [userProfile, setUserProfile] = useState<{
        profilePic: ImageSourcePropType;
        name: string;
        email: string;
        vehicles: string;
        phone: string;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserProfile = async () => {
            // Simulated mock user profile since backend isn't built
            const mockProfileData = {
                profilePic: require("@/assets/images/Robert.png"),
                name: "John Doe",
                email: "johndow@gmail.com",
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
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Image source={require("@/assets/images/ProfileGears.png")} style={styles.picture} />
                    <ProfileCombined
                        pfp={userProfile.profilePic}
                        name={userProfile.name}
                        email={userProfile.email}
                        phoneNumber={userProfile.phone}
                        vehicles={vehicleList.vehicles}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "#FFFFFF",
    },
    picture: {
        marginRight: 0,
        height: 220,
        alignSelf: "flex-end",
        resizeMode: "contain",
        position: "absolute",
        right: -15,
    },
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        marginTop: 0,
        flexDirection: "column",
        padding: 3,
        alignItems: "center",
        width: "100%",
        overflow: "scroll",
        paddingBottom: 55,
    },
    profilePic: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
    name: { fontSize: 20, fontWeight: "bold" },
    info: { fontSize: 16, marginTop: 5 },
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    errorText: { fontSize: 18, color: "red" },
});

