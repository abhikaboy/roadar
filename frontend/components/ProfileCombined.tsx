import { ImageSourcePropType, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import ProfileInformation from "./ProfileInformation";
import { VehicleCard } from "./VehicleCard";
import React from "react";
import { useRouter } from "expo-router";
import { Vehicle } from "@/app/(tabs)/profile";

export type ProfileInformationProps = {
    profilePic: string;
    name: string;
    email: string;
    vehicles: Vehicle[];
    phone: string;
};

export default function ProfileCombined({
    profilePic,
    name,
    email,
    phone,
    vehicles,
}: ProfileInformationProps) {
    const router = useRouter();
profilePic
    return (
        <View style={{ width: "100%", flexDirection: "column", alignItems: "center" }}>
            <ProfileInformation
                pfp={profilePic} 
                name={name}
                email={email}
                phoneNumber={phone} 
            />
            
            <TouchableOpacity
                onPress={() => {
                    router.push("/registerSpecifics");
                }}
                style={{
                    width: "90%",
                    backgroundColor: "#082A74",
                    paddingVertical: 16,
                    borderRadius: 30,
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontFamily: "Outfit",
                        color: "#fff",
                        fontSize: 16,
                    }}
                >
                    Register A Vehicle
                </Text>
            </TouchableOpacity>

            <View style={{ marginTop: 8 }}>
                {vehicles?.map((vehicle) => (
                    <VehicleCard
                        make={vehicle.make}
                        model={vehicle.model}
                        year={vehicle.year}
                        license={vehicle.license}
                        picture={vehicle.picture}
                    />
                ))}
            </View>
        </View>
    );
}
