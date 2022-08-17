
import { getJobs, getClowns, deleteJob, saveCompletion, getCompletions } from "./dataAccess.js"



export const Requests = () => {
    let jobs = getJobs() 
    let sortedJobs = jobs.sort((a ,b) => new Date(a.date) -  new Date(b.date)) //this is how you sort dates from most recent
    
    let clowns = getClowns()
    let completions = getCompletions()

    let html = ""
    html  += `<ul>`
    
    for (let job of sortedJobs) {
        const foundCompletion = completions.find(
            (completion) => {
                return completion.jobId === job.id
            }
        )
        if (foundCompletion) {
            html += `<li class="complete">Reservation for ${job.parentName} and child, ${job.childName}
            <button class="request__delete" id="job--${job.id}">Deny</button>
            </li>`

        }
        else {
            html += `<li class="incomplete">Reservation for ${job.parentName} and child, ${job.childName}
            <select class="clown" id="clowns">
                <option value="">Choose</option>
                ${clowns.map(
                    clown => {
                        return `<option value="${job.id}--${clown.id}">${clown.name}</option>`
                    }
                )

                }
            </select>
            <button class="request__deny" id="job--${job.id}">Deny</button>
            </li>`
        }
    }
    html += `</ul>`
    return html
}


// DELETE CLICK EVENT
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("job--")) {
        const [, jobId] = click.target.id.split("--")
        deleteJob(parseInt(jobId))
    }

    
})

// CHANGE EVENT

mainContainer.addEventListener(
    "change",
    (changeEvent) => {
        if (changeEvent.target.id === "clowns") {
            const [jobId, clownId] = changeEvent.target.value.split("--")
            
            const jobNumber = parseInt(jobId)
            const clownNumber = parseInt(clownId)
            const todaysDate = Date.now()
            
            const completion = {
                jobId: jobNumber,
                clownId: clownNumber,
                date_created: todaysDate

            }
            saveCompletion(completion)
        }
    }
)



/*
*MODULE* responsible for html layout for the job requests to be displayed. 

*ALGORITHM* 
-import getJobs from dataAccess.js
-create an export function named Requests()
-set getJobs equal to a variable
-set html = to empty string 
-create a function that loops through the jobs array
-use .find to check if that jobObject is in the completions array, if it is, create the html to reflect completed jobs (no dropdown to select clown, include delete button)
-if not, create the html to reflect uncompleted jobs (includes dropdown to select clown - needs job.id and clown.id as value, include delete button)
return html

*/


/*
CHANGE event
This page will need a change event listener that is listening for when a clown is selected for a job.
-when a clown is selected for a job, create variables to store the job.id and clown.id
-these variables will be used to create a completion Object
-call the save completion function and set the newly made completion Object as an argument

-in dataAccess.js, create a saveCompletion function that POSTS the completed object to the completions array in the api
-announce that state has been changed
*/


/*
CLICK event
this page will need a click event that is listening for when the delete button is clicked 
-when the delete button is clicked, call the deleteJob function from dataAccess.js and feed it the job.id as an argument



in dataAccess.js, create a deleteJob function that DELETES a post and takes a job ID as a parameter
-announce that state has been changed

*/