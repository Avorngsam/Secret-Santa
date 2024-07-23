var gifteeQueryString = window.location.search;
// console.log(gifteeQueryString);
var gifteeUrlParams = new URLSearchParams(gifteeQueryString); //allows URL parameters after the '?' to be assigned to variables to be easily pulled
// console.log(gifteeUrlParams);

var id;
id = gifteeUrlParams.get('id');
// console.log(id);

var gifteeQuery = db.collection("groups").doc(id);

db.collection("groups").doc(id).onSnapshot((doc) => {
    document.querySelector("#gifteeGroupDisplay").innerHTML=" ";
    document.querySelector("#gifteeGroupDisplay").innerHTML=doc.data().displayName;
});

//need to add birthday info in DB and add birthday as confirmation to wishlist needs