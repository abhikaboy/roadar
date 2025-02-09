import React, { useEffect } from "react";

import { Modal, View, Dimensions, Image, TouchableOpacity, Text } from "react-native";
import { ThemedText } from "./ThemedText";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";

type Props = {};

export default function JobModal({}: Props) {
    const { job } = useAuth();

    const [modalVisible, setModalVisible] = React.useState(true);
    const [requester, setRequester] = React.useState({
        id: 1,
        firstName: "Bobby",
        lastName: "Palazzi",
        email: "bobbypalazzi@gmail.com",
        picture: "https://miro.medium.com/max/1400/1*YqfVlyCe06DfcPsR3kpYrw.jpeg",
    });

    const acceptJob = async () => {
        try {
            console.log(job._id);
            const response = await axios.post(process.env.EXPO_PUBLIC_URL + "/api/v1/jobs/acceptJob", {
                job: job._id,
                mechanic: "67a7e53ead3126f3dab182dc",
            });
            console.log(response);
            setModalVisible(false);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        setModalVisible(true);
        axios.get(process.env.EXPO_PUBLIC_URL + "/api/v1/jobs/driver/" + job.requester).then((res) => {
            setRequester(res.data);
        });
    }, [job]);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View
                style={{
                    flex: 1,
                    bottom: 0,
                    top: Dimensions.get("window").height * 0.4,
                    backgroundColor: "white",
                    alignItems: "center",
                    height: Dimensions.get("window").height * 0.5,
                }}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        width: "100%",
                        alignItems: "center",
                    }}>
                    <Image
                        style={{
                            width: "100%",
                            height: Dimensions.get("window").height * 0.2,
                        }}
                        source={{
                            uri: "https://miro.medium.com/max/1400/1*YqfVlyCe06DfcPsR3kpYrw.jpeg",
                        }}
                    />
                    <View
                        style={{
                            backgroundColor: "#fafafa",
                            flexDirection: "row",
                            padding: 16,
                        }}>
                        <Image
                            style={{
                                width: 64,
                                height: 64,
                                borderRadius: 32,
                            }}
                            source={{
                                uri: requester.picture,
                            }}
                        />
                        <View style={{ flex: 1, marginLeft: 20, flexDirection: "column", padding: 8 }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "medium",
                                    color: "#000",
                                }}>
                                {requester.firstName} {requester.lastName}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "light",
                                    color: "#000",
                                }}>
                                {requester.email}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "column",
                            flex: 1,
                            alignItems: "center",
                            gap: 8,
                        }}>
                        <ThemedText type="title">{job.JobType}</ThemedText>
                        <ThemedText type="default">{job.address}</ThemedText>
                        <ThemedText type="default">{job.details}</ThemedText>
                        <Text
                            style={{
                                fontSize: 32,
                                fontWeight: "bold",
                            }}>
                            ${job.money}
                        </Text>
                        <View style={{ flexDirection: "row", gap: 8 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    toggleModal();
                                }}
                                style={{
                                    backgroundColor: "#FF6969",
                                    padding: 16,
                                    borderRadius: 30,
                                    alignItems: "center",
                                }}>
                                <Text
                                    style={{
                                        color: "white",
                                        paddingHorizontal: 24,
                                    }}>
                                    Deny
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={acceptJob}
                                style={{
                                    backgroundColor: "#42AE54",
                                    padding: 16,
                                    borderRadius: 30,
                                    alignItems: "center",
                                }}>
                                <Text
                                    style={{
                                        color: "white",
                                        paddingHorizontal: 24,
                                    }}>
                                    Accept
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
