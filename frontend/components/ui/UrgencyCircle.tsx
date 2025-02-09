import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface UrgencyCircleProps {
    color: string;
    active: boolean;
    [key : string]: any;
}

export default function UrgencyCircle({ color, active, ...urgencyProps }: UrgencyCircleProps) {
    return (
        <View {...urgencyProps}>
            {active ? (
                <View style={[styles.active, { borderColor: color, position: "relative" }]}>
                    <View style={styles.whiteCircle} />
                </View>
            ) : (
                <View style={[styles.active, { borderColor: color, position: "relative" }]}>
                    <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: color }} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    active: {
        borderRadius: 25,
        backgroundColor: "#fff",
        borderStyle: "solid",
        borderWidth: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    whiteCircle: {
        width: 20, // Adjust white circle size (smaller)
        height: 20,
        borderRadius: 10,
        backgroundColor: "white",
    },
});
