import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Home from "../Screens/Home"
import DirectMessage from "../Screens/DirectMessage";
import Profile from "../Screens/Profile";

const Stack = createNativeStackNavigator();

export default function AppStack() {
    return(
            <Stack.Navigator id="" initialRouteName="Communities">
                <Stack.Screen name="Communities" component={Home} />
                <Stack.Screen name="DirectMessage" component={DirectMessage} />
                <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
    );
}