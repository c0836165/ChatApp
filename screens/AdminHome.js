import {  Button} from 'react-native'
// import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useState , useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { AntDesign } from '@expo/vector-icons'; 
import { getDatabase, ref, onValue } from 'firebase/database';
import WelcomeScreen from "./WelcomeScreen";
import UserHome from "./userHome";
import AddProject from '../Component/AddProject';
import AddSubTask from '../Component/AddSubTask';


const Drawer = createDrawerNavigator();

export default function adminHome({ navigation}) {


  const [isAdmin , setIsAdmin] = useState(true);

  useEffect(() => {
    CheckUserType();
  }, []);
  

    const userEmail = getAuth().currentUser?.email;
    const logout = () => {
        getAuth().signOut().then(() => {
            
            
        navigation.replace("Login");
        }).catch(error => { alert(error.message) });
      }

      const CheckUserType = () =>{
          const db = getDatabase();
          const reference = ref(db, "users/");
          onValue(reference, (snapshot) => {
            snapshot.forEach(function (childSnapshot) {
              const userData = childSnapshot.val();
              
              if (userData.email === userEmail) {
                 if(userData.userType === 'admin'){
                    setIsAdmin(true);
                 }else{
                  setIsAdmin(false);
                 }
              }
              
            });
          });
        }
    
  return (

   <>
      {isAdmin?(

      // admin section start here....
      //is admin then show two screen 
      <Drawer.Navigator
        
          screenOptions={{
            //header background color
            headerStyle: { backgroundColor: "#73B9EE" },
            //header text color
            headerTintColor: "white",
            drawerActiveBackgroundColor: "#86CEFA",
            drawerActiveTintColor: "#fff",
            drawerStyle: { backgroundColor: "#cccc" },
          }}
      >
      <Drawer.Screen
          name='Admin Home'
          component={WelcomeScreen}
          options={{
            headerRight: () => (
              <Button
                onPress={() => logout()}
                title="Logout"
                color="#fff"
              />
            ),
            drawerLabel: "Admin Home",
            drawerIcon: ({ color, size }) => (
              <AntDesign name="home" color={color} size={size} />
              

            ),
          }}
    />

      <Drawer.Screen
            name="Add Project"
            component={AddProject}
            options={{
              drawerIcon: ({ color, size }) => (
                <AntDesign name="filetext1" color={color} size={size} />
               
              ),
            }}
      />

      <Drawer.Screen
            name="Add Task"
            component={AddSubTask}
            options={{
              drawerIcon: ({ color, size }) => (
                <AntDesign name="addfile" color={color} size={size} />
               
              ),
            }}
      />



    </Drawer.Navigator>

     
      
      ):( 
        
        // user section start here.....
        // is not then only show one screen 
        <Drawer.Navigator
    
            screenOptions={{
              //header background color
              headerStyle: { backgroundColor: "#3c0a6b" },
              //header text color
              headerTintColor: "white",
              drawerActiveBackgroundColor: "#f0e1ff",
              drawerActiveTintColor: "#3c0a6b",
              drawerStyle: { backgroundColor: "#cccc" },
            }}
            
        >

      <Drawer.Screen
            name="User Home"
            component={UserHome}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="person" color={color} size={size} />
              ),
              headerRight: () => (
                <Button
                  onPress={() => logout()}
                  title="Logout"
                  color="#fff"
                />
              ),
            }}
      />




    </Drawer.Navigator>


      
      
     
      )}
      
      

    
 
    </>
);

}
