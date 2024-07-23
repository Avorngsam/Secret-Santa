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
  