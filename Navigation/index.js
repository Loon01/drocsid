"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var native_1 = require("@react-navigation/native");
var native_stack_1 = require("@react-navigation/native-stack");
var CreateAccount_1 = require("../Screens/CreateAccount");
var LogIn_1 = require("../Screens/LogIn");
// import App from '../App';
// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App);
var Stack = (0, native_stack_1.createNativeStackNavigator)();
function AppNavigation() {
    return (<native_1.NavigationContainer>
            <Stack.Navigator id="rootstack" initialRouteName="LogIn" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LogIn" component={LogIn_1.default}/>
                <Stack.Screen name="CreateAccount" component={CreateAccount_1.default}/>
            
            </Stack.Navigator>
        </native_1.NavigationContainer>);
}
exports.default = AppNavigation;
