//create application State to store all external data locally

const applicationState = {
    clowns: [],
    jobs: [],
    completions: []

}


//create fetch functions to fetch api data and store in application state 

const API = "http://localhost:8088"

export const fetchJobs = () => {
    return fetch(`${API}/jobs`) 
        .then(response => response.json()) 
        .then(
            (job) => {
                applicationState.jobs = job 
            }
        )
}

export const fetchClowns = () => {
    return fetch(`${API}/clowns`) 
        .then(response => response.json()) 
        .then(
            (clown) => {
                applicationState.clowns = clown 
            }
        )
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`) 
        .then(response => response.json()) 
        .then(
            (completion) => {
                applicationState.completions = completion
            }
        )
}

//create getter functions to create a copy of each array in application state

export const getJobs = () => {
    return applicationState.jobs.map(job => ({...job}))
 }






 export const getClowns = () => {
    return applicationState.clowns.map(clown => ({...clown}))
 }

 export const getCompletions = () => {
    return applicationState.completions.map(completion => ({...completion}))
 }

// create HTTP requests to interact with API


export const sendJob = (filledForm) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filledForm) 
    }
    return fetch(`${API}/jobs`, fetchOptions) 
        .then(response => response.json())
        .then(
            () => {
            const mainContainer = document.querySelector("#container")
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}


export const deleteJob = (id) => {
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return fetch(`${API}/jobs/${id}`, fetchOptions)
        .then(
            () => {
                const mainContainer = document.querySelector("#container")
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const saveCompletion = (completedJob) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedJob) 
    }
    return fetch(`${API}/completions`, fetchOptions) 
        .then(response => response.json())
        .then(
            () => {
            const mainContainer = document.querySelector("#container")
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })

}