import ProfileCombined from "@/components/ProfileCombined";
import { ScrollView, SafeAreaView, Image, ImageSourcePropType } from "react-native";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { TotalEarnedCard } from "@/components/TotalEarnedCard";
import MechanicInformationCard from "@/components/MechanicInformationCard";
import ProfileInformation from "@/components/ProfileInformation";
import MechanicalProfileCombined from "@/components/MechanicalProfileCombined";

export default function Profile() {
    const { id } = useLocalSearchParams();
    const [mechanicProfile, setMechanicProfile] = useState<{
        profilePic: ImageSourcePropType;
        name: string;
        email: string;
        phone: string;
        earnings: number;
        bio: string;
        lat: number;
        lon: number;
        active: boolean;
        rating: number;
    } | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserProfile = async () => {
            // Simulated mock user profile since backend isn't built
            const mockProfileData = {
                profilePic: require("@/assets/images/Robert.png"),
                name: "John Doe",
                email: "johndoe@example.com",
                phone: "(123) 456-7890",
                earnings: 50,
                bio: "i am bobby and I lovev am bobby and I lov am bobby and I lov am bobby and I lov am bobby and I lov am bobby and I lov am bobby and I lov chocolate chip cookies. I also am really annoying. Im so sad.",
                lat: 42.3555,
                lon: -71.0565,
                active: true,
                rating: 2,
            };
            setMechanicProfile(mockProfileData);
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

    if (!mechanicProfile) {
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
                    <MechanicalProfileCombined
                        pfp={mechanicProfile.profilePic}
                        email={mechanicProfile.email}
                        phoneNumber={mechanicProfile.phone}
                        name={mechanicProfile.name}
                        earnings={mechanicProfile.earnings}
                        bio={mechanicProfile.bio}
                        lat={mechanicProfile.lat}
                        lon={mechanicProfile.lon}
                        active={mechanicProfile.active}
                        rating={mechanicProfile.rating}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        width: "100%",
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
    row: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 4,
        marginTop: 50,
        justifyContent: "center",
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
