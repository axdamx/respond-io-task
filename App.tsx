import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import DrawerNavigator from './src/navigation/DrawerNavigator';

const queryClient = new QueryClient();

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
