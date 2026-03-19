import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const Stack = createNativeStackNavigator();

export default function RootNavigator({ session }: { session: Session | null}) {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} id="" initialRouteName="AuthStack">
                {session && session.user ? (
                    // User is logged in, show AppStack
                    <Stack.Screen name="RootStack" component= {AppStack} />
                ) : (
                    //User is not logged in, show AuthStack
                    <Stack.Screen name="AuthStack" component={AuthStack} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}