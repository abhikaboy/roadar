import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Button, Dimensions, Image, Platform, StyleSheet, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { RNS3 } from "react-native-aws3";
import * as MediaLibrary from "expo-media-library";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import { useAuth } from "@/hooks/useAuth";

// put this under the request job workflow
export default function sendImage() {
    const [image, setImage] = useState<string | null>(null);
    const [activeUri, setActiveUri] = useState<ImagePicker.ImagePickerResult>();

    const [passedImage, setPassedImage] = useState<string | null>(null);
    const router = useRouter();

    const { createJob, setCreateJob } = useAuth();

    const handleContinue = () => {
        setCreateJob({
            ...createJob,
            picture: passedImage,
        });
        router.push("/home/confirm");
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        setActiveUri(result);

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

    const openPicker = async () => {
        const { status } = await MediaLibrary.getPermissionsAsync();
        if (status != "granted") {
            const newPerms = await MediaLibrary.requestPermissionsAsync();
            // @ts-ignore
            if (newPerms == MediaLibrary.PermissionStatus.GRANTED) {
                pickImage();
            }
        } else {
            pickImage();
        }
    };

    const onDone = (allAssets: any, isSelected: boolean) => {
        const asset = allAssets.assets[0];
        const { uri, mimeType } = asset;

        const randomFileName = "image:" + uuidv4();

        const file = {
            uri: uri,
            name: randomFileName,
            type: mimeType,
        };

        const options = {
            bucket: "playground-bucket-beak",
            region: "us-east-2",
            accessKey: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID as string,
            secretKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
            successActionStatus: 201,
        };

        RNS3.put(file, options)
            .then(async (response) => {
                if (response.status == 201) {
                    let newUri = response.body.postResponse.location;

                    //LINK DB HERE
                    console.log(newUri);
                    setPassedImage(newUri);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const openCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        setActiveUri(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={style.container}>
            {image == null ? (
                <Image source={require("@/assets/images/addpic.png")} style={style.image} />
            ) : (
                image && <Image source={{ uri: image }} style={style.image} />
            )}
            <Button title="Open Library" onPress={openPicker} />
            <Button title="Open Camera" onPress={openCamera} />
            <Button
                title="Confirm Photo"
                onPress={() => {
                    onDone(activeUri, true);
                }}
            />
            <Button title="back to start" onPress={() => router.push("/")} />
            <Button title="Continue" onPress={handleContinue} />
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
    container: {
        alignItems: "center",
        justifyContent: "center",
        height: Dimensions.get("screen").height * 0.75,
    },
});
