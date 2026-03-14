import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import CreateAccount from "../Screens/CreateAccount";
import LogIn from "../Screens/LogIn";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} id="" initialRouteName="LogIn">
                <Stack.Screen name="LogIn" component={LogIn} />
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}