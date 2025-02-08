import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const getJobIcon = (type) => {
    switch (type.toLowerCase()) {
        case "oil change":
            return <MaterialIcons name="local-gas-station" size={24} color="#007AFF" />;
        case "brake repair":
            return <MaterialIcons name="build" size={24} color="#FF5733" />;
        case "tire replacement":
            return <MaterialIcons name="directions-car" size={24} color="#28A745" />;
        case "battery check":
            return <MaterialIcons name="battery-charging-full" size={24} color="#FFC107" />;
        default:
            return <MaterialIcons name="engineering" size={24} color="#6C757D" />;
    }
};

export default function JobCard({ job }) {
    const router = useRouter();

    const handlePress = () => {
        router.push({
            pathname: "/repair-details",
            params: { repair: job },
        });
    };

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.7}>
            {/* Left Section - Dynamic Icon */}
            <View style={styles.leftIcon}>{getJobIcon(job.type)}</View>

            {/* Middle Section - Job Information */}
            <View style={styles.middleSection}>
                <View style={styles.leftMiddle}>
                    <Text style={styles.jobType}>{job.type}</Text>
                    <Text style={styles.mechanicText}>
                        {job.mechanic ? `Mechanic: ${job.mechanic}` : "No mechanic yet"}
                    </Text>
                    <Text style={styles.dateText}>Date: {job.date}</Text>
                </View>

                {/* Right Side - Budget Info */}
                <View style={styles.rightMiddle}>
                    <Text style={styles.budgetLabel}>Budget</Text>
                    <Text style={styles.budgetValue}>${job.amount}</Text>
                </View>
            </View>

            {/* Right Section - Arrow Only */}
            <View style={styles.rightSection}>
                <MaterialIcons name="chevron-right" size={24} color="#000" style={styles.arrowIcon} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 360,
        height: 113,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8F8F8",
        paddingVertical: 19,
        paddingHorizontal: 16,
        marginVertical: 5,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 5,
        shadowOffset: { width: -2, height: 2 },
        elevation: 3,
    },
    leftIcon: {
        width: 42,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    middleSection: {
        width: 242,
        height: 103,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftMiddle: {
        flexDirection: "column",
        justifyContent: "space-between",
        width: "60%",
    },
    jobType: {
        fontSize: 20,
        fontWeight: "400",
        fontFamily: "Outfit",
        lineHeight: 30,
        letterSpacing: -0.22,
        color: "#000",
    },
    mechanicText: {
        fontSize: 16,
        fontWeight: "300",
        fontFamily: "Outfit",
        lineHeight: 24,
        letterSpacing: -0.176,
        color: "#000",
    },
    dateText: {
        fontSize: 16,
        fontWeight: "300",
        fontFamily: "Outfit",
        lineHeight: 24,
        letterSpacing: -0.176,
        color: "#000",
    },
    rightMiddle: {
        width: "40%",
        alignItems: "flex-end",
    },
    budgetLabel: {
        fontSize: 16,
        fontWeight: "300",
        fontFamily: "Outfit",
        lineHeight: 24,
        letterSpacing: -0.176,
        color: "#000",
        textAlign: "center",
    },
    budgetValue: {
        fontSize: 24,
        fontWeight: "300",
        fontFamily: "Outfit",
        lineHeight: 36,
        letterSpacing: -0.264,
        color: "#000",
        textAlign: "center",
    },
    rightSection: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    arrowIcon: {
        textAlignVertical: "center",
    },
});
