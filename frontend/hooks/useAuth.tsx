import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { createContext, Dispatch, useContext, useState } from "react";
import React from "react";

async function getUserByAppleAccountID(appleAccountID: string, accountType: "driver" | "mechanic") {
    const url = process.env.EXPO_PUBLIC_API_URL + "/" + accountType + "s/aaid/" + appleAccountID;
    const response = await fetch(url, {
        method: "GET",
    });
    const user = await response.json();
    return user;
}

interface AuthContextType {
    user: any | null;
    login: (appleAccountID: string, accountType: "mechanic" | "driver") => void;
    register: (
        firstName: string,
        lastName: string,
        email: string,
        appleAccountID: string,
        accountType: "mechanic" | "driver"
    ) => any;
    logout: () => void;
    refresh: () => void;

    job: any | null;
    setJob: Dispatch<any>;

    createJob: any | null;
    setCreateJob: Dispatch<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any | null>(null);
    const [job, setJob] = useState<any | null>({
        id: 1,
        JobType: "Flat Tire Repair",
        money: 500,
        details: "my tires seem to be really flat",
        address: "23 Coventry, Boston MA",
        firstName: "Bobby",
        lastName: "Palazzi",
        email: "bobbypalazzi@gmail.com",
        picture: "https://miro.medium.com/max/1400/1*YqfVlyCe06DfcPsR3kpYrw.jpeg",
    });

    const [createJob, setCreateJob] = useState<any | null>(null);

    async function register(
        firstName: string,
        lastName: string,
        email: string,
        appleAccountID: string,
        accountType: "mechanic" | "driver"
    ) {
        const url = process.env.EXPO_PUBLIC_API_URL + "/" + accountType + "s";
        console.log(url);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    appleAccountID,
                }),
            });

            if (!response.ok) {
                throw Error("Unable to complete operation" + " status code: " + response.statusText);
            }

            console.log(response);
            return response;
        } catch (e: any) {
            console.log(e);
        }
    }

    async function login(appleAccountID: string, accountType: "mechanic" | "driver") {
        const userRes = await getUserByAppleAccountID(appleAccountID, accountType);

        if (userRes) {
            setUser({ ...userRes, accountType });
            return { ...userRes, accountType };
        } else {
            throw new Error("Could not login");
        }
    }

    async function logout() {
        setUser(null);
    }

    async function refresh() {
        if (user) {
            login(user.appleAccountID, user.accountType);
        }
    }
    return (
        <AuthContext.Provider value={{ user, register, login, logout, refresh, job, setJob, createJob, setCreateJob }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
