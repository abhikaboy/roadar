import { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, Image, View, Text, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import ProfileCombined from "@/components/ProfileCombined";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { useAuth } from "@/hooks/useAuth";



export default function Profile() {
    const { user } = useAuth();
    
    


    

    

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Image source={require("@/assets/images/ProfileGears.png")} style={styles.picture} />
                    <ProfileCombined
                        profilePic={user.picture}
                        name={user.firstName + " " + user.lastName}
                        email={user.email}
                        phone={user.phoneNumber}
                        vehicles={user.carDetails}
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
