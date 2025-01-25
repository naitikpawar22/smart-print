const firebaseConfig = {
    apiKey: "AIzaSyAz-ddf36yZLqZddmg7RkEsqiK4dNNBCi0",
    authDomain: "engineering-da215.firebaseapp.com",
    databaseURL: "https://engineering-da215-default-rtdb.firebaseio.com",
    projectId: "engineering-da215",
    storageBucket: "engineering-da215.appspot.com",
    messagingSenderId: "942576470973",
    appId: "1:942576470973:web:115b1a72262fa0f17b60d4",
    measurementId: "G-KE7B1VV3N7"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Firebase Storage setup
  const storage = firebase.storage();
  