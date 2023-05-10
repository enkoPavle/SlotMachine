import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppContext} from '../context/app';
import {Terms, Game} from '../views';

const Stack = createStackNavigator();

const Navigation = () => {
  const {visibleView} = useContext(AppContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {
          {
            terms: <Stack.Screen name="Terms" component={Terms} />,
            game: <Stack.Screen name="Game" component={Game} />,
          }[visibleView]
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
