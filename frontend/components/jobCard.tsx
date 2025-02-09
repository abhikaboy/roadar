import { ImageSourcePropType, View, Image, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import React from "react";
import ReverseGeocode from "./reverseGeocode";

export type JobInformationProp = {
    picture: ImageSourcePropType;
    type: string;
    driver: string;
    budget: number;
    lat: number;
    lon: number;
};

export default function JobCard({ picture, type, driver, budget, lat, lon }: JobInformationProp) {
    return (
        <View style={styles.container}>
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

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F4F4F4",
        flexDirection: "row", 
        alignItems: "center", 
        padding: 12,
        marginTop: 20,
        marginBottom: 20,
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

