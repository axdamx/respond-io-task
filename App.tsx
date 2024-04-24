import 'react-native-gesture-handler';
import * as React from 'react';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/views/HomeScreen';
import DetailsScreen from './src/views/DetailsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Completed from './src/views/CompletedScreen';
import Upcoming from './src/views/UpcomingScreen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import FavouritesScreen from './src/views/FavouritesScreen';
import AiringScreen from './src/views/AiringScreen';
import CompletedScreen from './src/views/CompletedScreen';
import DrawerNavigator from './src/navigation/DrawerNavigator';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const queryClient = new QueryClient();

const CompletedStackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Completed"
        component={CompletedScreen}
        options={({navigation}) => ({
          title: 'Completed',
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

const AiringStackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Airing"
        component={AiringScreen}
        options={({navigation}) => ({
          title: 'Airing',
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
        name="Completed"
        component={CompletedStackScreens}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Airing"
        component={AiringStackScreens}
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
        <DrawerNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
