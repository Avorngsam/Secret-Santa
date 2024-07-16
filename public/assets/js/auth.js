// Initialize the FirebaseUI Widget using Firebase.
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
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var provider = new firebase.auth.GoogleAuthProvider();

document.querySelector("#button-signin").addEventListener("click", function(){
  firebase.auth().signInWithRedirect(provider)
  .then(() => {
    // Redirect triggered, handle redirection automatically

  })
  .catch((error) => {
    // Handle errors here
    console.error(error);
  })
});


// After redirection, retrieve the result
firebase.auth().getRedirectResult()
  .then((result) => {
    if (result.credential) {
      // This gives you the OAuth access token and secret if needed
      var credential = result.credential;
      console.log(credential) //TS
    }
    // The signed-in user info.
    var user = result.user;
    console.log(user);
  })
  .catch((error) => {
    // Handle errors here
    console.error(error);
  });
// const db = firebase.firestore();
// var ui = new firebaseui.auth.AuthUI(firebase.auth());
// var currentUser;

// ui.start('#firebaseui-auth-container', {
//   signInOptions: [
//     // List of OAuth providers supported.
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//     //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//     //   firebase.auth.GithubAuthProvider.PROVIDER_ID
//   ],
//   // Other config options...
//   signInSuccessUrl: 'index.html',
// });

// firebase.auth().onAuthStateChanged((user) => {
//   // console.log(user)

//   if (user) {
//     let email=user.email;
//     document.querySelector("#displayEmail").innerHTML = email;
//     document.querySelector("#firebaseui-auth-container").classList.add('is-hidden')
//     document.querySelector("#button-signin").classList.add('is-hidden')
//     document.querySelector("#button-signup").classList.add('is-hidden')
//     document.querySelector("#button-account").classList.remove('is-hidden')
//     currentUser = user;

//   }

//   var signOut = document.getElementById('sign-out')
//   if (signOut) {

//     signOut.onclick = function () {
//       firebase.auth().signOut().then(() => {
//         // Sign-out successful.
//         window.location.href = './';

//       }).catch((error) => {
//         // An error happened.
//       });
//     }
//   }
// })




document.querySelector("#button-signin").addEventListener("click", async function () {
  document.getElementById("modal-signin").classList.add('is-active')
})
