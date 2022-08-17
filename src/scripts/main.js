import { fetchJobs, fetchClowns, fetchCompletions } from "./dataAccess.js"
import { reserveAClown } from "./HireAClown.js"

//every time the browser renders, it will follow this cascade of events (functions)
const render = () => {
    
    fetchJobs().then( 
        () => fetchClowns()
        ) 
        .then(
            () => fetchCompletions() 
        )
        .then(
            () => mainContainer.innerHTML = reserveAClown()
        )
}
       
render()


// This event listener is listening for each time the state has changed and it will rerender the browser

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("stateChanged", CustomEvent => {
    console.log("State of data has changed. Regenerating HTML...")
    render()
   
})



