// Login users fildes
let logInBtn = document.getElementById('loginBtn');
let newEmailAddress = document.getElementById('emailAddress');
let newPassword = document.getElementById('userPassword');


//Function for login form
logInBtn.addEventListener('click', () => {
    console.log(newEmailAddress.value, "newEmailAddress")
    //Get all the inputs
    if (newEmailAddress.value !== "" || newPassword.value !== "") {

        // Getting users from localStorage
        let allStoredUsers = JSON.parse(localStorage.getItem('users'));
        console.log(allStoredUsers, "allStoredUsers")
        if (allStoredUsers !== null) {
            const logedInUser = allStoredUsers.filter(user =>
                user.emailAddress == newEmailAddress.value && user.password == newPassword.value)
                console.log(logedInUser)
            if (logedInUser.length > 0) {
                newEmailAddress.style.borderColor = "Black";
                newPassword.style.borderColor = "Black"
                console.log(newEmailAddress.value, newPassword.value);

                let loggedin = document.getElementById('loggedin')
                loggedin.click()
                window.location.href = "covidtracker.html"
            } else {

                newEmailAddress.style.borderColor = "Red";
                newPassword.style.borderColor = "Red"
                let login_alert_2 = document.getElementById('login_alert_2')
                login_alert_2.click()
                // window.location.href = "signup.html"
            }
        }
        else {
            let login_alert_1 = document.getElementById('login_alert_1')
            login_alert_1.click()
            // window.location.href = "signup.html"

        }
    }
    else {
        let login_alert = document.getElementById('login_alert_3')
        login_alert.click()
    }
})

//Already have not acount
let alreadyNotAcountBtn = document.getElementById('alreadyNotAcount');
alreadyNotAcountBtn.addEventListener('click', () => window.location.href = 'signup.html')

