import { Dimensions, StyleSheet, Text, ScrollView, View } from "react-native";
import React from "react";
import OnboardButton from "@/components/ui/OnboardButton";
import ServicesCard from "@/components/ui/ServicesCard";
import {  useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();

    const cardContent = [
        {
            title: "Flat tire",
            image: require("@/assets/images/tire.png"),
            key: "flat",
            message: "Flat Tire Repair",
        },
        {
            title: "Oil change",
            image: require("@/assets/images/oil.png"),
            key: "oil",
            message: "Oil Change",
        },
        {
            title: "Spark plug",
            image: require("@/assets/images/spark.png"),
            key: "spark",
            message: "Spark Plug",
        },
        {
            title: "Flat tire",
            image: require("@/assets/images/tire.png"),
            key: "flat1",
            message: "Flat Tire Repair",
        },
        {
            title: "Oil change",
            image: require("@/assets/images/oil.png"),
            key: "oil1",
            message: "Oil Change",
        },
        {
            title: "Spark plug",
            image: require("@/assets/images/spark.png"),
            key: "spark1",
            message: "Spark Plug",
        },
    ];

    const requestContent = [
        {
            title: "Maintenance",
            image: require("@/assets/images/chat.png"),
            key: "sched1",
        },
        {
            title: "Maintenance",
            image: require("@/assets/images/chat.png"),
            key: "sched2",
        },
    ];

    const handleServicesClick = (message) => {
        router.push({
            pathname: "/home/service",
            params: { service: message },
        });
    };

    return (
        <ScrollView style={styles.content}>
            <View style={{ alignSelf: "center" }}>
                <OnboardButton
                    title="Request Custom Service"
                    color="#082A74"
                    textColor="#FFFFFF"
                    onPress={() => {
                        console.log("hello!");
                    }}
                />
            </View>
            <Text style={styles.services}>Services</Text>
            <View style={styles.cardWrapper}>
                {cardContent.map((content) => (
                    <View key={content.key} style={styles.cardService}>
                        <ServicesCard
                            title={content.title}
                            image={content.image}
                            onPress={() => {
                                handleServicesClick(content.message);
                            }}
                        />
                    </View>
                ))}
            </View>
            <Text style={[styles.services, { marginTop: 27 }]}>Schedule</Text>
            <View style={styles.cardWrapper}>
                {requestContent.map((content) => (
                    <View key={content.key} style={styles.cardMaitenence}>
                        <ServicesCard title={content.title} image={content.image} />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        gap: 27,
        flex: 1,
    },
    services: {
        fontSize: 24,
    },
    cardService: {
        shadowOpacity: 1,
        elevation: 2.9,
        shadowRadius: 2.9,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        minWidth: Dimensions.get("screen").width * 0.25,
        height: Dimensions.get("screen").width * 0.4,
        flex: 1,
    },
    cardMaitenence: {
        shadowOpacity: 1,
        elevation: 2.9,
        shadowRadius: 2.9,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        width: "47%",
        height: "50%",
    },
    cardWrapper: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        paddingRight: 20,
        alignItems: "center",
        display: "flex",
        justifyContent: 'space-between',
    },
});
