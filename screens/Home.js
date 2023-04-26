import { useState ,useEffect } from "react";
import { StyleSheet, Text,TextInput,Image, View, SafeAreaView, FlatList, TouchableOpacity, Pressable, Alert } from "react-native";
import { getDatabase,ref, onValue } from 'firebase/database';
import { useIsFocused } from "@react-navigation/native"; 


export default function Home({navigation}) {
  
  
  
  const [data , setData] = useState();

  const [allProducts, setAllProducts] = useState([]);
  
  const focus = useIsFocused(); 
  useEffect(() => {
    if(focus == true){
   ProjectDetail();
  
   
    }
}, [focus]);
  
  const ProjectDetail = () =>{
    var t = [];
  const db = getDatabase();
  const reference = ref(db, "users/");
  onValue(reference, (snapshot) => {
    snapshot.forEach(function (childSnapshot){
      const ProjectData = childSnapshot.val();
      t.push(ProjectData);
      console.log(t);
        
    });
    setData(t);
    setAllProducts(t);
    
    
    
})
}



  
  const itemSeparator = () => {
    return <View style = {styles.separator} />
   }
  
  return (
    <SafeAreaView>

    <View>

    <View style={{ alignItems: 'center', justifyContent: 'center' , marginTop:10 }}>
        <Text> Search here</Text>

    </View>     

    <FlatList
              data = {data}
              ItemSeparatorComponent = { itemSeparator }

              renderItem = { ( {item , index} ) => (
              
                  <TouchableOpacity onPress= {()=>navigation.navigate("Chat" , {email:JSON.stringify(item.email), userId:JSON.stringify(item.userId) })} >

                  <View style={styles.item}>
                          
                          <Text style={styles.itemname}>{item.email}</Text>
                         
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