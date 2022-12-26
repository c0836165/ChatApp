import { StyleSheet, Text,Image, View, SafeAreaView,TextInput, FlatList, TouchableOpacity } from "react-native";
import React , {useState , useEffect} from 'react';
import { getDatabase,ref,onValue } from 'firebase/database';
import { useIsFocused } from "@react-navigation/native";
import Image2 from '../assets/project.jpeg';
import Image3 from '../assets/project1.png';
import Image4 from '../assets/project3.jpeg';
import Image5 from '../assets/project3.png';

export default function SubTaskDetails({route , navigation}) {

    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
  

    const name = JSON.parse(route.params.info);
    
    const focus = useIsFocused(); 
    
    useEffect(() => {
      if(focus == true){
        SubTaskData();
        
      }
  }, [focus]);

  const images= [Image2,Image3,Image4,Image5,Image2,Image3,Image4,Image5,Image2,Image3,Image4,Image5,Image2,Image3,Image4,Image5,Image2,Image3,Image4,Image5,Image2,Image3,Image4,Image5];

  
  

  const itemSeparator = () => {
    return <View style = {styles.separator} />
   }

    // function for the all subtask list from the database 


    const SubTaskData = () =>{
        var t = [];
      const db = getDatabase();
      const reference = ref(db, "subprojects/");
      onValue(reference, (snapshot) => {
        snapshot.forEach(function (childSnapshot){
          const ProjectData = childSnapshot.val();
          if(ProjectData.projectName === name){
              t.push(ProjectData);
            }
          });
            
        });
        setProducts(t);
        setAllProducts(t);
    }

    const onSearchTextChanged = (text) => {
        const temp = [];
        setQuery(text);
        allProducts.forEach(function (childSnapshot) {
          if (childSnapshot.taskStatus.toLowerCase().includes(text.toLowerCase()) || childSnapshot.taskName.toLowerCase().includes(text.toLowerCase())) {
            temp.push(childSnapshot);
          }
        });
        setProducts(temp);
      }


  return (
    <SafeAreaView>

        <View style={{ alignItems: 'center', justifyContent: 'center' , marginTop:10 }}>
        <TextInput
            style={styles.textBoxes}
            placeholder=" Search For Task and Task Status here... "
            value={query}
            onChangeText={text => onSearchTextChanged(text)}
            /> 
        </View>

        <FlatList
            data = {products}
            ItemSeparatorComponent = { itemSeparator }

            renderItem = { ( {item , index} ) => (
                <TouchableOpacity onPress= {()=>navigation.navigate("UpdateTask" , {info:JSON.stringify(item)})} >
                
                

                

                    <View style={styles.item}>
                        <View style={styles.avatarContainer} >
                        <Image style={styles.imagestyle} source={images[index]} />
                        </View>
                        <Text style={styles.itemname}>{item.taskName}</Text>
                        
                    </View>
                
                </TouchableOpacity>
            )}
            
            />

        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    separator:{
      height: 1,
      width: '100%',
      backgroundColor: '#CCC',
  
    },
    item: {
      flex: 1,
      flexDirection:'row',
      alignItems: 'center',
      paddingVertical: 13,
    },
    avatarContainer:{
      backgroundColor: '#D9D9D9',
      borderRadius: 100,
      height:59,
      width:59,
      justifyContent:'center',
      alignItems:'center',
      marginLeft:20,
    },
    avatar:{
      height: 55,
      width: 55,
    },
    itemname:{
      fontWeight:'600',
      fontSize:16,
      marginLeft:13,
  },
  
    deletebox:{
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:"center",
        width:100,
        height:120,
        
    },
  
    delete:{
      fontSize:20,
      paddingBottom:25,
    },
  
    input:{height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  
    item1: {
      backgroundColor:'#ADD8E6',
      borderRadius:'5',
      margin:10,
    },
  
    i: {
      
      width:'100%',
      height:20,
      textAlign:'center',
      marginTop:10,
      fontSize:18,
      
    },
  
    imagestyle:{
        width:50,
        height:50,
        borderRadius: 100,
      },
    textBoxes: {
        width: 350, 
        fontSize: 18,
        padding: 12,
        borderColor: 'gray', 
        borderWidth: 0.5,
        borderRadius: 10,
        marginBottom:10,
        
        
        },
  
  });
  
  