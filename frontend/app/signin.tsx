import { ThemedView } from "@/components/ThemedView";
import * as AppleAuthentication from "expo-apple-authentication";
import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";

export default function SignInScreen() {
  const {login, register, user, logout} = useAuth();
  const router = useRouter();
  // let user = await getUser();
  // console.log(user)
  console.log(user)

  
  // if (user) {
  //   router.push("/")
  // }

  // useEffect(() => {
  //   async function testUser() {
  //     const user = await getUser();
  //     if (user) {
  //       console.log("Already signed in")
  //       console.log(user)
        
  //       router.replace("/")
  //     } else {
  //       console.log("no user")
  //     }
  //   }
  //   testUser();
  // })
  
  return (
      <View style={styles.container}>
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
                      // const email = credential.email
                      // const firstName = credential.fullName?.givenName 
                      // const lastName = credential.fullName?.familyName
                      // let response : any = await register(firstName!, lastName!, email!, appleAccountID, "driver")
                      // console.log(response)
                      
                      let response = await login(appleAccountID, "driver")
                      //const user = await getUser();
                      console.log(user)
                  } catch (e: any) {
                      if (e.code === "ERR_REQUEST_CANCELED") {
                          console.log("they cancelled");
                      } else {
                          // handle other errors
                      }
                  }
              }}
          />
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: 200,
        height: 44,
    },
});
