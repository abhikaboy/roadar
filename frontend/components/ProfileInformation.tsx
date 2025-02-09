import { ImageSourcePropType, View, Image, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import React from "react";

export type ProfileInformationProps = {
    pfp: string;
    name: string;
    email: string;
    phoneNumber: string;
};

export default function ProfileInformation({ pfp, name, email, phoneNumber }: ProfileInformationProps) {
    console.log("THIS IS THE PFP:");
    console.log(pfp);
    return (
        <View style={styles.container}>
            <Image style={styles.pfp} source={{uri: pfp}} resizeMode="cover" />
            <ThemedText style={styles.col} type="subtitle">
                {name}
            </ThemedText>
            <View style={styles.col}>
                <View style={styles.row}>
                    <Image source={require("@/assets/images/MailIcon.png")} style={styles.icon}></Image>
                    <ThemedText>{email}</ThemedText>
                </View>
                <View style={styles.row}>
                    <Image source={require("@/assets/images/PhoneIcon.png")} style={styles.icon}></Image>
                    <ThemedText>{phoneNumber}</ThemedText>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: "100%",
        flex: 1,
        justifyContent: "center",
        marginTop: 35,
        marginBottom: 30,
    },
    pfp: {
        width: 120,
        height: 120,
        borderRadius: 60,
        shadowColor: "#000",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        alignItems: "center",
        marginBottom: 10,
        justifyContent: "center",
    },
    col: {
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
        justifyContent: "center",
        flex: 1,
        marginTop: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 4,
        marginTop: 4,
        justifyContent: "center",
    },
    icon: {
        marginRight: 10,
    },
});
