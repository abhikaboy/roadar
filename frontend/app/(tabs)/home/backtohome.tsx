import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { ThemedText } from "@/components/ThemedText";
import OnboardButton from "@/components/ui/OnboardButton";

export default function Service() {
    const { service } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            {/* Image */}
            <Image
                source={{ uri: "https://s3-alpha-sig.figma.com/img/174e/639a/e90ef6a0d1c7212f1f4e23d8620d8155?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=l9zLTDcy7GxqT4TF3ydqNtP8syNswXsUxKlAeAs2PN9RWf1R0UPm9u4G9-J2ugiZL6QaAJZgaBPNsdekfqFPlLyBr7epEEvTxrFiw-K8nqH4aa4mWu-yuOM6pp8SnRUUYf6n-kPxS-tORVZVBHqO3MlUF9hc2-Q3EEZQuLtoHeyuEUoomBv7tVgWqDqK2kcdQ0rGaBeL-n8bAhNW99pV1ZEu4jGd5nHok4CwAYam6SgpnUSbwiV1ZeBeguc9wRsXu32rYytL7UTFXJ9Sp1ajDEkqAs69QieL0rnzZwN~CzhzLwoFM4bxmLfeqeqvi2KMuR7rXZbAuEkJaGCjoVfptg__" }}
                style={styles.image}
            />

            {/* Description */}
            <Text style={styles.description}>
                We’re searching for mechanics nearby to help you with your flat tire… we’ll send you a notification once a mechanic is ready to help!
            </Text>

            {/* Button */}
            <OnboardButton title="Continue to Home" color="#082a74" textColor="#FFFFFF" onPress={() => {}} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        color: "#333",
        marginBottom: 30,
    },
});

