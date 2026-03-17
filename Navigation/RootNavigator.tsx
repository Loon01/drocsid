import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} id="" initialRouteName="AuthStack">
                <Stack.Screen name="AuthStack" component={AuthStack} />
                <Stack.Screen name="RootStack" component= {AppStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}