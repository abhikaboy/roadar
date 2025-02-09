import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from 'react'
import OnboardButton from "@/components/ui/OnboardButton";
import ServicesCard from "@/components/ui/ServicesCard";

export default function Index() {

    const cardContent = [
        {
            title: "Flat tire",
            image: require("@/assets/images/tire.png"),
            key: "flat"
        }
    ]

    return(
        <View style={styles.content}>
            <OnboardButton title="Request Custom Service" color="#082A74" textColor="#FFFFFF" onPress={() => {console.log("hello!")}}/>
            <Text style={styles.services}>Services</Text>
            {cardContent.map((content) => (
                <View key={content.key} style={styles.card}>
                    <ServicesCard title={content.title} image={content.image} />
                </View>
            ))}
            
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        gap: 27,

    },
    services: {
        fontSize: 24
    },
    card: {
        shadowOpacity: 1,
        elevation: 2.9,
        shadowRadius: 2.9,
        shadowOffset: {
        width: 0,
        height: 1
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",

    }
})