import 'react-native-gesture-handler';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';
import DetailsScreen from '../views/DetailsScreen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import UpcomingScreen from '../views/UpcomingScreen';

const Stack = createStackNavigator();

const UpcomingStackScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Upcoming"
        component={UpcomingScreen}
        options={({navigation}) => ({
          title: 'Upcoming',
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
        options={{
          headerTintColor: 'black',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default UpcomingStackScreens;
