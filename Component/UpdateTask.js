import { StyleSheet, Text,Image, View, SafeAreaView, FlatList, TouchableOpacity , Pressable ,TextInput, ScrollView} from "react-native";
import React , {useState , useEffect} from 'react';
import { getDatabase, push, ref, set , onValue, update } from 'firebase/database';
import { getAuth } from "firebase/auth";

export default function UpdateTask({route}) {

    const [details, setDetails] = useState(JSON.parse(route.params.info));
    const[id , setid] = useState(details.pId);
    const [projectName , setProjectname] = useState(details.projectName); 
    const[taskName , setTaskName] = useState(details.taskName);
    const [taskDescription , settaskDescription] = useState(details.taskDescription);
    const [assignedMember , setassignedMember] = useState(details.assignedMember);
    const [taskRate , settaskRate] = useState(details.taskRate);  
    const [taskStartDate, settaskStartDate] = useState(details.taskStartDate);
    const [taskEndDate, settaskEndDate] = useState(details.taskEndDate);
    const [taskStatus , setTaskStatus] = useState(details.taskStatus);
    const [totalHours , settotalHours] = useState(details.totalHours);
    const[totalAmount, settotalAmount] = useState('');
  
// function to callculate total payment

const TotalPayment = () =>{

    var HourlyRate = parseInt(taskRate);
    var hours = parseInt(totalHours);
    var total = HourlyRate*hours;
    settotalAmount(total);
    console.log(totalAmount);

}

function pid(){

   console.log(id);
}

const handleUpdateTask = () =>{
    

    if (taskStatus == "complete" && !totalHours) {
        alert("Please enter the total hours");
    }else{
        TotalPayment();
        const db = getDatabase();
        console.log(" Data is stored in Database.")
        update(ref(db, 'subprojects/' + id), { 
            pId:id,         
            projectName: projectName,
            taskName:taskName,
            taskDescription:taskDescription,
            taskStartDate:taskStartDate,
            taskEndDate:taskEndDate,
            assignedMember:assignedMember,
            taskRate:taskRate,
            taskStatus:taskStatus,
            totalHours:totalHours,
            totalAmount:totalAmount,


        }).then(() => {
            // Data saved successfully!
            alert('  Details updated to database!'); 
              
        })  
        .catch((error) => {
                // The write failed...
                alert(error);
            });
        }
}
  
  
  
  
  
  
  
  
  
  
  
    return (
    <ScrollView>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.item}>
        
                    <Text style={styles.textBoxes} >{taskName}</Text>
                    <Text style={styles.textBoxes} >{taskDescription}</Text>
                    <Text style={styles.textBoxes} >{assignedMember}</Text>
                    <Text style={styles.textBoxes} >Start Date :{taskStartDate}</Text>
                    <Text style={styles.textBoxes} >End Date :{taskEndDate}</Text>
                    <TextInput placeholder="Task Status?" style={styles.textBoxes} value = {taskStatus} onChangeText={(v) => setTaskStatus(v)}/> 
                    <TextInput
                        style={styles.textBoxes}
                        placeholder="Hours You Worked On"
                        value={totalHours}
                        onChangeText={ (v) => settotalHours(v)}
                        />
                   
                    <View>
                        <Pressable onPress={()=> handleUpdateTask()}>
                            <Text style={styles.submit}>UPDATE TASK</Text>
                        </Pressable>
                    </View>
                    
                    
                </View>
                
    </View>
    </ScrollView>
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
      flexDirection:'column',
      alignItems: 'center',
      paddingVertical: 13,
      marginTop:30,
    },
    avatarContainer:{
      backgroundColor: '#D9D9D9',
      borderRadius: 100,
      height:89,
      width:89,
      justifyContent:'center',
      alignItems:'center',
    },
    avatar:{
      height: 55,
      width: 55,
    },
    itemname:{
      fontWeight:'600',
      fontSize:36,
      marginTop:20,
  },
  imagestyle:{
    width:40,
    height:40,
  },
  textBoxes: {
    width: 300, 
    fontSize: 20,
    padding: 12,
    fontWeight:'700',
    borderColor: 'gray', 
    borderWidth: 0.2,
    borderRadius: 10,
    marginBottom:10,
    marginLeft:10,
    textAlign:'center',
    marginTop:10,
    
    },
   
    submit:{
            
        marginTop:20,
        borderRadius:10,
        borderWidth:0.5,
        height:40,
        width:200,
        fontSize:20,
        textAlign:'center',
        paddingTop:7,
        fontWeight:'600',

      },
    
  
  });