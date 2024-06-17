import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import User from '../screens/User/User';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer
            onReady={() => {
                RNBootSplash.hide();
            }}
        >
            <Stack.Navigator>
                <Stack.Screen name='User' component={User} options={{ headerShown: true }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;
