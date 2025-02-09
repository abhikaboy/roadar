import { ImageSourcePropType, View, StyleSheet, Dimensions } from "react-native";
import ProfileInformation from "./ProfileInformation";
import { VehicleCard } from "./VehicleCard";
import React from "react";
import { TotalEarnedCard } from "./TotalEarnedCard";
import MechanicInformationCard from "./MechanicInformationCard";

export type MechanicInfoProps = {
    pfp: ImageSourcePropType;
    email: string;
    phoneNumber: string;
    name: string;
    earnings: number;
    bio: string;
    lat: number;
    lon: number;
    active: boolean;
    rating: number;
};

export default function MechanicalProfileCombined({
    pfp,
    name,
    email,
    phoneNumber,
    earnings,
    bio,
    lat,
    lon,
    active,
    rating,
}: MechanicInfoProps) {
    return (
        <View style={styles.card}>
            <ProfileInformation pfp={pfp} name={name} email={email} phoneNumber={phoneNumber} />
            <View>
                <TotalEarnedCard earnings={earnings} />
                <View
                    style={{
                        width: Dimensions.get("screen").width,
                    }}>
                    <MechanicInformationCard bio={bio} lat={lat} lon={lon} active={active} rating={rating} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 20,
    },

    info: {},
});
