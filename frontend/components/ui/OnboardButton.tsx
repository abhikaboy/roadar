import { useRouter } from "expo-router";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { type Href } from "expo-router";
import { Text } from "react-native";
import React from "react";

interface OnboardButtonProps {
    title: string;
    color: string;
    textColor: string;
    border?: boolean;
    [key: string]: any;
}

export default function OnboardButton({ title, color, textColor, border, ...buttonProps }: OnboardButtonProps) {
    if (!!border) {
        return (
            <View
                {...buttonProps}
                style={{
                    width: "100%",
                }}>
                <TouchableOpacity style={[styles.button, { backgroundColor: color, zIndex: 99 }]} {...buttonProps}>
                    <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View
                {...buttonProps}
                style={{
                    width: "100%",
                }}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: color, borderColor: "#000", zIndex: 99 }]}
                    {...buttonProps}>
                    <Text style={styles.buttonText}>{title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignSelf: "stretch",
        borderRadius: 30,
        width: Dimensions.get("window").width * 0.8,
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 0,
        paddingVertical: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "300",
        fontFamily: "Outfit-Light",
        color: "#fff",
        textAlign: "left",
    },
});
