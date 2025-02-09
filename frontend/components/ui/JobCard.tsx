import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const jobIcons = {
    "oil change":
        "https://s3-alpha-sig.figma.com/img/226b/7f60/9e31058d22da197cebaaad36e8433642?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=oh0O1ToWz9XMTHSifjRDyD8vbYjHukFGa~8wNZIHujqvA5kOwzm1MDUdWJZwi7i6cbkeLnNiN-7wnhKUjSPy~qn~fvySdCgXQ1lYZP3X1KIxLwHrYUwAMEQwvNP8pH8chN95W16TxTt8dUydqVhTPI0w33pRV4MIV7o0kd6n4KA9IAxjeLko8X~PHElDYrTIf~fvE1NjpOYHu~WDwu-FPMWQzTugwBwJQJGj~SpIFlBtdHKRrVoj7XrS861iEFEARKAaTuOgZY-ZBNO~1l8XHOefxN2Ji8CYRdOsWgOpwszumIR-UnHgzpi8nT8W3OVU-mTzDkFAPDViF987DLhHXQ__",
    "tire replacement":
        "https://s3-alpha-sig.figma.com/img/01b7/7867/f217b846b55dbc34b0e218d3e9c7d7a9?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=JDELqWbyA9T1-gHXCYmstNnf628pqcD-rUiLtQ1ljfvfomFdHE-Bia6-6PYT5Of0HhcP~QydzoPkpKwGutsxOXMjPmi1RitPeBdxDKdU5qXS5bq08SBAVNJegYQh71tkSjajtCJwXV7fRak1mY8kQI1EWJDTh3wKhJHdJVLW3z10CfsCXr6Xk~O2fR~~RewDZgtFnnxCo9EIoX0y-~h-Zo~aB2~DtAp~ynCCi8kbmZzAlxMdQzSmD-ug8QyA6sBa-~VxqydNiplcp~prroFSYuhx0rWhAmuY0I~EyLv-xlSG6vbZVa-ilJ~~5z9iV6W5roV1vd~Pe4Aqc8IXAqWYYw__",
    "spark plugs":
        "https://s3-alpha-sig.figma.com/img/ec4e/9ab4/b0dc26c839e2febae9f58433408ae4fc?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FXe907ABOo6VP5aYRgfgYrZbt8KQg0uiou08XhTAOLGNr5fz7QHa~Fb9i2X~H6lB6TrlImYpbI~Yr8bQ5Fn8iSnE9xEJQyTOqrXfXV5FQew2ibnhJYq3myIBrWM35d9B-1ZGgmNObDR2vhP~3ZWcKPiBLvFmhDwuhabo193W9HlrvpxaFGPpy7ucKbNeiL22M8zz7podu0dKRqPzir9hG0RKMEAzg7iAAgNiTaNC7z~wshdEnRIEVotSy743c73oMT31Hp6QNmZYVLON~6vuswrxOAizisaa9MManRuSbDBs09vDgwH9JxsWVbzkvOtwOtsdx7C5BFrnAtrDbosDbQ__",
    default:
        "https://s3-alpha-sig.figma.com/img/ae72/cee9/b6c40f9119a143c21e58f3c48d5a04b2?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Urf6KOyHOUpTIzaxpjJ345fPdtsezGt6ar5XDKkqbjoLBqpsfBtRBYUJ9RBnRMXOiR6OHd6BaLfDFX0hMP5GXAJY3SW7c~AOPeoZ1XS86CO4oVqf-0duFaJ5fWWdXAFSxRi24FUQNG9jlRmDECZKJ4UJf3vqT5hwovAbhYb5FzZ2eRlEzWAf5WyTvstKC2sEAOJ2QPKwealheYiPbwmJ4pNXa7xuh9Wihm0fYS4g5MyiBjOzHZC0IjHg1acUFDugpSEPsQxrkF135qErgKSz0puhG8g2B-IE7ZRJeeCykP5grOVboXsKIflCRsPCEK-0W3c4J-y0klFY-tmvo3bOIA__",
};

const getJobIcon = (type) => {
    const jobType = type?.toLowerCase() ?? "default"; // Prevent errors if type is undefined/null
    const iconSource = jobIcons[jobType] || jobIcons["default"];

    return <Image source={{ uri: iconSource }} style={{ width: 100, height: 50, resizeMode: "contain" }} />;
};

export default function JobCard({ job }) {
    const router = useRouter();

    const handlePress = () => {
        router.push({
            pathname: "/jobs/[jobId]", // ✅ Corrected path
            params: { jobId: job.id.toString(), job: JSON.stringify(job) }, // ✅ Pass job details
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
