import { StyleSheet, Text, View } from "react-native"
import React, { useState } from 'react'
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { useNavigation } from "expo-router";
import UrgencyCircle from "@/components/ui/UrgencyCircle";

interface ServiceProps {
    service: string,
    [key : string]: any
}

export default function Service() {
    const { service } = useLocalSearchParams()

    const [color, setColor] = useState("green");



    return(
    <View style={styles.content}>
        <Text style={styles.services}>A few extra notes on your {service}...</Text>
        <View>
            <View style={styles.inputWrapper}>
                <Text style={styles.text}>Urgency</Text>
                <View style={styles.urgency}>
                    <UrgencyCircle color="#5cff95" active={true}/>
                    <UrgencyCircle color="#ffff5c" active={false}/>
                    <UrgencyCircle color="#ff5c5f" active={false}/>
                </View>
                <Text style={styles.text}>Budget</Text>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    content: {
        gap: 27,
    },
    services: {
        fontSize: 24,
    },
    text: {
        alignSelf: "stretch",
        fontSize: 20,
        fontWeight: "300",
        fontFamily: "Outfit-Light",
        color: "#000",
        textAlign: "left"
    },
    inputWrapper: {
        gap: 14
    },
    urgency: {
        flex: 1,
        flexDirection: 'row',
        gap: 14
    }
})