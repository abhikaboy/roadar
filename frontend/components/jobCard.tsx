import { ImageSourcePropType, View, Image, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import React from "react";
import ReverseGeocode from "./reverseGeocode";
import { useAuth } from "@/hooks/useAuth";

export type JobInformationProp = {
    picture: ImageSourcePropType;
    type: string;
    driver: string;
    budget: number;
    lat: number;
    lon: number;
    job: any;
};

export default function MechanicJobCard({ picture, type, driver, budget, lat, lon, job }: JobInformationProp) {
    const { setJob } = useAuth();
    return (
        <TouchableOpacity style={styles.container} onPress={() => setJob(job)}>
            <View style={styles.textContainer}>
                <ThemedText style={styles.title} type="subtitle">
                    {type} Repair
                </ThemedText>
                <ReverseGeocode lat={lat} lon={lon} />
                <ThemedText style={styles.infoText}>Driver: {driver}</ThemedText>
                <ThemedText style={styles.infoText}>Budget: ${budget}</ThemedText>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.picture} source={picture} resizeMode="cover" />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F4F4F4",
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        marginTop: 10,
        marginBottom: 8,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imageContainer: {
        marginRight: 4,
    },
    picture: {
        width: 90,
        height: 90,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    infoText: {
        fontSize: 14,
        marginTop: 2,
    },
});
