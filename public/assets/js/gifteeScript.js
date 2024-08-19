// var gifteeQueryString = window.location.search;
// // console.log(gifteeQueryString);
// var gifteeUrlParams = new URLSearchParams(gifteeQueryString); //allows URL parameters after the '?' to be assigned to variables to be easily pulled
// // console.log(gifteeUrlParams);

// var id;
// id = gifteeUrlParams.get('id');
// // console.log(id);

// var gifteeQuery = db.collection("groups").doc(id);

// db.collection("groups").doc(id).onSnapshot((doc) => {
//     document.querySelector("#gifteeGroupDisplay").innerHTML=" ";
//     document.querySelector("#gifteeGroupDisplay").innerHTML=doc.data().displayName;
// });

//need to add birthday info in DB and add birthday as confirmation to wishlist needs
//^^OLD CODE FOR DB ACCESS BASED ON WEBID

document.querySelector("#userInputName").addEventListener("keypress", function () { //function to clear CSS attributes post confirmation
    document.getElementById("bdBox").classList.add("is-hidden");
    document.getElementById("wishList").classList.add("is-hidden");
    document.querySelector("#secretSantaResult").innerHTML = "";
    document.getElementById("userInputBD").value="";
    document.getElementById("wishListItems").innerHTML="";
    
    
})