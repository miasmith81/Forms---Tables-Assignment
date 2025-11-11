// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Get form and response elements
    const form = document.getElementById('myForm');
    const responseDiv = document.getElementById('response');

    // Form submit event listener
    form.addEventListener('submit', function (e) {
        // Prevent default form submission (page reload)
        e.preventDefault();

        // Get form data
        const formData = {
            name: e.target.user_name.value.trim(),
            email: e.target.user_email.value.trim(),
            message: e.target.user_message.value.trim()
        };

        // Validate form data
        if (!validateForm(formData)) {
            return;
        }

        // Process the form (simulate sending data)
        processForm(formData);
    });

    // Validation function
    function validateForm(data) {
        let isValid = true;

        // Clear previous errors
        clearErrors();

        // Validate name
        if (!data.name) {
            showError('user_name', 'Name is required.');
            isValid = false;
        }

        // Validate email
        if (!data.email) {
            showError('user_email', 'Email is required.');
            isValid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showError('user_email', 'Please enter a valid email address (e.g., name@example.com).');
                isValid = false;
            }
        }

        // Validate message
        if (!data.message) {
            showError('user_message', 'Message is required.');
            isValid = false;
        } else if (data.message.length < 5) {
            showError('user_message', 'Message must be at least 5 characters long.');
            isValid = false;
        }

        return isValid;
    }

    // Show error message for a specific field
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorSpan = document.getElementById(fieldId.replace('user_', '') + '-error');
        
        // Update ARIA attributes
        field.setAttribute('aria-invalid', 'true');
        
        // Display error message
        errorSpan.textContent = message;
        errorSpan.classList.add('show');
    }

    // Clear all error messages
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
            error.classList.remove('show');
        });

        const fields = form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.setAttribute('aria-invalid', 'false');
        });
    }

    // Process form data
    function processForm(data) {
        // Disable submit button during processing
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Log data to console (for development)
        console.log('Form Data Submitted:');
        console.log('Name:', data.name);
        console.log('Email:', data.email);
        console.log('Message:', data.message);

        // Simulate API call delay
        setTimeout(() => {
            // Save to localStorage (optional - for demonstration)
            saveToLocalStorage(data);

            // Show success message
            showResponse('Thank you! Your message has been sent successfully.', 'success');

            // Reset form
            form.reset();

            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';

            // Hide success message after 5 seconds
            setTimeout(() => {
                hideResponse();
            }, 5000);

        }, 1000); // Simulate 1 second delay
    }

    // Save form data to localStorage
    function saveToLocalStorage(data) {
        // Get existing submissions or initialize empty array
        let submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];

        // Add timestamp to submission
        data.timestamp = new Date().toISOString();

        // Add new submission
        submissions.push(data);

        // Save back to localStorage
        localStorage.setItem('formSubmissions', JSON.stringify(submissions));

        console.log('Data saved to localStorage');
    }

    // Show response message
    function showResponse(message, type) {
        responseDiv.textContent = message;
        responseDiv.className = `show ${type}`;
    }

    // Hide response message
    function hideResponse() {
        responseDiv.className = '';
        responseDiv.textContent = '';
    }

    // Optional: Add real-time validation feedback
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (this.value.trim() === '') {
                this.style.borderColor = '#fc8181';
            } else {
                this.style.borderColor = '#68d391';
            }
        });

        input.addEventListener('focus', function () {
            this.style.borderColor = '#667eea';
        });
    });

});
// end of javaScript