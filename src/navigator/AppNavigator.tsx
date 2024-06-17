import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import Login from '../screens/Login/Login';
import Home from '../screens/Home/Home';
import NewsDetail from '../screens/NewsDetail/NewsDetail';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer
            onReady={() => {
                RNBootSplash.hide();
            }}
        >
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='NewsDetail' component={NewsDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;
