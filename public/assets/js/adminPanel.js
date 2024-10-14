const productSoldCount = document.getElementById("productSoldCount"); // Total amount of orders
const awardsWonCount = document.getElementById("awardsWonCount"); //  Put a value there
const hoursWorkedCount = document.getElementById("hoursWorkedCount"); // TODO: implement
const happyCustomerCount = document.getElementById("happyCustomerCount"); // Total amount of users
const tableBody = document.getElementById("order-table-body");

const baseUrl = "http://127.0.0.1:5500";

async function getHappyCustomersCount() {
  const res = await fetch(`${baseUrl}/users`, {
    method: "GET",
  });

  const users = await res.json();
  // console.log(users);

  if (res.ok) {
    happyCustomerCount.textContent = users.length;
    happyCustomerCount.classList = "count";
  } else {
    alert(res);
  }
}

async function getProductSoldCount() {
  const res = await fetch(`${baseUrl}/orders`, {
    method: "GET",
  });

  const orders = await res.json();
  // console.log(orders);

  if (res.ok) {
    productSoldCount.textContent = orders.length;
    productSoldCount.classList = "count";
  }
}

async function fillOrderTable() {
  const response = await fetch(`http://127.0.0.1:5500/orders/`, {
    method: "GET",
    credentials: "include",
  });

  const orders = await response.json();
  console.log(orders);

  orders.forEach((order) => {
    tableBody.innerHTML += `                                                    
      <tr>
      <tr>
      <td><a class="account-order-id" href="javascript:void(0)">#${
        order.productId
      }</a></td>
      <td>${order.user}</td>
      <td>${order.createdAt.toString().substring(0, 10)}</td>
      <td>${order.total} for ${order.size} item</td>
      <td>${order.paymentMethod}</td>
      <td>${order.status}</td>
      </td>
    </tr>
    `;
  });
}

getHappyCustomersCount();
getProductSoldCount();
fillOrderTable();
