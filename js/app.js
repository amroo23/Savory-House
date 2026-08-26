const elements = document.querySelectorAll( ".from-right, .from-left, .from-top, .from-bottom");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }

    });

}, {
    threshold: 0.35
});

elements.forEach((element) => {
    observer.observe(element);
});

const form = document.querySelector(".contact-form");
const message = document.querySelector("#form-message");
if (form) {
form.addEventListener("submit", function (event) {
    
    event.preventDefault();


    const inputs = form.querySelectorAll("input, textarea, select");

    let empty = false;

    inputs.forEach(function (input) {
        if (input.value.trim() === "") {
            empty = true;
        }
    });

    if (empty) {
        message.textContent = "Please fill in all fields.";
        message.classList.remove("success");
        message.classList.add("error", "show");

    } else {
        message.textContent = "✓ Your reservation has been sent successfully!";
        message.classList.remove("error");
        message.classList.add("success", "show");

        form.reset();
    }

    setTimeout(function () {
        message.classList.remove("show");
    }, 4000);
});           
}




/* =================================== */
/*           SHOPPING CART LOGIC              */
/* =================================== */

const burger = {
    name: "Classic Angus Burger",
    price: 19.99
};
const pizza = {
    name: "Margherita Pizza",
    price: 14.99
};

const dessert = {
    name: "Chocolate Cake",
    price: 7.99
};

const cart = [];

cart.push(burger);
cart.push(pizza);
cart.push(dessert);

localStorage.setItem("test_cart", JSON.stringify(cart));
const storedCart = localStorage.getItem("test_cart");

console.log(storedCart);
const cartFromStorage = JSON.parse(storedCart);

console.log(cartFromStorage);           


const cartContainer = document.querySelector("#cart-items-container");
console.log(cartContainer);


cartFromStorage.forEach(function(item) {

    const itemElement = document.createElement("div");
    itemElement.textContent = item.name +" - $"+ item.price;
    cartContainer.appendChild(itemElement);
});
let total = 0;

cartFromStorage.forEach(function(item) {
    total = total + item.price;
});
const totalElement = document.querySelector("#cart-total");
if (totalElement){

totalElement.textContent = "Total: $" + total;

}
