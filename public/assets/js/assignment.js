//gifteeScript essentially
//Query Parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

var id;
id = urlParams.get('id');

//variables to hold named variables
var userInput, userSecretSantaID, nameConfirm;

//intialize empty array to use for comparisons later
var checkingArray = [];
var secretSantaArray = [];
var wishListArray= [];

//populate empty comparison arrays with arrays from firebase DB
db.collection("groups").doc(id)
    .onSnapshot((doc) => {
        checkingArray = doc.data().participants;
        secretSantaArray = doc.data().participants;
    })

//event listener that displays the your secret santa when entering the name 
document.querySelector("#secretSantaButton").addEventListener("click", async function () {

    var resultSS;
    userInput = document.querySelector("#userInputName").value; //gets user input

    checkingArray.forEach(check => {//loops through firebased filled in array
        if (userInput.toLowerCase().trim() === check.name.toLowerCase()) { //checks post formated user input with object database name
            nameConfirm =check.name.toLowerCase();
            userSecretSantaID = check.recipient; //pulls receiptant/giftees ID from correlated name
            secretSantaArray.forEach(santas => { //second comparison array to check matching secret santa receiptant/giftees ID

                if (userSecretSantaID === santas.id) { //outputs secret santa name and stops 
                    resultSS = santas.name;
                    console.log(resultSS);
                    document.querySelector("#secretSantaResult").innerHTML = '<strong>' + santas.name + '</strong>';

                    //adding is active might be unnessessary@@
                    document.getElementById("userInputName").classList.add("is-active");
                    document.getElementById("userInputBD").classList.add("is-active");
                    document.getElementById("bdQuestion").classList.add("is-active");

                    document.getElementById("userInputName").classList.remove("is-hidden");
                    document.getElementById("userInputBD").classList.remove("is-hidden");
                    document.getElementById("bdQuestion").classList.remove("is-hidden");
                    document.getElementById("bdConfirmation").classList.remove("is-hidden");

                    return false;
                }
            })

        }

        else if (resultSS == null) { //if name isnt found in firebase database resulting bobmessage will pop up
            document.querySelector("#secretSantaResult").innerHTML = "Please type in a valid name or try another version of that name";

            document.getElementById("userInputBD").classList.add("is-hidden"); //added class edit just in case name query is rechecked
            document.getElementById("bdQuestion").classList.add("is-hidden");
            document.getElementById("bdConfirmation").classList.add("is-hidden");
            document.getElementById("invalidBDConfirmation").classList.add("is-hidden")
        }

    })

})


document.querySelector("#bdConfirmation").addEventListener("click", async function () {
    var date;
    date = document.getElementById("userInputBD").value;
    console.log(date);//ts
    console.log(typeof (date));//ts



    for (let i = 0; i < checkingArray.length; i++)
        if ((userInput.toLowerCase().trim() === checkingArray[i].name.toLowerCase()) && (date == checkingArray[i].birthDay)) {
            document.getElementById("wishList").classList.add("is-active");
            document.getElementById("wishList").classList.remove("is-hidden");
            document.getElementById("invalidBDConfirmation").classList.add("is-hidden")
            break;
        }

        else {
            document.getElementById("wishList").classList.add("is-hidden");
            document.getElementById("invalidBDConfirmation").classList.remove("is-hidden")

        }
})

//continue HERE review adminScript to load DB wishlist in table format
//need to create local array variable with Firebase participants array and update the entire list to add wishlist
    //currently infinite looping creating mass spam wishlists on server side...
//testing to make sure it goes server side
var groupRefWL = db.collection("groups").doc(id);
document.querySelector("#itemAdd").addEventListener("click", async function () {
    
    var itemName, itemLink, wishListArr,participantSnapshot;
    itemName= document.getElementById("itemName").value;
    itemLink = document.getElementById("itemLink").value;

    //participantSnapshot=await db.collection("groups").doc(id).data().participants;

    db.collection("groups").doc(id)
    .onSnapshot((doc) => {
        participantSnapshot=doc.data().participants;
        console.log(participantSnapshot);
        participantSnapshot.forEach( participantData =>{
            // console.log(participantData.name.toLowerCase());
            // console.log(nameConfirm);
            // console.log(itemName);
            // console.log(itemLink);
            console.log(typeof(participantData));


            if (participantData.name.toLowerCase() == nameConfirm && itemName.length >0 && itemLink.length >0){
                var currentWishlist = participantData.wishList || [];
    
                subWishList= {itemName,itemLink};
                currentWishlist.push (subWishList);
                participantData.wishList =currentWishlist;
                console.log("Working!");
                return true;
            }
            else{
                console.log("One of the fields is empty!");
            }
    
        })
        db.collection("groups").doc(id).update({participants:participantSnapshot});
    })



})


