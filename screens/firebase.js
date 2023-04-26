import { initializeApp } from "firebase/app";
import { getDatabase, ref, set} from 'firebase/database';


const firebaseConfig = { 
    apiKey : "AIzaSyDPw7bj4-aDtP6y9gY0y3sXzuNro_ZBGT4" , 
    authDomain : "chatapp-2f052.firebaseapp.com" , 
    databaseURL : "https://chatapp-2f052-default-rtdb.firebaseio.com" , 
    projectId : "chatapp-2f052" , 
    storageBucket : "chatapp-2f052.appspot.com" , 
    messagingSenderId : "577348756597" , 
    appId : "1:577348756597:web:d79e42dca31993c83dc43c" , 
    measurementId : "G-W3W7F7ZBTE" 

}

const app = initializeApp(firebaseConfig);
const DB = getDatabase(app);