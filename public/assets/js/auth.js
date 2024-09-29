// Initialize the FirebaseUI Widget using Firebase.
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var currentUser;
const db = firebase.firestore();//initialized firestore Database

document.getElementById("button-signin").addEventListener("click", async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    console.log(result.user);

    if (result.user) {
      let email = result.user.email;
      console.log(email);

    }

  } catch (error) {
    console.error(error);
  }
});

firebase.auth().onAuthStateChanged((user) => {
  // console.log(user);
  if (user) {
    let email = user.email;
    document.querySelector("#displayEmail").innerHTML = email;
    document.querySelector("#firebaseui-auth-container").classList.add('is-hidden')
    document.querySelector("#button-signin").classList.add('is-hidden')
    document.querySelector("#button-signup").classList.add('is-hidden')
    document.querySelector("#button-account").classList.remove('is-hidden')
    currentUser = user;

  }

  var signOut = document.getElementById('sign-out')
  if (signOut) {

    signOut.onclick = function () {
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = './';

      }).catch((error) => {
        // An error happened.
      });
    }
  }
})

