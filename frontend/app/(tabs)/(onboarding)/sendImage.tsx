import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Button, Image, Platform, StyleSheet, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

// put this under the request job workflow
export default function sendImage() {
    const [image, setImage] = useState<string | null>(null);
    const router = useRouter()

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

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!");
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
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View>
            {image == null ? (
                <Image source={require("@/assets/images/addpic.png")} style={style.image} />
            ) : (
                image && <Image source={{ uri: image }} style={style.image} />
            )}
            <Button title="Open Library" onPress={pickImage} />
            <Button title="Open Camera" onPress={openCamera} />
            <Button title="Send" />
            <Button title="back to start" onPress={() => router.push("/")} />
            
        </View>
    );
}

const style = StyleSheet.create({
    image: {
        borderColor: "#a9a9a9",
        borderWidth: 2,
        width: 200,
        height: 200,
        borderRadius: 10,
    },
});
