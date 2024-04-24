import 'react-native-gesture-handler';
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import FavouriteStackScreens from './FavouriteStack';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Anime Listing View"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Favourites"
        component={FavouriteStackScreens}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
