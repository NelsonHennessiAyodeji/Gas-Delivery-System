let user;

navList = document.getElementById("navList");

let dep = 0;
let currentBalance = 0; // Extract current balance (ignoring "N")

// Gas Configure
const walletBalance = document.getElementById("wallet-balance");
const purchaseBtn = document.getElementById("purchaseBtn");

// Get references to the balance display and deposit amount input
const balanceDisplay = document.getElementById("balance");
const depositAmountInput = document.getElementById("depositAmount");

// Update balance display on deposit button click
const depositButton = document.getElementById("deposit");

// Payment Page
const paymentBtn = document.getElementById("paymentBtn");
const cardNumber = document.getElementById("cardNumber");
const cardDate = document.getElementById("date");
const cvc = document.getElementById("cvc");
const cardOwner = document.getElementById("cardOwner");

if (paymentBtn) {
  paymentBtn.addEventListener("click", async () => {
    if (
      !cardNumber.value ||
      !cardDate.value ||
      !cvc.value ||
      !cardOwner.value
    ) {
      alert("Please fill all sections");
    }
    if (cardNumber.value.length != 16) {
      alert("Your card number must be 16 digits long");
    }
    if (cvc.value.length != 3) {
      alert("Your CVC number must be 3 digits long");
    }
    if (cardOwner.value.length < 3) {
      alert("Your name should be longer");
    } else {
      // Go back to account page
      alert("Successfully Paid");
      // Get the entered deposit amount (as a number)
      const depositAmount = Number.parseInt(localStorage.getItem("deposit"));
      const currentBalance = Number.parseInt(
        localStorage.getItem("currentBalance")
      );
      // console.log(depositAmount);
      // console.log(currentBalance);
      // console.log(depositAmount + currentBalance);
      let newBalance = Number.parseInt(currentBalance + depositAmount);
      // console.log(newBalance);

      // Check if a valid number is entered
      if (!isNaN(depositAmount)) {
        // Update the balance display with the new value
        // console.log(newBalance);

        const res = await fetch(
          "https://gas-delivery-system.onrender.com/users/updateWalletBalance",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              walletBalance: newBalance,
              userId: user.userId,
            }),
          }
        );

        if (res.ok) {
          // const bal = await res.json();
          // balanceDisplay.textContent = `₦ ${bal.toFixed(2)}`; // Set balance with 2 decimal places
          window.location = "my-account.html";

          // Clear the deposit amount input after successful deposit
          depositAmountInput.value = "";
        } else {
          data = await res.json;
          console.log(data);
        }
      } else {
        alert("Please enter a valid number.");
      }
    }
  });
}

if (balanceDisplay && depositAmountInput) {
  depositButton.addEventListener("click", async () => {
    if (depositAmountInput.value) {
      dep = Number.parseInt(depositAmountInput.value);
      currentBalance = parseFloat(balanceDisplay.textContent.substring(2)); // Extract current balance (ignoring "N")
      localStorage.setItem("deposit", dep);
      localStorage.setItem("currentBalance", currentBalance);
      // console.log(dep, currentBalance);
      window.location = "pay.html";
    } else {
      alert("Please input an amount");
    }
  });

  const withdrawButton = document.getElementById("withdraw");
  withdrawButton.addEventListener("click", () => {
    alert("Withdraw functionality not implemented yet!");
  });
}

if (purchaseBtn) {
  purchaseBtn.addEventListener("click", () => {
    let gasPrice = localStorage.getItem("gasPrice");
    const walletBal = parseInt(walletBalance.textContent);
    if (gasPrice > walletBal) {
      alert("Insufficient Funds, please deposit more funds");
      return;
    }
    window.location = "checkout.html";
  });
}

gas = {
  gasOne: { productCode: "937482", size: "5", price: 2500 },
  gasTwo: { productCode: "937725", size: "10", price: 5000 },
  gasThree: { productCode: "935896", size: "15", price: 7500 },
  gasFour: { productCode: "935684", size: "20", price: 10000 },
  gasFIve: { productCode: "939843", size: "25", price: 12500 },
  gasSix: { productCode: "939641", size: "30", price: 15000 },
};

const gasBasePrice = 1200;

// Get references to the balance display, gas size select, and gas price display
const spanBalanceDisplay = document.getElementById("wallet-balance");
const spanProductId = document.getElementById("product-id");
const spanGasPrice = document.getElementById("gas-price");
const litreSizeSelect = document.querySelector(".myniceselect");
const gasSize = document.getElementById("gas-size");
const gasSizeInput = document.getElementById("gas-size-input");

const gas1 = document.getElementById("gas-1");

const gasOne = document.getElementById("gas-one");
const gasTwo = document.getElementById("gas-two");
const gasThree = document.getElementById("gas-three");
const gasFour = document.getElementById("gas-four");
const gasFIve = document.getElementById("gas-five");
const gasSix = document.getElementById("gas-six");
// const gasSizeSelect = document.getElementById("gasSize");
// const gasPriceDisplay = document.getElementById("gasPrice");
// const payButton = document.getElementById("payButton");

