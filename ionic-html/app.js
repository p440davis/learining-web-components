const itemEl = document.getElementById("item");
const amountEl = document.getElementById("amount");
const addEl = document.getElementById("btn-add");
const clearEl = document.getElementById("btn-clear");
const listEl = document.getElementById("expenses");
const sumEl = document.getElementById("sum");
const alertController = document.getElementById("alert-controller");

let sum = 0;

const clear = () => {
  itemEl.value = "";
  amountEl.value = "";
};

addEl.addEventListener("click", () => {
  const item = itemEl.value;
  const amount = amountEl.value;

  if (item.trim().length < 1 || amount <= 0 || amount.trim().length < 1) {
    alertController
      .create({
        message: "Please enter a valid reason and amount",
        header: "Invalid inputs",
        buttons: ["OK"]
      })
      .then(alertElement => {
        alertElement.present();
      });
    return;
  }

  const newItem = document.createElement("ion-item");
  newItem.textContent = item + ": £" + amount;
  listEl.appendChild(newItem);

  sum += +amount;
  sumEl.textContent = sum;

  clear();
});

clearEl.addEventListener("click", clear);
