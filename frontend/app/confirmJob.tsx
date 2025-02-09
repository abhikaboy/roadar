import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

type Props = {};

export default function confirmJob({}: Props) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <View>
                <Text>Let us know if we got your request right!</Text>
            </View>
            <View>
                <Text>Urgency: High</Text>
                <Text>Budget: 500</Text>
                <Text>Notes: This is the description that you have given for this particular repair.</Text>
                <Text>Photo:</Text>
                <Image source={{ uri: "https://via.placeholder.com/150" }} style={{ width: 150, height: 150 }} />
            </View>
        </View>
    );
}
