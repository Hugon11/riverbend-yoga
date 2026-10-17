// Riverbend Yoga Studio
// Touchstone 4 - Interactivity and Client-Side Data

// Yoga class information
const yogaClasses = [
    {
        goal: "relax",
        name: "Restorative Yoga",
        description: "A calming class focused on relaxation, breathing, and gentle poses."
    },
    {
        goal: "gentle",
        name: "Gentle Yoga",
        description: "A slower-paced class with comfortable movements for beginners."
    },
    {
        goal: "active",
        name: "Vinyasa Yoga",
        description: "An energetic class that connects movement and breathing."
    }
];

// Extra information for each class
const classDetails = {
    relax: "Best for stress relief and winding down.",
    gentle: "Best for beginners or anyone wanting a slower practice.",
    active: "Best for students looking for a more active workout."
};


// Find a yoga class based on the user's selection
function findYogaClass(goal) {
    return yogaClasses.find(yogaClass => yogaClass.goal === goal);
}


// Display the recommendation on the page
function displayRecommendation(goal) {
    const result = document.getElementById("class-result");
    const yogaClass = findYogaClass(goal);

    if (!result || !yogaClass) {
        return;
    }

    result.innerHTML = `
        <h3>${yogaClass.name}</h3>
        <p>${yogaClass.description}</p>
        <p><strong>${classDetails[goal]}</strong></p>
    `;
}


// Save the user's preference
function savePreference(goal) {
    localStorage.setItem("riverbendYogaPreference", goal);
}


// Load the saved preference
function loadPreference() {
    const savedGoal = localStorage.getItem("riverbendYogaPreference");
    const selector = document.getElementById("yoga-goal");

    if (savedGoal && selector) {
        selector.value = savedGoal;
        displayRecommendation(savedGoal);
    }
}


// Set up the class finder
function setupClassFinder() {
    const button = document.getElementById("find-class-btn");
    const selector = document.getElementById("yoga-goal");

    if (!button || !selector) {
        return;
    }

    button.addEventListener("click", function () {
        const selectedGoal = selector.value;

        if (selectedGoal === "") {
            const result = document.getElementById("class-result");
            result.textContent = "Please choose what you want from your yoga practice.";
            return;
        }

        displayRecommendation(selectedGoal);
        savePreference(selectedGoal);
    });

    loadPreference();
}


// Start JavaScript after the page loads
document.addEventListener("DOMContentLoaded", function () {
    setupClassFinder();
    setupRequestForm();
});

// Validate the Request a Spot form
function validateRequestForm(event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const successMessage = document.getElementById("form-success");

    let isValid = true;

    nameError.textContent = "";
    emailError.textContent = "";
    successMessage.textContent = "";

    // Check that the name is long enough
    if (nameInput.value.trim().length < 2) {
        nameError.textContent = "Please enter a name with at least 2 characters.";
        nameInput.classList.add("invalid");
        isValid = false;
    } else {
        nameInput.classList.remove("invalid");
    }

    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = "Please enter a valid email address.";
        emailInput.classList.add("invalid");
        isValid = false;
    } else {
        emailInput.classList.remove("invalid");
    }

    if (isValid) {
        localStorage.setItem(
            "riverbendVisitorName",
            nameInput.value.trim()
        );

        successMessage.textContent =
            "Thank you! Your request is ready to be submitted.";
    }
}


// Restore the visitor's saved name
function loadVisitorName() {
    const nameInput = document.getElementById("name");
    const savedName = localStorage.getItem("riverbendVisitorName");

    if (nameInput && savedName) {
        nameInput.value = savedName;
    }
}


// Set up form validation
function setupRequestForm() {
    const form = document.getElementById("request-form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", validateRequestForm);
    loadVisitorName();
}