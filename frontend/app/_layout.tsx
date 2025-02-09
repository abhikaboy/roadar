import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import React from "react";
import View from "react-native";

import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        Outfit: require("../assets/fonts/Outfit-Variable.ttf"),
        SofiaSans: require("../assets/fonts/SofiaSans-Variable.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}>
                {/* Existing Screens */}
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
                <Stack.Screen
                    name={"about"}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={"profile"}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={"mechanicProfile"}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={"blob"}
                    options={{
                        title: "Blob",
                        headerLeft: () => (
                            <Ionicons name={"chevron-back"} size={24} color={"#20c1e6"} onPress={() => router.back()} />
                        ),
                    }}
                />
                <Stack.Screen name="jobs" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
