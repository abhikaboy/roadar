import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Platform, TouchableOpacity } from "react-native";

import { Button, Text, View, Modal, Image } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import MechanicInformationCard from "@/components/MechanicInformationCard";
import { ThemedText } from "@/components/ThemedText";
import JobModal from "@/components/JobModal";

export default function TabLayout() {
    const [modalVisible, setModalVisible] = useState(true);
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
    const colorScheme = useColorScheme();

    return (
        <>
            <JobModal />
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                    headerShown: false,
                    headerTitleStyle: {
                        fontFamily: "Outfit",
                    },
                    tabBarButton: HapticTab,
                    tabBarBackground: TabBarBackground,
                    tabBarStyle: Platform.select({
                        ios: {
                            position: "absolute",
                        },
                        default: {},
                    }),
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.lodge" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="explore"
                    options={{
                        title: "Explore",
                        tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.compact.down" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.compact.down" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="mechanicProfile"
                    options={{
                        title: "Mechanic Profile",
                        tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.compact.down" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="(onboarding)"
                    options={{
                        title: "Onboarding",
                        tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.compact.down" color={color} />,
                    }}
                />
            </Tabs>
            )
        </>
    );
}
