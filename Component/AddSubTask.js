import { useState , useEffect} from 'react';
import { StyleSheet, Text, TextInput, FlatList, View,VariantsBox, TouchableOpacity , Button, Pressable, SafeAreaView  } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getDatabase, push, ref, set , onValue } from 'firebase/database';
import { getAuth } from "firebase/auth";


export default function App() {

  const id = Date.now();
    const [ pName, setProjectName] = useState("");
    const [taskName , setTaskName] = useState("");
    const [taskDescription , settaskDescription] = useState("");
    const [assignedMember , setassignedMember] = useState("");
    const [taskRate , settaskRate] = useState("");  
    const [taskStartDate, settaskStartDate] = useState('');
    const [taskEndDate, settaskEndDate] = useState('');
    const [taskStatus , setTaskStatus] = useState(" ");
    const [totalHours , settotalHours] = useState("");
    const[totalAmount, settotalAmount] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDateEndPickerVisible, setDateEndPickerVisibility] = useState(false);
    const [isProjectOpen, setIsProjectOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);

    const [ projectArray , setProjectArray] = useState("");
    const [usersData , setusersData] = useState("");

    const [assignMemberId, setAssignMemberId] = useState({
      email: "Assign Task To User",
    });

    const [assignProjectId, setAssignProjectId] = useState({
      name: "Select a Project for the Task",
    });


      

    // function for the all project data from the database 

            const AllProjectDetails = () =>{
              var t = [];
            const db = getDatabase();
            const reference = ref(db, "projects/");
            onValue(reference, (snapshot) => {
              snapshot.forEach(function (childSnapshot){
                const ProjectData = childSnapshot.val();
                t.push(ProjectData)
                  
              });
              setProjectArray(t);
              console.log(projectArray);
              
          })
          }


        


    // function for the all user list from the database 


            const UsersData = () =>{
              var t = [];
            const db = getDatabase();
            const reference = ref(db, "users/");
            onValue(reference, (snapshot) => {
              snapshot.forEach(function (childSnapshot){
                const ProjectData = childSnapshot.val();
                t.push(ProjectData);
                  
              });
              setusersData(t);
              
              
              
          })
          }


    // function for the start date and end date 

            const showDatePicker = () => {
                setDatePickerVisibility(true);
              };

              const hideDatePicker = () => {
                setDatePickerVisibility(false);
              };

              const handleConfirm = (date) => {
                
                settaskStartDate(date.toString());
                hideDatePicker();
              };

              const getDate = () => {

                var c = taskStartDate.toString();

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
                },

                date = c.split(" ");

              var startDate =[date[3], mnths[date[1]], date[2]].join("-");
              
              return startDate.toString();

              
                
              };

              // date end 
              const showDateEndPicker = () => {
                setDateEndPickerVisibility(true);
              };

              const hideDateEndPicker = () => {
                setDateEndPickerVisibility(false);
              };

              const handleEndConfirm = (endDate) => {    
                settaskEndDate(endDate.toString());
                hideDateEndPicker();
              };

             

              const getEndDate = () => {

                var c = taskEndDate.toString();

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
                },

                date = c.split(" ");
            
              var endDate =[date[3], mnths[date[1]], date[2]].join("-");
              return endDate.toString(); 
      };

      // function for the star date and end date end here 

      // function to to submit all data in the firebase 

      const handleSubmitTask = () => {
        
        if (!taskName.trim() || !taskDescription.trim()) {
          alert("Please!!.. Enter Valid Inputs");
        }else {
            const db = getDatabase();
            console.log(" Data is stored in Database.")
            set(ref(db, 'subprojects/'+ id), { 
                pId:id,         
                projectName: pName,
                taskName:taskName,
                taskDescription:taskDescription,
                assignedMember:assignedMember,
                taskRate:taskRate,
                taskStartDate:taskStartDate,
                taskEndDate:taskEndDate,
                taskStatus:taskStatus,
                totalHours:totalHours,
                totalAmount:totalAmount,


            }).then(() => {
                // Data saved successfully!
                alert(' Task Details added to database!');
                setTaskName('');
                settaskDescription('');
                settaskRate('');
                settaskStartDate('');
                settaskEndDate('');


            })  
            .catch((error) => {
                    // The write failed...
                    alert(error);
                });
          }

        }
        


       

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' , marginTop:100 }}>
             <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => {
            setIsProjectOpen(true);
            AllProjectDetails();
            
          }}
        >
        <Text style={styles.textBoxes} >{assignProjectId.name}</Text>
        </TouchableOpacity>
        {isProjectOpen && (
          <View style={[styles.textBoxes, { height: null }]}>
            {isProjectOpen &&
              projectArray.map((i) => {
                return (
                  <View
                    style={{ width: "90%", margin: 10 , borderBottomWidth:0.3}}
                  >
                    <Text
                      style={styles.listText}
                      onPress={() => {
                        setAssignProjectId({ name: i.name});
                        setIsProjectOpen(false);
                        setProjectName(i.name);
                      }}
                    >
                      {i.name}
                    </Text>
                  </View>
                );
              })}
          </View>
        )}

            <TextInput
            style={styles.textBoxes}
            placeholder=" Task Name.... "
            value={taskName}
            onChangeText={ (v) => setTaskName(v)}
            />
            <TextInput
            style={styles.textBoxes}
            placeholder="Task Description...."
            value={taskDescription}
            onChangeText={ (v) => settaskDescription(v)}
            />

<TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => {
            setIsUserOpen(true);
            UsersData();
          }}
        >
        <Text style={styles.textBoxes} >{assignMemberId.email}</Text>
        </TouchableOpacity>
        {isUserOpen && (
          <View style={[styles.textBoxes, { height: null }]}>
            {isUserOpen &&
              usersData.map((i) => {
                return (
                  <View
                    style={{ width: "90%", margin: 10, borderBottomWidth:0.3 }}
                  >
                    <Text
                      style={styles.listText}
                      onPress={() => {
                        setAssignMemberId({ email: i.email});
                        setIsUserOpen(false);
                        setassignedMember(i.email);
                      }}
                    >
                      {i.email}
                    </Text>
                  </View>
                );
              })}
          </View>
        )}

<TextInput
            style={styles.textBoxes}
            placeholder=" Add Hourly Rate...."
            value={taskRate}
            onChangeText={ (v) => settaskRate(v)}
            />
    <View style={styles.dateBox} >
        <Pressable  onPress={showDatePicker}>
              <Text style={styles.DateTextshow} >Start Date</Text>
        </Pressable>
        {/* <Button title='set End Data'
         onPress={showDateEndPicker}
         /> */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
            <Text
            style={styles.DateTextInput}
            
          > {getDate()}</Text>
          </View>

        <View style={styles.dateBox1} >
        <Pressable  onPress={showDateEndPicker}>
              <Text style={styles.DateTextshow} >End Date</Text>
        </Pressable>
        {/* <Button title='set End Data'
         onPress={showDateEndPicker}
         /> */}
          <DateTimePickerModal
            isVisible={isDateEndPickerVisible}
            mode="date"
            onConfirm={handleEndConfirm}
            onCancel={hideDateEndPicker}
          />
          <Text
            style={styles.DateTextInput}
          >{getEndDate()}</Text>
         </View>

         <View>

        
          <Pressable onPress={()=> handleSubmitTask()}>
            <Text style={styles.submit}>SUBMIT TASK</Text>
          </Pressable>
         </View>

        
       

         

    </View>


  );

}

const styles = StyleSheet.create({
    container: {  
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
    textBoxes: {
    width: 300, 
    fontSize: 18,
    padding: 12,
    borderColor: 'gray', 
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom:10,
    marginLeft:10,
    
    },
    text:{
      width: 320,
      
      fontSize:20,
      fontWeight:'bold',
      marginTop: -20,
      marginBottom: 20,
      textAlign:'center',
    },
    textToset:{
      height:50,
      width:300,
      color:'red',
      marginBottom:-45,
      paddingTop:20,
      textAlign:'right',
      
    },
    submitText:{
      color:'white',
      textAlign:'center',
      fontSize:15,
      fontWeight:'600'
    },
    dateText:{
      width:500,
     
      color:'red',
      textAlign:'right',
     
    },
    listText:{
        color:'black',
        textAlign:'center',
        fontSize:20,
       
    },
    
    dateBox:{
      width:'75%',
      backgroundColor:'yellow',
      flex:1,
      flexDirection:'row-reverse',
      

    },
    dateBox1:{
      width:'75%',
      backgroundColor:'yellow',
      flex:1,
      flexDirection:'row-reverse',
      marginTop:60,

    },
    DateTextInput:{
        width:200,
        height:50,
        borderWidth: 0.5,
        borderRadius: 10,
        fontSize: 18,
        padding: 12,
        borderColor: 'gray',
        marginLeft:100,
      },
      DateTextshow:{
        width:100,
        height:50,
        borderWidth: 0.5,
        borderRadius: 10,
        textAlign:'center',
        fontSize: 16,
        padding: 15,
        borderColor: 'gray',
        marginLeft:5,
        fontWeight:'500',
      },
      submit:{
        marginTop:60,
        borderRadius:10,
        borderWidth:0.5,
        height:40,
        width:150,
        fontSize:20,
        textAlign:'center',
        paddingTop:7,
        fontWeight:'600',
      },
    });





