import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { useRouter } from "expo-router";
import LogInButton from "@/components/auth/LogInButton";
import SignUpButton from "@/components/auth/SignUpButton";
import { useAuth } from "@/hooks/useAuth";

export default function LoginScreen() {
    const { user } = useAuth();

    const router = useRouter();
    const [isMechanic, setIsMechanic] = useState(false);

    // useEffect(() => {
    //     if (user) {
    //         router.replace("/")
    //     }
    // })

    return (
        <View style={styles.container}>
            {/* Image at the top with overlay */}
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri: "https://s3-alpha-sig.figma.com/img/e7b3/a86a/77ae8ee52c2c7be5997e167d6cadcbba?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cgwfAsalMt8zobEMNK4wf6rxYkSezZKYdgr0aR2kwKXICaQGlxWk7C6j5VzRblKYKpF6QhdJOEwvFa~rH6O4oJtvftXgUyiAojc4-htbeGdVBz~ZhPbYEvRpFpzix3bKd0jhrLNjuDQo3~iY7l9J9Ylor-cuHvSBynZuw1Sdt3xqvX5B41o29-2eLgMR46w8PNXyUtGwdEhVR6HBzbN~C-TVOUkX1kofK~Wz4F1Tkk9TwWveVwsO17QtS0klarxIlufBC67E7iHBKV2y0F9EHZtBk2LMkmy6auATJpqtnr6jUOcFdUENvtqiWdSe48K90phiCo9wnmUyhhlwMy3koQ__",
                    }}
                    style={styles.image}
                />
                <View style={styles.overlay} />
            </View>

            <View
                style={{
                    height: "50%",
                    backgroundColor: "#fff",
                    transform: [{ translateY: "-4%" }],
                    borderRadius: 20,
                }}>
                {/* Welcome Message */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Welcome to Roadar</Text>
                    <Text style={styles.subtitle}>Say goodbye to unexpected roadtrip failures:</Text>
                    <Text style={styles.subtitle}>This is the second line of the tag.</Text>
                </View>

                {/* Bottom Container with smaller white box */}
                <View style={styles.bottomContainer}>
                    <View style={styles.buttonContainer}>
                        <SignUpButton isMechanic={isMechanic} />
                        <LogInButton isMechanic={isMechanic} />
                    </View>

                    {/* Toggle Switch */}
                    <View style={styles.mechanicToggle}>
                        <Text style={styles.mechanicText}>I am a Mechanic</Text>
                        <Switch
                            value={isMechanic}
                            onValueChange={setIsMechanic}
                            trackColor={{ false: "#767577", true: "#002366" }}
                            thumbColor={isMechanic ? "#fff" : "#f4f3f4"}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 20,
    },
    imageContainer: {
        position: "relative",
        width: "100%",
        height: "50%", // Increase image height
        transform: "translateY(0%)",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 35, 102, 0.5)", // Opaque navy blue overlay
    },
    titleContainer: {
        flex: 0.5, // Reduce white space
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#000",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 8,
    },
    bottomContainer: {
        flex: 0.7, // Reduce the white box size
        width: "100%",
        backgroundColor: "#fff",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    buttonContainer: {
        width: "100%",
        gap: 40,
        marginBottom: 16,
    },
    signUpButton: {
        backgroundColor: "#002366",
        padding: 12,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
    },
    loginButton: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#002366",
    },
    signUpButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    loginButtonText: {
        color: "#002366",
        fontSize: 16,
        fontWeight: "600",
    },
    mechanicToggle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        marginTop: 10,
    },
    mechanicText: {
        fontSize: 16,
        color: "#000",
    },
});
