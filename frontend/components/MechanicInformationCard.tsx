import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ActiveTag } from "./ui/ActiveTag";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import axios from "axios";
import ReverseGeocode from "./reverseGeocode";

export type MechanicInformationProp = {
    bio: string;
    lat: number;
    lon: number;
    active: boolean;
    rating: number;
};

export default function MechanicInformationCard({ bio, lat, lon, active, rating }: MechanicInformationProp) {
    return (
        <View style={styles.container}>
            <View style={styles.col}>
                <View>
                    <ReverseGeocode lat={lat} lon={lon} />
                </View>
                <View style={styles.row}>
                    <StarRatingDisplay maxStars={5} starSize={27} color="black" rating={rating} />
                    <ThemedText type="default">{rating}</ThemedText>
                </View>
                <View style={styles.row}>
                    <ActiveTag active={active} />
                </View>

                <ThemedText style={styles.bioText} type="default">
                    Biography: {bio}
                </ThemedText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F4F4F4",
        textAlign: "left",
        flexWrap: "wrap",
        borderRadius: 12,
        textOverflow: "wrap",
        marginTop: 20,
        marginBottom: 30,
        marginLeft: 20,
        marginRight: 20,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        height: "auto",
    },
    bioText: {
        flexWrap: "wrap",
        width: "100%",
        textAlign: "left",
        lineHeight: 20,
        marginTop: 14,
    },
    col: {
        flexDirection: "column",
        width: "100%",
        height: "auto",
        marginTop: 10,
        backgroundColor: "#F4F4F4",
        borderRadius: 10,
        padding: 10,
    },
    row: {
        flexWrap: "wrap",
        backgroundColor: "#F4F4F4",
        flexDirection: "row",
        width: "100%",
        marginBottom: 4,
        height: "auto",
        marginTop: 10,
        justifyContent: "flex-start",
    },
    icon: {
        marginRight: 10,
    },
});
