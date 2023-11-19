// Initialize the FirebaseUI Widget using Firebase.
const db = firebase.firestore();
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var currentUser;
//test
ui.start('#firebaseui-auth-container', {
  signInOptions: [
    // List of OAuth providers supported.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //   firebase.auth.GithubAuthProvider.PROVIDER_ID
  ],
  // Other config options...
  signInSuccessUrl: 'index.html',
});

firebase.auth().onAuthStateChanged((user) => {
  // console.log(user)

  if (user) {
    let email=user.email;
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


document.querySelector("#button-signin").addEventListener("click", async function () {

  document.getElementById("modal-signin").classList.add('is-active')


})
