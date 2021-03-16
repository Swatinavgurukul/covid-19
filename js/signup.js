// SignUp users
let signUpBtn = document.getElementById('signupBtn')

//Getting dial code 
let dial_code_box = document.getElementById('dial-code-box');
let codes = [];

fetch('https://gist.githubusercontent.com/Goles/3196253/raw/9ca4e7e62ea5ad935bb3580dc0a07d9df033b451/CountryCodes.json')
    .then((response) => {
        return response.json()
    })
    .then((result) => {
        result.map(country => {
            // console.log(country);
            dial_code_box.innerHTML += `
                                        <option value="1">${country.code} ${country.dial_code} </option>
                                         `
        })
    })
    .catch((err) => console.log(err))

//Getting address from Pincode 
let pincode = document.getElementById('pincode');
let address = document.getElementById('address')

pincode.addEventListener('input', () => {
    if (pincode.value.length > 4) {
        console.log(pincode.value,"pincode")
        fetch(`https://api.postalpincode.in/pincode/${pincode.value}`)
            .then((response) => {
                return response.json();
            }).then((result) => {
                console.log(result,"pincoderesult")
                let post = result[0].PostOffice[0];

                address.value = `${post.District} ${post.State} ${post.Country}`
                pincode.style.borderColor = "Black"
                address.style.borderColor = "Black"
                address.style.color = "Black"
            }).catch((error) => {
                console.log('Request failed', error)

                address.value = "Invalid Pincode"
                pincode.style.borderColor = "Red"
                address.style.borderColor = "Red"
                address.style.color = "Red"
            });
    }
})

//Get all the inputs
let fName = document.getElementById('firstName');
let lName = document.getElementById('lastName');
let dialCountryCode = document.getElementById('dial-code-box');
let phoneNumber = document.getElementById('phoneNumber');
let emailAddress = document.getElementById('emailAddress');
let password = document.getElementById('userPassword');
let confirmPassword = document.getElementById('confirmPassword');
let dataOfBirth = document.getElementById('dateOfBirth');

let isPhoneValid = isEmailValid = isPasswordValid = isPasswordMatched = false

//Validate Password
let validatePass = (pass) => {
    console.log(pass);
    let validate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    
    if ((pass.length >= 8) && (pass.match(validate))) {
        password.style.backgroundColor = '#fff'
        isPhoneValid = true
    }
    else {
        password.style.backgroundColor = '#ba0d0d'
        document.getElementById('password_message').classList.remove('d-none')
        isPhoneValid = false
    }
}

//Validate Email
let ValidateEmail = (email) => {
    if ((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) && email.includes('.')) {
        emailAddress.style.backgroundColor = '#fff'
        isEmailValid = true
        return true
    }
    else {
        emailAddress.style.backgroundColor = '#ba0d0d'
        isEmailValid = false
        return false
    }
}

//Validate Phone
let validatePhone = (phone) => {
    console.log(dialCountryCode);
    var ValidPhone = /^\d{10}$/;
    if (phone.match(ValidPhone)) {
        phoneNumber.style.backgroundColor = '#fff'
        isPasswordValid = true
    }
    else {
        phoneNumber.style.backgroundColor = '#ba0d0d'
        isPasswordValid = false
    }
}
//Validate DOB
let DOB_Validator = (dob_input) => {
    const input_date_milliseconds = Date.parse(dob_input);
    const current_age = (Date.now() - input_date_milliseconds)/1000/60/60/24/365;
    if (current_age >= 18) {
        dataOfBirth.style.backgroundColor = '#fff'
        isPasswordValid = true
    }
    else {
        dataOfBirth.style.backgroundColor = '#ba0d0d'
        document.getElementById('dateOfBirth_msg').classList.remove('d-none')
        isPasswordValid = false
    }
}

//Check validation on focusout
phoneNumber.addEventListener('focusout', () => {
    validatePhone(phoneNumber.value)
})

emailAddress.addEventListener('focusout', () => {
    ValidateEmail(emailAddress.value)
})

password.addEventListener('focusout', () => {
    validatePass(password.value)
})
dataOfBirth.addEventListener('focusout', () => {
    DOB_Validator(dataOfBirth.value)
})

confirmPassword.addEventListener('focusout', () => {
    if (confirmPassword.value == password.value) {
        password.style.backgroundColor = '#fff'
        confirmPassword.style.backgroundColor = '#fff'
        isPasswordMatched = true
    }
    else {
        password.style.backgroundColor = '#ba0d0d'
        confirmPassword.style.backgroundColor = '#ba0d0d'
        isPasswordMatched = false
    }
})


//Function for signup btn
signUpBtn.addEventListener('click', () => {
    if (fName.value !== "" && lName.value !== "" && phoneNumber.value !== "" && emailAddress.value !== "" && password.value !== "" && confirmPassword.value !== "" && dataOfBirth.value !== "" && address.value !== "") {
        console.log(isPhoneValid,isEmailValid,isPasswordValid, ValidateEmail(emailAddress.value));
        if ((isPhoneValid) && ((isEmailValid) || (ValidateEmail(emailAddress.value))) && (isPasswordValid)) {
            if (isPasswordMatched) {
                if (image_uploaded) {
                    let userDataFromInput = {
                        fName: fName.value,
                        lName: lName.value,
                        phoneNumber: `${dialCountryCode.value}-${phoneNumber.value}`,
                        address: `${pincode.value}, ${address.value}`,
                        emailAddress: emailAddress.value,
                        password: password.value,
                        confirmPassword: confirmPassword.value,
                        dataOfBirth: dataOfBirth.value
                    }

                    console.log(userDataFromInput);

                    let usersList = [];

                    // Getting users data from localStorage
                    if (localStorage.getItem('users') == null) {
                        usersList.push(userDataFromInput);
                        localStorage.setItem('users', JSON.stringify(usersList))
                    }
                    else {
                        usersList = JSON.parse(localStorage.getItem('users'));
                        usersList.push(userDataFromInput);
                        localStorage.setItem('users', JSON.stringify(usersList))
                    }
                    window.location.href = "login.html"
                }
                else {
                    let signup_alert_2 = document.getElementById('signup_alert-2')
                    signup_alert_2.click()
                }
            }
        }
        else {
            let signup_alert_3 = document.getElementById('signup_alert_3')
            signup_alert_3.click()
        }
    }
    else {
        let signup_alert = document.getElementById('signup_alert')
        signup_alert.click()
    }
});

//Image uploader function
let avatar_pic = document.getElementById('avatar_pic');
let image_uploader = document.getElementById('image_uploader');
let image_uploaded = false;

image_uploader.addEventListener('change', function () {
    const choosedFile = this.files[0];
    if (choosedFile) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            avatar_pic.setAttribute('src', reader.result);
        });
        reader.readAsDataURL(choosedFile);
        image_uploaded = true;
    }
    else {
        image_uploaded = false;
    }
});

//Already have an acount
let alreadyAcountBtn = document.getElementById('alreadyAcount');
alreadyAcountBtn.addEventListener('click', () => window.location.href = 'login.html')
