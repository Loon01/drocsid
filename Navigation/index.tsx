import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import CreateAccount from "../Screens/CreateAccount";
import LogIn from "../Screens/LogIn";

import { registerRootComponent } from 'expo';

import App from '../App';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);


const Stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                id = "rootstack"
                initialRouteName = "LogIn"
                screenOptions = {{headerShown: false}}
            >
                <Stack.Screen name="LogIn" component={LogIn}/>
                <Stack.Screen name="CreateAccount" component={CreateAccount}/>
            
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;