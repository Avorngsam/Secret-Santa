
const groups = [];


//upon login it should assign preexisting groups
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // console.log(user.uid);

    document.querySelector("#display-groups").innerHTML = " ";
    //only load cards i am authorized on
    let myGroupsRef = db.collection("groups").where("owner", "==", user.uid) //pulls from authorized DB where authenticated user == user.id groups
    myGroupsRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        let data = doc.data();
        console.log(data);

        groups.push(doc.data().displayName);
        document.querySelector("#display-groups").innerHTML += `<a class="button is-small is-danger is-outlined buttonSpacer" href="./group-admin.html?id=${doc.data().id}" >${doc.data().displayName}</a>
        <br>`
      })


    });
  }
});

//creates/registers SecretSanta Group
document.querySelector("#group-name-submit").addEventListener("click", async function () {
  document.getElementById("group-name-submit").innerHTML = "Registered!"

  let displayName = document.querySelector("#group-name-input").value;
  let groupID = nanoid(5);
  // Add a new document in collection "requests"
  db.collection("groups").doc(groupID).set({
    id: groupID,
    displayName: displayName,
    owner: currentUser.uid,
    participants: [],
    posts: null
})
.then(() => { //redirects to a new page for admin control for exclusions
  window.location.replace(`./group-admin.html?id=${groupID}`);
  console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});

  //resets searchbar value
  document.getElementById("group-name-input").value = "";

})


/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { getFirestore, doc, setDoc, Timestamp, onSnapshot, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
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

//on sign in load all groups
function onSignIn() {
  const q = query(collection(db, "groups"), where("owner", "==", currentUser.uid));


  const groups = [];
  const querySnapshot = getDocs(q);
  querySnapshot.forEach((doc) => {
    //console.log(doc.id, ' => ', doc.data().owner);
    document.querySelector("#display-groups").innerHTML = "";
    console.log(doc.data().owner == currentUser.uid)

    groups.push(doc.data().displayName);
    document.querySelector("#display-groups").innerHTML += doc.data().displayName + "<br>";

  });
  console.log("Current groups: ", groups.join(", "));
}




document.querySelector("#group-name-submit").addEventListener("click", async function () {
  document.getElementById("group-name-submit").innerHTML = "Registered!"

  let displayName = document.querySelector("#group-name-input").value;
  let groupID = nanoid(5);
  // Add a new document in collection "requests"
  await setDoc(doc(db, "groups", groupID), {
    id: groupID,
    displayName: displayName,
    owner: currentUser.uid,
    participants: null,
    posts: null
  });

  //resets searchbar value
  document.getElementById("group-name-input").value = "";

})

//read data
//RAYMONDS STARTS HERE

const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //anytime collection is modified its updated live
      const groups = []; //raymond make emtpy array
      document.querySelector("#display-groups").innerHTML = ""
      console.log(currentUser.uid)
      querySnapshot.forEach((doc) => {
        //ran per document
          
          if(doc.data().owner === currentUser.uid){
            groups.push(doc.data().displayName);
            document.querySelector("#display-groups").innerHTML += doc.data().displayName+"<br>"
          }
          
          else{
            document.querySelector("#display-groups").innerHTML = "You currently have no saved groups"
            
          }
      });
      console.log("Current groups: ", groups.join(", "));
      

});


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

}); */