import { useState , useEffect } from "react";
import { StyleSheet, Text,Image, View, SafeAreaView, FlatList,TouchableOpacity} from "react-native";
import { getDatabase,ref,onValue } from 'firebase/database';
import { getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import Image2 from '../assets/project.jpeg';
import Image3 from '../assets/project1.png';
import Image4 from '../assets/project3.jpeg';
import Image5 from '../assets/project3.png'; 

function UserScreen({ navigation }) {
  
    const [taskArray , setTaskArray] = useState("");
    const focus = useIsFocused(); 
    
    useEffect(() => {
      if(focus == true){
        SubTaskData();
      }
  }, [focus]);

  const [images ,setImage]= useState([Image2,Image3,Image4,Image5,Image2,Image3,Image4,Image5,Image2,Image3,Image4,Image5,Image2,Image3,Image4,Image5,Image2,Image3,Image4,Image5,Image2,Image3,Image4,Image5]);
 

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
              if(ProjectData.assignedMember === getAuth().currentUser?.email){
                  t.push(ProjectData);
                }
              });
                
            });
            setTaskArray(t);
            
            
            
        }
        

  return (
    <SafeAreaView>
        <FlatList
              data = {taskArray}
              ItemSeparatorComponent = { itemSeparator }

              renderItem = { ( {item , index} ) => (
                  <TouchableOpacity onPress= {()=>navigation.navigate("UpdateTask" , {info:JSON.stringify(item)})} >
                  
                    

                  

                      <View style={styles.item}>
                          <View style={styles.avatarContainer} >
                            <Image style={styles.imagestyle} source={images[index]} />
                          </View>
                          <View>
                          <Text style={styles.itemname}>{item.taskName}</Text>
                          <Text style={styles.itemname1}>{item.projectName}</Text>
                          </View>
                          
                      </View>
                  
                  </TouchableOpacity>
              )}
                
              />

              </SafeAreaView>
  );
}

export default UserScreen;

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

itemname1:{
  fontWeight:'200',
  fontSize:16,
  marginLeft:13,
  marginTop:1,
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


});

