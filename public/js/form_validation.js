document.getElementById("contactForm").addEventListener('submit', (event) => {
 
    event.preventDefault();
    
    
    const form = e.target;
    const formData = new FormData(form);
    const errorMsg = document.getElementById("error");
    
    // Clear previous error message
    errorMsg.innerHTML = "";
    
    // Check for form validity
    if (!form.checkValidity()) {
        errorMsg.innerHTML = "Please fill out all required fields correctly!";
        return;
    }
    
    const name = form.querySelector('#name-field').value.trim();
    const email = form.querySelector('#email-field').value.trim();
    const message = form.querySelector('#message-field').value.trim();
    const subject = form.querySelector('#subject-field').value.trim();

    console.log(name);
    console.log(email);
    console.log(message);

    if (!name.match(/^[A-Za-z ]+$/)) {
        
        errorMsg.innerHTML = 'Name should contain only letters and spaces.';
        return;

    }

    if (!email.match(/^([a-zA-Z0-9_]+)@([a-zA-Z0-9]+)\.([a-zA-Z]+)(\.[a-zA-Z]+)?$/)) {
        errorMsg.innerHTML = "Email should be correctly entered.";
        return;
    }
       if(subject<=5){
        errorMsg.innerHTML="Subject should be at least 5 characters long."
       }
    if (message.length < 10) {
        errorMsg.innerHTML = "Message should be at least 10 characters long.";
        return;
    }

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    errorMsg.innerHTML = "Please wait...";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status === 200) {
            errorMsg.innerHTML = "Form submitted successfully.";
        } else {
            errorMsg.innerHTML = json.message || "Something went wrong!";
        }
    })
    .catch(error => {
        errorMsg.innerHTML = "Something went wrong!";
        console.error(error);
    })
    .finally(() => {
        form.reset();
        setTimeout(() => {
            errorMsg.style.display = "none";
        }, 3000);
    });
});
