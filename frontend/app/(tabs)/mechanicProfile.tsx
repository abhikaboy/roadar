import { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, Image, View, Text, ActivityIndicator, StyleSheet, ImageSourcePropType } from "react-native";
import axios from "axios";
import MechanicalProfileCombined from "@/components/MechanicalProfileCombined";
import React from "react";

export default function Profile() {
    let id = "67a7e53ead3126f3dab182dc";
    const [mechanicProfile, setMechanicProfile] = useState<{
        profilePic: string;
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
            try {
                const response = await axios.get(`${process.env.EXPO_PUBLIC_URL}/api/v1/mechanics/${id}`);
                const mechanicData = response.data;

                const profilePic = mechanicData.picture 
                    ? { uri: mechanicData.picture }
                    : require("@/assets/images/Robert.png");

                const profileData = {
                    profilePic: profilePic,
                    name: `${mechanicData.firstName} ${mechanicData.lastName}`,
                    email: mechanicData.email,
                    phone: mechanicData.phoneNumber,
                    earnings: mechanicData.earnings,
                    bio: mechanicData.bio,
                    lat: mechanicData.location?.[0] || 0,
                    lon: mechanicData.location?.[1] || 0,
                    active: mechanicData.online,
                    rating: mechanicData.rating || 0,
                };

                setMechanicProfile(profileData);
            } catch (err) {
                console.error("Error fetching mechanic profile:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            getUserProfile();
        }
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
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
        position: "absolute",
        height: "100%",
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
    scrollContainer: {
        marginTop: 0,
        flexDirection: "column",
        padding: 3,
        alignItems: "center",
        width: "100%",
        overflow: "scroll",
        paddingBottom: 55,
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
