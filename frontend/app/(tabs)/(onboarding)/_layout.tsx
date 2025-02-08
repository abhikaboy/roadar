import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRoute } from "@react-navigation/native";
import { Slot } from "expo-router";
import { Image, StyleSheet, View } from "react-native";



export default function OnboardingLayout() {

    return(
        <View style={style.background}>
            <Image style={style.gears2} resizeMode="cover" source={require("@/assets/images/gears2.png")} />
            <Image style={style.gears1} resizeMode="cover" source={require("@/assets/images/gears1.png")} />
            <Image style={style.gears3} resizeMode="cover" source={require("@/assets/images/gears3.png")} />

            <View style={style.contentContainer}>
                <ThemedView style={style.box}>
                    <Slot />
                </ThemedView>

            </View>
        </View>
    )
}

const style = StyleSheet.create({
    background: {
        backgroundColor: "#fff",
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "hidden",
    },
    gears1: {
        top: "25%",
        left: "-25%",    
        width: "100%",
        height: 659,
        position: "absolute",
        transform: [{ scale: 0.5 }]
    },
    gears2: {
        top: "52%",
        left: "25%",
        width: "100%",
        height: 372,
        position: "absolute",
        transform: [{ scale: 0.5 }]
    },
    gears3: {
        left: "0%",
        top: "-1%",
        width: "100%",
        height: 331,
        transform: [{ scale: 1 }]
    },
    contentContainer: {
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
        backgroundColor: "#FFFFFF",
        padding: 20,              
        width: '80%',            
        maxWidth: 400,          
        alignItems: 'center',      
    },
})