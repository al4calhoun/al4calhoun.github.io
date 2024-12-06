document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const fromField = document.getElementById("from");
    const subjectField = document.getElementById("subject");
    const messageField = document.getElementById("message");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Validate the "From" email
        if (!validateEmail(fromField.value)) {
            alert("Please enter a valid email address in the 'From' field.");
            fromField.focus();
            return;
        }

        // Check that all fields are filled out
        if (!fromField.value.trim() || !subjectField.value.trim() || !messageField.value.trim()) {
            alert("All fields must be filled out.");
            return;
        }

        // If everything is valid, display a success message
        alert("Your message has been sent successfully!");
        form.reset(); // Clear the form fields
    });

/** 
 * @description This function validates the email input to ensure it has a valid format
 * @function validateEmail 
 * @param {string} email - email to validate
 * @return {boolean} Boolean that states whether email is valid
 * @example 
 *  let x = validateEmail("jon.smith.gmail.com") //validate email and return boolean
 *  x = false // emailRegEx.text returns false because input string is formatted incorrectly
 **/ 
    function validateEmail(email) {
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        return emailRegex.test(email);
    }
});
