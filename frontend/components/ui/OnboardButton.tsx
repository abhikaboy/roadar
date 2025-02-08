import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { type Href } from 'expo-router';
import { ThemedText } from "../ThemedText";

interface OnboardButtonProps {
    title: string,
    color: string,
    href: Href
}

export default function OnboardButton({ title, href, color } : OnboardButtonProps) {
    const router = useRouter();
    const handlePush = () => {
        router.push(href);
    }

    return (
        <View>
            <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={handlePush}>
                <ThemedText style={styles.buttonText}>{title}</ThemedText>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        alignSelf: "stretch",
        borderRadius: 29,
        flex: 1,
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
    }
})