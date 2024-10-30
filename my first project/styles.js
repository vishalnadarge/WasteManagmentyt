function showForm(formNumber) {
    var forms = document.querySelectorAll('.form-register');
    forms.forEach(function(form) {
        form.classList.remove('button-active'); // Remove active class from all forms
    });

    var activeForm = document.getElementById('form' + formNumber);
    if (activeForm) {
        activeForm.classList.add('button-active'); // Add active class to the selected form
    }

    var buttons = document.querySelectorAll('.buttons-register button');
    buttons.forEach(function(button, index) {
        if (index === formNumber - 1) {
            button.classList.add('button-active'); // Add active class to the corresponding button
        } else {
            button.classList.remove('button-active'); // Remove active class from other buttons
        }
    });
}
