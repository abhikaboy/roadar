import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRoute } from "@react-navigation/native";
import { Slot } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import React from 'react'



export default function OnboardingLayout() {

    return(
        <View style={style.background}>
            <Image style={style.gears2} resizeMode="cover" source={require("@/assets/images/gears2.png")} />
            <Image style={style.gears1} resizeMode="cover" source={require("@/assets/images/gears1.png")} />
            <Image style={style.gears3} resizeMode="cover" source={require("@/assets/images/gears3.png")} />

            <View style={style.contentContainer}>
                <View style={style.box}>
                    <Slot />
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "hidden",
    },
    gears1: {
        top: "33%",
        left: "-25%",    
        width: "100%",
        height: 659,
        position: "absolute",
        transform: [{ scale: 0.5 }]
    },
    gears2: {
        top: "58%",
        left: "25%",
        width: "100%",
        height: 372,
        position: "absolute",
        transform: [{ scale: 0.5 }]
    },
    gears3: {
        left: "0%",
        top: "0%",
        width: "100%",
        height: 331,
        transform: [{ scale: 1 }]
    },
    contentContainer: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        justifyContent: 'center', 
        alignItems: 'center',     
        padding: 20,
    },
    box: { 
        padding: 20,              
        width: '80%',            
        maxWidth: 400,          
        alignItems: 'center',      
    },
})