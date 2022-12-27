import { StyleSheet,TextInput, View , Button, Image, Pressable ,TouchableHighlight, Text} from 'react-native';

import React, { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set} from 'firebase/database';



export default function Login({navigation}) {

  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");

  const firebaseConfig = {
    apiKey: "AIzaSyAj_sSY0AITd_DySucu4KaxN702B6qMvM0",
    authDomain: "taskmanagement-3829e.firebaseapp.com",
    projectId: "taskmanagement-3829e",
    storageBucket: "taskmanagement-3829e.appspot.com",
    messagingSenderId: "289426438501",
    appId: "1:289426438501:web:7d13ffcba814e1c1f2898c",
    measurementId: "G-JPVXQFWV9T"
  };

  useEffect(() => {
    initializeApp(firebaseConfig);
    const unsubscribe = getAuth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("AdminHome" , {data1:email});

      }
    })
    return unsubscribe;
  }, []);
  



  const handleSignUp = () => {
    if (email === "" || password === "") {
      alert("Email or password cannot be empty!!!");
    } else {
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then(
          saveToDB()
        ).catch(error => alert(error.message));
    }
  }

  const saveToDB = () => {
    const id = Date.now();
    const db = getDatabase();
    const reference = ref(db, "users/" + id);
    set(reference, { userId: id, email: email, userType: "user" });
  }

  const handleLogin = () => {
    if (email === "" || password === "") {
      alert("Email or password cannot be empty!!!");
    } else
      signInWithEmailAndPassword(getAuth(), email, password)
        .then().catch(error => alert(error.message));
  }



 
    return (
      
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor : "#FAF9F9" }} >
           
            <View >

            <View style={styles.avatarContainer} >
                            <Image style={styles.imagestyle} source = {require('../assets/loginImg.gif')} />
            

              
                        
            <TextInput
            style={styles.textBoxes}
            placeholder="Enter Email Address "
            value={email}
            onChangeText={ (v) => setEmail(v)}
            />
            <TextInput
            style={styles.textBoxes}
            placeholder="Enter Password"
            value={password}
            onChangeText={ (v) => setPassWord(v)}
            />
        
            
          <TouchableHighlight
            style={styles.submit}
            onPress={() => handleLogin()}
            underlayColor='#fff'>
              <Text style={styles.submitText}>LOGIN</Text>
          </TouchableHighlight>

          <View style={styles.signupMain}>
              <Text>New User?</Text>
              <Pressable onPress={() => handleSignUp()}>
                <Text style={styles.signup} >SIGNUP</Text>
              </Pressable>

          </View>

          
          </View>
    
        </View>
    </View>
    
    ); 
                        
                    
                    
       
    }
    
    const styles = StyleSheet.create({
       
        textBoxes: {
        width: 300, 
        fontSize: 18,
        padding: 12,
        borderColor: 'black', 
        borderWidth: 0.2,
        borderRadius: 10,
        marginBottom:10,
        marginLeft:10,
        
        },
        text:{
          fontSize:20,
          fontWeight:'bold',
          margin:10,
          textAlign:'center',
        },
        
        imagestyle:{
          width:'100%',
          height:'50%',
          marginTop:50,
        },
        signupMain:{
          flexDirection:'row',
          margin:14,
          
        },
        signup:{
          color:'blue',
          marginLeft:2,

        },
        submit: {
          
          marginRight: 40,
          marginLeft: 40,
          paddingTop: 15,
          paddingBottom: 10,
          backgroundColor: '#68a0cf',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#fff',
          height:50,
        },
        submitText: {
          color: '#fff',
          textAlign: 'center',
         
        },
        });