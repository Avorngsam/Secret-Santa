//Query Parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

var id;
id = urlParams.get('id');

var userInput, userSecretSantaID;

var checkingArray=[];
var secretSantaArray=[];

document.querySelector("#secretSantaButton").addEventListener("click", async function () {
    userInput=document.querySelector("#userInput").value;
    //console.log(userInput);
    //console.log(id);

    db.collection("groups").doc(id)
    .onSnapshot((doc) => {
        checkingArray = doc.data().participants;
        secretSantaArray = doc.data().participants;

        checkingArray.forEach (check =>{
            console.log(check.name);
            if (userInput===check.name){
                userSecretSantaID= check.secretSanta;
                secretSantaArray.forEach(santas => {
                    if (userSecretSantaID===santas.id){
                        document.querySelector("#secretSantaResult").innerHTML= santas.name;
                        // console.log (check.secretSanta);
                    }
                }) 
            }

            else{
                document.querySelector("#secretSantaResult").innerHTML= "Please type in a valid name or try another version of that name";
            }

        })
    })
})



