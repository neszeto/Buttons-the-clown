import { JobForm } from "./JobForm.js"
import { Requests } from "./Requests.js"

export const reserveAClown = () => {
    return `
    <h1>Hire Buttons and Lollipop The Clowns</h1>
    <section class="jobForm">
        <h2>Reservation Form</h2>
        ${JobForm()}
    </section>

    <section class="reservations">
        <h2>Reservations</h2>
        ${Requests()}
    </section>
    `
}