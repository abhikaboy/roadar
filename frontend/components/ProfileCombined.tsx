import { ImageSourcePropType, View, StyleSheet } from "react-native";
import ProfileInformation from "./ProfileInformation";
import { VehicleCard } from "./VehicleCard";

export type VehicleCardProps = {
    id: number;
    name: string;
    make: string;
    model: string;
    year: string;
    lisence: string;
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
    return (
        <View>
            <ProfileInformation pfp={pfp} name={name} email={email} phoneNumber={phoneNumber} />
            {vehicles?.map(
                (VehicleInformation: {
                    id: number;
                    name: string;
                    make: string;
                    model: string;
                    year: string;
                    lisence: string;
                    carGraphic: ImageSourcePropType;
                }) => (
                    <VehicleCard
                        id={VehicleInformation.id}
                        name={VehicleInformation.name}
                        make={VehicleInformation.make}
                        model={VehicleInformation.model}
                        year={VehicleInformation.year}
                        lisence={VehicleInformation.lisence}
                        carGraphic={VehicleInformation.carGraphic}
                    />
                )
            )}
        </View>
    );
}
