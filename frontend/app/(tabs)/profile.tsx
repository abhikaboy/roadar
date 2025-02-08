import ProfileCombined from "@/components/ProfileCombined";
import { StyleSheet, ScrollView, SafeAreaView, Image } from "react-native";
const profileInfo = {
    name: "Robert Palazzi Jr.",
    pfp: require("@/assets/images/Robert.png"),
    email: "johndoe@example.com",
    phoneNumber: "+1234567890",
};

// Sample data for Vehicle List
const vehicleList = {
    vehicles: [
        {
            id: 1,
            name: "Tesla Model S",
            make: "Tesla",
            model: "Model S",
            year: "2022",
            lisence: "TESLA2022",
            carGraphic: require("@/assets/images/CarGraphic.png"),
        },
        {
            id: 2,
            name: "BMW X5",
            make: "BMW",
            model: "X5",
            year: "2021",
            lisence: "BMW2021",
            carGraphic: require("@/assets/images/CarGraphic2.png"),
        },
        {
            id: 3,
            name: "BMW X5",
            make: "BMW",
            model: "X5",
            year: "2021",
            lisence: "BMW2021",
            carGraphic: require("@/assets/images/CarGraphic.png"),
        },
    ],
};

export default function Profile() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Image source={require("@/assets/images/ProfileGears.png")} style={styles.picture} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <ProfileCombined
                    pfp={profileInfo.pfp}
                    name={profileInfo.name}
                    email={profileInfo.email}
                    phoneNumber={profileInfo.phoneNumber}
                    vehicles={vehicleList.vehicles}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF"

    },
    picture: {
        marginRight: 0,
        height: 220,
        alignSelf: "flex-end",
        resizeMode: "contain",
        position: 'absolute', 
        right: -15, 


    },
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        marginTop: 45,
        flexDirection: "column",
        padding: 3,
        alignItems: "center",
        width: "100%",
        overflow: "scroll",
        paddingBottom: 55,
    },
});
