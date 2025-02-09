import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export type RepairStatus = "searching" | "found" | "completed";

export type RepairJob = {
    id: number;
    title: string;
    date: string;
    description: string;
    cost: number;
    mechanic?: {
        name: string;
        email: string;
        avatar: string;
    };
    beforeImage: string;
    afterImage?: string;
    status: RepairStatus;
};

export default function RepairDetailPage({ repair }: { repair: RepairJob }) {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>{repair.title}</Text>
            <Text style={styles.date}>
                {repair.status === "completed" ? `From ${repair.date}` : `Scheduled for ${repair.date}`}
            </Text>
            <Text style={styles.description}>Description: {repair.description}</Text>
            <Text style={styles.costLabel}>
                {repair.status === "completed" ? "Cost:" : "Budget:"} ${repair.cost}
            </Text>

            {/* Before Image */}
            <Text style={styles.imageLabel}>Before</Text>
            <Image source={{ uri: repair.beforeImage }} style={styles.image} />

            {/* Mechanic Section */}
            {repair.status === "searching" && (
                <View style={styles.mechanicContainer}>
                    <Text style={styles.mechanicLabel}>Repaired by:</Text>
                    <View style={styles.searchingBox}>
                        <Image source={require("@/assets/images/search3d.png")} style={styles.avatar} />
                        <Text style={styles.searchingText}>
                            Looks like we're still searching for a mechanic. Stay on the lookout for notifications!
                        </Text>
                    </View>
                </View>
            )}

            {repair.status === "found" && repair.mechanic && (
                <View style={styles.mechanicContainer}>
                    <Text style={styles.mechanicLabel}>Repaired by:</Text>
                    <Text style={styles.infoText}>
                        Our searches paid off! We've found a mechanic for you. Check out their profile below and let us
                        know if you want them to take on this repair!
                    </Text>
                    <Text style={styles.suggestedCost}>Suggested Cost: ${repair.cost}</Text>
                    <View style={styles.mechanicCard}>
                        <Image source={{ uri: repair.mechanic.avatar }} style={styles.avatar} />
                        <View>
                            <Text style={styles.mechanicName}>{repair.mechanic.name}</Text>
                            <Text style={styles.mechanicEmail}>{repair.mechanic.email}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.denyButton}>
                            <Text style={styles.buttonText}>Deny</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.acceptButton}>
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {repair.status === "completed" && repair.mechanic && (
                <View style={styles.mechanicContainer}>
                    <Text style={styles.mechanicLabel}>Repaired by:</Text>
                    <View style={styles.mechanicCard}>
                        <Image source={{ uri: repair.mechanic.avatar }} style={styles.avatar} />
                        <View>
                            <Text style={styles.mechanicName}>{repair.mechanic.name}</Text>
                            <Text style={styles.mechanicEmail}>{repair.mechanic.email}</Text>
                        </View>
                    </View>
                    <Text style={styles.imageLabel}>After</Text>
                    {repair.afterImage && <Image source={{ uri: repair.afterImage }} style={styles.image} />}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    backButton: { marginBottom: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    date: { fontSize: 16, fontWeight: "400", marginBottom: 5, color: "#555" },
    description: { fontSize: 16, marginBottom: 10 },
    costLabel: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    imageLabel: { fontSize: 16, fontWeight: "bold", marginTop: 10, marginBottom: 5 },
    image: { width: "100%", height: 180, borderRadius: 10 },

    mechanicContainer: { marginTop: 20 },
    mechanicLabel: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
    searchingBox: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#F3F4F6",
    },
    searchingText: { fontSize: 14, marginLeft: 10, color: "#555", flex: 1 },

    infoText: { fontSize: 14, color: "#555", marginBottom: 10 },
    suggestedCost: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
    mechanicCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#F3F4F6",
    },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
    mechanicName: { fontSize: 16, fontWeight: "bold" },
    mechanicEmail: { fontSize: 14, color: "#555" },

    buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
    denyButton: {
        flex: 1,
        backgroundColor: "#FF6969",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginRight: 5,
    },
    acceptButton: { flex: 1, backgroundColor: "#42AE54", padding: 10, borderRadius: 5, alignItems: "center" },
    buttonText: { color: "#fff", fontWeight: "bold" },
});
