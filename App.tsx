import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import ListingScreen from './src/screens/ListingScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SearchScreen from './src/screens/SearchScreen';

export type RootStackParamList = {
  Home: undefined;
  Listing: undefined;
  Search: undefined;
};

const App = (): React.JSX.Element => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Listing" component={ListingScreen}></Stack.Screen>
        <Stack.Screen name="Search" component={SearchScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
