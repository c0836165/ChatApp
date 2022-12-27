import { StyleSheet, Text,Image, View, SafeAreaView,TextInput, FlatList, TouchableOpacity } from "react-native";
import React , {useState , useEffect} from 'react';
import { useIsFocused } from "@react-navigation/native";
import { getDatabase,ref,onValue } from 'firebase/database';

export default function CompleteProject() {

    // project data
    const [data , setData] = useState();
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    // subtask data 
    const [count , setCount] = useState(); 
    const focus = useIsFocused(); 

    
    useEffect(() => {
      if(focus == true){
        SubTaskData();
        ProjectDetail();
      }
  }, [focus]);


  


    const ProjectDetail = () =>{
        var t = [];
      const db = getDatabase();
      const reference = ref(db, "projects/");
      onValue(reference, (snapshot) => {
        snapshot.forEach(function (childSnapshot){
          const ProjectData = childSnapshot.val();
          t.push(ProjectData.name);
            
        });
        setData(t);
        console.log(t);
      
       
     })
    }

    const SubTaskData = () =>{
        var t = [];
      const db = getDatabase();
      const reference = ref(db, "subprojects/");
      onValue(reference, (snapshot) => {
        snapshot.forEach(function (childSnapshot){
          const ProjectData = childSnapshot.val();
          t.push({ "projectName":ProjectData.projectName , "taskStatus":ProjectData.taskStatus} );
            
        });

        const result = [...t.reduce( (mp, o) => {
            const key = JSON.stringify([o.projectName, o.taskStatus]);
            if (!mp.has(key)) mp.set(key, { ...o, count: 0 });
            mp.get(key).count++;
            return mp;
        }, new Map).values()];
        
      setProducts(result);
      setAllProducts(result);
      console.log(allProducts);
        
      
       
     })
    }


    const onSearchTextChanged = (text) => {
      const temp = [];
      setQuery(text);
      allProducts.forEach(function (childSnapshot) {
        if (childSnapshot.taskStatus.toLowerCase().includes(text.toLowerCase()) || childSnapshot.count.toString().includes(text) ||childSnapshot.projectName.toLowerCase().includes(text.toLowerCase())) {
          temp.push(childSnapshot);
        }
      });
      setProducts(temp);
    }


    



    

  return (

    <View>

    <View style={{ alignItems: 'center', justifyContent: 'center' , marginTop:10 }}>
        <TextInput
            style={styles.textBoxes}
            placeholder=" Search here... "
            value={query}
            onChangeText={text => onSearchTextChanged(text)}
            />

    </View>        


            <View>

            <FlatList
            data = {products}
         

            renderItem = { ( {item , index} ) => (
                
            <TouchableOpacity >
                
                <View style={styles.item}>
                            
                  <Text style={styles.itemname}>{item.projectName}:</Text>
                  <Text style={styles.itemname}>Task Status: {item.taskStatus}</Text>
                  <Text style={styles.itemname}>Count: {item.count}</Text>
                            
                </View>
                
            </TouchableOpacity>
            )}
            
            />
              
            </View> 
    </View>
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
        borderBottomWidth:0.5,
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
        fontWeight:'400',
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
    