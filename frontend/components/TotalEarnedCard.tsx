import { ImageSourcePropType, View, Image, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import React from "react";

export type TotalEarnedProps = {
    earnings: number;
};

export function TotalEarnedCard({ earnings }: TotalEarnedProps) {
    return (
        <ThemedView style={styles.card}>
            <ThemedText type="subtitle">
                Total Earnings:
            </ThemedText>
            <ThemedText style={styles.row} type="title">${earnings}</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    card: {
        alignSelf: "center",
        backgroundColor: "#F4F4F4",
        borderRadius: 12,
        padding: 19,
        shadowColor: "#000",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        marginVertical: 6,
        alignItems: "center",
        width: "90%",
        },
    row: {
        flexDirection: "row",
        textAlign: "center",
        width: "100%",
        marginTop: 20,
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

