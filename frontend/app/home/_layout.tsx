import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from 'react';
import { Slot } from "expo-router";

export default function Home() {
    return(
        <ScrollView style={styles.screen}>
            <View style={styles.contentParent}>
                <Text style={[styles.roadar, styles.roadarTypo]}>Roadar</Text>
                <View>
                    <Slot />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#fff",
        width: "100%",
        height: 874,
        overflow: "hidden",
        flex: 1,
    },
    contentParent: {
        position: "absolute",
        top: 45,
        left: 26,
        width: 351,
        gap: 27,
        flex: 1,
    },
    roadarTypo: {
        textAlign: "left",
        color: "#000",
        fontFamily: "Outfit-Medium",
        fontWeight: "500",
        alignSelf: "stretch"
    },
    roadar: {
        fontSize: 32
    },

})