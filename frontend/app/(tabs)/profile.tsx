import { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, Image, View, Text, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import ProfileCombined from "@/components/ProfileCombined";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export type Vehicle = {
    make: string;
    model: string;
    year: number;
    picture: string;
    license: string;
};

export default function Profile() {
    let id = "67a879dd7f54e8ec83dbd7d3";
    
    const [userProfile, setUserProfile] = useState<{
        profilePic: string;
        name: string;
        email: string;
        vehicles: Vehicle[];
        phone: string;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    const profilePic = userProfile?.profilePic 
                    ? { uri: userProfile.profilePic }
                    : require("@/assets/images/Robert.png");

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await axios.get(`${process.env.EXPO_PUBLIC_URL}/api/v1/driver/${id}`);

                const profileData = {
                    profilePic: profilePic || require("@/assets/images/Robert.png"),
                    name: `${response.data.firstName} ${response.data.lastName}`,
                    email: response.data.email,
                    vehicles: response.data.carDetails.map((car: any) => `${car.make} ${car.model}`).join(", "),
                    phone: response.data.phoneNumber,
                };

                setUserProfile(profileData);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        if (id) {
            getUserProfile();
        }
    }, [id]);

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
                        profilePic={profilePic}
                        name={userProfile.name}
                        email={userProfile.email}
                        phone={userProfile.phone}
                        vehicles={userProfile.vehicles}
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
