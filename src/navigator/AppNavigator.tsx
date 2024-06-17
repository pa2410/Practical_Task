import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import Login from '../screens/Login/Login';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer
            onReady={() => {
                RNBootSplash.hide();
            }}
        >
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;
