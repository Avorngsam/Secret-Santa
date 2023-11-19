//Query Parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

var id;
id = urlParams.get('id');

//loaded from firebase, global
var participantArray;

var groupRef = db.collection("groups").doc(id);


var participantTable = document.querySelector("#participant-table")
var exclusionTable = document.querySelector("#exclusions-table")

var selectedParticipantId;

db.collection("groups").doc(id)
    .onSnapshot((doc) => {
        document.querySelector("#groupDisplay").innerHTML = doc.data().displayName;
        // console.log(doc.data().participants);

        participantTable.innerHTML = `
        <thead>
          <tr>
            <th>Name</th>
            <th>Recipient</th>
            <th>Secret Santa</th>
          </tr>
        </thead>
`

        if (doc.data().participants == null || doc.data().participants.length == 0) {
            console.log("No participants!")
            participantArray = [];
            document.querySelector("#no-participants").classList.remove("is-hidden") //show the no participants element
        }
        else {
            document.querySelector("#no-participants").classList.add("is-hidden") // hide the no participants element
            participantArray = doc.data().participants;
            // document.querySelector("#display-participants").innerHTML = "";
            // console.log(participantArray);
            participantArray.forEach(ptpData => {
                var newRow = document.createElement("tr") // create <tr>
                newRow.classList.add("hoverable-row")

                //if the one we are creating, is the remembered selected id, make it selected
                if (selectedParticipantId == ptpData.id) {
                    newRow.classList.add("is-selected") //update the ui for selection
                    participantSelected(ptpData) //run the function for selecting it
                }



                newRow.innerHTML = `
                <td>${ptpData.name}</td>
                <td>${ptpData.recipient ? participantArray.find((e) => e.id == ptpData.recipient).name  : ''}</td>
                <td>${ptpData.secretSanta ? participantArray.find((e) => e.id == ptpData.secretSanta).name : ''}</td>
                `

                participantTable.appendChild(newRow)

                //add click event to generated row
                newRow.addEventListener("click", function () {
                    //unselect all other rows
                    for (const child of participantTable.children) { child.classList.remove("is-selected") }

                    //show the exclusion column
                    document.querySelector("#exclusion-column").classList.remove("is-hidden")


                    newRow.classList.add("is-selected")
                    participantSelected(ptpData)
                }) //the event listener creates a function, that runs a function that passes the data into it

            });


        }
        // console.log("Current data: ", doc.data());
        // console.log(participantArray);

    });


//when a participant is CLICKED
function participantSelected(ptpData) {
    console.log(ptpData)

    //save the id of the selected participant
    selectedParticipantId = ptpData.id;

    //wipe the exclusionTable
    exclusionTable.innerHTML = `
<thead>
<tr>
  <th>is Excluded?</th>
  <th>Name</th>
</tr>
</thead>
`

    //second loop through participants
    participantArray.forEach(exclusionData => {

        //if my id, matches the excluision id

        if (ptpData.id == exclusionData.id)
            return; //end execution for this one


        var isExcluded = false; //declare by default everyone is included

        //check if this exclusionData is excluded from the ptpData (individual that was clicked)
        if (ptpData.exclusions != null && ptpData.exclusions.includes(exclusionData.id)) {
            isExcluded = true;
        }

        //create element on screen
        var newRow = document.createElement("tr") // create <tr>
        newRow.classList.add("hoverable-row")
        newRow.innerHTML = `
        <td>
            <button class="button ${isExcluded ? "is-danger" : ""}">${isExcluded ? "Excluded" : "No"}</button>
        </td>
        <td>${exclusionData.name}</td>
        `

        //add a click event to the button contained in the newRow
        newRow.querySelector("button").addEventListener("click", function () {
            // console.log(ptpData.name + " should exclude " + exclusionData.name)

            if (ptpData.exclusions.includes(exclusionData.id)) //if we already are excluding the person
            {
                //remove the exclusion
                ptpData.exclusions = ptpData.exclusions.filter(e => e !== exclusionData.id);
                exclusionData.exclusions = exclusionData.exclusions.filter(e => e !== ptpData.id);

            }
            else {
                //add the exclusion
                ptpData.exclusions.push(exclusionData.id)
                exclusionData.exclusions.push(ptpData.id)
            }
            // console.log(ptpData)

            // Update firebase with our new partipant array
            groupRef.update({
                participants: participantArray,
            })
                .then(() => {
                    console.log("Document successfully updated!");
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });

        })

        exclusionTable.appendChild(newRow)


    })



}


document.querySelector("#participant-name-submit").addEventListener("click", function () {
    var userInput = document.getElementById("participant-name-input").value;

    document.getElementById("participant-name-submit").innerHTML = "Added!"

    //let displayName = document.querySelector("#group-name-input").value;
    let person = nanoid(5);
    // Add a new document in collection "requests"
    participantArray.push({
        id: person,
        name: userInput,
        exclusions: [],
        recipient: null,
        secretSanta: null,
    })
    // Update firebase with our new partipant array
    groupRef.update({
        participants: participantArray,
    })
        .then(() => {
            console.log("Document successfully updated!");
            document.getElementById("participant-name-input").value = "";
            document.getElementById("create-participant-modal").classList.remove('is-active');


        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

    //resets searchbar value


})

document.querySelector("#giftees-assign").addEventListener("click", function () {




    let success = false;
    let runloops = 0
    while (success == false && runloops < 100) { //sometimes the randomization can assign things and leave a person out, this is to prevent that
        try {
            RandomizeAssignments();
            success = true;
        } catch (error) {
            success = false;
        }
        runloops++;
        if (runloops >= 100) {
            alert("FAILURE!")
        }
    }


    // Update firebase with our new partipant array
    groupRef.update({
        participants: participantArray,
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

})


function RandomizeAssignments() {
    //wipe out recipients and secret santas
    participantArray.forEach(participant => {
        participant.recipient = null;
        participant.secretSanta = null;
    })

    participantArray.forEach(participant => {

        let availableRecipients = [];

        //find participants without a secret santa
        availableRecipients = participantArray.filter(e => e.secretSanta == null && e.id !== participant.id && !participant.exclusions.includes(e.id))

        //pick random number
        let randomIndex = Math.floor(Math.random() * availableRecipients.length)

        console.log(participant.name + " assigning to " + availableRecipients[randomIndex].name)
        console.log

        //what we want to assign
        participant.recipient = availableRecipients[randomIndex].id
        //assign the inverse
        availableRecipients[randomIndex].secretSanta = participant.id

    })
}

document.querySelector("#copy-text").innerHTML = `https://secret-santa-378203.web.app/your-giftee?id=${id}`