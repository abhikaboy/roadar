import { ThemedView } from "@/components/ThemedView";
import * as AppleAuthentication from "expo-apple-authentication";
import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";

export default function SignUpButton({ isMechanic } : { isMechanic : boolean}) {
  const {login, register, user, logout} = useAuth();
  const router = useRouter();
  


  
  return (
      
          <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP}
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
              cornerRadius={5}
              style={styles.button}
              onPress={async () => {
                  try {
                      const credential = await AppleAuthentication.signInAsync({
                          requestedScopes: [
                              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                              AppleAuthentication.AppleAuthenticationScope.EMAIL,
                          ],
                      });
                      
                      const appleAccountID = credential.user
                      const email = credential.email
                      const firstName = credential.fullName?.givenName 
                      const lastName = credential.fullName?.familyName
                      if (!email || !firstName || !lastName) {
                        alert("Either you already have a user or didn't give us permissions")
                        return
                      }
                      await register(firstName, lastName, email, appleAccountID, isMechanic ? "mechanic" : "driver")
                      
                      
                      
                  } catch (e: any) {
                      if (e.code === "ERR_REQUEST_CANCELED") {
                          console.log("they cancelled");
                      } else {
                          alert("An unexpected error occurred")
                      }
                  }
              }}
          />
      
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: "100%",
        height: 44,
        backgroundColor: "red"
    },
});
