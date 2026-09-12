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

function updateCartCount() {
  const cartCount = document.querySelector("#cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
  
}

const cartContainer = document.querySelector("#cart-items-container");
if (cartContainer) {

          if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Your cart is empty.";
        cartContainer.appendChild(emptyMessage);
    }
    else {
     
            cart.forEach(function(item) {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        
        itemElement.textContent = item.name + " - $" + item.price;
        
        const itemImage = document.createElement("img");
        itemImage.src = item.image;
        itemImage.classList.add("cart-item-image");
       
   
        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-btn");
        removeButton.textContent = "Remove";
      
          removeButton.addEventListener("click", function() {
                cart = cart.filter(function(cartItem) {



                  return cartItem !== item;
                  
                    
             });
             updateCartCount();
            if (cart.length === 0) {
                 const emptyMessage = document.createElement("p");
                 emptyMessage.textContent = "Your cart is empty.";
                 cartContainer.appendChild(emptyMessage);
            }

                total = 0;
                cart.forEach(function(cartItem) {
                     total = total + cartItem.price;
                });
                    if (totalElement) {
        totalElement.textContent = total.toFixed(2);
    }


                localStorage.setItem("local-cart", JSON.stringify(cart));
                itemElement.remove();
        });
         cartContainer.appendChild(itemElement);
         itemElement.appendChild(removeButton);
          itemElement.appendChild(itemImage);
    });

}
 
    }


console.log(cart);
const buttons = document.querySelectorAll(".add-to-cart-btn");


let total = 0;

cart.forEach(function(item) {
    total = total + item.price;
});

const totalElement = document.querySelector("#cart-total");
const cartCount = document.querySelector("#cart-count");


if (totalElement) {
    totalElement.textContent = total.toFixed(2);
}

buttons.forEach(function(button) {

    button.addEventListener("click", function() {
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
        const card = button.closest(".item-card");
        const nutrition = [];
 
        const description = card.querySelector(".item-description").textContent;
        const allergens = card.querySelector(".item-allergens").textContent;
        const imageSrc = card.querySelector("img").getAttribute("src");
        const nutritionItems = card.querySelectorAll(".item-nutrition-item");

    nutritionItems.forEach(function(nutritionItem) {

        const nutritionValue = nutritionItem.querySelector("span").textContent;
        const nutritionLabel = nutritionItem.querySelector("small").textContent;
        nutrition.push({
            value: nutritionValue,
            label: nutritionLabel 

        });
    });


    const product = {
         name: name,
         price: price,
         description: description,
         allergens: allergens,
         nutrition: nutrition,
         image: imageSrc
    };
    cart.push(product);
    updateCartCount();
    console.log(product);

   let message = button.parentElement.querySelector(".cart-message");

    if (!message) {
         message = document.createElement("p");
        message.classList.add("cart-message");
        button.after(message);
    }

    message.textContent = product.name + " added to cart!";
  setTimeout(function() {
    message.classList.add("fade-out");

    setTimeout(function() {
        message.remove();
    }, 500);

}, 2000);

    total = total + product.price;

    if (totalElement) {
        totalElement.textContent = total.toFixed(2);
    }
    
        if (cartContainer) {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");

          itemElement.textContent = product.name + " - $" + product.price;

          cartContainer.appendChild(itemElement);
        }
        

        localStorage.setItem("local-cart" , JSON.stringify(cart));

    });
        
});
updateCartCount();



