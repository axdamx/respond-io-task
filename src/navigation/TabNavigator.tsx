import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import * as React from 'react';
import CompletedStackScreens from './CompletedStack';
import AiringStackScreens from './AiringStack';
import {primaryColor, secondaryColor} from '../constants/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import UpcomingStackScreens from './UpcomingStack';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Completed"
        component={CompletedStackScreens}
        options={{
          headerShown: false,
          tabBarActiveTintColor: secondaryColor,
          tabBarInactiveTintColor: primaryColor,
          tabBarIcon: ({focused}) => (
            <IonIcon
              name="shield-checkmark"
              size={24}
              color={focused ? secondaryColor : primaryColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Airing"
        component={AiringStackScreens}
        options={{
          headerShown: false,
          tabBarActiveTintColor: secondaryColor,
          tabBarInactiveTintColor: primaryColor,
          tabBarIcon: ({focused}) => (
            <IonIcon
              name="flame-sharp"
              size={24}
              color={focused ? secondaryColor : primaryColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Upcoming"
        component={UpcomingStackScreens}
        options={{
          headerShown: false,
          tabBarActiveTintColor: secondaryColor,
          tabBarInactiveTintColor: primaryColor,
          tabBarIcon: ({focused}) => (
            <IonIcon
              name="flash-sharp"
              size={24}
              color={focused ? secondaryColor : primaryColor}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
