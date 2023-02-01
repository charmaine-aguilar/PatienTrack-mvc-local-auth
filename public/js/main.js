/********************
 * Page Navigations *
 ********************/

// Navigate to create account page
const toCreateAccountLink = document.querySelector('.toCreateAccountPage')
// IMPORTANT: Check element if it's in the DOM first
if (toCreateAccountLink) {
    toCreateAccountLink.addEventListener('click', () => {
        window.location = '/signup'
    })
}

// Navigate to login account page
const toLoginLink = document.querySelector('.toLoginAccountPage')
// IMPORTANT: Check element if it's in the DOM first
if (toLoginLink) {
    toLoginLink.addEventListener('click', () => {
        window.location = '/login'
    })
}

// Navigate to 'Home' page using company logo
const toHomePageLogoBtn = document.querySelector('.company-logo')
// IMPORTANT: Check element if it's in the DOM first
if (toHomePageLogoBtn) {
    toHomePageLogoBtn.addEventListener('click', () => {
        window.location = '/'
    })
}

// Navigate to 'Home' page
const toHomePageBtn = document.querySelector('#toHomePage')
// IMPORTANT: Check element if it's in the DOM first
if (toHomePageBtn) {
    toHomePageBtn.addEventListener('click', () => {
        window.location = '/'
    })
}

// Navigate to 'Patient' page
const toPatientPageBtn = document.querySelector('#toPatientPage')
// IMPORTANT: Check element if it's in the DOM first
if (toPatientPageBtn) {
    toPatientPageBtn.addEventListener('click', () => {
        window.location = '/patient'
    })
}

// Navigate to 'Add patient' page
const toAddPatientPageBtn = document.querySelector('#toAddPatientPage')
// IMPORTANT: Check element if it's in the DOM first
if (toAddPatientPageBtn) {
    toAddPatientPageBtn.addEventListener('click', () => {
        window.location = '/patient/add'
    })
}

// Navigate to 'Browse patient' page
const toBrowsePatientPageBtn = document.querySelector('.toBrowsePatientPage')
// IMPORTANT: Check element if it's in the DOM first
if (toBrowsePatientPageBtn) {
    toBrowsePatientPageBtn.addEventListener('click', () => {
        window.location = '/patient/browse'
    })
}

// Navigate to 'Edit patient' page
const toEditPatientPageBtn = document.querySelector('#editPatientInfo')
// IMPORTANT: Check element if it's in the DOM first
if (toEditPatientPageBtn) {
    console.log('edit button is here')
    toEditPatientPageBtn.addEventListener('click', () => {
        console.log('edit button is clicked')
        const pID = document.querySelector('#patientID').textContent

        fetch(`/patient/${pID}/edit`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            // Refresh the page to the new route
            window.location = `/patient/${pID}/edit`
        })
    })
}

// Navigate to specific 'Patient' profile page
// Click the patient row to go to their specific page

// Grab all the rows of patients
const patientRowsInfo = document.querySelectorAll('.patientInfo')

// Apply event listener to all the patient row
Array.from(patientRowsInfo).forEach((element) => {
    element.addEventListener('click', getOnePatient)
})

// When row is clicked, go to patient's specific page
function getOnePatient() {
    // Grab the patient ID from the DOM
    const pID = this.querySelector('.patientID').textContent

    fetch(`/patient/${pID}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        // Refresh the page to the new route
        window.location = `/patient/${pID}`
    })
}



/*******************************
 * CRUD Operations on Patients *
 *******************************/

// DELETE a patient request
const requestDeletePatient = document.querySelector('#deletePatient')

// IMPORTANT: Check element if it's in the DOM first
if (requestDeletePatient) {
    requestDeletePatient.addEventListener('click', () => {
        // Grab the patient ID from the DOM
        const pID = document.querySelector('#patientID').textContent

        fetch(`/patient/${pID}/delete`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            window.location = `/patient/browse`
        })
    })
}

// UPDATE a patient's information

// Grab the 'Edit' button
const editPatientProfileButton = document.querySelector('#editPatientInfo')

// Grab the container that holds profile information
const patientProfileSection = document.querySelector('.patient-profile')

// Grab the container that has the edit form
const editPatientProfileSection = document.querySelector('.edit-form')

// Enable edit mode and hide the patient profile display
// if (editPatientProfileButton) {
//     editPatientProfileButton.addEventListener('click', () => {
//         // Hide profile display container
//         patientProfileSection.classList.add('hide')

//         // Hide edit button
//         editPatientProfileButton.classList.add('hide')

//         // Grab and hide delete button
//         document.querySelector('#deletePatient').classList.add('hide')

//         // Show edit profile information section
//         editPatientProfileSection.classList.remove('hide')
//     })
// }

//TODO: Add save changes button and cancel/reset button
//TODO: Put the edit, delete patient button with the display profile container but separate go to patient list button

// PUT: Edit and update the patient's info

// Grab 'save changes' button
const saveChangesBtn = document.querySelector('#savePatientEditChanges')

// Grab the input boxes
const firstNameInputBox = document.querySelector('#firstName')
const lastNameInputBox = document.querySelector('#lastName')
const birthDateInputBox = document.querySelector('#dateOfbirth')

// When 'save changes' button is clicked, update the old values into the new values
// Check if element exists in he DOM first
if (saveChangesBtn) {
    saveChangesBtn.addEventListener('click', () => {

        // Grab the patient ID from the DOM
        const pID = document.querySelector('#patientID').value

        // Request a PUT fetch method to update the patient with this patient ID
        fetch(`/patient/${pID}/edit`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstNameInputBox.value,
                lastName: lastNameInputBox.value,
                dateOfbirth: birthDateInputBox.value
            })
        })
        .then(response => {
            // Refresh the page to the new route
            window.location = `/patient/${pID}`
        })
    })
}


/************************************
 * CRUD Operations on User Accounts *
 ************************************/

// Create a new user account on the sign up page

// Grab the 'Register' button element
// const createNewUserBtn = document.querySelector('.registerNewAccount')

// if (createNewUserBtn) {
//     createNewUserBtn.addEventListener('click', () => {

//         // Grab the input box's values
//         const userFirstName = document.querySelector('#userFirstName')
//         const userLastName = document.querySelector('#userLastName')
//         const userEmail = document.querySelector('#userEmail')
//         const userPassword = document.querySelector('#userPassword')


//         // Request fetch for POST method to create a new document into the 'user' database
//         fetch(`/signup`, {
//             method: 'post',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 userFirstName: userFirstName.value,
//                 userLastName: userLastName.value,
//                 userEmail: userEmail.value,
//                 userPassword: userPassword.value
//             })
//         })
//         .then(response => {
//             // Refresh the page to the new route
//             window.location = `/login`
//         })
//     })
// }