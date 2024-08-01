//gifteeScript essentially
//Query Parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

var id;
id = urlParams.get('id');

//variables to hold named variables
var userInput, userSecretSantaID;

//intialize empty array to use for comparisons later
var checkingArray = [];
var secretSantaArray = [];

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

        else if (resultSS == null) { //if name isnt found in firebase database resulting message will pop up
            document.querySelector("#secretSantaResult").innerHTML = "Please type in a valid name or try another version of that name";

            document.getElementById("userInputBD").classList.add("is-hidden"); //added class edit just in case name query is rechecked
            document.getElementById("bdQuestion").classList.add("is-hidden");
            document.getElementById("bdConfirmation").classList.add("is-hidden");
        }

    })

})

//async function for BD confirmation wishlist
//continue HERE review adminScript to load DB wishlist in table format
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


