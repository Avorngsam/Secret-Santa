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
    userInput = document.querySelector("#userInput").value; //gets user input

    checkingArray.forEach(check => {//loops through firebased filled in array
        if (userInput.toLowerCase() === check.name.toLowerCase()) { //checks user input with object database name
            userSecretSantaID = check.secretSanta; //pulls ID from correlated name
            secretSantaArray.forEach(santas => { //second comparison array to check matching secret santa ID

                if (userSecretSantaID === santas.id) { //outputs secret santa name and stops 
                    document.querySelector("#secretSantaResult").innerHTML = '<strong>' +santas.name +'</strong>';
                    stopPropagation()
                }
            })

        }

        else { //if name isnt found in firebase database resulting message will pop up
            document.querySelector("#secretSantaResult").innerHTML = "Please type in a valid name or try another version of that name";
        }

    })

})



