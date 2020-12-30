import React from "react";
// import logo from './logo.svg';

import Routes from "./routes";
import "./assets/scss/index.scss";
import 'moment-timezone';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { Provider } from "react-redux";
import { store } from "./helpers";
// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";
// // import { useAuthState } from 'react-firebase-hooks/auth';
// // import { useCollectionData } from 'react-firebase-hooks/firestore';
// var firebaseConfig = {
//   apiKey: "AIzaSyC2GIk1pnAtTdDgn-UiqIDW3y4EGy448pg",
//   authDomain: "nrs-cms.firebaseapp.com",
//   databaseURL: "https://nrs-cms-default-rtdb.firebaseio.com",
//   projectId: "nrs-cms",
//   storageBucket: "nrs-cms.appspot.com",
//   messagingSenderId: "94826903466",
//   appId: "1:94826903466:web:24fe51cce92e1cb2e39dd3"
// };

// firebase.initializeApp({firebaseConfig})

function App() {
  return (
    <div>
       <ReactNotification />
       <Provider store={store}><Routes /></Provider>
    </div>
  );
}

export default App;
