import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from 'react'

interface ServicesCardProps {
    image: ImageSourcePropType;
    title: string;
    [key: string]: any;
}

export default function ServicesCard({ image, title, ...cardProps}: ServicesCardProps) {
    return (
        <TouchableOpacity style={[styles.serviceCard,]}>
            <Image style={styles.image} resizeMode="cover" source={image} />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    serviceCard: {
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
        width: 0,
        height: 1
        },
        shadowRadius: 2.9,
        elevation: 2.9,
        shadowOpacity: 1,
        borderRadius: 10,
        backgroundColor: "rgba(8, 42, 116, 0.05)",
        flex: 1,
        width: "100%",
        height: 92,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: 64,
        height: 64
    },
    text: {
        alignSelf: "stretch",
        fontSize: 14,
        fontWeight: "300",
        fontFamily: "Outfit-Light",
        color: "#000",
        textAlign: "center"
    }
})