if (gasSizeInput) {
  gasSizeInput.addEventListener("input", () => {
    let size = Number.parseInt(gasSizeInput.value);
    let amount = gasBasePrice * size;
    g = gasSizeInput.value;
    gasSize.textContent = g;
    localStorage.setItem("gasSize", g);
    spanGasPrice.textContent = amount;
    spanProductId.textContent = 263894;
    localStorage.setItem("productCode", 263894);
    localStorage.setItem("gasPrice", amount);
    if (gasSizeInput.value === "") {
      gasSize.textContent = 0;
      spanGasPrice.textContent = 0;
    }
  });
}

if (spanBalanceDisplay) {
  localStorage.setItem("productCode", 937482);
  localStorage.setItem("gasPrice", 6000);

  const frwBtn = document.querySelector(".tty-slick-text-next");
  const bkBtn = document.querySelector(".tty-slick-text-prev");

  frwBtn.addEventListener("click", () => {
    const activeGasImage = document.querySelector(".first-active");
    if (activeGasImage.querySelector("#gas-1")) {
      console.log("Work1");
    }
    if (activeGasImage.querySelector("#gas-2")) {
      console.log("Work2");
    }
    if (activeGasImage.querySelector("#gas-3")) {
      console.log("Work3");
    }
    if (activeGasImage.querySelector("#gas-4")) {
      console.log("Work4");
    }
    if (activeGasImage.querySelector("#gas-5")) {
      console.log("Work5");
    }
    if (activeGasImage.querySelector("#gas-6")) {
      console.log("Work 6");
    }
    // console.log(activeGasImage);
  });
  bkBtn.addEventListener("click", () => {
    const activeGasImage = document.querySelector(".first-active");
    if (activeGasImage.querySelector("#gas-1")) {
      console.log("Work1");
    }
    if (activeGasImage.querySelector("#gas-2")) {
      console.log("Work2");
    }
    if (activeGasImage.querySelector("#gas-3")) {
      console.log("Work3");
    }
    if (activeGasImage.querySelector("#gas-4")) {
      console.log("Work4");
    }
    if (activeGasImage.querySelector("#gas-5")) {
      console.log("Work5");
    }
    if (activeGasImage.querySelector("#gas-6")) {
      console.log("Work 6");
    }
    // console.log(activeGasImage);
  });

  // if (activeGasImage){
  // }
  // if (gas1.classList.contains("first-active")){
  //   console.log("activeGasImage");
  // }
  gasOne.addEventListener("click", () => {
    spanProductId.textContent = gas.gasOne.productCode;
    spanGasPrice.textContent = gas.gasOne.price;
    gasSizeInput.value = gas.gasOne.size;
    gasSize.textContent = gas.gasOne.size;
    spanGasPrice.textContent = gasBasePrice * 5;
    // litreSizeSelect[0];
    localStorage.setItem("productCode", gas.gasOne.productCode);
    localStorage.setItem("gasPrice", gasBasePrice * 5);
  });
  gasTwo.addEventListener("click", () => {
    spanProductId.textContent = gas.gasTwo.productCode;
    spanGasPrice.textContent = gas.gasTwo.price;
    gasSizeInput.value = gas.gasTwo.size;
    gasSize.textContent = gas.gasTwo.size;
    spanGasPrice.textContent = gasBasePrice * 10;
    localStorage.setItem("productCode", gas.gasTwo.productCode);
    localStorage.setItem("gasPrice", gasBasePrice * 10);
  });
  gasThree.addEventListener("click", () => {
    spanProductId.textContent = gas.gasThree.productCode;
    spanGasPrice.textContent = gas.gasThree.price;
    gasSizeInput.value = gas.gasThree.size;
    gasSize.textContent = gas.gasThree.size;
    spanGasPrice.textContent = gasBasePrice * 15;
    localStorage.setItem("productCode", gas.gasThree.productCode);
    localStorage.setItem("gasPrice", gasBasePrice * 15);
  });
  gasFour.addEventListener("click", () => {
    spanProductId.textContent = gas.gasFour.productCode;
    spanGasPrice.textContent = gas.gasFour.price;
    gasSizeInput.value = gas.gasFour.size;
    gasSize.textContent = gas.gasFour.size;
    spanGasPrice.textContent = gasBasePrice * 20;
    localStorage.setItem("productCode", gas.gasFour.productCode);
    localStorage.setItem("gasPrice", gasBasePrice * 20);
  });
  gasFIve.addEventListener("click", () => {
    spanProductId.textContent = gas.gasFIve.productCode;
    spanGasPrice.textContent = gas.gasFIve.price;
    gasSizeInput.value = gas.gasFive.size;
    gasSize.textContent = gas.gasFive.size;
    spanGasPrice.textContent = gasBasePrice * 25;
    localStorage.setItem("productCode", gas.gasFIve.productCode);
    localStorage.setItem("gasPrice", gasBasePrice * 25);
  });
  gasSix.addEventListener("click", () => {
    spanProductId.textContent = gas.gasSix.productCode;
    spanGasPrice.textContent = gas.gasSix.price;
    gasSizeInput.value = gas.gasSix.size;
    gasSize.textContent = gas.gasSix.size;
    spanGasPrice.textContent = gasBasePrice * 30;
    localStorage.setItem("productCode", gas.gasSix.productCode);
    localStorage.setItem("gasPrice", gasBasePrice * 30);
  });
}

