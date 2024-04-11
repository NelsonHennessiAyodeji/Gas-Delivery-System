// Register Credentials
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const countryInput = document.getElementById('country');
const addressInput = document.getElementById('address');
const cityInput = document.getElementById('city');
const stateInput = document.getElementById('state');
const zipcodeInput = document.getElementById('zipcode');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
// Login Credentials
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
// Submit buttons
const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');
const baseURL = 'http://localhost:3000/auth';
// Billing details
const billingDetails = document.getElementById("billingDetails");
const orderBtn = document.getElementById("order-btn");
// Checkout variables
let updateFunds = false;
let balance;


getBalance()

if (billingDetails) {
    fetchData();
    orderBtn.addEventListener('click', async () => {
        const res = await fetch(`http://localhost:3000/orders/`, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                shippingFee: 50,
                total: localStorage.getItem("gasPrice"),
                status: "delivered",
                size: localStorage.getItem("gasSize")
            })
        });

        if (res.ok) {
            data = await res.json();
            updateFunds = true;
            if (updateFunds) {
                updateBalance();
            }
            alert("Order Successfully Placed, open the order tab in the next page to see your order list");
            window.location = "my-account.html";
        } else {
            console.log(await res.json());
        }    
    });
}

async function getBalance() {
    const res = await fetch(`http://localhost:3000/users/getWalletBalance/${localStorage.getItem('email')}`, {
        method: "GET"
    });

    if (res.ok) {
        data = await res.json();
        balance = Number.parseInt(data);
    } else {
        alert(await res.json());
    }
}

async function updateBalance () {
    const price = localStorage.getItem("gasPrice");
    console.log(balance);
    console.log(price);
    try {
        await fetch('http://localhost:3000/users/updateWalletBalance', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                walletBalance: parseInt(balance - price),
                userId: user.userId
            })
        });
        updateFunds = false;
    } catch (error) {
        updateFunds = false;
        console.log(error);
    }
    updateFunds = false;
}

if (updateFunds) {
    funds();
}


if (registerBtn) {
    registerBtn.addEventListener('click', submitForm);
    loginBtn.addEventListener('click', login);
}

async function submitForm(e) {
    e.preventDefault();
    if (firstNameInput && emailInput && passwordInput) {
        console.log("Yes");
        const res = await fetch(`${baseURL}/register`, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                country: countryInput.value,
                address: addressInput.value,
                city: cityInput.value,
                state: stateInput.value,
                zipcode: zipcodeInput.value,
                phone: phoneInput.value,
                email: emailInput.value,
                password: passwordInput.value
            })
        });

        const req = await res.json();

        if (res.ok) {
            // console.log(userDetailsName);
            alert("Registeration was successful, please proceed to login");
        } else{
            alert(req);
            console.log(req);
        }
    }
}

async function login(e) {
    e.preventDefault();
    console.log(loginEmailInput.value);
    if (loginEmailInput && loginPasswordInput) {
        const res = await fetch(`${baseURL}/login`, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: loginEmailInput.value,
                password: loginPasswordInput.value
            })
        });

        
        if (res.ok){
            localStorage.setItem("email", loginEmailInput.value);
            window.location.href = 'index.html';
        } else {
            alert(await res.json());
        }
        
    }
}

async function fetchData() {
        const response = await fetch(`${baseURL}/details/${localStorage.getItem("email")}`, {
        method: 'GET',
        credentials: 'include'
        });
    
        if (response.ok) {
        const data = await response.json();
        firstNameInput.value = data.user.userFirstName;
        lastNameInput.value = data.user.userLastName;
        countryInput.value = data.user.userCountry;
        addressInput.value = data.user.userAddress;
        cityInput.value = data.user.userCity;
        stateInput.value = data.user.userState;
        zipcodeInput.value = data.user.userZipcode;
        phoneInput.value = data.user.userPhone;
        emailInput.value = data.user.userEmail;
    }
}

