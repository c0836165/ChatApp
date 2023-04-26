import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Home from './screens/Home';
import { LogBox } from 'react-native';
import Chat from './screens/Chat';
const Stack = createStackNavigator();

export default function MyStack() {


  LogBox.ignoreLogs([" AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"]);
  
  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          
          <Stack.Screen name="Home" component={Home} />

          <Stack.Screen name="Chat" component={Chat} />
          
          
          
        </Stack.Navigator>
    </NavigationContainer>
  );
}

