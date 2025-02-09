import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type ActiveTagProp = {
    active: boolean;
};
export function ActiveTag({ active }: ActiveTagProp) {
    return (
        <View>
            <View>
                {active ? <Text style={styles.active}>Active</Text> : <Text style={styles.inactive}>Inactive</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    active: {
        fontFamily: "Outfit",
        fontSize: 16,
        backgroundColor: "#99D1A2",
        borderColor: "#42AE54",
        borderWidth: 1,
        borderRadius: 20,
        color: "black",
        paddingLeft: 15,
        paddingRight: 15,
        width: 100,
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5,
    },
    inactive: {
        fontFamily: "Outfit",
        fontSize: 16,
        backgroundColor: "#FFE3E3",
        borderColor: "#FF6969",
        borderWidth: 1,
        borderRadius: 20,
        color: "black",
        paddingLeft: 15,
        paddingRight: 15,
        width: 100,
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5,
    },
});
