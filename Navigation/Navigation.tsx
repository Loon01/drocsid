import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import CreateAccount from "../Screens/CreateAccount";
import LogIn from "../Screens/LogIn";
import Home from "../Screens/Home"
import DirectMessage from "../Screens/DirectMessage";
import Profile from "../Screens/Profile";

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Communities">
                <Stack.Screen name="Communities" component={Home} />
                <Stack.Screen name="DirectMessage" component={DirectMessage} />
                <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}