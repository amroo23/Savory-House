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


const contactForm = document.querySelector("#contact-form");

/* =================================== */
/*           SHOPPING CART LOGIC              */
/* =================================== */


function updateCartCount() {
  
    let cart = JSON.parse(localStorage.getItem("savory_cart")) || [];
    
    const cartCountElement = document.getElementById("cart-count");
 
    if (cartCountElement) {
       
        cartCountElement.textContent = cart.length; 
    }
}

updateCartCount();


const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

addToCartButtons.forEach(button => {
    button.addEventListener("click", function() {
        
        
        const itemName = this.getAttribute("data-name");
        const itemPrice = parseFloat(this.getAttribute("data-price")); 

        let cart = JSON.parse(localStorage.getItem("savory_cart")) || [];
        
        cart.push({ name: itemName, price: itemPrice });

    
        localStorage.setItem("savory_cart", JSON.stringify(cart));

        updateCartCount();
      
        const originalText = this.textContent;
        this.textContent = "✓ Added to Order!";
        this.classList.add("success"); 

      
        setTimeout(() => {
            this.textContent = originalText;
            this.classList.remove("success");
        }, 2500);
        
    });
});
/* ========================================= */
/*           CART PAGE RENDERING             */
/* ========================================= */

function renderCartPage() {
const cartBox = document.getElementById("cart-items-container");
if(cartBox== null){
    return
}

let cart = JSON.parse(localStorage.getItem("savory_cart")) || [];



}