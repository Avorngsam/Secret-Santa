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

var groupRef = db.collection("groups").doc(id);



//populate empty comparison arrays with arrays from firebase DB
db.collection("groups").doc(id)
    .onSnapshot((doc) => {
        checkingArray = doc.data().participants;
        secretSantaArray = doc.data().participants;
        
        document.getElementById("gifteeGroupDisplay").innerHTML = '<strong>' + "Group: "+ doc.data().displayName +'<strong>';

    })
document.querySelector("#userInputName").addEventListener("keypress", async function () {
    userInputCheck = document.querySelector("#userInputName").value;

    checkingArray.forEach(check => {//loops through firebased filled in array
        if (userInputCheck.toLowerCase().trim() !== check.name.toLowerCase()) {

        }
    })
})

//event listener that displays the your secret santa when entering the name 
document.querySelector("#secretSantaButton").addEventListener("click", async function () {

    var resultSS;
    var incre=1;
    userInput = document.querySelector("#userInputName").value; //gets user input

    checkingArray.forEach(check => {//loops through firebased filled in array
        if (userInput.toLowerCase().trim() === check.name.toLowerCase()) { //checks post formated user input with object database name
            nameConfirm =check.name.toLowerCase();
            userSecretSantaID = check.recipient; //pulls receiptant/giftees ID from correlated name
            secretSantaArray.forEach(santas => { //second comparison array to check matching secret santa receiptant/giftees ID

                if (userSecretSantaID === santas.id) { //outputs secret santa name and stops 
                    resultSS = santas.name;

                    document.querySelector("#secretSantaResult").innerHTML = '<strong>' + santas.name + '</strong>';

                    if (santas.wishList==null || santas.wishList ==0){

                        document.getElementById("wishListItems").innerHTML = `Currently ${santas.name} doesn't have anything on their wishlist :(`
                    }
                    else {
                        var final = `<u> ${santas.name}'s Wishlisted Items:</u> <br>`;
                        for (let i of santas.wishList){

                            final += `${incre}. <a href="${i.itemLink}" target="_blank">${i.itemName} </a> <span> | (Description: ${i.itemDesc} )</span> <br>`;
                            incre++;
                            
                        }
                        document.getElementById("wishListItems").innerHTML= final;
                    }


                    //adding is active might be unnessessary@@
                    document.getElementById("userInputName").classList.add("is-active");
                    document.getElementById("userInputBD").classList.add("is-active");
                    document.getElementById("bdQuestion").classList.add("is-active");

                    document.getElementById("bdBox").classList.remove("is-hidden");
                    document.getElementById("userInputName").classList.remove("is-hidden");
                    document.getElementById("userInputBD").classList.remove("is-hidden");
                    document.getElementById("bdQuestion").classList.remove("is-hidden");
                    document.getElementById("bdConfirmation").classList.remove("is-hidden");

                    return false;
                }
            })

        }

        else if (resultSS == null) { //if name isnt found in firebase database resulting bobmessage will pop up

            document.querySelector("#secretSantaResult").innerHTML = "\n <strong> Please type in a valid name or try another version of that name </strong>";

            document.getElementById("wishListItems").innerHTML="";
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

    for (let i = 0; i < checkingArray.length; i++)
        if ((userInput.toLowerCase().trim() === checkingArray[i].name.toLowerCase()) && (date == checkingArray[i].birthDay)) {
            loadWishlist(checkingArray[i].id);
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
var currPersonID="";

//function that takes 2 inputs (item and link) and adds it to persons DB file
document.querySelector("#itemAdd").addEventListener("click", async function () {
    var itemName, itemLink,participantSnapshot, itemDesc;
    itemName= document.getElementById("itemName").value;
    itemLink = document.getElementById("itemLink").value;
    itemDesc = document.getElementById("itemDesc").value;
    
    //single time not real time snapshot
    db.collection("groups").doc(id).get().then((doc) => { 
        participantSnapshot=doc.data().participants;
        //console.log(participantSnapshot);

        for (let i =0; i < participantSnapshot.length;i++){
            participantData=participantSnapshot[i];
            if (participantData.name.toLowerCase() == nameConfirm && itemName.length >1 && itemLink.length >1 && itemDesc.length >1){
                document.getElementById("invalidItemInput").classList.add("is-hidden");

                var currentWishlist = participantData.wishList || [];
    
                subWishList= {itemName,itemLink,itemDesc};
                currentWishlist.push (subWishList);
                participantData.wishList =currentWishlist;
                document.getElementById("itemName").value="";
                document.getElementById("itemLink").value="";
                document.getElementById("itemDesc").value="";

                currPersonID=participantData.id;

                db.collection("groups").doc(id).update({participants:participantSnapshot});
                break;
            }
            else{
                document.getElementById("invalidItemInput").classList.add("is-active");
                document.getElementById("invalidItemInput").classList.remove("is-hidden");
            }
        }
        
    })

})

function loadWishlist(confID){
    var wlTable= document.querySelector("#wlTable");

    db.collection("groups").doc(id).onSnapshot((doc) => {
        wlTable.innerHTML=
        `
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Item Description</th>
                    <th>Link</th>
                </tr>
            </thead>
        `
        var pData = doc.data().participants;
        //console.log(pData);

        for (let i =0; i < pData.length;i++){
            if (pData[i].id == confID && pData[i].wishList != null && pData[i].wishList.length !== 0){
                //console.log("WL NOT NULL");
                document.getElementById("emptyWL").classList.add("is-hidden");
                document.getElementById("wlTable").classList.remove("is-hidden");
                pData[i].wishList.forEach(item =>{
                    var newRow = document.createElement("tr") // create <tr>
                    newRow.classList.add("hoverable-row")
                    newRow.innerHTML=`
                        <td>${item.itemName}</td>
                        <td>${item.itemDesc}</td>
                        <td class="iLink">${item.itemLink}</td>

                        <td> <button class="button is-small" data-item-id="${item.itemName}" >DELETE</button></td>
                    `
                    wlTable.appendChild(newRow);

                    newRow.querySelector("button").addEventListener("click", function () {
                        var selectedItem = this.getAttribute("data-item-id");

                        pData[i].wishList= pData[i].wishList.filter(wlItem => wlItem.itemName !== selectedItem);
                        newRow.remove();
                        groupRef.update({
                            participants: pData,
                        })
                    })
  
                })
                break;
            }
            else{
                document.getElementById("wlTable").classList.add("is-hidden");
                document.getElementById("emptyWL").classList.remove("is-hidden");
            }
        }
    })
}
