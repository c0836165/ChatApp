
import { useState , useEffect } from "react";
import { StyleSheet, Text,TextInput,Image, View, SafeAreaView, FlatList, TouchableOpacity, Pressable } from "react-native";
import { getDatabase,ref, onValue } from 'firebase/database';
import { useIsFocused } from "@react-navigation/native"; 
import Image2 from '../assets/project.jpeg';
import Image3 from '../assets/project1.png';
import Image4 from '../assets/project3.jpeg';
import Image5 from '../assets/project3.png';




export default function  WelcomeScreen({navigation}) {

  const [data , setData] = useState();
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const focus = useIsFocused(); 
  useEffect(() => {
    if(focus == true){
   ProjectDetail();
  
   SubProjectDetail();
    }
}, [focus]);

  
  const [subTaskData , setSubTaskData] = useState();

  const ProjectDetail = () =>{
    var t = [];
  const db = getDatabase();
  const reference = ref(db, "projects/");
  onValue(reference, (snapshot) => {
    snapshot.forEach(function (childSnapshot){
      const ProjectData = childSnapshot.val();
      t.push(ProjectData);
        
    });
    setData(t);
    setAllProducts(t);
    console.log(data);
    
    
})
}

const SubProjectDetail = () =>{
  var t = [];
const db = getDatabase();
const reference = ref(db, "subprojects/");
onValue(reference, (snapshot) => {
  snapshot.forEach(function (childSnapshot){
    const ProjectData = childSnapshot.val();
    t.push(ProjectData);
      
  });
  setSubTaskData(t);
  
  
  
})
}

const onSearchTextChanged = (text) => {
  const temp = [];
  setQuery(text);
  allProducts.forEach(function (childSnapshot) {
    if (childSnapshot.name.toLowerCase().includes(text.toLowerCase())) {
      temp.push(childSnapshot);
    }
  });
  setData(temp);
}

// function to show that how much percentages of tasks are completed
const [images ,setImage]= useState([Image2,Image3,Image4,Image5,Image2,Image3,Image4,Image5,Image2,Image3,Image4,Image5,Image2,Image3,Image4,Image5,Image2,Image3,Image4,Image5,Image2,Image3,Image4,Image5]);

const itemSeparator = () => {
  return <View style = {styles.separator} />
 }

return (
       
  <SafeAreaView>

    <View>

    <View style={{ alignItems: 'center', justifyContent: 'center' , marginTop:10 }}>
        <TextInput
            style={styles.textBoxes}
            placeholder=" Search here... "
            value={query}
            onChangeText={text => onSearchTextChanged(text)}
            />

    </View>     

    <FlatList
              data = {data}
              ItemSeparatorComponent = { itemSeparator }

              renderItem = { ( {item , index} ) => (
              
                  <TouchableOpacity onPress= {()=>navigation.navigate("SubTaskDetails" , {info:JSON.stringify(item.name)})} >
                  
                  <View style={styles.item}>
                          <View style={styles.avatarContainer} >
                            <Image style={styles.imagestyle} source={images[index]} />
                          </View>
                          <Text style={styles.itemname}>{item.name}</Text>
                          <Pressable onPress={()=>imageselector()}>
                            
                          </Pressable>
                  </View>
                  
                  </TouchableOpacity>
              )}
                
              />


    </View>

          

            
              

            
  
         
 
</SafeAreaView>

);
}


// style part start herer //
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

