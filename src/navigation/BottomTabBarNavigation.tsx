import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Airing from '../views/Airing';
import Upcoming from '../views/Upcoming';
import Completed from '../views/Completed';
// import Home from '../modules/home/src/views/Home';
// import Location from '../modules/location/src/views/Location';
// import Chat from '../modules/chat/src/views/Chat';
// import Profile from '../modules/profile/src/views/Profile';
// import {COLORS} from '../constants/theme';

import IonIcon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../views/HomeScreen';

const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  const tabBarStyle = {
    borderRadius: 20,
    height: 80,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#EB6A58"
      tabBarHideKeyBoard={true}
      headerShown={false}
      inactiveColor={'#3e2465'}
      barStyle={{paddingBottom: 48}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <IonIcon
              name={focused ? 'apps' : 'apps-outline'}
              size={26}
              color={focused ? 'red' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Upcoming"
        component={Upcoming}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <IonIcon
              name={focused ? 'location' : 'location-outline'}
              size={26}
              color={focused ? 'red' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Completed"
        component={Completed}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <IonIcon
              name={
                focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'
              }
              size={26}
              color={focused ? 'red' : 'gray'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
