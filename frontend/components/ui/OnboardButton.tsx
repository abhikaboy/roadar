import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { type Href } from 'expo-router';
import { ThemedText } from "../ThemedText";
import React from 'react'


interface OnboardButtonProps {
    title: string,
    color: string,
    textColor: string,
    border?: boolean,
    [key: string]: any,
}

export default function OnboardButton({ title, color, textColor, border, ...buttonProps } : OnboardButtonProps) {

    if(!!border) {
        return(
        <View {...buttonProps}>
            <TouchableOpacity style={[styles.button, { backgroundColor: color }]} {...buttonProps}>
                <ThemedText style={[styles.buttonText, { color: textColor }]}>{title}</ThemedText>
            </TouchableOpacity>
            </View>
        )
    } else {
        return(
            <View {...buttonProps}>
            <TouchableOpacity style={[styles.button, { backgroundColor: color, borderColor: "#000" }]} {...buttonProps}>
                <ThemedText style={styles.buttonText}>{title}</ThemedText>
            </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    button: {
        alignSelf: "stretch",
        borderRadius: 30,
        width: "100%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 0,
        paddingVertical: 5
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "300",
        fontFamily: "Outfit-Light",
        color: "#fff",
        textAlign: "left"
    },
})