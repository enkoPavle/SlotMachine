import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {PolicyContext} from '../context/policy';
import {Terms, Game} from '../views';

const Stack = createStackNavigator();

const Navigation = () => {
  const {isAgree} = useContext(PolicyContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAgree ? (
          <Stack.Screen name="Game" component={Game} />
        ) : (
          <Stack.Screen name="Terms" component={Terms} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
