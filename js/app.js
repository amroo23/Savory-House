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


let cart ;

const cartString = localStorage.getItem("local-cart");

if(cartString){
      cart = JSON.parse(cartString);
}
else {
    cart = [];
}

const cartContainer = document.querySelector("#cart-items-container");
if (cartContainer) {

    cart.forEach(function(item) {
        const itemElement = document.createElement("div");
        itemElement.textContent = item.name + " - $" + item.price;
   
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
      
          removeButton.addEventListener("click", function() {
                cart = cart.filter(function(cartItem) {
                  return cartItem !== item;
             });
                localStorage.setItem("local-cart", JSON.stringify(cart));
                itemElement.remove();
        });
         cartContainer.appendChild(itemElement);
         itemElement.appendChild(removeButton);
    });

}

console.log(cart);
const buttons = document.querySelectorAll(".add-to-cart-btn");


let total = 0;

cart.forEach(function(item) {
    total = total + item.price;
});

const totalElement = document.querySelector("#cart-total");

if (totalElement) {
    totalElement.textContent = total.toFixed(2);
}

buttons.forEach(function(button) {

    button.addEventListener("click", function() {
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
    
         const product = {
             name: name,
             price: price
          };

        console.log(product);

        cart.push(product);

        total = total + product.price;

    if (totalElement) {
        totalElement.textContent = total.toFixed(2);
    }
    
        if (cartContainer) {
            const itemElement = document.createElement("div");

          itemElement.textContent = product.name + " - $" + product.price;

          cartContainer.appendChild(itemElement);
        }
        

        localStorage.setItem("local-cart" , JSON.stringify(cart));

    });
        
});


cart = [
    { name: "Burger", price: 19.99 },
    { name: "Pizza", price: 14.99 },
    { name: "Cake", price: 7.99 }
];



const newarr = cart.filter (function(item) {
    return item.name !== "Pizza";
});

console.log(newarr);

