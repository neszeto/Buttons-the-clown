import { sendJob } from "./dataAccess.js"


export const JobForm = () => {
    return `
    <div class="field">
        <label class="label" for="parentName">Parent</label>
        <input type="text" name="parentName" class="input" />
    </div>
    <div class="field">
        <label class="label" for="childName">Child</label>
        <input type="text" name="childName" class="input" />
    </div>
    <div class="field">
        <label class="label" for="partySize">Party Size</label>
        <input type="number" name="partySize" class="input" />
    </div>
    <div class="field">
        <label class="label" for="address">Party Address</label>
        <input type="text" name="address" class="input" />
    </div>
    <div class="field">
        <label class="label" for="reservationDate">Reservation Date</label>
        <input type="date" name="reservationDate" class="input" />
    </div>
    <div class="field>
        <label class="label" for="length">Reservation Length (hours)</label>
        <input type="number" name="length" class="input" />
    </div>   

    <button class="button" id="submitRequest">Reserve</button>
`
}

const mainContainer = document.querySelector("#container")
mainContainer.addEventListener("click", click => {
    if (click.target.id === "submitRequest") {
        const userParent = document.querySelector("input[name='parentName']").value
        const userChild = document.querySelector("input[name='childName']").value
        const userPartySize = document.querySelector("input[name='partySize']").value
        const userAddress = document.querySelector("input[name='address']").value
        const userDate = document.querySelector("input[name='reservationDate']").value
        const userLength = document.querySelector("input[name='length']").value

        const userJobForm = {
            parentName: userParent,
            childName: userChild,
            partySize: userPartySize,
            address: userAddress,
            date: userDate,
            length: userLength
        }
        sendJob(userJobForm)
    }
}) 

/* will need an event listener here that listens for when a user clicks the reserve button. 
-when the user clicks the button (identify it by the id), you want to create variables to store the user input values in.
-use these created variables to create an object (dataToSendToAPI)
-call the function that creates a POST HTTP request to the jobs array in api and set the newly made object as an argument. 

in dataAccess.js you will need a sendJob function that takes the user's input (object) as a parameter
this function needs to put the newly made user's request into the api's jobs array
this function will then need to announce that state has been changed
*/


