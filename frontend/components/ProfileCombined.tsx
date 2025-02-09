import { ImageSourcePropType, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import ProfileInformation from "./ProfileInformation";
import { VehicleCard } from "./VehicleCard";
import React from "react";
import { useRouter } from "expo-router";

export type VehicleCardProps = {
    id: number;
    name: string;
    make: string;
    model: string;
    year: string;
    licensePlate: string;
    carGraphic: ImageSourcePropType;
};

export type ProfileInformationProps = {
    pfp: ImageSourcePropType;
    name: string;
    email: string;
    phoneNumber: string;
};

export type VehicleListProps = {
    vehicles: VehicleCardProps[];
};

export default function Profile({
    pfp,
    name,
    email,
    phoneNumber,
    vehicles,
}: ProfileInformationProps & VehicleListProps) {
    const router = useRouter();

    return (
        <View style={{ width: "100%", flexDirection: "column", alignItems: "center" }}>
            <ProfileInformation pfp={pfp} name={name} email={email} phoneNumber={phoneNumber} />
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
                }}>
                <Text
                    style={{
                        fontFamily: "Outfit",
                        color: "#fff",
                        fontSize: 16,
                    }}>
                    Register A Vehicle
                </Text>
            </TouchableOpacity>
            <View style={{ marginTop: 8 }}>
                {vehicles?.map(
                    (VehicleInformation: {
                        name: string;
                        make: string;
                        model: string;
                        year: string;
                        licensePlate: string;
                        carGraphic: ImageSourcePropType;
                    }, index : number) => (
                        <VehicleCard
                            key={index}
                            name={VehicleInformation.name}
                            make={VehicleInformation.make}
                            model={VehicleInformation.model}
                            year={VehicleInformation.year}
                            license={VehicleInformation.licensePlate}
                            carGraphic={require("@/assets/images/CarGraphic.png")}
                        />
                    )
                )}
            </View>
        </View>
    );
}
