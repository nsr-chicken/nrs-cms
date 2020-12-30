import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import 'firebase/database';
import 'firebase/firestore';
const app = firebase.initializeApp({
    apiKey: "AIzaSyC2GIk1pnAtTdDgn-UiqIDW3y4EGy448pg",
    authDomain: "nrs-cms.firebaseapp.com",
    databaseURL: "https://nrs-cms-default-rtdb.firebaseio.com",
    projectId: "nrs-cms",
    storageBucket: "nrs-cms.appspot.com",
    messagingSenderId: "94826903466",
    appId: "1:94826903466:web:24fe51cce92e1cb2e39dd3"
})

export const auth = app.auth();
export const storage = firebase.storage().ref();
export const db = firebase.firestore();
export default app