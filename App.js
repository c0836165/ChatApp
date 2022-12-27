import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import AdminHome from './screens/AdminHome';
import SubTaskDetails from './Component/SubTaskDetails';
import UpdateTask from './Component/UpdateTask';
import { LogBox } from 'react-native';

const Stack = createStackNavigator();

export default function MyStack() {

  LogBox.ignoreLogs(["Got a component with the name 'adminHome' for the screen 'AdminHome'. React Components must start with an uppercase letter. If you're passing a regular function and not a component, pass it as children to 'Screen' instead. Otherwise capitalize your component's name."]);
  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          
          <Stack.Screen name="AdminHome" component={AdminHome} />
          <Stack.Screen name="SubTaskDetails" component={SubTaskDetails}
                        
                        options={{
                          headerShown: true,
                          title: 'Task List',
                          headerStyle: {
                            backgroundColor: '#73B9EE',
                          },
                          headerTintColor: '#fff',
                          headerTitleStyle: {
                            fontWeight: 'bold',
                          },
                        }}
          />
          <Stack.Screen name="UpdateTask" component={UpdateTask}
                        
                        options={{
                          headerShown: true,
                          title: 'Task Details',
                          headerStyle: {
                            backgroundColor: '#73B9EE',
                          },
                          headerTintColor: '#fff',
                          headerTitleStyle: {
                            fontWeight: 'bold',
                          },
                        }}
          />
          
        </Stack.Navigator>
    </NavigationContainer>
  );
}

