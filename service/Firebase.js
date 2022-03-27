import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);


// Initialize Firebase from .env file
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

// Initialize app
const app = initializeApp(firebaseConfig);
// Connect to database
const firestore = getFirestore();

// Set the status change if user send new alive query
const __handleStatusUpdate = async (id, msg, value) => {
    try {
        const time = Date.now();
        await setDoc(doc(firestore, 'pings', id), {
            message: msg,
            status: value,
            lastSeen: time
        });
    } catch (e) {
        // clear error
    }

}

// Get the user status from database and return the status
const __handleGetStatus = async (id) => {
    const docRef = doc(firestore, 'pings', id);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const response = docSnap.data()
            var date = new Date(response.lastSeen)
            alert('Status: ' + '\n' + response.status + '\n' + '\n' + 'Message: ' + '\n' + response.message + '\n' + '\n' + 'Last Update: ' + '\n' + date);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (e) {
        // clear error
    }

}

export default __handleGetStatus
export { __handleStatusUpdate }