import { ImageSourcePropType, View, Image, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import React from "react";
import { Vehicle } from "@/app/(tabs)/profile";


export function VehicleCard({ make, model, year, picture, license }: Vehicle) {
    return (
        <ThemedView style={styles.card}>
            <ThemedText type="subtitle">Your Vehicle</ThemedText>

            <View style={styles.row}>
                <Image source={picture} style={styles.image} resizeMode="cover" />
                <View style={styles.details}>
                    <ThemedText type="default">Make and Model:</ThemedText>
                    <ThemedText type="link">
                        {year} {make} {model}
                    </ThemedText>

                    <ThemedText type="default">Plate Number:</ThemedText>
                    <ThemedText type="link">{license}</ThemedText>
                </View>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#F4F4F4",
        borderRadius: 12,
        padding: 19,
        shadowColor: "#000",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        marginVertical: 12,
        alignItems: "center",
        width: "90%",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    image: {
        width: 100,
        height: 60,
        marginRight: 40,
        marginLeft: 10,
    },
    details: {
        flex: 1,
        marginTop: 10,
    },
});
