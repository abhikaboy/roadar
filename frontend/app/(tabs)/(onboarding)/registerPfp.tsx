import OnboardButton from "@/components/ui/OnboardButton";
import { useEffect, useState } from "react";
import { Button, Image, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React from 'react'
import { RNS3 } from "react-native-aws3";
import * as MediaLibrary from "expo-media-library";
import { v4 as uuidv4 } from 'uuid'
import 'react-native-get-random-values'


export default function registerPfp() {
    const [image, setImage] = useState<string | null>(null);
    const [activeUri, setActiveUri] = useState<ImagePicker.ImagePickerResult>();

    const router = useRouter()

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
        setActiveUri(result)
        
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

        setActiveUri(result)

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleContinue = () => {
        console.log(activeUri)
        onDone(activeUri, true)
        router.push("/registerAlias")
    }

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
        const asset = allAssets.assets[0]
        const { uri, mimeType } = asset;
        const randomFileName = "pfp:" + uuidv4()
        

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
          .then(async response => {
            if (response.status == 201) {
              let newUri = response.body.postResponse.location
              
              //LINK DB HERE
              console.log(newUri)
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };

    return (
        <View style={style.frame}>
            <View style={style.content}>
                <View style={style.textFrame}>
                    <Text style={style.text}>Set a profile picture!</Text>
                    <Pressable onPress={openPicker}>
                        {image == null ? (
                            <Image source={require("@/assets/images/addpic.png")} style={style.image}/>
                        ) : (
                            image && <Image source={{ uri: image }} style={style.image} />
                        )}
                    </Pressable>
                    <Button title="Open Camera" onPress={openCamera} />
                </View>
            </View>
            <View style={{ width: "100%", gap: 10 }}>
                <OnboardButton title="Continue" color="#082a74" textColor="#FFFFFF" onPress={handleContinue}/>
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
        borderRadius: 10
    },
    skipButton: {
        color: "#000"
    }
});
