import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {getAuth} from 'firebase/auth';
import { getDatabase, ref,push, set, onValue } from 'firebase/database';
export default function Chat({route}) {
    
  
    
    const [messages, setMessages] = useState([]);

    //for current user 
    const uID = getAuth().currentUser?.uid; 
    const cEmail = getAuth().currentUser?.email;

    // for clicked user 

    const userId = JSON.parse(route.params.userId);
    const email = JSON.parse(route.params.email);

    useEffect(() => {

      console.log("clicked used" + email + "AND" + userId);
        setMessages([
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              
            },
          },
        ])
      }, [])
    
      const createdAt = Date.now();
      const onSend = useCallback((messageArray) => {
        const msg = messageArray[0];
        const mymsg = {
          ...msg,
          sentBy:uID,
          sentTo:userId,
          createdAt: new Date()
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
        const db = getDatabase();
        const reference = ref(db, "chatrooms/" + userId+"-"+uID);
          push(reference, { cId: userId+"-"+uID,createdAt: createdAt, mymsg:mymsg})
            .then(() => alert("chat Added to database"))
            .catch(error => { alert(error.message) })
        
      }, [])
    
      return (
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: uID,
          }}
        />
      )
    }