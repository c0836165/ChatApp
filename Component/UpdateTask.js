import { StyleSheet, Text,View, Pressable ,TextInput, ScrollView} from "react-native";
import React , {useState , useEffect} from 'react';
import { getDatabase,ref,update } from 'firebase/database';
import { useIsFocused } from "@react-navigation/native";

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
    const focus = useIsFocused(); 
    
    useEffect(() => {
      if(focus == true){
        statusInfo();
      }
  }, [focus]);
  
// function to callculate total payment

const TotalPayment = () =>{

    var HourlyRate = parseInt(taskRate);
    var hours = parseInt(totalHours);
    var total = HourlyRate*hours;
    settotalAmount(total);
    console.log(totalAmount);

}

const statusInfo = () =>{

  var c = taskEndDate.toString();
  var b = taskStartDate.toString();
  var d = new Date().toLocaleDateString();

                var mnths = {
                  Jan: "01",
                  Feb: "02",
                  Mar: "03",
                  Apr: "04",
                  May: "05",
                  Jun: "06",
                  Jul: "07",
                  Aug: "08",
                  Sep: "09",
                  Oct: "10",
                  Nov: "11",
                  Dec: "12"
                };

                var s = c.split(" ");
                var t = b.split(" ");

            
              var p1 =[mnths[s[1]], s[2],s[3]].join("/");
              var p2 = [mnths[t[1]], t[2],t[3]].join("/");

              settaskStartDate(p2);
              settaskEndDate(p1);


  var parts1 = p1.split('/');
  var parts2 = d.split('/');

  
   if(taskStatus == "complete") {
      setTaskStatus(taskStatus);
   } else {           
    if (parseInt(parts1[2]) > parseInt(parts2[2])) {
      
      setTaskStatus("running");
  } else if (parseInt(parts1[2]) == parseInt(parts2[2])) {
      if (parseInt(parts1[1]) > parseInt(parts2[1])) {
        
          setTaskStatus("running");
      } else if (parseInt(parts1[1]) == parseInt(parts2[1])) {
          if (parseInt(parts1[0]) >= parseInt(parts2[0])) {
              
              setTaskStatus("running");
          }else{
           
            setTaskStatus(" running late");
          } 
      }else{
       
        setTaskStatus("running late");
      }
}else {
  
  setTaskStatus("running late");
}

const db = getDatabase();

update(ref(db, 'subprojects/' + id), {
  
            pId:id,         
            taskStatus:taskStatus,
            


        }).then(() => {
            // Data saved successfully!
            console.log(" Status Data Updated in Database."); 
              
        })  
        .catch((error) => {
                // The write failed...
                alert(error);
            });
      }
}
1

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

          <View>
          <Text style={styles.label}>TASK NAME</Text>
          <Text style={styles.textBoxes} >{taskName}</Text>
          </View>
          <View>
          <Text style={styles.label}>TASK DESCRIPTION</Text>
          <Text style={styles.textBoxes} >{taskDescription}</Text>
          </View>
          <View>
          <Text style={styles.label}>TASK ASSIGN TO</Text>
          <Text style={styles.textBoxes} >{assignedMember}</Text>
          </View>
          <View>
          <Text style={styles.label}>TASK START DATE</Text>
          <Text style={styles.textBoxes} >{taskStartDate}</Text>
          </View>
          <View>
          <Text style={styles.label}>TASK END DATE</Text>
          <Text style={styles.textBoxes} >{taskEndDate}</Text>
          </View>
          <View>
          <Text style={styles.label}>TASK STATUS</Text>
          <TextInput placeholder="Task Status?" style={styles.textBoxes} value = {taskStatus} onChangeText={(v) => setTaskStatus(v)}/> 
          </View>
          <View>
          <Text style={styles.label}>TOTAL TASK HOURS</Text>
          <TextInput
              style={styles.textBoxes}
              placeholder="Hours You Worked On"
              value={totalHours}
              onChangeText={ (v) => settotalHours(v)}
          />
          </View>


        
                    
                    
                    
                    
                    
                   
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

    label:{
      
      marginLeft:10,
      fontWeight:'bold',
    },
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
    fontWeight:'300',
    borderColor: 'gray', 
    borderWidth: 0.2,
    borderRadius: 10,
    marginBottom:10,
    marginLeft:10,
    textAlign:'center',
    marginTop:5,
    
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