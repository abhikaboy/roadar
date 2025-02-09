import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import axios from "axios";
import { ThemedText } from "./ThemedText";

type ReverseGeocodeProps = {
    lat: number;
    lon: number;
};

const API_KEY = "67a807c9155ac060356032aksc02680";

const ReverseGeocode: React.FC<ReverseGeocodeProps> = ({ lat, lon }) => {
    const [address, setAddress] = useState<string | null>(null);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${API_KEY}`;
                const response = await axios.get(url);
                if (response.data.display_name) {
                    setAddress(
                        response.data.address.road +
                            ", " +
                            response.data.address.city +
                            ", " +
                            response.data.address.state
                    );
                } else {
                    console.error("No address found");
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchAddress();
    }, [lat, lon]);
    return (
        <View>
            <Text type="default">📍 {address}</Text>
        </View>
    );
};

export default ReverseGeocode;
