import 'react-native-gesture-handler';
import * as React from 'react';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/views/HomeScreen';
import DetailsScreen from './src/views/DetailsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Completed from './src/views/Completed';
import Upcoming from './src/views/Upcoming';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import FavouritesScreen from './src/views/FavouritesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const queryClient = new QueryClient();

const StackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          title: 'Home',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <IonIcon
              name={'list-sharp'}
              size={24}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{marginLeft: 10}}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
        })}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{title: 'Details Screen'}}
      />
    </Stack.Navigator>
  );
};

const FavouriteStackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={({navigation}) => ({
          title: 'Favourites',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <IonIcon
              name={'list-sharp'}
              size={24}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{marginLeft: 10}}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
        })}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{title: 'Details Screen'}}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Airing"
        component={StackScreens}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Completed"
        component={Completed}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Upcoming"
        component={Upcoming}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
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
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
