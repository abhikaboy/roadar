import OnboardButton from "@/components/ui/OnboardButton";
import { useEffect, useState } from "react";
import { Button, Image, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React from "react";

export default function registerPfp() {
    const [image, setImage] = useState<string | null>(null);
    const [status, requestPermission] = ImagePicker.useCameraPermissions();

    const router = useRouter();

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);
    
    const openCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        console.log(result)

        if(!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleContinue = () => {
        console.log(image);
        router.push("/registerAlias");
    };

    return (
        <View style={style.frame}>
            <View style={style.content}>
                <View style={style.textFrame}>
                    <Text style={style.text}>Set a profile picture!</Text>
                    <Pressable onPress={pickImage}>
                        {image == null ? (
                            <Image source={require("@/assets/images/addpic.png")} style={style.image} />
                        ) : (
                            image && <Image source={{ uri: image }} style={style.image} />
                        )}
                    </Pressable>
                    <Button title="Open Camera" onPress={openCamera} />
                </View>
            </View>
            <View style={{ width: "100%", gap: 10 }}>
                <OnboardButton title="Continue" color="#082a74" textColor="#FFFFFF" onPress={handleContinue} />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    frame: {
        justifyContent: "center",
        alignItems: "center",
        gap: 155,
    },
    content: {
        width: "80%",
        maxWidth: 400,
        flexDirection: "column",
        alignItems: "stretch",
    },
    textFrame: {
        width: "100%",
        marginBottom: 20,
        alignItems: "center",
        gap: 36,
    },
    text: {
        textAlign: "center",
        alignSelf: "stretch",
        fontSize: 24,
        fontWeight: "500",
        fontFamily: "Outfit-Medium",
    },
    input: {
        borderRadius: 7,
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 3,
        alignSelf: "stretch",
    },
    inputFrame: {
        width: "100%",
        gap: 20,
        alignSelf: "stretch",
    },
    yourName: {
        color: "#000",
        alignSelf: "stretch",
        fontSize: 16,
        fontWeight: "300",
        fontFamily: "Outfit-Light",
        width: "100%",
    },
    yourNameBox: {
        width: 300,
        gap: 11,
        alignSelf: "stretch",
    },
    image: {
        borderColor: "#a9a9a9",
        borderWidth: 2,
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    skipButton: {
        color: "#000",
    },
});