//   if (gasPriceDisplay) {    // Function to get gas price and store as integer
//     function getGasPrice(size) {
//       const prices = {
//         "5kg": 2500,
//         "12.5kg": 5000,
//         "25kg": 8000,
//         "50kg": 12000
//       };
//       return parseInt(prices[size], 10); // Parse as integer
//     }

//     // Update gas price display based on selected size
//     gasSizeSelect.addEventListener("change", () => {
//       const selectedSize = gasSizeSelect.value;
//       const price = getGasPrice(selectedSize);
//       gasPriceDisplay.textContent = `Gas Price: N ${price.toFixed(2)}`;
//     });

//     // Simulate payment on button click (replace with actual payment logic)
//     payButton.addEventListener("click", async () => {
//       const selectedSize = gasSizeSelect.value;
//       const price = parseInt(getGasPrice(selectedSize));
//       const balance = parseInt(spanBalanceDisplay.textContent.substring(2));
//       if (price <= balance) {
//         const total = Math.abs(price - balance)
//         const res = await fetch('https://gas-delivery-system.onrender.com/users/updateWalletBalance', {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//               walletBalance: total,
//               userId: user.userId
//             })
//           });

//           const bal = await res.json();
//           spanBalanceDisplay.textContent = `₦ ${bal.toFixed(2)}`; // Set balance with 2 decimal places

//       } else {
//         alert("Insufficeint Funds");
//       }
//     });
// }

////////   For My-Account///////////////

const orderProduct = document.getElementById("order-product");
const orderPrice = document.getElementById("order-price");
const orderTotal = document.getElementById("order-total");

if (orderPrice) {
  orderPrice.textContent = localStorage.getItem("gasPrice");
  orderProduct.textContent = localStorage.getItem("productCode");
  orderTotal.textContent = localStorage.getItem("gasPrice");
}

const myAccountName = document.getElementById("myAccountUserName");
const myAccountSpanUserName = document.getElementById("myAccountSpanUserName");
const logoutTab = document.getElementById("account-logout-tab");

const tableBody = document.getElementById("order-table-body");

if (logoutTab != null) {
  logoutTab.addEventListener("click", async () => {
    await fetch("https://gas-delivery-system.onrender.com/auth/logout", {
      method: "GET",
      // credentials: 'include'
    });
  });
}

async function fillOrderTable() {
  const response = await fetch(
    "https://gas-delivery-system.onrender.com/orders/showAllMyOrders",
    {
      method: "GET",
      credentials: "include",
    }
  );

  const orders = await response.json();

  orders.forEach((order) => {
    tableBody.innerHTML += `                                                    
    <tr>
    <td><a class="account-order-id" href="javascript:void(0)">#${
      order.productId
    }</a></td>
    <td>${localStorage.getItem("userId")}</td>
    <td>${order.createdAt.toString().substring(0, 10)}</td>
    <td>${order.total} for ${order.size} item</td>
    <td>${order.paymentMethod}</td>
    <td>${order.status}</td>
    </td>
  </tr>
  `;
  });
}

async function fetchData() {
  try {
    const response = await fetch(
      "https://gas-delivery-system.onrender.com/users/showMe",
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();
    // console.log(data);
    if (response.ok) {
      if (myAccountName != null && myAccountSpanUserName != null) {
        myAccountName.innerHTML = data.userName;
        myAccountSpanUserName.innerHTML = data.userName;
      }

      if (navList && data.userRole === "admin") {
        navList.innerHTML += `<li class=""><a href="adminPanel.html">Admin Panel</a></li>`;
      }

      user = data;
      // console.log('Data from backend:', data);
    } else {
      window.location.href = "login-register.html";
      console.error("Failed to fetch data:", data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  // getWalletBalance();
}

async function getWalletBalance() {
  if (walletBalance || balanceDisplay) {
    const res = await fetch(
      `https://gas-delivery-system.onrender.com/users/getWalletBalance/${localStorage.getItem(
        "email"
      )}`,
      {
        method: "GET",
      }
    );

    const bal = await res.json();
    // console.log(bal);
    if (res.ok) {
      if (walletBalance) {
        walletBalance.textContent = ` ${bal.toFixed(2)}`; // Set balance with 2 decimal places
      } else if (balanceDisplay) {
        balanceDisplay.textContent = `₦ ${bal.toFixed(2)}`; // Set balance with 2 decimal places
      }
    } else {
      console.log(await res.json());
    }
  }
}

// Call the function to fetch data
fetchData();
if (tableBody) {
  fillOrderTable();
}
getWalletBalance();
