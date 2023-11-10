// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { getFirestore, doc, setDoc, Timestamp, onSnapshot, collection, query, where } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAGCgrlke8VVFKkzoRBrrJ1QKfQtyZBJJE",
    authDomain: "secret-santa-378203.firebaseapp.com",
    projectId: "secret-santa-378203",
    storageBucket: "secret-santa-378203.appspot.com",
    messagingSenderId: "5647116839",
    appId: "1:5647116839:web:0a9bdfa6f81b0094b33c02",
    measurementId: "G-80Z7WD9F3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

document.querySelector("#group-name-submit").addEventListener("click", async function() {
    document.getElementById("group-name-submit").innerHTML = "Registered!"

  let displayName = document.querySelector("#group-name-input").value;
  let groupID= nanoid(5);
  // Add a new document in collection "requests"
  await setDoc(doc(db, "groups", groupID ), {
    id: groupID,
    displayName: displayName,
    owner: currentUser.uid,
    participants:null,
    posts: null
  });

  //resets searchbar value
  document.getElementById("group-name-input").value="";

  })

//read data
const q = query(collection(db, "requests"), where("status", "!=", "random"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {

    //anytime collection is modified its updated live
    //  const requests = [];
    //  document.querySelector("#list-requests").innerHTML = ""
    //  querySnapshot.forEach((doc) => {
    //    //ran per document
    //      requests.push(doc.data().query);
    //  document.querySelector("#list-requests").innerHTML += doc.data().query+"<br>"
    //  });
    //  console.log("Current queries: ", requests.join(", "));

});